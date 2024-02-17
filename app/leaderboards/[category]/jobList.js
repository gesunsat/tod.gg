"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { classLevel } from "@/mapleData/classLevel";
import { Fragment, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsDown, ChevronsUp } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LeaderboardsJobList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState({
        "job": searchParams.get("job") || "전체"
    });

    const jobSelectorHandler = (job) => {
        const updatedQuery = { ...searchQuery, "job": job };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "job" && updatedQuery[key] == "전체") params.delete(key);
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
    }

    const [fold, setFold] = useState(false);

    return (
        <>
            <div className={cn(
                "mt-2",
                fold ? "h-[320px]" : "h-[150px]"
            )}>
                <div className="relative h-full">
                    <div className="absolute h-full w-full">
                        <ScrollArea type={"always"} className="h-full" barColor="#7f7f7f">
                            <Tabs defaultValue={"전체"} value={searchQuery.job}>
                                <TabsList className={`rounded-b-none justify-start w-full h-auto zoverflow-x-scroll gap-x-[10px] grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9`}>
                                    {
                                        ["전체", ...Object.keys(classLevel).sort()].map((job, jobIndex) => {
                                            if (job != "전체" && !classLevel[job]?.["6"]) return;

                                            return (
                                                <TabsTrigger
                                                    key={jobIndex}
                                                    value={job}
                                                    className="p-2 flex flex-col group"
                                                    onClick={() => jobSelectorHandler(job)}
                                                >
                                                    <div className="relative">
                                                        <Check
                                                            className="bg-opacity-75 dark:bg-opacity-75 bg-white dark:bg-black stroke-black dark:stroke-white absolute w-full h-full hidden group-data-[state=active]:block"
                                                        />
                                                        <Image
                                                            className="rounded aspect-square w-full h-auto"
                                                            src={
                                                                classLevel[job] ?
                                                                    `/job/${job}.png` :
                                                                    "/job/전체.png"
                                                            }
                                                            alt={job}
                                                            width={96}
                                                            height={96}
                                                            priority
                                                        />
                                                    </div>
                                                    <span className="text-xs lg:text-sm">{job}</span>
                                                </TabsTrigger>
                                            )
                                        })
                                    }
                                </TabsList>
                                <div className="h-[40px] bg-muted" />
                            </Tabs>
                        </ScrollArea>
                    </div>
                    <button
                        className={"absolute w-full bottom-0 p-2 bg-gradient-to-t from-background to-muted"}
                        onClick={() => setFold(!fold)}
                    >
                        <span className="h-[1.5em] flex justify-center">{fold ? <ChevronsUp /> : <ChevronsDown />}</span>
                    </button>
                </div>
            </div>
        </>
    )
}
