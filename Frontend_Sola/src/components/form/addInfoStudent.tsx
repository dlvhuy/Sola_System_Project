"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import DatePicker from "../datePicker"
import { PickSelect } from "../pickSelect"
import { add } from "date-fns"
import AddressPicker from "../addressPicker"

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
        address:{
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
export default function FormAddInfoStudent() {

    const [addInfoStudentData, setAddInfoStudentData] = useState<FormData>(initialFormData)
    const [addInfoStudentDataError, setAddInfoStudentDataError] = useState<InfoStudentError>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { student, parent } = addInfoStudentData
        let infoStudentError: InfoStudentError = {}

        const nameStudentRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ\s]+$/
        if (!nameStudentRegex.test(student.nameStudent)) {
            infoStudentError.student = {
                ...infoStudentError.student,
                nameStudent: "Tên học sinh không hợp lệ"
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
                nameParent: "Tên phụ huynh không hợp lệ"
            }
        }

        const phoneNumberRegex = /^[0-9]{10}$/
        if (!phoneNumberRegex.test(parent.phoneNumber)) {
            infoStudentError.parent = {
                ...infoStudentError.parent,
                phoneNumber: "Tên phụ huynh không hợp lệ"
            }
        }

        if (parent.address.detailAddress.trim().length === 0) {
            infoStudentError.parent = {
                ...infoStudentError.parent?.address,
                address: {
                    ...infoStudentError.parent?.address,
                    detailAddress: "Địa chỉ không được để trống"
                }
            }
        }
        setAddInfoStudentDataError(infoStudentError)

        if (Object.keys(infoStudentError).length === 0) {
            console.log("Form submitted:", { student, parent })
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

    function handleAddressChange(field: keyof NonNullable<InfoStudentError["parent"]>["address"], value: string) {
        setAddInfoStudentData(prev => ({
            ...prev,
            parent: {
                ...prev.parent,
                address: {
                    ...prev.parent?.address,
                    [field]: value,
                }
            }
        }))
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
                    {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                </div>
                <div className="flex gap-4 justify-between">

                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Ngày sinh</Label>
                        <DatePicker
                            className="w-60"
                            value={addInfoStudentData.student.birthDay ? new Date(addInfoStudentData.student.birthDay) : undefined}
                            onChange={(date) => handleChange("student", "birthDay", date ? date.toISOString() : "")}
                        />
                        {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Giới tính</Label>
                        < PickSelect
                            value={addInfoStudentData.student.gender}
                            title="Chọn giới tính"
                            values={[{ name: "Nam", value: "Nam" }, { name: "Nữ", value: "Nữ" }]}
                            onChange={(e) => handleChange("student", "gender", e.toString())}
                        />
                        {/* {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>} */}
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
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <AddressPicker 
                        onChange={(value) => handleAddressChange("province", value.Province)}
                    />
                    <Input
                        className="h-10"
                        id="address"
                        type="text"
                        onChange={e => handleChange("parent", "address", e.target.value)}
                        placeholder="Nhập địa chỉ"
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