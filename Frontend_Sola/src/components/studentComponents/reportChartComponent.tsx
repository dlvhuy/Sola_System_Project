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
import { SessionReview } from "../../app/(home)/admin/student/[id]/page";
import { useEffect, useState } from "react";


export default function ReportChartComponent({
    chartType,
    sessions,
    handleSetChartType }: {
        chartType: "line" | "radar",
        handleSetChartType: (value: "line" | "radar") => void,
        sessions: SessionReview[]
    }) {

    const [lineChartData, setLineChartData] = useState<{
        date: string;
        "Th\u00E1i \u0111\u1ED9": number;
        "S\u00F4i n\u1ED5i": number;
        "L\u00FD thuy\u1EBFt": number;
        "Th\u1EF1c h\u00E0nh": number;
    }[]>([])

    const [radarChartData, setRadarChartData] = useState<{
        metric: string,
        value: number,
        fullMark: number,
    }[]>()

    useEffect(() => {
        if (sessions.length == 0)
            return

        setLineChartData(sessions
            .slice()
            .reverse()
            .map((session) => ({
                date: new Date(session.date_lession).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
                "Thái độ": session.class_attitude,
                "Sôi nổi": session.class_thinking_skill,
                "Lý thuyết": session.class_theory_skill,
                "Thực hành": session.class_practice_skill,
            })))
        setRadarChartData([
        {
            metric: "Thái độ",
            value: sessions.reduce((sum, s) => sum + s.class_attitude, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Sôi nổi",
            value: sessions.reduce((sum, s) => sum + s.class_thinking_skill, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Lý thuyết",
            value: sessions.reduce((sum, s) => sum + s.class_theory_skill, 0) / sessions.length,
            fullMark: 5,
        },
        {
            metric: "Thực hành",
            value: sessions.reduce((sum, s) => sum + s.class_practice_skill, 0) / sessions.length,
            fullMark: 5,
        },
    ])
    }, [sessions])

    return (<Card>
        <CardHeader>
            <div className="flex flex-col justify-between gap-2">
                <CardTitle>Biểu đồ Tiến trình Học tập</CardTitle>
                <div className="flex space-x-2">
                    <Button
                        className="cursor-pointer"
                        variant={chartType === "line" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetChartType("line")}
                    >
                        Đường
                    </Button>
                    <Button
                        className="cursor-pointer"
                        variant={chartType === "radar" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetChartType("radar")}
                    >
                        Radar
                    </Button>
                </div>
            </div>
        </CardHeader>
        {sessions.length != 0 ? <CardContent>
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
        </CardContent> :
            <div className="flex justify-center">
                <p>Chưa có buổi học nào</p>
            </div>
        }

    </Card>)
}