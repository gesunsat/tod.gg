

import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import GuildHeader from "./header";
import Temp from "./temp";
import { getRankingGuildOne } from "@/lib/nexonAPI/getRankingGuildOne";
import GuildMembers from "./members";

export default async function GuildInfo(props) {
    const guildID = await getGuildID(props.worldName, props.guildName);
    if (!guildID?.oguild_id) {
        return (
            <div className="text-center my-64">
                <div>존재하지 않거나 불러올 수 없는 길드입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
            </div>
        )
    }

    const guildBasic = await getGuildBasic(guildID.oguild_id);
    if (!guildBasic?.guild_name) {
        return (
            <div className="text-center my-64">
                <div>존재하지 않거나 불러올 수 없는 길드입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
            </div>
        )
    }
    const guildRankingFlag = await getRankingGuildOne(props.worldName, props.guildName, 1);
    const guildRankingSuro = await getRankingGuildOne(props.worldName, props.guildName, 2);

    // console.log(guildBasic);

    return (
        <>
            <GuildHeader guildBasic={guildBasic} guildRankingFlag={guildRankingFlag} guildRankingSuro={guildRankingSuro} />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-2 p-2">
                <GuildMembers guildBasic={guildBasic} guildID={guildID} />
            </div>
            {/* <Temp guildBasic={guildBasic} guildRankingFlag={guildRankingFlag} guildRankingSuro={guildRankingSuro} /> */}
        </>
    );
}
