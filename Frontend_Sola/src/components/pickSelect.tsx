import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type SelectScrollableProps = {
    values?: string[]
    title: string
    value?: string
    onChange?: (value: string) => void
}

export function PickSelect({ values, title, value, onChange }: SelectScrollableProps) {
    return (
        <Select>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {values && values?.map((value) => (
                    <SelectItem key={value} value={value}>
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
