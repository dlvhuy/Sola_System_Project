"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type ForgetPasswordData = {
    phoneNumber: string
}

export default function LoginPage() {
    const [forgetPassWordData, setforgetPassWordData] = useState<ForgetPasswordData>({ phoneNumber: ""})
    const [forgetPassWordError, setforgetPassWordError] = useState<{ phoneNumber?: string}>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const [phoneNumber] = [forgetPassWordData.phoneNumber]
        let forgetPassWordError: { phoneNumber?: string} = {}

        const phoneNumberRegex = /^[0-9]{10}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            forgetPassWordError.phoneNumber = "Số điện thoại phải có 10 chữ số"
        }

        
        setforgetPassWordError(forgetPassWordError)

        if (Object.keys(forgetPassWordError).length === 0) {
            console.log("Form submitted:", { phoneNumber})
        }
    }

    return (
        <Card className="w-full max-w-md sm:max-w-sm lg:max-w-lg px-4 lg:px-8">
            <CardHeader>
                <CardTitle className="text-3xl font-semibold"> Quên mật khẩu</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Số điện thoại</Label>
                            <Input
                                className="h-10"
                                id="phoneNumber"
                                type="phoneNumber"
                                onChange={e => setforgetPassWordData({ ...forgetPassWordData, phoneNumber: e.target.value })}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                             {forgetPassWordData.phoneNumber && <p className="px-2 text-sm text-red-500">{forgetPassWordData.phoneNumber}</p>}
                        </div>
                    </div>
                    <div className="flex-col gap-2 mt-4">
                        <Button type="submit" className="w-full cursor-pointer">
                            Lấy mã xác nhận
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
