import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function MembersLoading() {
    return (
        <>
            <div className="grid grid-cols-4 gap-2 mt-2">
                {
                    Array(100).fill().map((member, memberIndex) => {
                        return (
                            <div key={memberIndex} className="col-span-4 lg:col-span-1">
                                <Skeleton className="py-5 rounded">
                                    <div className="h-[72px]"></div>
                                </Skeleton>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}