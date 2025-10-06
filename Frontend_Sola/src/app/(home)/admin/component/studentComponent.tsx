import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { dataTeacher, Teacher } from "@/lib/dataTeacher";
import { createColumnHelper } from "@tanstack/react-table";

type StudnentComponentProps = {
    openModalStudentInfo: (value: boolean) => void
}

const collumnHelper = createColumnHelper<Teacher>()

const collumn = [
    collumnHelper.display({
        id: "action",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Selected all"
            >
            </Checkbox>
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selected all"
            ></Checkbox>
        )
    }),

    collumnHelper.accessor("name", {
        header: () => <p>Họ và tên</p>,
        cell: (info) => info.getValue(),
    }),

    collumnHelper.accessor("birthDay", {
        header: () => <p>Ngày sinh</p>,
        cell: (info) => info.getValue(),
    }),

    collumnHelper.accessor("gender", {
        header: () => <p>Giới tính</p>,
        cell: (info) => info.getValue(),
    }),

    collumnHelper.accessor("phoneNumber", {
        header: () => <p>Số điện thoại</p>,
        cell: (info) => info.getValue(),
    }),

    collumnHelper.accessor("email", {
        header: () => <p>Email</p>,
        cell: (info) => info.getValue(),
    }),

    collumnHelper.accessor("address", {
        header: () => <p>Địa chỉ</p>,
        cell: (info) => info.getValue(),
    }),
]

export default function StudentComponent({ openModalStudentInfo }: StudnentComponentProps) {
    return (<div className="grid lg:grid-cols-4 gap-4  md:*:grid-cols-1 sm:grid-cols-1">
        <div className=" grid lg:col-span-3 p-4 rounded-lg ">
            <div className="flex justify-between mb-3">
                <div className="max-w-[80%]" >
                    <h1 className="text-2xl font-bold mb-4">Danh sách học viên</h1>
                    <div className="w-[250px]">
                        <Input
                            placeholder="Tìm kiêm học sinh"
                        />
                    </div>
                </div>

                <div>
                    <Button className="cursor-pointer" onClick={() => openModalStudentInfo(true)}>
                        Thêm thông tin học sinh
                    </Button>

                </div>
            </div>
            <div>
                <DataTable<Teacher, any> columns={collumn} data={dataTeacher}></DataTable>
            </div>
        </div>
        <div className="border-2 p-4 rounded-lg max-h-[300px]">
            <h1 className="text-2xl font-bold mb-4">Thống kê</h1>
            <p>Số lượng giáo viên: ???</p>
            <p>Số lượng giáo viên đạt chuẩn: ???</p>
            <p>Số lượng giáo viên đạt chuẩn 2: ???</p>
        </div>

    </div>)
}