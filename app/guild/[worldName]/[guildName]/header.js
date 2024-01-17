import Image from "next/image";
import BossKillingMachineIcon from "@/public/bossKillingMachine.png"
import BigBlowIcon from "@/public/bigBlow.png"
import DefenseJustNumberIcon from "@/public/defenseJustNumber.png"
import NameOfTheGuildIcon from "@/public/nameOfTheGuild.png"
import { Users } from "lucide-react";

export default async function GuildHeader(props) {
    const guildBasic = props.guildBasic;
    const guildRankingFlag = props.guildRankingFlag;
    const guildRankingSuro = props.guildRankingSuro;

    const noblesseSkill = guildBasic?.guild_noblesse_skill;
    guildBasic.guild_noblesse_skill = {};
    noblesseSkill.map((skill) => {
        guildBasic.guild_noblesse_skill[skill.skill_name] = skill;
    })

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4 gap-2 p-2">
                    <div className="col-span-4 lg:col-span-2 bg-muted bg-opacity-20 flex justify-center py-5 relative rounded">
                        <div className="flex flex-col text-center">
                            <div className="opacity-50">{guildBasic.world_name} 월드</div>
                            <div className="flex justify-center gap-1">
                                {
                                    (guildBasic.guild_mark || guildBasic.guild_mark_custom) &&
                                    <Image width={50} height={50} className="my-auto mr-1" alt="길드 이미지" src={guildBasic.guild_mark || `data:image/png;base64,${guildBasic.guild_mark_custom}`}></Image>
                                }
                                <div className="text-5xl">{guildBasic.guild_name}</div>
                            </div>
                            <div className="flex justify-center mt-5 gap-5">
                                <span>수로 : {guildRankingSuro?.ranking?.[0]?.ranking || "-"} 위</span>
                                <span> | </span>
                                <span>플래그 : {guildRankingFlag?.ranking?.[0]?.ranking || "-"} 위</span>
                            </div>

                            <div className="flex justify-center mt-10 gap-3">
                                <div className="flex flex-col">
                                    <Image width={54} height={54} src={BossKillingMachineIcon} alt="보스 킬링 머신" />
                                    <div>
                                        {
                                            guildBasic.guild_noblesse_skill["보스 킬링 머신"]?.skill_level || "0"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Image width={54} height={54} src={DefenseJustNumberIcon} alt="방어력은 숫자일 뿐" />
                                    <div>
                                        {
                                            guildBasic.guild_noblesse_skill["방어력은 숫자일 뿐"]?.skill_level || "0"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Image width={54} height={54} src={NameOfTheGuildIcon} alt="길드의 이름으로" />
                                    <div>
                                        {
                                            guildBasic.guild_noblesse_skill["길드의 이름으로"]?.skill_level || "0"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Image width={54} height={54} src={BigBlowIcon} alt="크게 한방" />
                                    <div>
                                        {
                                            guildBasic.guild_noblesse_skill["크게 한방"]?.skill_level || "0"
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-10 gap-1">
                                <Users />
                                {guildBasic.guild_member_count}
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block col-span-4 lg:col-span-2 bg-muted bg-opacity-20 justify-center p-1 relative rounded">
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}