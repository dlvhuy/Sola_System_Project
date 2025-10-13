import FormAddInfoStudent from "@/components/form/addInfoStudent";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import StudentComponent from "./studentComponent";
import TeacherComponent from "./teacherComponent";
import FormAddInfoTeacher from "@/components/form/addInfoTeacher";
import { Filter, Pagination, Student } from "../student/[id]/page";
import { Teacher } from "@/lib/dataStudent";
import { studentApi } from "@/lib/api/student.api";
import { DynamicPagination } from "@/components/pagination";




export default function LayoutComponent() {
    const [active, setActive] = useState<"student" | "teacher">("student")
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [dataStudent, setDataStudent] = useState<Student[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [dataTeacher, setDataTeacher] = useState<Teacher[]>([])
    const [filter, setFilter] = useState<Filter>({ search: "", pagination: { currentPage: 1, totalPage: 0 } })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await studentApi.getAll(filter.search, filter.pagination.currentPage);
                setDataStudent(data.data.data);
                setFilter({
                    ...filter,
                    pagination: {
                        currentPage: data.data.currentPage,
                        totalPage: data.data.totalPages
                    }
                })

                console.log(data)
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu sinh viên:", error);
            }
        };

        fetchData();
    }, [filter.pagination.currentPage,filter.search]);


    useEffect(() => {
        const delay = setTimeout(() => {
            setFilter(prev => ({
                ...prev,
                search: searchValue,
            }))
        }, 500)

        return () => clearTimeout(delay)
    }, [searchValue])

    const handleAddStudentIntoDataStudent = (value: any) => {
        setDataStudent((prev) => ({ ...prev, value }));
    }

    const handleChangePagination = (value: number) => {
        setFilter({
            ...filter,
            pagination: {
                ...filter.pagination,
                currentPage: value,
            },
        })
    }
    const handleSetOpenModal = (data: boolean) => {
        setIsOpenModal(data);
    };

    const handChangeStudentOrTeacher = (value: "student" | "teacher") => {
        setActive(value)
        setIsOpenModal(false)
    }

    const handleOnChangeSearch = (value: string) => {
        setFilter({
            ...filter,
            search: value
        })
    }
    const handleOnChangeSearchData = (value:string) =>{
        setSearchValue(value)
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
                        <StudentComponent
                            dataSeachStudent={searchValue}
                            handleChangeDataStudent={handleOnChangeSearchData}
                            dataStudents={dataStudent}
                            openModalStudentInfo={handleSetOpenModal}>
                        </StudentComponent>
                        <DynamicPagination
                            currentPage={filter.pagination.currentPage}
                            totalPages={filter.pagination.totalPage}
                            handleChangePage={handleChangePagination}
                        ></DynamicPagination>
                        {
                            isOpenModal &&
                            <Modal sendOpenModal={handleSetOpenModal} title="Thêm thông tin học sinh">
                                <FormAddInfoStudent
                                    handleAddStudentIntoDataStudent={handleAddStudentIntoDataStudent}
                                />
                            </Modal>
                        }
                    </div>
                    :
                    <div>
                        <TeacherComponent openModalTeacherInfo={handleSetOpenModal}></TeacherComponent>
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
