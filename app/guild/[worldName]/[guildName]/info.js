

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
            <Temp guildBasic={guildBasic} guildRankingFlag={guildRankingFlag} guildRankingSuro={guildRankingSuro} />
            <GuildHeader guildBasic={guildBasic} guildRankingFlag={guildRankingFlag} guildRankingSuro={guildRankingSuro} />
            <div className="mt-2"></div>
            <GuildMembers guildBasic={guildBasic}></GuildMembers>


            {/* <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4">
                    <div className="col-span-4 lg:col-span-1 text-center p-3">
                        <div className={"relative h-56 lg:h-full overflow-hidden bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain"} style={{ backgroundImage: `url(${user.characterBasic.character_image})` }}></div>
                    </div>
                    <div className="col-span-4 lg:col-span-3 bg-muted bg-opacity-20 flex justify-between flex-1 p-3 relative rounded-md lg:rounded-s-none lg:rounded-e-md">
                        <div>
                            <div className="text-3xl font-bold">{user.characterBasic.character_name}</div>
                            <div className="mt-5 space-y-1.5">
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>레벨</Badge>
                                    <span>Lv. {user.characterBasic.character_level}</span>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>직업</Badge>
                                    <span>{user.characterBasic.character_class}({user.characterBasic.character_gender})</span>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>서버</Badge>
                                    <div className="flex items-center">
                                        <Image width={20} height={20} className="my-auto mr-1" alt="서버 이미지" src={serverIconImg[user.characterBasic.world_name]}></Image>
                                        <span>{user.characterBasic.world_name}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>길드</Badge>
                                    <Link href={user.characterBasic.character_guild_name ? "/gulid/" + user.characterBasic.character_guild_name : ""}>
                                        <div className="flex items-center">
                                            {
                                                (user.guildBasic.guild_mark || user.guildBasic.guild_mark_custom) &&
                                                <Image width={20} height={20} className="my-auto mr-1" alt="길드 이미지" src={user.guildBasic.guild_mark || `data:image/jpeg;base64,${user.guildBasic.guild_mark_custom}`}></Image>
                                            }
                                            <span className={user.guildBasic.guild_mark_custom && "underline underline-offset-4"}>{user.characterBasic.character_guild_name ? user.characterBasic.character_guild_name : "-"}</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>인기도</Badge>
                                    <span>{user.characterPopularity.popularity || 0}</span>
                                </div>
                                <div className="flex">
                                    <Badge className={"text-[14px] w-[65px] flex justify-center mr-2"}>유니온</Badge>
                                    <span>Lv. {user.userUnion.union_level || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 lg:my-auto left-0 top-full lg:top-0 absolute lg:relative h-[230px] w-full lg:max-w-[410px]">
                            <div id="RichMidia" className="mx-auto border-[1px] h-full w-full max-w-[410px] rounded-lg border-neutral-500">
                                <div className="flex h-full justify-center">
                                    <PlayIcon width={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="MobileRichMidaMargin" className="mt-3 lg:mt-0 w-full h-[230px] lg:h-0"></div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 mt-2">
                <Tabs defaultValue="stat/equipment" activationMode="manual" className="w-full">
                    <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-5">
                        <TabsTrigger value="stat/equipment">스탯/장비</TabsTrigger>
                        <TabsTrigger value="skill" disabled>스킬</TabsTrigger>
                        <TabsTrigger value="union" disabled>유니온</TabsTrigger>
                        <TabsTrigger value="contents" disabled>콘텐츠</TabsTrigger>
                        <TabsTrigger value="accountCharacters">보유 캐릭터</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stat/equipment">
                        <StatAndEquipment character={user} />
                    </TabsContent >

                    <TabsContent value="skill">content</TabsContent>
                    <TabsContent value="union">content</TabsContent>
                    <TabsContent value="contents">content</TabsContent>
                    <TabsContent value="accountCharacters">content</TabsContent>
                </Tabs >
            </div > */}
        </>
    );
}
