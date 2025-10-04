import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white shadow-sm ">
            <Header></Header>
            <div className="">
                {children}
            </div>
        </div>
    )
}