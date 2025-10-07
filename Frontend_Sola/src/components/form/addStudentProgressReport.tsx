import { Label } from "../ui/label"
import { Input } from "../ui/input"
import DatePicker from "../datePicker"
import { Textarea } from "../ui/textarea"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"


export default function FormAddStudentProgressReport() {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const { name, birthDay, gender, phoneNumber, email, address } = addInfoTeacherData
        // let infoTeacherError: InfoTeacherError = {}

        // const nameTeacherRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ\s]+$/
        // if (!nameTeacherRegex.test(name)) {
        //     infoTeacherError.name = "Tên giáo viên không hợp lệ"
        // }

        // const genderOptions = ["Nam", "Nữ"]

        // if (!genderOptions.includes(gender)) {
        //     infoTeacherError.gender = "Giới tính phải là Nam hoặc Nữ"
        // }

        // if (new Date(birthDay) > new Date()) {
        //     infoTeacherError.birthDay = "Ngày sinh không hợp lệ"
        // }

        // const phoneNumberRegex = /^[0-9]{10}$/
        // if (!phoneNumberRegex.test(phoneNumber)) {
        //     infoTeacherError.phoneNumber = "Số điện thoại phải là số và có 10 ký tự"
        // }

        // const detailAddressRegex = /^[A-Za-zÀ-Ỹà-ỹĐđ0-9\s]+$/
        // if (!detailAddressRegex.test(address.detailAddress)) {
        //     infoTeacherError.address = {
        //         ...infoTeacherError.address,
        //         detailAddress: "Dịa chỉ không hợp lệ"
        //     }
        // }
        // setAddInfoTeacherDataError(infoTeacherError)

        // if (Object.keys(infoTeacherError).length === 0) {
        //     console.log("Form submitted:", { addInfoTeacherData })
        // }

    }

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
                            placeholder="Ví dụ: Lập trình cơ bản"
                            required
                        />
                        {/* {addInfoStudentDataError.student?.nameStudent && <p className="px-2 text-sm text-red-500">{addInfoStudentDataError.student?.nameStudent}</p>} */}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="birthDay">Ngày học</Label>
                        <DatePicker
                            className="w-40"
                        // value={addInfoTeacherData.birthDay ? new Date(addInfoTeacherData.birthDay) : undefined}
                        // onChange={(date) => setAddInfoTeacherData({ ...addInfoTeacherData, birthDay: date ? date.toISOString() : "" })}
                        />
                        {/* {addInfoTeacherDataError.birthDay && <p className="px-2 text-sm text-red-500">{addInfoTeacherDataError.birthDay}</p>} */}
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">

                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Tư duy</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="attitude"
                                    min={1}
                                    max={5}
                                    step={1}
                                    // value={[reviewData.attitude_rating]}
                                    // onValueChange={(value) => setReviewData({ ...reviewData, attitude_rating: value[0] })}
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
                            className=""
                        />
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
                                    // value={[reviewData.attitude_rating]}
                                    // onValueChange={(value) => setReviewData({ ...reviewData, attitude_rating: value[0] })}
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
                            className=""
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Lý thuyết</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="attitude"
                                    min={1}
                                    max={5}
                                    step={1}
                                    // value={[reviewData.attitude_rating]}
                                    // onValueChange={(value) => setReviewData({ ...reviewData, attitude_rating: value[0] })}
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
                            placeholder="Nhập nhận xét"
                            className=""
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="" htmlFor="comment">Thực hành</Label>
                        <div className="flex justify-between items-center gap-2">
                            <div className="w-[80%] px-2 my-2">
                                <Slider
                                    id="attitude"
                                    min={1}
                                    max={5}
                                    step={1}
                                    // value={[reviewData.attitude_rating]}
                                    // onValueChange={(value) => setReviewData({ ...reviewData, attitude_rating: value[0] })}
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
                            placeholder="Nhập nhận xét"
                            className="resize-none max-h-[80px] overflow-x-scroll scro" 
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Button className="cursor-pointer"> Lưu báo báo học tập </Button>
            </div>
        </form>
    )
}