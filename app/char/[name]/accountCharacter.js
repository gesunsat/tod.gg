import { getAccountCharacters } from "@/lib/todAPI/getAccountCharacters";
import { cn } from "@/lib/utils";
import { Swords } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NullCharacterIcon from "@/public/nullCharacter.png"
import { serverIconImg } from "@/dictData/serverIconImg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Fragment } from "react";

export default async function AccountCharacters(props) {
    const accountCharacters = await getAccountCharacters(props.rankingUnion);
    // console.log(accountCharacters)
    const characters = {}
    const charactersInfo = [];
    accountCharacters?.map((character) => {
        characters[character.world_name] = characters[character.world_name] || [];

        if (character?.world_head_character) characters[character.world_name].unshift(character.character_name);
        else characters[character.world_name].push(character.character_name);

        charactersInfo[character.character_name] = character
    });

    // console.log(characters)

    return (
        <>
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
                {
                    Object.keys(characters).map((worldName, worldNameIndex) => {
                        return (
                            <Fragment key={worldNameIndex}>
                                <div className="col-span-full sticky top-0 px-4 py-3 flex items-center bg-muted rounded gap-2 z-10">
                                    <Image
                                        className="my-auto"
                                        src={serverIconImg[worldName]}
                                        height={20}
                                        width={20}
                                        alt="서버 아이콘"
                                    />
                                    <span className="font-bold text-lg">{worldName}</span>
                                    <span>({characters[worldName].length} 캐릭터)</span>
                                </div>
                                {
                                    characters[worldName].map((character, characterIndex) => {
                                        return (
                                            <Fragment key={characterIndex}>
                                                <div className="col-span-3 lg:col-span-1">
                                                    <Link href={`/char/${character}`}>
                                                        <div className="bg-muted bg-opacity-20 flex justify-center py-5 relative rounded">
                                                            <div className="flex flex-1 gap-3">
                                                                <div className="min-h-[96px] min-w-[96px] flex items-center justify-center">
                                                                    <div className="ps-2">
                                                                        <div className="relative">
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
                                                                            <div className="absolute text-xs translate-x-1/2 right-1/2 whitespace-nowrap">
                                                                                {charactersInfo?.[character]?.character_guild_name && <>길드 : {charactersInfo?.[character]?.character_guild_name}</>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 space-y-1 self-center">
                                                                    <div>
                                                                        <span>{character}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-xs">{charactersInfo?.[character]?.character_level ? `Lv.` : ""}</span>
                                                                        <span>{charactersInfo?.[character]?.character_level ? `${charactersInfo?.[character]?.character_level}` : ""}</span>
                                                                        <span>{charactersInfo?.[character]?.character_level ? ` | ` : ""}</span>
                                                                        <span>{charactersInfo?.[character]?.character_class ? charactersInfo?.[character]?.character_class : ""}</span>
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
                                                    </Link>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
            <Alert className="mt-2">
                <AlertDescription>
                    각 서버 본캐를 우선적으로 색인하고 이후에는
                    <br />캐릭터를 색인하는대로 지속적으로 업데이트 됩니다.
                    <br />캐릭터 검색시 빠른 업데이트가 가능합니다.
                </AlertDescription>
            </Alert>
        </>
    )
}