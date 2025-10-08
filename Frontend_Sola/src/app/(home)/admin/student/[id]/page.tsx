'use client'

import FormAddStudentProgressReport from "@/components/form/addStudentProgressReport";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Edit, Link } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import InfoStudentComponent from "./components/infoStudentComponent";
import ListStudentProgressComponent from "./components/listStudentProgressReportComponent";
import ReportChartComponent from "./components/reportChartComponent";
import AnalyzeStudent from "./components/analyzeStudent";

export type Student = {
    id: number
    full_name: string
    date_of_birth: string
    gender: string
    parent_name: string
    parent_phone: string
    parent_email: string
    address: string
}

export type SessionReview = {
    session_id: number
    session_date: string
    topic: string
    teacher_name: string
    attitude_rating: number
    enthusiasm_rating: number
    theory_rating: number
    practice_rating: number
    teacher_comments: string
}

export default function StudentDetailPage() {
    const params = useParams()
    const studentId = params.id as string

    const [student, setStudent] = useState<Student | null>(null)
    const [sessions, setSessions] = useState<SessionReview[]>([])
    const [selectedSession, setSelectedSession] = useState<SessionReview | null>(null)
    const [openModalFormAddStudentProgressReport, setOpenModalFormAddStudentProgressReport] = useState(true)
    const [chartType, setChartType] = useState<"line" | "radar">("line")



    useEffect(() => {
        setStudent({
            id: Number.parseInt(studentId),
            full_name: "Nguyễn Văn An",
            date_of_birth: "2011-03-15",
            gender: "Nam",
            parent_name: "Nguyễn Văn Bình",
            parent_phone: "0912345678",
            parent_email: "phuhuynh1@email.com",
            address: "123 Đường ABC, Quận 1, TP.HCM",
        })
        setSessions([
            {
                session_id: 1,
                session_date: "2024-01-15",
                topic: "Phân số",
                teacher_name: "Cô Nguyễn Thị Lan",
                attitude_rating: 4,
                enthusiasm_rating: 4,
                theory_rating: 5,
                practice_rating: 4,
                teacher_comments: "An đã có tiến bộ rõ rệt trong việc hiểu về phân số. Em làm bài khá nhanh và chính xác.",
            },
            {
                session_id: 2,
                session_date: "2024-01-12",
                topic: "Số thập phân",
                teacher_name: "Cô Nguyễn Thị Lan",
                attitude_rating: 5,
                enthusiasm_rating: 3,
                theory_rating: 5,
                practice_rating: 4,
                teacher_comments: "An rất tập trung trong buổi học hôm nay. Em hiểu bài rất tốt.",
            },
            {
                session_id: 3,
                session_date: "2024-01-10",
                topic: "Tính chất phép cộng",
                teacher_name: "Cô Nguyễn Thị Lan",
                attitude_rating: 3,
                enthusiasm_rating: 3,
                theory_rating: 4,
                practice_rating: 3,
                teacher_comments: "An cần tập trung hơn trong giờ học. Em hiểu bài nhưng còn mắc một số lỗi nhỏ.",
            },
            {
                session_id: 4,
                session_date: "2024-01-08",
                topic: "Phép nhân và chia",
                teacher_name: "Cô Nguyễn Thị Lan",
                attitude_rating: 4,
                enthusiasm_rating: 5,
                theory_rating: 4,
                practice_rating: 5,
                teacher_comments: "Em học rất tốt và nhiệt tình tham gia các hoạt động.",
            },
        ])
        setSelectedSession(null)
    }, [studentId])

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
            <div className=" grid lg:col-span-3 p-4 rounded-lg gap-4">
                <InfoStudentComponent student={student}></InfoStudentComponent>
                <ListStudentProgressComponent
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
                        <FormAddStudentProgressReport></FormAddStudentProgressReport>
                    </Modal>
                }
            </div>


        </div >
    </>)
}