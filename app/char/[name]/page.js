import CharacterInfo from '@/app/char/[name]/info'
import { getCharBasic } from '@/lib/nexonAPI/getCharBasic';
import { getCharOCID } from '@/lib/nexonAPI/getCharOCID';
import { getCharStat } from '@/lib/nexonAPI/getCharStat';
import { getUserUnion } from '@/lib/nexonAPI/getUserUnion';

export async function generateMetadata({ params }) {
  try {
    const OCID = await getCharOCID(decodeURI(params.name));

    if (!OCID?.ocid) {
      return {
        title: "캐릭터 정보 | TOD.GG",
        description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
      }
    }

    const [characterBasic, characterStat, userUnion] = await Promise.all([
      getCharBasic(OCID.ocid),
      getCharStat(OCID.ocid),
      getUserUnion(OCID.ocid)
    ]);

    if (!characterBasic.character_class) {
      return {
        title: "캐릭터 정보 | TOD.GG",
        description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
      }
    }

    return {
      title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
      description:
        `${characterBasic.world_name} | ` +
        `${characterBasic.character_class} | ` +
        `Lv.${characterBasic.character_level} | ` +
        `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
        `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
        `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
      openGraph: {
        images: characterBasic.character_image,
        url: `https://tod.gg/char/${params.id}`,
        title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
        description:
          `${characterBasic.world_name} | ` +
          `${characterBasic.character_class} | ` +
          `Lv.${characterBasic.character_level} | ` +
          `길드:${characterBasic.character_guild_name ? characterBasic.character_guild_name + " | " : "- | "}` +
          `전투력:${characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
          `${userUnion?.union_level ? "유니온:" + userUnion?.union_level : ""}`,
      }
    }
  } catch (err) {
    console.log(err);
    return {
      title: "캐릭터 정보 | TOD.GG",
      description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
    }
  }
}

export default function CharPage({ params }) {
  return (
    <>
      <CharacterInfo characterName={decodeURI(params.name)} />
    </>
  );
}
