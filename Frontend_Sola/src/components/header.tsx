import { Button } from "./ui/button";

export default function Header() {
    return (
       <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-xl font-semibold">Bảng điều khiển quản trị</h1>
                                <p className="text-sm text-gray-600">Chào mừng, Quản trị viên</p>
                            </div>
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