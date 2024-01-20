import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";

export async function generateMetadata({ params }) {
  try {
    const guildID = await getGuildID(decodeURI(params.worldName), decodeURI(params.guildName));
    if (!guildID?.oguild_id) {
      return {
        title: "길드 정보 | TOD.GG",
        description: "길드가 존재하지 않거나 불러올 수 없는 길드입니다.",
      }
    }

    const guildBasic = await getGuildBasic(guildID.oguild_id);
    if (!guildBasic?.guild_name) {
      return {
        title: "길드 정보 | TOD.GG",
        description: "길드가 존재하지 않거나 불러올 수 없는 길드입니다.",
      }
    }

    return {
      title: `#${guildBasic.guild_name} #${guildBasic.world_name} 길드 정보 | TOD.GG`,
      description:
        `마스터:${guildBasic.guild_master_name} | ` +
        `레벨:${guildBasic.guild_level} | ` +
        `인원:${guildBasic.guild_member_count}`,
      openGraph: {
        url: `https://tod.gg/guild/${guildBasic.world_name}/${guildBasic.guild_name}`,
        title: `#${guildBasic.guild_name} #${guildBasic.world_name} 길드 정보 | TOD.GG`,
        description:
          `마스터:${guildBasic.guild_master_name} | ` +
          `레벨:${guildBasic.guild_level} | ` +
          `인원:${guildBasic.guild_member_count}`,
      }
    }
  } catch (err) {
    console.log(err);
    return {
      title: "길드 정보 | TOD.GG",
      description: "길드가 존재하지 않거나 불러올 수 없는 길드입니다.",
    }
  }
}

export default function GuildLayout({ params, children }) {
  return (
    <>
      {children}
    </>
  );
}
