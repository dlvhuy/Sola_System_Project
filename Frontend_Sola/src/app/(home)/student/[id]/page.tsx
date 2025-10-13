'use client'


import { studentApi } from "@/lib/api/student.api";
import { Badge } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfoStudentComponent from "../../admin/student/[id]/components/infoStudentComponent";
import ListStudentProgressComponent from "../../admin/student/[id]/components/listStudentProgressReportComponent";
import ReportChartComponent from "../../admin/student/[id]/components/reportChartComponent";
import AnalyzeStudent from "../../admin/student/[id]/components/analyzeStudent";
import Modal from "@/components/modal";
import FormAddStudentProgressReport from "@/components/form/addStudentProgressReport";

export type Student = {
    ID: number
    name: string
    birthday: string
    gender: string
    nameParent: string
    phoneNumber: string
    parent_email: string
    address: string
}

export type SessionReview = {
    ID: number
    name_lession: string
    date_lession: string
    teacher_name: string
    class_attitude: number
    class_thinking_skill: number
    class_theory_skill: number
    class_practice_skill: number
    comment_thinking_skill: string
    comment_attitude: string
    comment_theory_skill: string
    comment_practice_skill: string
}

export default function StudentDetailPage() {
    const params = useParams()
    const studentId = params.id as string
    const [student, setStudent] = useState<Student | null>(null)
    const [sessions, setSessions] = useState<SessionReview[]>([])
    const [selectedSession, setSelectedSession] = useState<SessionReview | null>(null)
    const [openModalFormAddStudentProgressReport, setOpenModalFormAddStudentProgressReport] = useState(false)
    const [chartType, setChartType] = useState<"line" | "radar">("line")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await studentApi.getById(Number(studentId));
                setStudent(data.data);
                setSessions(data.data.lessionReports)
                setSelectedSession(null)
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu sinh viên:", error);
            }
        };

        fetchData();
    }, [studentId]);

    const handleAddSession = (value: SessionReview) => {
        setSessions((prev) => ({ value, ...prev }))
    }

    const handleChangeSelectedSession = (value: SessionReview | null) => {
        setSelectedSession(value)
    }

    const handleSetOpenModal = (data: boolean) => {
        setOpenModalFormAddStudentProgressReport(data);
    };

    const handleChangeChartType = (value: "line" | "radar") => {
        setChartType(value)
    }

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return "text-green-600"
        if (rating >= 3) return "text-yellow-600"
        return "text-red-600"
    }

    const getRatingBadge = (rating: number) => {
        if (rating >= 4) return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Tốt</Badge>
        if (rating >= 3) return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Khá</Badge>
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cần cải thiện</Badge>
    }


    return (<>
        <div className="grid lg:grid-cols-4 gap-4  md:*:grid-cols-1 sm:grid-cols-1">
            <div className=" grid lg:col-span-3 auto-rows-min p-4 rounded-lg gap-4">
                <InfoStudentComponent student={student}></InfoStudentComponent>
                <ListStudentProgressComponent
                    isAdmin={false}
                    getRatingBadge={getRatingBadge}
                    getRatingColor={getRatingColor}
                    studentId={studentId}
                    sessions={sessions}
                    selectedSession={selectedSession}
                    handleChangeSelectedSession={handleChangeSelectedSession}
                    handleSetOpenModal={handleSetOpenModal}
                />
            </div>
            <div className="space-y-6">
                <ReportChartComponent
                    sessions={sessions}
                    handleSetChartType={handleChangeChartType}
                    chartType={chartType}
                />

                <AnalyzeStudent
                    sessions={sessions}
                />

            </div>
            <div>
                {
                    openModalFormAddStudentProgressReport &&
                    <Modal title="Tạo báo cáo buổi học" sendOpenModal={handleSetOpenModal}>
                        <FormAddStudentProgressReport handleAddSession={handleAddSession} studentId={studentId}></FormAddStudentProgressReport>
                    </Modal>
                }
            </div>


        </div >
    </>)
}