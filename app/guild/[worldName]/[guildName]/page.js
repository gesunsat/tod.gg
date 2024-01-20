import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import GuildHeader from "./header";
import { getRankingGuild } from "@/lib/nexonAPI/getRankingGuild";
import GuildMembers from "./members";

export default async function GuildPage({ params }) {
  const worldName = decodeURI(params.worldName);
  const guildName = decodeURI(params.guildName);
  const guildID = await getGuildID(worldName, guildName);
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
  const guildRankingFlag = await getRankingGuild(1, worldName, 1, guildName);
  const guildRankingSuro = await getRankingGuild(2, worldName, 1, guildName);

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
