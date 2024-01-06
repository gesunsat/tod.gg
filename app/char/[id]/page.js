import CharacterInfo from '@/app/char/info'
import { getCharacterByName } from '@/lib/getCharacterByName';

export async function generateMetadata({ params }) {
  try {
    const character = await getCharacterByName(decodeURI(params.id));

    if (!character.characterBasic.character_class) {
      return {
        title: "캐릭터 정보 | TOD.GG",
        description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
      }
    }

    return {
      title: `${character.characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
      description:
        `${character.characterBasic.world_name} | ` +
        `${character.characterBasic.character_class} | ` +
        `Lv.${character.characterBasic.character_level} | ` +
        `길드:${character.characterBasic.character_guild_name ? character.characterBasic.character_guild_name + " | " : "- | "}` +
        `전투력:${character?.characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
        `${character?.userUnion?.union_level ? "유니온:" + character?.userUnion?.union_level : ""}`,
      openGraph: {
        images: character.characterBasic.character_image,
        url: `https://tod.gg/char/${params.id}`,
        title: `${character.characterBasic.character_name} 캐릭터 정보 | TOD.GG`,
        description:
          `${character.characterBasic.world_name} | ` +
          `${character.characterBasic.character_class} | ` +
          `Lv.${character.characterBasic.character_level} | ` +
          `길드:${character.characterBasic.character_guild_name ? character.characterBasic.character_guild_name + " | " : "- | "}` +
          `전투력:${character?.characterStat?.final_stat.reverse().map((stat) => { if (stat.stat_name == "전투력") return parseInt(stat.stat_value).toLocaleString() }).join('')} | ` +
          `${character?.userUnion?.union_level ? "유니온:" + character?.userUnion?.union_level : ""}`,
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

export default async function Char({ params }) {
  const character = await getCharacterByName(decodeURI(params.id));
  return (
    <>
      <CharacterInfo
        characterName={decodeURI(params.id)}
        character={character}
      />
    </>
  );
}
