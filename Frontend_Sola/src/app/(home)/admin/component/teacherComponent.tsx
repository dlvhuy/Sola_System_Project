import { Button } from "@/components/ui/button";

type TeacherComponentProps = {
  openModalTeacherInfo: (value: boolean) => void
}

export default function TeacherComponent({openModalTeacherInfo}:TeacherComponentProps){
    return( <div className="grid lg:grid-cols-3 gap-4  md:*:grid-cols-1 sm:grid-cols-1">
                <div className=" grid lg:col-span-2 p-4 rounded-lg ">
                    <div className="flex justify-between">
                        <div className="max-w-[80%]" >
                            <h1 className="text-2xl font-bold mb-4">Danh sách giáo viên</h1>
                        </div>
                        <div>
                            <Button className="cursor-pointer" onClick={() => openModalTeacherInfo(true)}>
                                Thêm thông tin giáo viên
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="border-2 p-4 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Trang Quản Trị Viên</h1>
                    <p>Chào mừng bạn đến với trang quản trị viên. Tại đây bạn có thể quản lý hệ thống.</p>
                </div>
                <div className="border-2 p-4 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Trang Quản Trị Viên</h1>
                    <p>Chào mừng bạn đến với trang quản trị viên. Tại đây bạn có thể quản lý hệ thống.</p>
                </div>
            </div>)
}