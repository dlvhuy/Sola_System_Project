import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { useState } from "react"
import DatePicker from "../datePicker"
import { PickSelect } from "../pickSelect"
import AddressPicker from "../addressPicker"
import { Button } from "../ui/button"

type Teacher = {
    name: string
    birthDay: string
    gender: string
    phoneNumber: string
    email: string
    address: {
        detailAddress: string
        province: string
        ward: string
    }
}


const initialFormData: Teacher = {
    name: "",
    birthDay: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: {
        detailAddress: "",
        province: "",
        ward: ""
    }

}

type InfoTeacherError = {
    name?: string
    birthDay?: string
    gender?: string
    phoneNumber?: string
    email?: string
    address?: {
        detailAddress?: string
        province?: string
        ward?: string
    }
}

export default function FormAddInfoTeacher() {

    const [addInfoTeacherData, setAddInfoTeacherData] = useState<Teacher>(initialFormData)
    const [addInfoTeacherDataError, setAddInfoTeacherDataError] = useState<InfoTeacherError>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { name, birthDay, gender, phoneNumber, email, address } = addInfoTeacherData
        let infoTeacherError: InfoTeacherError = {}

        const nameTeacherRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ\s]+$/
        if (!nameTeacherRegex.test(name)) {
            infoTeacherError.name = "Tên giáo viên không hợp lệ"
        }

        const genderOptions = ["Nam", "Nữ"]

        if (!genderOptions.includes(gender)) {
            infoTeacherError.gender = "Giới tính phải là Nam hoặc Nữ"
        }

        if (new Date(birthDay) > new Date()) {
            infoTeacherError.birthDay = "Ngày sinh không hợp lệ"
        }

        const phoneNumberRegex = /^[0-9]{10}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            infoTeacherError.phoneNumber = "Số điện thoại phải là số và có 10 ký tự"
        }

        const detailAddressRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ0-9\s]+$/
        if (!detailAddressRegex.test(address.detailAddress)) {
            infoTeacherError.address = {
                ...infoTeacherError.address,
                detailAddress: "Dịa chỉ không hợp lệ"
            }
        }
        setAddInfoTeacherDataError(infoTeacherError)

        if (Object.keys(infoTeacherError).length === 0) {
            console.log("Form submitted:", { addInfoTeacherData })
        }

    }

    const handleAddressChange = (address: { Province: string; Ward: string }) => {
        setAddInfoTeacherData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                province: address.Province,
                ward: address.Ward
            }
        }));
    };

    const handleDetailAddressChange = (value: string) => {
        setAddInfoTeacherData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                detailAddress: value
            }
        }));
    }

    // const handleChange = (section: "Teacher" | "parent", field: string, value: string) => {
    //     setAddInfoTeacherData((prev) => ({
    //         ...prev,
    //         [section]: {
    //             ...prev[section],
    //             [field]: value
    //         }
    //     }))
    // }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 my-4">

                <div className="grid gap-2">
                    <Label htmlFor="teacherName">Tên giáo viên</Label>
                    <Input
                        className="h-10"
                        id="teacherName"
                        type="text"
                        onChange={e => setAddInfoTeacherData({ ...addInfoTeacherData, name: e.target.value })}
                        placeholder="Nhập tên giáo viên"
                        required
                    />
                    {addInfoTeacherDataError.name && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.name}</p>}
                </div>
                <div className="flex gap-4 justify-between">

                    <div className="grid gap-2">
                        <Label htmlFor="birthDay">Ngày sinh</Label>
                        <DatePicker
                            className="w-60"
                            value={addInfoTeacherData.birthDay ? new Date(addInfoTeacherData.birthDay) : undefined}
                            onChange={(date) => setAddInfoTeacherData({ ...addInfoTeacherData, birthDay: date ? date.toISOString() : "" })}
                        />
                        {addInfoTeacherDataError.birthDay && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.birthDay}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Giới tính</Label>
                        < PickSelect
                            value={addInfoTeacherData.gender}
                            title="Chọn giới tính"
                            values={[{ name: "Nam", value: "Nam" }, { name: "Nữ", value: "Nữ" }]}
                            onChange={(e) => setAddInfoTeacherData({ ...addInfoTeacherData, gender: e })}
                        />
                        {addInfoTeacherDataError.gender && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.gender}</p>}
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    className="h-10"
                    id="email"
                    type="email"
                    onChange={e => setAddInfoTeacherData({ ...addInfoTeacherData, email: e.target.value })}
                    placeholder="Nhập email"
                    required
                />
                {addInfoTeacherDataError.email && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.email}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                    className="h-10"
                    id="phoneNumber"
                    type="phoneNumber"
                    onChange={e => setAddInfoTeacherData({ ...addInfoTeacherData, phoneNumber: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    required
                />
                {addInfoTeacherDataError.phoneNumber && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.phoneNumber}</p>}
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
                    disabled={!addInfoTeacherData.address.ward}
                />
                {addInfoTeacherDataError.address?.detailAddress && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.address?.detailAddress}</p>}
            </div>

            <div className="flex-col gap-2 mt-6">
                <Button type="submit" className="w-full cursor-pointer">
                    Thêm thông tin giáo viên
                </Button>
            </div>
        </form>)
}