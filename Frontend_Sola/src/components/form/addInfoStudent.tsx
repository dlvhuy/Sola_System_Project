"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import DatePicker from "../datePicker"
import { PickSelect } from "../pickSelect"
import { add } from "date-fns"

type Student = {
    nameStudent: string
    birthDay: string
    gender: string
}

type Parent = {
    nameParent: string
    phoneNumber: string
    address: string
}

type FormData = {
    student: Student
    parent: Parent
}

type ErrorDataOptional = Partial<{
    student: Partial<Student>
    parent: Partial<Parent>
}>

const initialFormData: FormData = {
    student: {
        nameStudent: "",
        birthDay: "",
        gender: ""
    },
    parent: {
        nameParent: "",
        phoneNumber: "",
        address: ""
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
        address?: string
    }
}
export default function FormAddInfoStudent() {

    const [addInfoStudentData, setAddInfoStudentData] = useState<FormData>(initialFormData)
    const [addInfoStudentDataError, setAddInfoStudentDataError] = useState<{
        student?: {
            nameStudent?: "",
            birthDay?: "",
            gender?: ""
        },
        parent?: {
            nameParent?: "",
            phoneNumber?: "",
            address?: ""
        }
    }>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { student, parent } = addInfoStudentData
        let infoStudentError: InfoStudentError = {}

        // const phoneNumberRegex = /^[0-9]{10}$/
        // if (!phoneNumberRegex.test(phoneNumber)) {
        //     loginError.phoneNumber = "Số điện thoại phải có 10 chữ số"
        // }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
        // if (!passwordRegex.test(password)) {
        //     loginError.password =
        //         "Mật khẩu phải >=6 ký tự, có chữ hoa, chữ thường và số"
        // }

        // setLoginError(loginError)

        // if (Object.keys(loginError).length === 0) {
        //     console.log("Form submitted:", { phoneNumber, password })
        // }
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

    return (

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div>
                    <h2>Học sinh</h2>
                </div>
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
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Ngày sinh</Label>
                    <DatePicker
                        onChange={(date) => handleChange("student", "birthDay", date ? date.toISOString() : "")}
                    />
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Giới tính</Label>
                    < PickSelect
                        value={addInfoStudentData.student.gender}
                        title="Chọn giới tính"
                        values={["Nam", "Nữ"]}
                        onChange={(e) => handleChange("student", "gender", e.toString())}
                    />
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div>
                    <h2>Phụ huynh</h2>
                </div>
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
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
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
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                </div>
            </div>
            <div className="flex-col gap-2 mt-4">
                <Button type="submit" className="w-full cursor-pointer">
                    Thêm thông tin học sinh
                </Button>
            </div>
        </form>

    )
}