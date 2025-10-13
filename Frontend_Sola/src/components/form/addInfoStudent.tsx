"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import DatePicker from "../datePicker"
import { PickSelect } from "../pickSelect"
import AddressPicker from "../addressPicker"
import { studentApi } from "@/lib/api/student.api"

type Student = {
    nameStudent: string
    birthDay: string
    gender: string
}

type Parent = {
    nameParent: string
    phoneNumber: string
    address: {
        detailAddress: string
        province: string
        ward: string
    }
}

type FormData = {
    student: Student
    parent: Parent
}

const initialFormData: FormData = {
    student: {
        nameStudent: "",
        birthDay: "",
        gender: ""
    },
    parent: {
        nameParent: "",
        phoneNumber: "",
        address: {
            detailAddress: "",
            province: "",
            ward: ""
        }
    }
}

type InfoStudentError = {
    student?: {
        nameStudent?: string
        birthDay?: string
        gender?: string
    }
    parent?: {
        nameParent?: string
        phoneNumber?: string
        address?: {
            detailAddress?: string
            province?: string
            ward?: string
        }
    }
}
export default function FormAddInfoStudent({
    handleAddStudentIntoDataStudent
}: {
    handleAddStudentIntoDataStudent: (value: any) => void
}) {

    const [addInfoStudentData, setAddInfoStudentData] = useState<FormData>(initialFormData)
    const [addInfoStudentDataError, setAddInfoStudentDataError] = useState<InfoStudentError>({})

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { student, parent } = addInfoStudentData
        let infoStudentError: InfoStudentError = {}

        const nameStudentRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ\s]+$/
        if (!nameStudentRegex.test(student.nameStudent)) {
            infoStudentError.student = {
                ...infoStudentError.student,
                nameStudent: "Tên học sinh không được có chữ số"
            }
        }

        const genderOptions = ["Nam", "Nữ"]

        if (!genderOptions.includes(student.gender)) {
            infoStudentError.student = {
                ...infoStudentError.student,
                gender: "Giới tính phải là Nam hoặc Nữ"
            }
        }

        if (new Date(student.birthDay) > new Date()) {
            infoStudentError.student = {
                ...infoStudentError.student,
                birthDay: "Ngày sinh không hợp lệ"
            }
        }

        const nameparentRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ\s]+$/
        if (!nameparentRegex.test(parent.nameParent)) {
            infoStudentError.parent = {
                ...infoStudentError.parent,
                nameParent: "Tên phụ huynh không được có chữ số"
            }
        }

        const phoneNumberRegex = /^[0-9]{10}$/
        if (!phoneNumberRegex.test(parent.phoneNumber)) {
            infoStudentError.parent = {
                ...infoStudentError.parent,
                phoneNumber: "Số điện thoại phải là số và có 10 ký tự"
            }
        }

        const detailAddressRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ0-9\s]+$/
        if (!detailAddressRegex.test(parent.address.detailAddress)) {
            infoStudentError.parent = {
                ...infoStudentError.parent?.address,
                address: {
                    ...infoStudentError.parent?.address,
                    detailAddress: "Địa chỉ không hợp lệ"
                }
            }
        }
        setAddInfoStudentDataError(infoStudentError)

        if (Object.keys(infoStudentError).length === 0) {
            const data = {
                name: student.nameStudent,
                gender: student.gender,
                birthday: student.birthDay,
                nameParent: parent.nameParent,
                phoneNumber: parent.phoneNumber,
                address: parent.address.detailAddress + ", " + parent.address.ward + ", " + parent.address.province
            }
            const result = await studentApi.create(data)
            if (result.error) {
                alert(result.message)
                return
            }
            handleAddStudentIntoDataStudent(result.data)
            console.log("Form submitted:", result)

        }

    }

    const handleChange = (section: "student" | "parent", field: string, value: string) => {
        setAddInfoStudentData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleAddressChange = (address: { Province: string; Ward: string }) => {
        setAddInfoStudentData(prev => ({
            ...prev,
            parent: {
                ...prev.parent,
                address: {
                    ...prev.parent.address,
                    province: address.Province,
                    ward: address.Ward
                }
            }
        }));
    };

    const handleDetailAddressChange = (value: string) => {
        setAddInfoStudentData(prev => ({
            ...prev,
            parent: {
                ...prev.parent,
                address: {
                    ...prev.parent.address,
                    detailAddress: value
                }
            }
        }));
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 my-4">

                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Tên học sinh</Label>
                    <Input
                        className="h-10"
                        id="nameStudent"
                        type="text"
                        onChange={e => handleChange("student", "nameStudent", e.target.value)}
                        placeholder="Nhập tên học sinh"
                        required
                    />
                    {addInfoStudentDataError.student?.nameStudent && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.student?.nameStudent}</p>}
                </div>
                <div className="flex gap-4 justify-between">

                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Ngày sinh</Label>
                        <DatePicker
                            className="w-60"
                            value={addInfoStudentData.student.birthDay ? new Date(addInfoStudentData.student.birthDay) : undefined}
                            onChange={(date) => handleChange("student", "birthDay", date ? date.toISOString().split('T')[0] : "")}
                        />
                        {addInfoStudentDataError.student?.birthDay && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.student?.birthDay}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Giới tính</Label>
                        < PickSelect
                            value={addInfoStudentData.student.gender}
                            title="Chọn giới tính"
                            values={[{ name: "Nam", value: "Nam" }, { name: "Nữ", value: "Nữ" }]}
                            onChange={(e) => handleChange("student", "gender", e.toString())}
                        />
                        {addInfoStudentDataError.student?.gender && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.student?.gender}</p>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">

                <div className="grid gap-2">
                    <Label htmlFor="nameParent">Tên phụ huynh</Label>
                    <Input
                        className="h-10"
                        id="nameParent"
                        type="text"
                        onChange={e => handleChange("parent", "nameParent", e.target.value)}
                        placeholder="Nhập tên phụ huynh"
                        required
                    />
                    {addInfoStudentDataError.parent?.nameParent && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.parent?.nameParent}</p>}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                        className="h-10"
                        id="phoneNumber"
                        type="phoneNumber"
                        onChange={e => handleChange("parent", "phoneNumber", e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                    />
                    {addInfoStudentDataError.parent?.phoneNumber && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.parent?.phoneNumber}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <AddressPicker
                        onChange={handleAddressChange}
                    />
                    <Input
                        className="h-10"
                        id="detailAddress"
                        type="text"
                        onChange={e => handleDetailAddressChange(e.target.value)}
                        placeholder="Nhập địa chỉ"
                        required
                        disabled={!addInfoStudentData.parent.address.ward}
                    />
                    {addInfoStudentDataError.parent?.address?.detailAddress && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.parent?.address?.detailAddress}</p>}
                </div>
            </div>

            <div className="flex-col gap-2 mt-6">
                <Button type="submit" className="w-full cursor-pointer">
                    Thêm thông tin học sinh
                </Button>
            </div>
        </form>

    )
}