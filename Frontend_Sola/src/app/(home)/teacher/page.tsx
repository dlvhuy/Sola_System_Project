'use client'
import FormAddInfoStudent from "@/components/form/addInfoStudent";
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
                        <FormAddInfoStudent></FormAddInfoStudent>
                    </Modal>
                </div>
            }
        </div>
    )
}