import { Label } from "../ui/label"
import { Input } from "../ui/input"
import DatePicker from "../datePicker"
import { Textarea } from "../ui/textarea"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { useState } from "react"



type CommentField = {
    Class: number,
    comment: string
}
type CommentFieldError = {
    Class?: number,
    comment: string
}

type InfoStudentProgressReport = {
    lesson: string,
    lessonDate: string,
    thinkingSkill: CommentField,
    attitude: CommentField,
    theorySkill: CommentField,
    practiceSkill: CommentField
}

const initialFormData: InfoStudentProgressReport = {
    lesson: "",
    lessonDate: "",
    thinkingSkill: {
        Class: 1,
        comment: ""
    },
    attitude: {
        Class: 1,
        comment: ""
    },
    theorySkill: {
        Class: 1,
        comment: ""
    },
    practiceSkill: {
        Class: 1,
        comment: ""
    },
}

type InfoStudentProgressReportError = {
    lesson?: string,
    lessonDate?: string,
    thinkingSkill?: CommentFieldError,
    attitude?: CommentFieldError,
    theorySkill?: CommentFieldError,
    practiceSkill?: CommentFieldError
}


export default function FormAddStudentProgressReport() {
    const [addInfoStudentProgressReportData, setAddInfoStudentProgressReportData] = useState<InfoStudentProgressReport>(initialFormData)
    const [addInfoStudentProgressReportDataError, setAddInfoStudentProgressReportDataError] = useState<InfoStudentProgressReportError>({})
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { lesson, lessonDate, thinkingSkill, attitude, theorySkill, practiceSkill } = addInfoStudentProgressReportData
        let addInfoStudentProgressReportDataError: InfoStudentProgressReportError = {}

        const lessonRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ0-9\s]+$/
        if (!lessonRegex.test(lesson)) {
            addInfoStudentProgressReportDataError.lesson = "Tên buổi học không hợp lệ"
        }

        if (new Date(lessonDate) > new Date()) {
            addInfoStudentProgressReportDataError.lessonDate = "Ngày học không hợp lệ"
        }

        if (!thinkingSkill.comment || thinkingSkill.comment === "") {
            addInfoStudentProgressReportDataError.thinkingSkill = {
                ...addInfoStudentProgressReportDataError.thinkingSkill,
                comment: "Nhận xét tư duy không được để trống"
            };
        }


        if (!attitude.comment || attitude.comment === "") {
            addInfoStudentProgressReportDataError.attitude = {
                ...addInfoStudentProgressReportDataError.attitude,
                comment: "Nhận xét thái độ không được để trống"
            };
        }

        if (!theorySkill.comment || theorySkill.comment === "") {
            addInfoStudentProgressReportDataError.theorySkill = {
                ...addInfoStudentProgressReportDataError.theorySkill,
                comment: "Nhận xét lý thuyết không được để trống"
            };
        }

        if (!practiceSkill.comment || practiceSkill.comment === "") {
            addInfoStudentProgressReportDataError.practiceSkill = {
                ...addInfoStudentProgressReportDataError.practiceSkill,
                comment: "Nhận xét thực hành không được để trống"
            };
        }

        setAddInfoStudentProgressReportDataError(addInfoStudentProgressReportDataError)

        if (Object.keys(addInfoStudentProgressReportDataError).length === 0) {
            console.log("Form submitted:", { addInfoStudentProgressReportData })
        }

    }

    const updateNestedField = (
        parentKey: keyof typeof addInfoStudentProgressReportData,
        fieldKey: string,
        newValue: any
    ) => {
        setAddInfoStudentProgressReportData((prev) => ({
            ...prev,
            [parentKey]: {
                ...(typeof prev[parentKey] === "object" && prev[parentKey] !== null ? prev[parentKey] : {}),
                [fieldKey]: newValue,
            },
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-[1000px]">
            <div className="flex flex-col gap-2 my-2">
                <div className="flex gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Chủ đề buổi học</Label>
                        <Input
                            className="h-10 w-60"
                            id="nameStudent"
                            type="text"
                            value={addInfoStudentProgressReportData.lesson}
                            onChange={e => setAddInfoStudentProgressReportData({ ...addInfoStudentProgressReportData, lesson: e.target.value })}
                            placeholder="Ví dụ: Lập trình cơ bản"
                            required
                        />
                        {addInfoStudentProgressReportDataError.lesson && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.lesson}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="birthDay">Ngày học</Label>
                        <DatePicker
                            className="w-40"
                            value={addInfoStudentProgressReportData.lessonDate ? new Date(addInfoStudentProgressReportData.lessonDate) : undefined}
                            onChange={(date) => setAddInfoStudentProgressReportData({ ...addInfoStudentProgressReportData, lessonDate: date ? date.toISOString() : "" })}
                        />
                        {addInfoStudentProgressReportDataError.lessonDate && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.lessonDate}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">

                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Tư duy</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="thinkingSkill"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[addInfoStudentProgressReportData.thinkingSkill.Class]}
                                    onValueChange={(value) => updateNestedField("thinkingSkill", "Class", value[0])}

                                    className="w-full "
                                />
                                <div className="flex mt-2 justify-between text-xs text-gray-500">
                                    <span>1 - Cần cải thiện</span>
                                    <span>5 - Xuất sắc</span>
                                </div>
                            </div>
                            <div>
                                Xuất xắc
                            </div>
                        </div>
                        <Textarea
                            placeholder="Nhập nhận xét"
                            value={addInfoStudentProgressReportData.thinkingSkill.comment}
                            onChange={(e) => updateNestedField("thinkingSkill", "comment", e.target.value)}
                            className=""
                        />
                        <div className="min-h-[20px]">
                            {addInfoStudentProgressReportDataError.thinkingSkill?.comment && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.thinkingSkill?.comment}</p>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Thái độ</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="attitude"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[addInfoStudentProgressReportData.attitude.Class]}
                                    onValueChange={(value) => updateNestedField("attitude", "Class", value[0])}
                                    className="w-full"
                                />
                                <div className="flex mt-2 justify-between text-xs text-gray-500">
                                    <span>1 - Cần cải thiện</span>
                                    <span>5 - Xuất sắc</span>
                                </div>
                            </div>
                            <div>
                                Xuất xắc
                            </div>
                        </div>
                        <Textarea
                            placeholder="Nhập nhận xét"
                            value={addInfoStudentProgressReportData.attitude.comment}
                            onChange={(e) => updateNestedField("attitude", "comment", e.target.value)}
                            className=""
                        />
                        <div className="min-h-[20px]">
                            {addInfoStudentProgressReportDataError.attitude?.comment && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.attitude?.comment}</p>}
                        </div>

                    </div>
                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Lý thuyết</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="theorySkill"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[addInfoStudentProgressReportData.theorySkill.Class]}
                                    onValueChange={(value) => updateNestedField("theorySkill", "Class", value[0])}
                                    className="w-full my-2"
                                />
                                <div className="flex mt-2 justify-between text-xs text-gray-500">
                                    <span>1 - Cần cải thiện</span>
                                    <span>5 - Xuất sắc</span>
                                </div>
                            </div>
                            <div>
                                Xuất xắc
                            </div>
                        </div>
                        <Textarea
                            value={addInfoStudentProgressReportData.theorySkill.comment}
                            onChange={(e) => updateNestedField("theorySkill", "comment", e.target.value)}
                            placeholder="Nhập nhận xét"
                            className=""
                        />
                        <div className="min-h-[20px]">
                            {addInfoStudentProgressReportDataError.theorySkill?.comment && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.theorySkill?.comment}</p>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Thực hành</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="practiceSkill"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[addInfoStudentProgressReportData.practiceSkill.Class]}
                                    onValueChange={(value) => updateNestedField("theorySkill", "Class", value[0])}
                                    className="w-full my-2"
                                />
                                <div className="flex mt-2 justify-between text-xs text-gray-500">
                                    <span>1 - Cần cải thiện</span>
                                    <span>5 - Xuất sắc</span>
                                </div>
                            </div>
                            <div>
                                Xuất xắc
                            </div>
                        </div>
                        <Textarea
                            rows={3}
                            maxLength={250}
                            value={addInfoStudentProgressReportData.practiceSkill.comment}
                            onChange={(e) => updateNestedField("practiceSkill", "comment", e.target.value)}
                            placeholder="Nhập nhận xét"
                            className="resize-none max-h-[80px] overflow-x-scroll scro"
                        />
                        <div className="min-h-[20px]">
                            {addInfoStudentProgressReportDataError.practiceSkill?.comment && <p className="px-2 text-sm text-red-500">{addInfoStudentProgressReportDataError.practiceSkill?.comment}</p>}
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Button
                    className="cursor-pointer"
                    type="submit"
                > Lưu báo báo học tập </Button>
            </div>
        </form>
    )
}