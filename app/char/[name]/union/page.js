export default async function Union({ params }) {

    return (
        <>
            <div className="bg-muted p-2 rounded-md shadow-md">
                <div className="basis-full lg:basis-1/2 bg-background rounded">
                    <div className="grid grid-cols-2 divide-x-0 lg:divide-x-2 divide-y-2 lg:divide-y-0">
                        <div className="col-span-2 lg:col-span-1 flex px-3 lg:px-8 py-3">
                            <div className="self-center text-2xl font-semibold">
                                유니온
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col items-end">
                                <div className="flex gap-2">
                                    <span>종합 랭킹</span>
                                    <span>1 위</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>직업 랭킹 </span>
                                    <span>1 위</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 flex px-3 lg:px-8 py-3">
                            <div className="self-center text-2xl font-semibold">
                                {/* {character.characterBasic.world_name} 서버 */}
                                유니온
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col items-end">
                                <div className="flex gap-2">
                                    <span>종합 랭킹</span>
                                    <span>1 위</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>직업 랭킹 </span>
                                    <span>1 위</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





                <div className={"grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5"}>
                </div>
            </div>
        </>
    )
}