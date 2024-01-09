import { Skeleton } from "@/components/ui/skeleton";
import MembersLoading from "./membersLoading";

export default function Loading() {
    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-4 lg:col-span-2">
                        <div className="rounded">
                            <Skeleton className="h-[520px] lg:h-[274px]"></Skeleton>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                        <div className="rounded">
                            <Skeleton className="h-[520px] lg:h-[274px]"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-2 p-2">
                <MembersLoading />
            </div>
        </>
    )
}