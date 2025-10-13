import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Link } from "lucide-react";
import { SessionReview } from "../page";
import { useEffect } from "react";

export default function ListStudentProgressComponent({
    isAdmin,
    studentId,
    sessions,
    handleChangeSelectedSession,
    getRatingColor,
    selectedSession,
    handleSetOpenModal,
    getRatingBadge }: {
        isAdmin: boolean
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
                    {isAdmin == true ?
                        <Button
                            className="cursor-pointer"
                            onClick={() => handleSetOpenModal(true)}
                        >Thêm báo cáo</Button>
                        :
                        <></>
                    }
                </div>
            </CardHeader>
            {sessions && sessions.length > 0 ? (
                <CardContent>
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div
                                key={session.ID}
                                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedSession?.ID === session.ID
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                    }`}
                                onClick={() => handleChangeSelectedSession?.(session)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold">{session.name_lession}</h4>
                                        <p className="text-sm text-gray-600">
                                            {new Date(session.date_lession).toLocaleDateString("vi-VN")} - {session.teacher_name}
                                        </p>
                                    </div>
                                    <Link href={`/teacher/students/${studentId}/reviews/${session.ID}/edit`}>
                                        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                            <Edit className="w-4 h-4 mr-1" />
                                            Sửa
                                        </Button>
                                    </Link>
                                </div>

                                {selectedSession?.ID === session.ID && (
                                    <div className="mt-4 pt-4 border-t">
                                        <h5 className="font-medium mb-3">Chi tiết Đánh giá</h5>
                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center justify-evenly">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Thái độ</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.class_attitude)}`}>
                                                            {session.class_attitude}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.class_attitude)}
                                                </div>
                                                <div className="w-[70%]">
                                                    <p className="text-sm p-3 rounded">{session.comment_attitude}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-evenly items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Sôi nổi</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.class_thinking_skill)}`}>
                                                            {session.class_thinking_skill}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.class_thinking_skill)}
                                                </div>
                                                <div className="w-[70%]">
                                                    <p className="text-sm p-3 rounded">{session.comment_thinking_skill}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-evenly items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Lý thuyết</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.class_theory_skill)}`}>
                                                            {session.class_theory_skill}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.class_theory_skill)}
                                                </div>

                                                <div className="w-[70%]">
                                                    <p className="text-sm p-3 rounded">{session.comment_theory_skill}</p>
                                                </div>

                                            </div>
                                            <div className="flex justify-evenly items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Thực hành</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-2xl font-bold ${getRatingColor(session.class_practice_skill)}`}>
                                                            {session.class_practice_skill}
                                                        </span>
                                                        <span className="text-gray-400">/5</span>
                                                    </div>
                                                    {getRatingBadge(session.class_practice_skill)}
                                                </div>
                                                <div className="w-[70%]">
                                                    <p className="text-sm p-3 rounded">{session.comment_theory_skill}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>

            ) : (

                <div className="flex justify-center items-center">
                    <p className="text-muted-foreground">Chưa có buổi học nào</p>
                </div>
            )}
            <CardContent>

            </CardContent>
        </Card>)
}