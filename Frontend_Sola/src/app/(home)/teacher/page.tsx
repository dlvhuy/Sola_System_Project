'use client'
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TeacherPage() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

     const handleSetOpenModal = (data: boolean) => {
            setIsOpenModal(data);
    };

    return (
        <div>
            <button onClick={() => setIsOpenModal(true)}>Open Modal</button>
            {
                isOpenModal && <div className="bg-gray-100 min-h-screen p-4">
                    <Modal sendOpenModal={handleSetOpenModal}>
                        <Input placeholder="Type your message here..." className="w-full" />

                    </Modal>
                </div>
            }
        </div>
    )
}