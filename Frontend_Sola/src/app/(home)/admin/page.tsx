'use client'
import FormAddInfoStudent from "@/components/form/addInfoStudent";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function AdminPage() {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleSetOpenModal = (data: boolean) => {
        setIsOpenModal(data);
    };


    return (
        <Card className="my-4 p-4 border-0 shadow-none ">
            <div className="flex gap-2 ">
                <Button variant="link"  className="w-[100px] cursor-pointer font-bold">
                    Giáo viên
                </Button>
                <Button variant="link" className="w-[100px] cursor-pointer font-bold">
                    Học sinh
                </Button>
            </div>
            <div className="grid lg:grid-cols-3 gap-4  md:*:grid-cols-1 sm:grid-cols-1">
                <div className=" grid lg:col-span-2 p-4 rounded-lg ">
                    <div className="flex justify-between">
                        <div className="max-w-[80%]" >
                            <h1 className="text-2xl font-bold mb-4">Danh sách học viên</h1>
                        </div>
                        <div>
                            <Button className="cursor-pointer" onClick={() => setIsOpenModal(true)}>
                                Thêm thông tin học sinh
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
            </div>

            {
                isOpenModal && 
                    <Modal sendOpenModal={handleSetOpenModal} title="Thêm thông tin học sinh">
                        <FormAddInfoStudent></FormAddInfoStudent>
                    </Modal>
                
            }
        </Card>
    )
}