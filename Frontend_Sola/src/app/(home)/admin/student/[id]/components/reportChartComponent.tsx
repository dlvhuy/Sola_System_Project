import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { SessionReview } from "../page";


export default function ReportChartComponent({
    chartType,
    sessions,
    handleSetChartType }: {
        chartType: "line" | "radar",
        handleSetChartType: (value: "line" | "radar") => void,
        sessions: SessionReview[]
    }) {
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

    return (<Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>Biểu đồ Tiến trình Học tập</CardTitle>
                <div className="flex space-x-2">
                    <Button
                        variant={chartType === "line" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetChartType("line")}
                    >
                        Đường
                    </Button>
                    <Button
                        variant={chartType === "radar" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetChartType("radar")}
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
                        <Radar name="Điểm trung bình" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            )}
        </CardContent>
    </Card>)
}