'use client'
import Header from "@/components/header";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();


    return (
        <div className="bg-white shadow-sm ">
            {pathname.includes("admin") ?
                <Header isAdmin={true}></Header>
                :
                <Header isAdmin={false}></Header>

        }
            <div className="container mx-auto px-4 py-4">
                {children}
            </div>
        </div>
    )
}