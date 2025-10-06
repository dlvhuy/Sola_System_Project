import FormAddInfoStudent from "@/components/form/addInfoStudent";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import StudentComponent from "./studentComponent";
import TeacherComponent from "./teacherComponent";
import FormAddInfoTeacher from "@/components/form/addInfoTeacher";




export default function LayoutComponent() {
    const [active, setActive] = useState<"student" | "teacher">("student")
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleSetOpenModal = (data: boolean) => {
        setIsOpenModal(data);
    };

    const handChangeStudentOrTeacher = (value: "student" | "teacher") =>{
        setActive(value)
        setIsOpenModal(false)
    }

    return (
        <Card className="my-4 p-4 border-0 shadow-none flex gap-2">
            <div className="flex gap-2 ">
                <Button
                    variant="link"
                    className={`w-[100px] cursor-pointer ${active === "teacher" ? "font-bold" : ""}`}
                    onClick={() => handChangeStudentOrTeacher("teacher")}
                >
                    Giáo viên
                </Button>
                <Button
                    variant="link"
                    className={`w-[100px] cursor-pointer ${active === "student" ? "font-bold" : ""}`}
                    onClick={() => handChangeStudentOrTeacher("student")}
                >
                    Học sinh
                </Button>
            </div>
            {
                active === "student" ?
                    <div>
                        <StudentComponent openModalStudentInfo={handleSetOpenModal} ></StudentComponent>
                        {
                            isOpenModal &&
                            <Modal sendOpenModal={handleSetOpenModal} title="Thêm thông tin học sinh">
                                <FormAddInfoStudent></FormAddInfoStudent>
                            </Modal>

                        }
                    </div>
                    :
                    <div>
                        <TeacherComponent openModalTeacherInfo={handleSetOpenModal} ></TeacherComponent>
                        {
                            isOpenModal &&
                            <Modal sendOpenModal={handleSetOpenModal} title="Thêm thông tin giáo viên">
                                <FormAddInfoTeacher></FormAddInfoTeacher>
                            </Modal>

                        }
                    </div>
            }
        </Card>
    )
}