"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { serverIconImg } from "@/mapleData/serverIconImg";
import { serverOpenList } from "@/mapleData/serverOpenList";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LeaderboardsServerList({ rebootDivide }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = useParams();
    const defaultServer = rebootDivide ? "일반 전체" : "전체"
    const [searchQuery, setSearchQuery] = useState({
        "server": searchParams.get("server") || defaultServer
    });

    const serverSelectorHandler = (server) => {
        const updatedQuery = { ...searchQuery, "server": server };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "server" && updatedQuery[key] == defaultServer) params.delete(key);
                else params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });
        params.delete("page");
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedPath);

        setSearchQuery(updatedQuery);
    };

    if (rebootDivide) {
        return (
            <Tabs defaultValue={"일반 전체"} value={searchQuery.server}>
                <TabsList className={`justify-start w-full h-auto zoverflow-x-scroll gap-x-[10px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8`}>
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
                                        {
                                            serverIconImg[server] &&
                                            <Image
                                                className="w-auto h-[20px] lg:h-[24px] mr-1.5"
                                                src={serverIconImg[server]}
                                                alt={server}
                                                width={27}
                                                height={27}
                                            />
                                        }
                                        <span className="text-sm lg:text-base self-center">{server}</span>
                                    </div>
                                </TabsTrigger>
                            )
                        })
                    }

                    <hr className="col-span-full my-3" />
                    {/* <hr className="col-span-full w-[95%] h-1 mx-auto my-5 bg-neutral-400 dark:bg-neutral-600 border-0 rounded" /> */}

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
                                            {
                                                serverIconImg[server] &&
                                                <Image
                                                    className="w-auto h-[20px] lg:h-[24px] mr-1.5"
                                                    src={serverIconImg[server]}
                                                    alt={server}
                                                    width={27}
                                                    height={27}
                                                />
                                            }
                                            <span className="text-sm lg:text-base self-center">{server}</span>
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

    return (
        <Tabs defaultValue={"전체"} value={searchQuery.server}>
            <TabsList className={`justify-start w-full h-auto zoverflow-x-scroll gap-x-[10px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8`}>
                {
                    ["전체", ...serverOpenList].map((server, serverIndex) => {
                        return (
                            <TabsTrigger
                                key={serverIndex}
                                value={server}
                                className="px-1"
                                onClick={() => serverSelectorHandler(server)}
                            >
                                <div className="flex">
                                    {
                                        serverIconImg[server] &&
                                        <Image
                                            className="w-auto h-[20px] lg:h-[24px] mr-1.5"
                                            src={serverIconImg[server]}
                                            alt={server}
                                            width={27}
                                            height={27}
                                        />
                                    }
                                    <span className="text-sm lg:text-base self-center">{server}</span>
                                </div>
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>
        </Tabs>
    )
}
