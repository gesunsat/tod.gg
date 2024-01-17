import { Badge } from "@/components/ui/badge";
import { getCharAbility } from '@/lib/nexonAPI/getCharAbility';
import { getCharAndroidEquipment } from '@/lib/nexonAPI/getCharAndroidEquipment';
import { getCharBasic } from '@/lib/nexonAPI/getCharBasic';
import { getCharBeautyEquipment } from '@/lib/nexonAPI/getCharBeautyEquipment';
import { getCharCashitemEquipment } from '@/lib/nexonAPI/getCharCashitemEquipment';
import { getCharDojang } from '@/lib/nexonAPI/getCharDojang';
import { getCharHexaMatrix } from '@/lib/nexonAPI/getCharHexaMatrix';
import { getCharHexaMatrixStat } from '@/lib/nexonAPI/getCharHexaMatrixStat';
import { getCharHyperStat } from '@/lib/nexonAPI/getCharHyperStat';
import { getCharItemEquipment } from '@/lib/nexonAPI/getCharItemEquipment';
import { getCharLinkSkill } from '@/lib/nexonAPI/getCharLinkSkill';
import { getCharOCID } from '@/lib/nexonAPI/getCharOCID';
import { getCharPetEquipment } from '@/lib/nexonAPI/getCharPetEquipment';
import { getCharPopularity } from '@/lib/nexonAPI/getCharPopularity';
import { getCharSkill } from '@/lib/nexonAPI/getCharSkill';
import { getCharStat } from '@/lib/nexonAPI/getCharStat';
import { getCharSymbolEquipment } from '@/lib/nexonAPI/getCharSymbolEquipment';
import { getCharVMatrix } from '@/lib/nexonAPI/getCharVMatrix';
import { getRankingUnion } from '@/lib/nexonAPI/getRankingUnion';
import { getUserUnion } from '@/lib/nexonAPI/getUserUnion';
import { getUserUnionRaider } from '@/lib/nexonAPI/getUserUnionRaider';
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { updateCharacterInfo } from "@/lib/todAPI/updateCharacterInfo";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Menu from "./mainTabs";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getWorldCharacters } from "@/lib/todAPI/getWorldCharacters";
import { headers } from 'next/headers';
import { searchQueryParams } from "@/lib/getQueryParam";
import { DatePicker } from "@/components/dataPicker";
import CharHeader from "./header";

export async function generateMetadata({ params }) {
    try {
        const headersList = headers();
        const header_url = headersList.get("x-url") || "";
        const selectedDate = searchQueryParams({ query: "date", fullUrl: header_url });
        const OCID = await getCharOCID(decodeURI(params.name));

        if (!OCID?.ocid) {
            return {
                title: "캐릭터 정보 | TOD.GG",
                description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
            }
        }

        const [characterBasic, characterStat, userUnion] = await Promise.all([
            getCharBasic(OCID.ocid, selectedDate),
            getCharStat(OCID.ocid, selectedDate),
            getUserUnion(OCID.ocid, selectedDate),
        ]);

        if (!characterBasic.character_class) {
            return {
                title: "캐릭터 정보 | TOD.GG",
                description: "캐릭터가 존재하지 않거나 불러올 수 없는 캐릭터입니다.",
            }
        }

        return {
            title: `${characterBasic.character_name} 캐릭터 정보 | TOD.GG 토드지지`,
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

export default async function CharacterLayout({ params, children }) {
    const characterName = decodeURI(params.name);
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const selectedDate = searchQueryParams({ query: "date", fullUrl: header_url });

    const OCID = await getCharOCID(characterName);
    if (!OCID?.ocid) {
        return (
            <div className="text-center my-32">
                <DatePicker className="mb-5 h-10 mx-auto" />
                <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
                <br />
                <div>(2023년 12월 21일 이후 접속한 캐릭터만 조회가 가능합니다.)</div>
                <DatePicker className="h-30 w-30" />
            </div>
        )
    }

    const charBasic = await getCharBasic(OCID.ocid, selectedDate);
    if (!charBasic?.character_class) {
        return (
            <div className="text-center my-32">
                <DatePicker className="mb-5 h-10 mx-auto" />
                <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
                <div>다음 날 오전 1시 이후 다시 검색해주세요.</div>
                <br />
                <div>(2023년 12월 21일 이후 접속한 캐릭터만 조회가 가능합니다.)</div>
            </div>
        )
    }

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-4 relative">
                    <CharHeader characterName={characterName} />

                    <div className="right-0 lg:right-4 top-full lg:top-1/2 translate-y-3 lg:-translate-y-1/2 absolute h-[230px] w-full lg:max-w-[410px]">
                        <div id="RichMidia" className="mx-auto border-[1px] h-full w-full max-w-[410px] rounded-lg border-neutral-500">
                            <div className="flex flex-col h-full justify-center">
                                <div className="mx-auto">
                                    <div className="absolute right-1/2 translate-x-1/2 translate-y-[-18px] opacity-50">AD</div>
                                    <PlayIcon width={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="MobileRichMidaMargin" className="mt-3 lg:mt-0 w-full h-[230px] lg:h-0"></div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 mt-2">
                <Menu characterName={characterName} />

                <div className="mt-2">
                    {children}
                </div>
            </div>
        </>
    )
}