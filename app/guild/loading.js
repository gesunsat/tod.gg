import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <div className="rounded-lg">
                <Skeleton className="h-[520px] lg:h-[274px]"></Skeleton>
            </div>

            <div id="MobileRichMidaMargin" className="mt-3 lg:mt-0 w-full h-[230px] lg:h-0"></div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 mt-2">
                <Skeleton className="h-[44px]"></Skeleton>

                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3 lg:col-span-1 mt-2">
                        <Skeleton className="h-[44px]"></Skeleton>
                        <Skeleton className="h-[720px] lg:h-[440px] mt-2"></Skeleton>
                    </div>
                    <div className="col-span-3 lg:col-span-2 mt-2">
                        <Skeleton className="h-[1320px] lg:h-full"></Skeleton>
                    </div>
                </div>
            </div>
        </>
    )
}