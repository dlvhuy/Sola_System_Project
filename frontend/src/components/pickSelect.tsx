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

type Value = {
    name: string
    value: string
}
type SelectScrollableProps = {
    values?: Value[]
    title: string
    value?: string 
    onChange?: (value: string) => void
    disable?: boolean
}

export function PickSelect({ values, title, value, onChange, disable }: SelectScrollableProps) {
    return (
        <Select value={value} onValueChange={onChange} disabled={disable}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {values && values?.map((value) => (
                    <SelectItem key={value.value} value={value.value}>
                        {value.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
