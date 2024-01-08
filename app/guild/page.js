import SearchGuild from "@/app/guild/searchGuild";
import IndexGuildList from "./indexGuildList";
import { Suspense } from "react";
import GuildListLoading from "./guildListLoading";

export default function GuildIndexPage({ searchParams }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <SearchGuild className={"w-auto lg:w-1/2 mx-5 lg:mx-auto my-20"} />
            {
                searchParams?.q &&
                <Suspense fallback={<GuildListLoading />}>
                    <IndexGuildList guildName={searchParams?.q || ""} />
                </Suspense>
            }
        </div>
    )
}