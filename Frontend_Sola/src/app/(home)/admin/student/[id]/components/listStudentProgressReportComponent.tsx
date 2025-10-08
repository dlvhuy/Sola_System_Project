import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Link } from "lucide-react";
import { SessionReview } from "../page";

export default function ListStudentProgressComponent({
    studentId,
    sessions,
    handleChangeSelectedSession,
    getRatingColor,
    selectedSession,
    handleSetOpenModal,
    getRatingBadge }: {
        studentId: string,
        sessions: SessionReview[]
        handleChangeSelectedSession?: (value: SessionReview | null) => void,
        getRatingColor: (rating: number) => string,
        selectedSession: SessionReview | null,
        getRatingBadge: (rating: number) => React.ReactElement
        handleSetOpenModal: (value: boolean) => void
    }) {


    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Lịch sử Buổi học và Đánh giá</CardTitle>
                    <CardDescription>Danh sách các buổi học đã diễn ra</CardDescription>
                </div>
                <div>
                    <Button
                        className="cursor-pointer"
                        onClick={() => handleSetOpenModal(true)}
                    >Thêm báo cáo</Button>
                </div>
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
                            onClick={() => handleChangeSelectedSession?.(session)}
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
        </Card>)
}