import { useState } from "react";
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import AddressPicker from "./addressPicker";

export default function Modal({ title, sendOpenModal, children }: {
        title:string
        sendOpenModal: (data: boolean) => void
        children?: React.ReactNode
    }){

    const sendOpenModalFalse = () => {
        sendOpenModal(false);
    }

    return (
        <div className="m-0 fixed inset-0 bg-black/50 flex items-center justify-center transition-all duration-600 ease-out opacity-0 translate-y-[-20px] animate-slide-down">
            <Card className="my-4 p-8 border-0 shadow-none min-w-[30%] ">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div>
                        <Button className="cursor-pointer" onClick={sendOpenModalFalse}>
                            Đóng
                        </Button>
                    </div>

                </div>
                {children}

            </Card>
        </div>

    )
}   