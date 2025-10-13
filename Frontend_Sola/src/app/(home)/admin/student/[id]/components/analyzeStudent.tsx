import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionReview } from "../page";

export default function AnalyzeStudent({
    sessions }:
    {
        sessions: SessionReview[]
    }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Thống kê Tổng quan</CardTitle>
            </CardHeader>
            {
                sessions.length != 0 ? <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tổng số buổi học</span>
                    <span className="font-semibold">{sessions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Điểm TB Thái độ</span>
                    <span className="font-semibold">
                        {(sessions.reduce((sum, s) => sum + s.class_attitude, 0) / sessions.length).toFixed(1)}/5
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Điểm TB Sôi nổi</span>
                    <span className="font-semibold">
                        {(sessions.reduce((sum, s) => sum + s.class_thinking_skill, 0) / sessions.length).toFixed(1)}/5
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Điểm TB Lý thuyết</span>
                    <span className="font-semibold">
                        {(sessions.reduce((sum, s) => sum + s.class_theory_skill, 0) / sessions.length).toFixed(1)}/5
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Điểm TB Thực hành</span>
                    <span className="font-semibold">
                        {(sessions.reduce((sum, s) => sum + s.class_practice_skill, 0) / sessions.length).toFixed(1)}/5
                    </span>
                </div>
            </CardContent> :
            <div className="flex justify-center">
                <p>Chưa có buổi học nào</p>
            </div>
            }
            
        </Card>)
}