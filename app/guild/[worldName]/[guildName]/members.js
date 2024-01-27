"use client";

import Image from "next/image";
import Link from "next/link";
import BossKillingMachineIcon from "@/public/bossKillingMachine.png"
import BigBlowIcon from "@/public/bigBlow.png"
import DefenseJustNumberIcon from "@/public/defenseJustNumber.png"
import NameOfTheGuildIcon from "@/public/nameOfTheGuild.png"
import NullCharacterIcon from "@/public/nullCharacter.png"
import { Crown, CrownIcon, LucideCrown, LucidePersonStanding, Search, Sword, Swords, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import MembersLoading from "./membersLoading";
import { Icons } from "@/components/icons";
import { getGuildMembersInfo } from "@/lib/todAPI/getGuildMembersInfo";
import { updateGuildMembersInfo } from "@/lib/todAPI/updateGuildMembersInfo";
import { getYesterdayDate } from "@/lib/getYesterdayDate";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function GuildMembers(props) {
    const guildBasic = props.guildBasic;
    const guildID = props?.guildID?.oguild_id;
    useEffect(() => {
        getMembersInfo();
    }, [])

    const [members, setMembers] = useState([]);
    const [membersInfo, setMembersInfo] = useState({});
    useEffect(() => {
        if (members.length == 0) return;

        let initMemberSort = [...guildBasic?.guild_member].sort((a, b) => {
            if ((membersInfo[a]?.["combat_power"] || 0) > (membersInfo[b]?.["combat_power"] || 0)) return -1;
            if ((membersInfo[a]?.["combat_power"] || 0) < (membersInfo[b]?.["combat_power"] || 0)) return 1;
            return 0;
        });
        initMemberSort.splice(initMemberSort.indexOf(guildBasic.guild_master_name), 1);
        initMemberSort.unshift(guildBasic.guild_master_name);

        setMembers(initMemberSort);
    }, [membersInfo])

    const [sec, setSec] = useState(0);
    const [time, setTime] = useState(null);
    const [timerId, setTimerId] = useState(null);
    useEffect(() => {
        if (time === null) return;
        const newTimerId = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
        setTimerId(newTimerId);
        return () => clearInterval(newTimerId); // 클리어 함수에서도 새로운 타이머 ID 사용
    }, [time]);
    useEffect(() => {
        setSec(time % 60);
        if (time === 0) clearInterval(timerId);
    }, [time]);

    const [loading, setLoading] = useState(false);
    const [memberGuildDate, setMemberGuildDate] = useState(new Date("2000-01-01"));
    const getMembersInfo = async () => {
        try {
            setLoading(true);
            if (!guildID) return;

            const res = await getGuildMembersInfo(guildBasic.guild_member, guildID);
            const membersInfo = res.guildMembersInfo;
            const memberGuildDate = new Date(res.guildDate);

            // console.log(membersInfo);
            // console.log(memberGuildDate);

            setMembersInfo(membersInfo);
            setMemberGuildDate(memberGuildDate);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateGuildMembersInfo = async () => {
        try {
            if (!guildID) return;
            setLoading(true);
            setTime(5);

            const res = await updateGuildMembersInfo(guildBasic.guild_member, guildID);
            const membersInfo = res.guildMembersInfo;
            const memberGuildDate = new Date(res.guildDate);

            // console.log(membersInfo);
            // console.log(memberGuildDate);

            setMembersInfo(membersInfo);
            setMemberGuildDate(memberGuildDate);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setTime(0);
        }
    };

    const [memberSortOption, setMemberSortOption] = useState("combat_power");
    useEffect(() => {
        setMemberSearchValue("");
        sortMembers();
    }, [memberSortOption]);
    const sortMembers = () => {
        if (memberSortOption == "") return;
        let membersSort = [...guildBasic.guild_member] || [];

        if (memberSortOption.includes("characterBasic.")) {
            const option = memberSortOption.replace("characterBasic.", "");
            membersSort = membersSort.sort((a, b) => {
                if ((membersInfo[a]?.["characterBasic"]?.[option] || 0) > (membersInfo[b]?.["characterBasic"]?.[option] || 0)) return -1;
                if ((membersInfo[a]?.["characterBasic"]?.[option] || 0) < (membersInfo[b]?.["characterBasic"]?.[option] || 0)) return 1;
                return 0;
            });
        } else if (memberSortOption.includes("name")) {
            membersSort = membersSort.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        } else {
            const option = memberSortOption;
            membersSort = membersSort.sort((a, b) => {
                if ((membersInfo[a]?.[option] || 0) > (membersInfo[b]?.[option] || 0)) return -1;
                if ((membersInfo[a]?.[option] || 0) < (membersInfo[b]?.[option] || 0)) return 1;
                return 0;
            });
        }

        setMembers(membersSort);
    }

    const [memberSearchValue, setMemberSearchValue] = useState("");
    useEffect(() => {
        if (memberSearchValue == "") {
            if (memberSortOption != "") sortMembers();
            else setMembers(initMemberSort);
            return;
        }

        let members = [...guildBasic.guild_member] || [];

        let indexMember = [];
        members.forEach(member => {
            if (String(member).toLowerCase().includes(String(memberSearchValue).toLowerCase())) indexMember.push(member);
        })

        setMembers(indexMember);
    }, [memberSearchValue]);

    return (
        <>
            <div className={loading ? "pointer-events-none" : ""}>
                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="basis-full lg:basis-auto">
                        <div className="relative">
                            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="캐릭터 이름" className="pl-8" value={memberSearchValue} onInput={e => setMemberSearchValue(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex-1 items-center flex justify-between">
                        <Select defaultValue="combat_power" onValueChange={e => setMemberSortOption(e)}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="전투력" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"name"}>이름</SelectItem>
                                <SelectItem disabled={Object.keys(membersInfo || {}) < 1} value={"combat_power"}>전투력</SelectItem>
                                <SelectItem disabled={Object.keys(membersInfo || {}) < 1} value={"characterBasic.character_level"}>레벨</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="items-center flex gap-2">
                            {
                                sec >= 1 &&
                                <div>
                                    {sec}초
                                </div>
                            }
                            {
                                new Date(getYesterdayDate()) - memberGuildDate < (1000 * 60 * 60 * 24) - 1000 ?
                                    <div>최신</div> :
                                    <>
                                        {
                                            (memberGuildDate.getFullYear() == "2000" || loading) ?
                                                <></> :
                                                <div>
                                                    {(new Date(getYesterdayDate()) - memberGuildDate) / (1000 * 60 * 60 * 24)}일 전
                                                </div>
                                        }
                                    </>

                            }
                            <Button
                                variant="secondary"
                                onClick={handleUpdateGuildMembersInfo}
                                disabled={new Date(getYesterdayDate()) - memberGuildDate < (1000 * 60 * 60 * 24) - 1000}
                            >
                                {
                                    loading ?
                                        <Icons.spinner className="h-4 w-4 animate-spin" /> :
                                        "전체갱신"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {
                (loading && Object.keys(membersInfo) == 0) &&
                <MembersLoading />
            }
            {
                !loading &&
                <div className="grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    {
                        members.map((member, memberIndex) => {
                            return (
                                <div key={memberIndex} className="col-span-1 hover:scale-105 transition">
                                    <Link href={`/char/${member}`}>
                                        <div className="bg-muted bg-opacity-20 flex justify-center py-5 relative rounded">
                                            <div className="flex flex-1 gap-3">
                                                <div className="min-h-[96px] min-w-[96px] flex items-center justify-center">
                                                    <div className="ps-2">
                                                        <div className="relative">
                                                            {
                                                                member == guildBasic?.guild_master_name &&
                                                                <div className="absolute -translate-y-[80%] translate-x-1/2 right-1/2">
                                                                    <Crown className="scale-100 scale-x-150 brightness-0 dark:brightness-100" stroke="yellow" />
                                                                </div>
                                                            }
                                                            <Image
                                                                className={cn(
                                                                    membersInfo?.[member]?.characterBasic?.character_image || "brightness-50 dark:brightness-100",
                                                                    "mx-auto my-auto"
                                                                )}
                                                                src={membersInfo?.[member]?.characterBasic?.character_image || NullCharacterIcon}
                                                                height={membersInfo?.[member]?.characterBasic?.character_image ? 96 : 72}
                                                                width={membersInfo?.[member]?.characterBasic?.character_image ? 96 : 52}
                                                                priority={memberIndex <= 20 ? true : false}
                                                                alt="캐릭터 이미지"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col justify-between h-full">
                                                        <div>
                                                            <div className="text-lg font-semibold">
                                                                <span>{member}</span>
                                                            </div>
                                                            <div className="text-sm opacity-75">
                                                                <span className="text-xs">{membersInfo?.[member]?.characterBasic?.character_level ? `Lv.` : ""}</span>
                                                                <span>{membersInfo?.[member]?.characterBasic?.character_level ? `${membersInfo?.[member]?.characterBasic?.character_level}` : ""}</span>
                                                                <span>{membersInfo?.[member]?.characterBasic?.character_level ? ` | ` : ""}</span>
                                                                <span>{membersInfo?.[member]?.characterBasic?.character_class ? membersInfo?.[member]?.characterBasic?.character_class : ""}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {
                                                                membersInfo?.[member]?.combat_power &&
                                                                <>
                                                                    <Swords />
                                                                    <span className="h-full">{parseInt(membersInfo?.[member]?.combat_power).toLocaleString()}</span>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}