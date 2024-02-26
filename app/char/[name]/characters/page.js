import { getWorldCharacters } from "@/lib/todAPI/getWorldCharacters";
import { cn } from "@/lib/utils";
import { Swords, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NullCharacterIcon from "@/public/nullCharacter.png"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fragment } from "react";
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getRankingUnion } from "@/lib/nexonAPI/getRankingUnion";

export default async function Characters({ params, searchParams }) {
    const characterName = decodeURI(params.name);
    const selectedDate = searchParams?.date;
    const OCID = await getCharOCID(characterName);
    const rankingUnion = await getRankingUnion(OCID.ocid, selectedDate);
    let worldCharacters = await getWorldCharacters(rankingUnion?.ranking?.[0]?.world_name, rankingUnion?.ranking?.[0]?.character_name);

    const characters = [];
    const charactersInfo = [];
    worldCharacters = worldCharacters.sort((a, b) => {
        if (a.character_level > b.character_level) return -1;
        if (a.character_level < b.character_level) return 1;
        return 0;
    });
    worldCharacters?.map((character) => {
        if (character?.world_head_character) characters.unshift(character.character_name);
        else characters.push(character.character_name);

        charactersInfo[character.character_name] = character;
    });

    return (
        <div>
            {
                characters.length != 0 &&
                <div className="px-4 py-3 gap-2 flex justify-end">
                    <Users />
                    <span>{characters.length}</span>
                </div>
            }
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
                {
                    characters.map((character, characterIndex) => {
                        return (
                            <Link key={characterIndex} href={`/char/${character}`} className="col-span-3 lg:col-span-1">
                                <div className="bg-muted bg-opacity-20 flex justify-center py-5 relative rounded transition-all outline outline-0 hover:outline-4">
                                    <div className="flex flex-1 gap-3">
                                        <div className="min-h-[96px] min-w-[96px] flex items-center justify-center">
                                            <div className="ps-2">
                                                <Image
                                                    className={cn(
                                                        charactersInfo?.[character]?.character_image || "brightness-50 dark:brightness-100",
                                                        "mx-auto my-auto"
                                                    )}
                                                    src={charactersInfo?.[character]?.character_image || NullCharacterIcon}
                                                    height={charactersInfo?.[character]?.character_image ? 96 : 72}
                                                    width={charactersInfo?.[character]?.character_image ? 96 : 52}
                                                    alt="캐릭터 이미지"
                                                />
                                                <div className="ps-2 absolute text-sm left-4 bottom-0 whitespace-nowrap">
                                                    {charactersInfo?.[character]?.character_guild_name && <>길드 : {charactersInfo?.[character]?.character_guild_name}</>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col justify-between h-full">
                                                <div>

                                                    <div className="text-lg font-semibold">
                                                        <span>{character}</span>
                                                    </div>
                                                    <div className="text-sm opacity-75">
                                                        <span className="text-xs">{charactersInfo?.[character]?.character_level ? `Lv.` : ""}</span>
                                                        <span>{charactersInfo?.[character]?.character_level ? `${charactersInfo?.[character]?.character_level}` : ""}</span>
                                                        <span>{charactersInfo?.[character]?.character_level ? ` | ` : ""}</span>
                                                        <span>{charactersInfo?.[character]?.character_class ? charactersInfo?.[character]?.character_class : ""}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {
                                                        charactersInfo?.[character]?.combat_power &&
                                                        <>
                                                            <Swords />
                                                            <span className="h-full">{parseInt(charactersInfo?.[character]?.combat_power).toLocaleString()}</span>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <Alert className="mt-2">
                <AlertDescription>
                    본캐를 우선적으로 색인하고 이후에는
                    <br />캐릭터를 색인하는대로 지속적으로 업데이트 됩니다.
                    <br />캐릭터 검색시 빠른 업데이트가 가능합니다.
                </AlertDescription>
            </Alert>
        </div>
    )
}