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

type FormData = {
    phoneNumber: string
    password: string
}

export default function LoginPage() {
    const [loginData, setLoginData] = useState<FormData>({ phoneNumber: "", password: "" })
    const [loginError, setLoginError] = useState<{ phoneNumber?: string; password?: string }>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const [phoneNumber, password] = [loginData.phoneNumber, loginData.password]
        let loginError: { phoneNumber?: string; password?: string } = {}

        const phoneNumberRegex = /^[0-9]{10}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            loginError.phoneNumber = "Số điện thoại phải có 10 chữ số"
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
        if (!passwordRegex.test(password)) {
            loginError.password =
                "Mật khẩu phải >=6 ký tự, có chữ hoa, chữ thường và số"
        }

        setLoginError(loginError)

        if (Object.keys(loginError).length === 0) {
            console.log("Form submitted:", { phoneNumber, password })
        }
    }

    return (
        <Card className="w-full max-w-md sm:max-w-sm lg:max-w-lg px-4 lg:px-8">
            <CardHeader>
                <CardTitle className="text-3xl font-semibold"> Đăng nhập</CardTitle>
                <CardDescription className="hidden sm:block">
                    Truy cập vào hệ thống quản lý lớp học
                </CardDescription>
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
                                onChange={e => setLoginData({ ...loginData, phoneNumber: e.target.value })}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                             {loginError.phoneNumber && <p className="px-2 text-sm text-red-500">{loginError.phoneNumber}</p>}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <Input
                                className="h-10"
                                id="password"
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                type="password"
                                placeholder="Nhập mật khẩu"
                                required />
                            {loginError.password && <p className="px-2 text-[13px] text-red-500">{loginError.password}</p>}
                        </div>
                    </div>
                    <div className="flex-col gap-2 mt-4">
                        <Button type="submit" className="w-full cursor-pointer">
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
