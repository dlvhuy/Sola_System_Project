'use client'

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
import StudentComponent from "../../admin/component/studentComponent";
import Modal from "@/components/modal";
import FormAddInfoStudent from "@/components/form/addInfoStudent";
import AddStudentProgressReport from "@/components/form/addStudentProgressReport";

type Student = {
    id: number
    full_name: string
    date_of_birth: string
    gender: string
    parent_name: string
    parent_phone: string
    parent_email: string
    address: string
}
type SessionReview = {
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
    const [chartType, setChartType] = useState<"line" | "radar">("line")

    const openModalStudentInfo = (value: boolean) => {
        console.log(true)
    }

    const lineChartData = sessions
        .slice()
        .reverse()
        .map((session) => ({
            date: new Date(session.session_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
            "Thái độ": session.attitude_rating,
            "Sôi nổi": session.enthusiasm_rating,
            "Lý thuyết": session.theory_rating,
            "Thực hành": session.practice_rating,
        }))

    // Prepare data for radar chart (average of all sessions)
    const radarChartData = [
        {
            metric: "Thái độ",
            value: sessions.reduce((sum, s) => sum + s.attitude_rating, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Sôi nổi",
            value: sessions.reduce((sum, s) => sum + s.enthusiasm_rating, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Lý thuyết",
            value: sessions.reduce((sum, s) => sum + s.theory_rating, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Thực hành",
            value: sessions.reduce((sum, s) => sum + s.practice_rating, 0) / sessions.length,
            fullMark: 5,
        },
    ]


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
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center font-bold text-xl">
                            Thông tin Cơ bản
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                                <p className="font-medium">{student?.full_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    giới tính
                                </p>
                                <p className="font-medium">{student?.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Ngày sinh
                                </p>
                                <p className="font-medium">{student?.date_of_birth}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tên phụ huynh</p>
                                <p className="font-medium">{student?.parent_name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1 flex items-center">
                                    Số điện thoại
                                </p>
                                <p className="font-medium">{student?.parent_phone}</p>
                            </div>
                            <div className="md:col-span-1">
                                <p className="text-sm text-gray-600 mb-1 flex items-center">
                                    Địa chỉ thường trú
                                </p>
                                <p className="font-medium">{student?.address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lịch sử Buổi học và Đánh giá</CardTitle>
                        <CardDescription>Danh sách các buổi học đã diễn ra</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sessions.map((session) => (
                                <div
                                    key={session.session_id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedSession?.session_id === session.session_id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                        }`}
                                    onClick={() => setSelectedSession(session)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold">{session.topic}</h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(session.session_date).toLocaleDateString("vi-VN")} - {session.teacher_name}
                                            </p>
                                        </div>
                                        <Link href={`/teacher/students/${studentId}/reviews/${session.session_id}/edit`}>
                                            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                                <Edit className="w-4 h-4 mr-1" />
                                                Sửa
                                            </Button>
                                        </Link>
                                    </div>

                                    {selectedSession?.session_id === session.session_id && (
                                        <div className="mt-4 pt-4 border-t">
                                            <h5 className="font-medium mb-3">Chi tiết Đánh giá</h5>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Thái độ</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.attitude_rating)}`}>
                                                            {session.attitude_rating}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.attitude_rating)}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Sôi nổi</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.enthusiasm_rating)}`}>
                                                            {session.enthusiasm_rating}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.enthusiasm_rating)}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Lý thuyết</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.theory_rating)}`}>
                                                            {session.theory_rating}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.theory_rating)}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Thực hành</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.practice_rating)}`}>
                                                            {session.practice_rating}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.practice_rating)}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Nhận xét của giáo viên</p>
                                                <p className="text-sm bg-gray-50 p-3 rounded">{session.teacher_comments}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Biểu đồ Tiến trình Học tập</CardTitle>
                            <div className="flex space-x-2">
                                <Button
                                    variant={chartType === "line" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setChartType("line")}
                                >
                                    Đường
                                </Button>
                                <Button
                                    variant={chartType === "radar" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setChartType("radar")}
                                >
                                    Radar
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {chartType === "line" ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" style={{ fontSize: "12px" }} />
                                    <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Thái độ" stroke="#3b82f6" strokeWidth={2} />
                                    <Line type="monotone" dataKey="Sôi nổi" stroke="#10b981" strokeWidth={2} />
                                    <Line type="monotone" dataKey="Lý thuyết" stroke="#f59e0b" strokeWidth={2} />
                                    <Line type="monotone" dataKey="Thực hành" stroke="#ef4444" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={radarChartData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="metric" style={{ fontSize: "12px" }} />
                                    <PolarRadiusAxis domain={[0, 5]} />
                                    <Radar name="Điểm trung bình" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Thống kê Tổng quan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Tổng số buổi học</span>
                            <span className="font-semibold">{sessions.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Điểm TB Thái độ</span>
                            <span className="font-semibold">
                                {(sessions.reduce((sum, s) => sum + s.attitude_rating, 0) / sessions.length).toFixed(1)}/5
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Điểm TB Sôi nổi</span>
                            <span className="font-semibold">
                                {(sessions.reduce((sum, s) => sum + s.enthusiasm_rating, 0) / sessions.length).toFixed(1)}/5
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Điểm TB Lý thuyết</span>
                            <span className="font-semibold">
                                {(sessions.reduce((sum, s) => sum + s.theory_rating, 0) / sessions.length).toFixed(1)}/5
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Điểm TB Thực hành</span>
                            <span className="font-semibold">
                                {(sessions.reduce((sum, s) => sum + s.practice_rating, 0) / sessions.length).toFixed(1)}/5
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div >
    </>)
}