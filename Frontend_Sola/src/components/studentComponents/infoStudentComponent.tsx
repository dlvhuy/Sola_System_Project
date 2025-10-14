import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "../../app/(home)/admin/student/[id]/page";

export default function InfoStudentComponent({student}:{student:Student | null}) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center font-bold text-xl">
                    Thông tin Cơ bản
                </CardTitle>
            </CardHeader>
            <CardContent>   
                <div className="grid grid-cols-3   gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                        <p className="font-medium">{student?.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">
                            giới tính
                        </p>
                        <p className="font-medium">{student?.gender}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">
                            Ngày sinh
                        </p>
                        <p className="font-medium">{student?.birthday}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-1">Tên phụ huynh</p>
                        <p className="font-medium">{student?.nameParent}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-1 flex items-center">
                            Số điện thoại
                        </p>
                        <p className="font-medium">{student?.phoneNumber}</p>
                    </div>
                    <div className="md:col-span-1">
                        <p className="text-sm text-gray-600 mb-1 flex items-center">
                            Địa chỉ thường trú
                        </p>
                        <p className="font-medium">{student?.address}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    
        )
}