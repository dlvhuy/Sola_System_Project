"use client";

import { use, useEffect, useState } from "react";
import { PickSelect } from "./pickSelect";
import { set } from "date-fns";


export default function AddressPicker({ onChange }:
    {
        onChange?: (address: {
            Province: string,
            Ward: string
        }) => void
    }) {

    const [provinces, setProvinces] = useState<any>(null);
    const [wards, setWards] = useState<any>(null);
    const [province, setProvince] = useState<string>("");
    const [ward, setWard] = useState<string>("");
    const [address, setAddress] = useState({ Province: "", Ward: "" });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://provinces.open-api.vn/api/v2/p", { cache: "no-store" });
            const data = await res.json();
            const result = data.map((item: any) => ({
                name: item.name,
                value: String(item.code)
            }));
            setProvinces(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (province !== "") {
            const fetchWards = async () => {
                const res = await fetch(
                    `https://provinces.open-api.vn/api/v2/p/${province}?depth=2`
                );
                const data = await res.json();
                const dataWards = data.wards;
                setAddress({ Province: data.name, Ward: "" });
                const result = dataWards.map((item: any) => ({
                    name: item.name,
                    value: String(item.code) // hoặc item.codename nếu bạn muốn
                }));
                setWards(result || []);
            };
            fetchWards();
        }
    }, [province]);

    useEffect(() => {
        onChange?.(address);
    }, [address]);

    const handleChangeProvinces = (value: string) => {
        setProvince(value);
        setWard("");

    }

    const handleChangeWards = (value: string) => {
        setWard(value);
        const selectedWard = wards.find((w: any) => w.value === value);
        setAddress((prev) => ({ ...prev, Ward: selectedWard ? selectedWard.name : "" }));

    }



    return (
        <div className="flex justify-between gap-4">
            <PickSelect
                value={province}
                values={provinces}
                title="Tỉnh/Thành phố"
                onChange={handleChangeProvinces}
            />
            <PickSelect
                value={ward}
                values={wards}
                title="Xã/Phường"
                onChange={handleChangeWards}
                disable={!province}
            />
        </div>
    );
}
