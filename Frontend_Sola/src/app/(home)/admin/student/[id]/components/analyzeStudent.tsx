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
        </Card>)
}