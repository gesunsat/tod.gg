"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { serverOpenList } from "@/mapleData/serverOpenList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LeaderboardsServerList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState({
        "server": searchParams.get("server") || "일반 전체"
    });

    const serverSelectorHandler = (server) => {
        const updatedQuery = { ...searchQuery, "server": server };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "date" && updatedQuery[key] == getYesterdayDate()) params.delete(key);
                else params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedPath);

        setSearchQuery(updatedQuery);
    };

    return (
        <Tabs defaultValue={"일반 전체"} value={searchQuery.server}>
            <TabsList className={`justify-start w-full h-auto zoverflow-x-scroll gap-x-[10px] grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8`}>
                <div className="col-span-full text-2xl ml-2 mb-2 font-semibold text-black dark:text-white">일반 월드</div>
                {
                    ["일반 전체", ...serverOpenList].map((server, serverIndex) => {
                        if (server.includes("리부트")) return;

                        return (
                            <TabsTrigger
                                key={serverIndex}
                                value={server}
                                className="px-1"
                                onClick={() => serverSelectorHandler(server)}
                            >
                                <div className="flex">
                                    {/* <Image
                            className="aspect-square w-[24px] h-[24px] mr-1.5"
                            src={serverIconImg[server] || "/serverIcon/all.png"}
                            alt={server}
                            width={14}
                            height={14}
                        /> */}
                                    <span className="text-sm lg:text-base">{server}</span>
                                </div>
                            </TabsTrigger>
                        )
                    })
                }

                <hr className="col-span-full w-[95%] h-1 mx-auto my-5 bg-neutral-400 dark:bg-neutral-600 border-0 rounded" />

                <div className="col-span-full text-2xl ml-2 mb-2 font-semibold text-black dark:text-white">리부트 월드</div>
                {
                    ["리부트 전체", ...serverOpenList].map((server, serverIndex) => {

                        if (server.includes("리부트")) {

                            return (
                                <TabsTrigger
                                    key={serverIndex}
                                    value={server}
                                    className="px-1"
                                    onClick={() => serverSelectorHandler(server)}
                                >
                                    <div className="flex">
                                        {/* <Image
                                className="aspect-square w-[24px] h-[24px] mr-1.5"
                                src={serverIconImg[server] || "/serverIcon/all.png"}
                                alt={server}
                                width={14}
                                height={14}
                            /> */}
                                        <span className="text-sm lg:text-base">{server}</span>
                                    </div>
                                </TabsTrigger>
                            )
                        }
                    })
                }

            </TabsList>
        </Tabs>
    )

}
