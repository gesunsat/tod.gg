import { Skeleton } from "@/components/ui/skeleton";

export default function GuildListLoading() {
    return (
        <>
            <div className="grid grid-cols-4 gap-2 p-2 mt-10">
                {
                    Array(12).fill().map((_, index) => {
                        return (
                            <div key={index} className="col-span-4 lg:col-span-1">
                                <Skeleton className="w-full h-16" />
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}