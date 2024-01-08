import Image from "next/image";
import Link from "next/link";
import BossKillingMachineIcon from "@/public/bossKillingMachine.png"
import BigBlowIcon from "@/public/bigBlow.png"
import DefenseJustNumberIcon from "@/public/defenseJustNumber.png"
import NameOfTheGuildIcon from "@/public/nameOfTheGuild.png"
import { Users } from "lucide-react";

export default async function GuildMembers(props) {
    const guildBasic = props.guildBasic;
    guildBasic?.guild_member.splice(guildBasic?.guild_member.indexOf(guildBasic.guild_master_name), 1);
    guildBasic?.guild_member.unshift(guildBasic.guild_master_name);

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4 gap-2 p-2">
                    {
                        guildBasic?.guild_member.map((member, memberIndex) => {
                            return (
                                <div key={memberIndex} className="col-span-4 lg:col-span-1">
                                    <Link href={`/char/${member}`}>
                                        <div className="bg-muted bg-opacity-20 flex justify-center py-5 relative rounded">
                                            {member}(링크)
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}