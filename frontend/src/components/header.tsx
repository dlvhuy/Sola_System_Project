import { is } from "date-fns/locale";
import { Button } from "./ui/button";

export default function Header({ isAdmin }: { isAdmin: boolean }) {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {
                            isAdmin ?
                                <div>
                                    <h1 className="text-xl font-semibold">Bảng điều khiển quản trị</h1>
                                    <p className="text-sm text-gray-600">Chào mừng, Quản trị viên</p>
                                </div>
                                :
                                <div>
                                    <h1 className="text-xl font-semibold">Chi tiết học sinh</h1>
                                    <p className="text-sm text-gray-600">Chào mừng, phụ huynh </p>
                                </div>
                            }
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" className="cursor-pointer" size="sm">
                            Cài đặt
                        </Button>
                        <Button variant="outline" className="cursor-pointer" size="sm">
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}