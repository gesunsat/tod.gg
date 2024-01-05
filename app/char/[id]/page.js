"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serverIconImg } from "@/dictData/serverIconImg";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import StarforceIcon from "@/public/starforce.svg";
import FlagIcon from "@/public/flag.svg";
import { cn } from "@/lib/utils";
import { itemInfo } from "@/dictData/itemInfo";
import { VT323 } from "next/font/google";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Terminal, Underline } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import HairIcon from "@/public/hair.png"
import FaceIcon from "@/public/face.png"
import SkinIcon from "@/public/skin.png"
import MasterLabelIcon from "@/public/masterLabel.png"
import SpecialLabelIcon from "@/public/specialLabel.png"
import RedLabelIcon from "@/public/redLabel.png"
import BlackLabelIcon from "@/public/blackLabel.png"
import CashitemCoinIcon from "@/public/cashitemCoin.png"
import ColoringPrismIcon from "@/public/coloringPrism.png"
import LunaPetitIcon from "@/public/lunaPetit.png"
import LunaSweetIcon from "@/public/lunaSweet.png"
import LunaDreamIcon from "@/public/lunaDream.png"
import { Progress } from "@/components/ui/progress";

const interVT323 = VT323({ subsets: ["latin"], weight: ["400"] });

export default function Character(props) {
  useEffect(() => {
    if (localStorage.getItem("itemMorooShapeView")) setItemMorooShapeView(JSON.parse(localStorage.getItem("itemMorooShapeView")));

    getUserByName();
  }, []);

  const isSameDate = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const characterName = decodeURI(props.params.id);
  const getUserByName = async () => {
    try {
      setLoading(true);
      const reqDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
      if (reqDate.getHours() >= 1) reqDate.setDate(reqDate.getDate() - 1);
      else reqDate.setDate(reqDate.getDate() - 2);

      let resUserInfo = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/char?name=${characterName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (resUserInfo.status !== 200) return {}
      let userInfo = await resUserInfo.json();

      console.log(userInfo);

      setUser(userInfo);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const [itemImageSrcs, setItemImageSrcs] = useState({});
  const [itemEquipments, setItemEquipments] = useState({});
  const [itemMorooShapeView, setItemMorooShapeView] = useState(false);
  const [currentViewingItemEquipmentTab, setCurrentViewingItemEquipmentTab] = useState("item_equipment");
  useEffect(() => {
    localStorage.setItem("itemMorooShapeView", itemMorooShapeView);
  }, [itemMorooShapeView]);
  useEffect(() => {
    if (!user) return;
    if (!user.characterItemEquipment) return;

    let itemImageSrcs = {};
    let itemEquipments = {};

    user?.characterItemEquipment[currentViewingItemEquipmentTab]?.map((item) => {
      itemImageSrcs[item.item_equipment_slot] = itemMorooShapeView ? item.item_icon : item.item_shape_icon;
      itemEquipments[item.item_equipment_slot] = item;
    });
    if (currentViewingItemEquipmentTab == "item_equipment") {
      itemImageSrcs["안드로이드"] = user?.characterAndroidEquipment.android_icon;
      itemEquipments["안드로이드"] = {};
      itemEquipments["안드로이드"].item_base_option = {};
      itemEquipments["안드로이드"].item_base_option.base_equipment_level = 10;
      itemEquipments["안드로이드"].item_add_option = {};
      itemEquipments["안드로이드"].item_add_option.equipment_level_decrease = 0;
      itemEquipments["안드로이드"].cuttable_count = 255;
      itemEquipments["안드로이드"].item_equipment_part = "안드로이드";
      itemEquipments["안드로이드"].item_description = user?.characterAndroidEquipment.android_description;
      itemEquipments["안드로이드"].item_name = user?.characterAndroidEquipment.android_name;
      itemEquipments["안드로이드"].item_shape_name = user?.characterAndroidEquipment.android_name;
    }

    // console.log(itemImageSrcs);
    // console.log(itemEquipments);

    setItemImageSrcs(itemImageSrcs);
    setItemEquipments(itemEquipments);
  }, [user, itemMorooShapeView, currentViewingItemEquipmentTab]);

  const [cashitemImageSrcs, setCashitemImageSrcs] = useState({});
  const [cashitemEquipments, setCashitemEquipments] = useState({});
  const [currentCashitemPresetNo, setCurrentCashitemPresetNo] = useState();
  const [additionalCashitemTabViewing, setAdditionalCashitemTabViewing] = useState(false);
  useEffect(() => {
    if (!user) return;
    if (!user.characterCashitemEquipment) return;

    const currentPresetNo = currentCashitemPresetNo || user.characterCashitemEquipment.preset_no;

    let cashitemImageSrcs = {};
    let cashitemEquipments = {};

    user?.characterCashitemEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}cash_item_equipment_preset_${currentPresetNo}`]?.map((cashitem) => {
      if (cashitem.base_preset_item_disable_flag == "1") {
        cashitemImageSrcs[cashitem.cash_item_equipment_slot] = "";
        cashitemEquipments[cashitem.cash_item_equipment_slot] = {};
      } else {
        cashitemImageSrcs[cashitem.cash_item_equipment_slot] = cashitem.cash_item_icon;
        cashitemEquipments[cashitem.cash_item_equipment_slot] = cashitem;
      }
    });
    // user?.characterCashitemEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}cash_item_equipment_preset_1`]?.map((cashitem) => {
    //   const slot = cashitem.cash_item_equipment_slot;
    //   if (cashitemEquipments[slot]) return;
    //   if (cashitem.base_preset_item_disable_flag != "0") return;
    //   cashitemImageSrcs[cashitem.cash_item_equipment_slot] = cashitem.cash_item_icon;
    //   cashitemEquipments[slot] = cashitem;
    // });
    if (additionalCashitemTabViewing) {
      user?.characterCashitemEquipment[`cash_item_equipment_preset_${user.characterCashitemEquipment.preset_no}`]?.map((cashitem) => {
        const slot = cashitem.cash_item_equipment_slot;
        if (cashitemEquipments[slot]) return;
        if (!["무기", "반지4", "반지3", "반지2", "반지1"].includes(slot)) return;

        cashitemImageSrcs[slot] = cashitem.cash_item_icon;
        cashitemEquipments[slot] = cashitem;
      });
    }
    cashitemImageSrcs["헤어"] = HairIcon;
    cashitemImageSrcs["성형"] = FaceIcon;
    cashitemImageSrcs["피부"] = SkinIcon;
    cashitemEquipments["헤어"] = {
      name: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_hair_name`],
      base_color: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_hair_base_color`],
      mix_color: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_hair_mix_color`],
      mix_rate: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_hair_mix_rate`],
    }
    cashitemEquipments["성형"] = {
      name: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_face_name`],
      base_color: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_face_base_color`],
      mix_color: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_face_mix_color`],
      mix_rate: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_face_mix_rate`],
    }
    cashitemEquipments["피부"] = {
      name: user.characterBeautyEquipment[`${additionalCashitemTabViewing ? "additional_" : ""}character_skin_name`],
    }

    console.log("cashitem", cashitemImageSrcs);
    console.log("cashitem", cashitemEquipments);

    setCashitemImageSrcs(cashitemImageSrcs);
    setCashitemEquipments(cashitemEquipments);
  }, [user, currentCashitemPresetNo, additionalCashitemTabViewing]);

  const [androidCashitemImageSrcs, setAndroidCashitemImageSrcs] = useState({});
  const [androidCashitemEquipments, setAndroidCashitemEquipments] = useState({});
  useEffect(() => {
    if (!user) return;
    if (!user.characterAndroidEquipment) return;

    let androidCashitemImageSrcs = {};
    let androidCashitemEquipments = {};

    user?.characterAndroidEquipment.android_cash_item_equipment?.map((cashitem) => {
      androidCashitemImageSrcs[cashitem.cash_item_equipment_slot] = cashitem.cash_item_icon;
      androidCashitemEquipments[cashitem.cash_item_equipment_slot] = cashitem;
    });
    androidCashitemImageSrcs["헤어"] = HairIcon;
    androidCashitemImageSrcs["성형"] = FaceIcon;
    androidCashitemImageSrcs["피부"] = SkinIcon;
    androidCashitemEquipments["헤어"] = {
      name: user.characterAndroidEquipment[`android_hair_name`],
      base_color: user.characterAndroidEquipment[`android_hair_base_color`],
      mix_color: user.characterAndroidEquipment[`android_hair_mix_color`],
      mix_rate: user.characterAndroidEquipment[`android_hair_mix_rate`],
    }
    androidCashitemEquipments["성형"] = {
      name: user.characterAndroidEquipment[`android_face_name`],
      base_color: user.characterAndroidEquipment[`android_face_base_color`],
      mix_color: user.characterAndroidEquipment[`android_face_mix_color`],
      mix_rate: user.characterAndroidEquipment[`android_face_mix_rate`],
    }
    androidCashitemEquipments["피부"] = {
      name: user.characterAndroidEquipment[`android_skin_name`],
    }

    // console.log("cashitem", androidCashitemImageSrcs);
    // console.log("cashitem", androidCashitemEquipments);

    setAndroidCashitemImageSrcs(androidCashitemImageSrcs);
    setAndroidCashitemEquipments(androidCashitemEquipments);
  }, [user]);

  const [arcaneSymbolImageSrcs, setArcaneSymbolImageSrcs] = useState({});
  const [arcaneSymbolEquipments, setArcaneSymbolEquipments] = useState({});
  useEffect(() => {
    if (!user) return;
    if (!user.characterSymbolEquipment) return;

    let arcaneSymbolImageSrcs = {};
    let arcaneSymbolEquipments = {};

    user?.characterSymbolEquipment.symbol_equipment?.map((symbol) => {
      if (!symbol.symbol_name.includes("아케인심볼")) return;
      arcaneSymbolImageSrcs[symbol.symbol_name] = symbol.symbol_icon;
      arcaneSymbolEquipments[symbol.symbol_name] = symbol;
    });

    // console.log("arcaneSymbol", arcaneSymbolImageSrcs);
    // console.log("arcaneSymbol", arcaneSymbolEquipments);

    setArcaneSymbolImageSrcs(arcaneSymbolImageSrcs);
    setArcaneSymbolEquipments(arcaneSymbolEquipments);
  }, [user]);

  const [authenticSymbolImageSrcs, setAuthenticSymbolImageSrcs] = useState({});
  const [authenticSymbolEquipments, setAuthenticSymbolEquipments] = useState({});
  useEffect(() => {
    if (!user) return;
    if (!user.characterSymbolEquipment) return;

    let authenticSymbolImageSrcs = {};
    let authenticSymbolEquipments = {};

    user?.characterSymbolEquipment.symbol_equipment?.map((symbol) => {
      if (!symbol.symbol_name.includes("어센틱심볼")) return;
      authenticSymbolImageSrcs[symbol.symbol_name] = symbol.symbol_icon;
      authenticSymbolEquipments[symbol.symbol_name] = symbol;
    });

    // console.log("authenticSymbol", authenticSymbolImageSrcs);
    // console.log("authenticSymbol", authenticSymbolEquipments);

    setAuthenticSymbolImageSrcs(authenticSymbolImageSrcs);
    setAuthenticSymbolEquipments(authenticSymbolEquipments);
  }, [user]);

  const [characterStat, setCharacterStat] = useState({});
  useEffect(() => {
    if (!user) return;
    if (!user.characterStat) return;

    let characterStat = {};

    user?.characterStat.final_stat?.map((stat) => {
      characterStat[stat.stat_name] = stat.stat_value;
    });

    // console.log("characterStat", characterStat);

    setCharacterStat(characterStat);
  }, [user]);

  const itemEquipmentSlotArrangement = [
    "반지4", null, "모자", null, "엠블렘",
    "반지3", "펜던트2", "얼굴장식", null, "뱃지",
    "반지2", "펜던트", "눈장식", "귀고리", "훈장",
    "반지1", "무기", "상의", "어깨장식", "보조무기",
    "포켓 아이템", "벨트", "하의", "장갑", "망토",
    null, null, "신발", "안드로이드", "기계 심장"
  ];
  const cashitemEquipmentSlotArrangement = [
    "반지4", "헤어", "모자", null, null,
    "반지3", "성형", "얼굴장식", null, null,
    "반지2", "피부", "눈장식", "귀고리", null,
    "반지1", "무기", "상의", null, "보조무기",
    null, null, "하의", "장갑", "망토",
    null, null, "신발", null, null
  ];
  const androidCashitemEquipmentSlotArrangement = [
    null, "헤어", "모자", null, null,
    null, "성형", "얼굴장식", null, null,
    null, "피부", null, null, null,
    null, null, "상의", null, null,
    null, "장갑", "하의", "망토", null,
    null, null, "신발", null, null
  ];
  const itemStatOptionOrder = [
    "str", "dex", "int", "luk", "max_hp", "max_mp", "max_hp_rate", "max_mp_rate", "attack_power", "magic_power", "armor", "speed", "jump", "boss_damage", "ignore_monster_armor", "damage", "all_stat"
  ]
  const itemStatKorean = {
    "max_hp": "최대 HP",
    "max_mp": "최대 MP",
    "max_hp_rate": "최대 HP",
    "max_mp_rate": "최대 MP",
    "attack_power": "공격력",
    "magic_power": "마력",
    "boss_damage": "보스 몬스터 공격 시 데미지",
    "ignore_monster_armor": "몬스터 방어율 무시",
    "damage": "데미지",
    "armor": "방어력",
    "speed": "이동속도",
    "jump": "점프력",
    "all_stat": "올스탯",
  }
  const itemStatUnit = {
    "max_hp_rate": "%",
    "max_mp_rate": "%",
    "boss_damage": "%",
    "ignore_monster_armor": "%",
    "damage": "%",
    "all_stat": "%",
  }

  const [openHoverCard, setOpenHoverCard] = useState({});
  const openHoverCardHandleClick = (slot, setOpen) => {
    setOpenHoverCard({ [slot]: setOpen });
  };
  return (
    <>
      {
        loading &&
        <div className="text-center my-64">
          메이플 월드에서 {characterName}님을 찾는 중...
        </div>
      }

      {
        (!loading && !user?.characterBasic?.character_class) &&
        <div className="text-center my-64">
          <div>존재하지 않거나 불러올 수 없는 캐릭터입니다.</div>
          <div>다음 날 오전 1시 이후에 다시 검색해주세요.</div>
        </div>
      }

      {
        (!loading && user?.characterBasic?.character_class) &&
        <>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
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
                    <div className="text-center"></div>
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
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3 lg:col-span-1">
                    <Tabs defaultValue="itemEquipment" activationMode="manual" className="w-full">
                      <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-5">
                        <TabsTrigger value="itemEquipment">장비</TabsTrigger>
                        <TabsTrigger value="cashitemEquipment">캐시</TabsTrigger>
                        <TabsTrigger value="petEquipment">펫</TabsTrigger>
                        <TabsTrigger value="androidEquipment">안드</TabsTrigger>
                        <TabsTrigger
                          value="symbolEquipment"
                          disabled={user.characterSymbolEquipment.date ? false : true}
                        >
                          심볼
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="itemEquipment">
                        {
                          (user.characterItemEquipment?.dragon_equipment.length >= 1 || user.characterItemEquipment?.mechanic_equipment.length >= 1) &&
                          <>
                            <Tabs defaultValue={currentViewingItemEquipmentTab} activationMode="manual" className="w-full" onValueChange={(value) => setCurrentViewingItemEquipmentTab(value)}>
                              <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-2">
                                <TabsTrigger value="item_equipment">
                                  캐릭터
                                </TabsTrigger>
                                <TabsTrigger
                                  value={
                                    user.characterBasic.character_class == "메카닉" && "mechanic_equipment" ||
                                    user.characterBasic.character_class == "에반" && "dragon_equipment"
                                  }
                                >
                                  {user.characterBasic.character_class == "메카닉" && "메카닉"}
                                  {user.characterBasic.character_class == "에반" && "드래곤"}
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </>
                        }

                        {
                          currentViewingItemEquipmentTab == "item_equipment" &&
                          <>
                            <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                              <div className="grid grid-cols-5">
                                {
                                  itemEquipmentSlotArrangement.map((slot, index) => {
                                    if (slot == null) return (<div key={index} className="aspect-square"></div>);

                                    if (slot == "하의" && itemEquipments["상의"]?.item_equipment_part == "한벌옷") {
                                      return (
                                        <div
                                          key={index}
                                          className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                        >
                                          <div key={index} className="aspect-square bg-opacity-30 bg-red-500 rounded"></div>
                                        </div>
                                      )
                                    }

                                    return (
                                      <div
                                        key={index}
                                        className={cn(itemEquipments[slot]?.potential_option_grade == "레어" && "border-2 border-sky-400",
                                          itemEquipments[slot]?.potential_option_grade == "에픽" && "border-2 border-purple-400",
                                          itemEquipments[slot]?.potential_option_grade == "유니크" && "border-2 border-yellow-400",
                                          itemEquipments[slot]?.potential_option_grade == "레전드리" && "border-2 border-green-400",
                                          "relative items-center aspect-square m-[2.5px] bg-background rounded")}
                                      >
                                        {
                                          itemEquipments[slot]?.special_ring_level >= 1 &&
                                          <div className="absolute bottom-0 right-1 pointer-events-none z-10">
                                            <span className="text-xs">Lv </span>
                                            <span className="font-bold">{itemEquipments[slot]?.special_ring_level}</span>
                                          </div>
                                        }
                                        {
                                          itemImageSrcs[slot] &&
                                          <HoverCard
                                            openDelay={0}
                                            closeDelay={0}
                                            open={openHoverCard[slot]}
                                            onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                          >
                                            <HoverCardTrigger
                                              asChild
                                              onClick={() => setOpenHoverCard({ [slot]: true })}
                                            >
                                              <Image alt={slot} src={itemImageSrcs[slot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                              className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                              side={window.innerWidth < 768 ? "top" : "right"}
                                              sideOffset={10}
                                              onClick={() => setOpenHoverCard({ [slot]: false })}
                                            >
                                              {
                                                itemInfo[itemEquipments[slot].item_name]?.starforceMax != 0 &&
                                                  (itemEquipments[slot].scroll_upgrade +
                                                    itemEquipments[slot].scroll_upgradeable_count +
                                                    itemEquipments[slot].scroll_resilience_count >= 1) ?
                                                  <div className="w-4/5 mx-auto flex flex-wrap justify-center mb-1">
                                                    {
                                                      Array(itemEquipments[slot].starforce_scroll_flag == "사용" ? 3 : Math.ceil((itemInfo[itemEquipments[slot].item_name]?.starforceMax || 25) / 5)).fill().map((_, index) => {
                                                        return (
                                                          <Fragment key={index}>
                                                            {[15].includes((5 * index)) ? <div className="w-full mt-2"></div> : <></>}
                                                            <div className="flex flex-grow-0 flex-shrink-0 justify-center items-center">
                                                              {
                                                                Array((itemInfo[itemEquipments[slot].item_name]?.starforceMax || 25) - (5 * index) >= 5 ?
                                                                  5 :
                                                                  (itemInfo[itemEquipments[slot].item_name]?.starforceMax || 25) - (5 * index))
                                                                  .fill().map((_, starIndex) => {
                                                                    return (
                                                                      <StarforceIcon
                                                                        color={
                                                                          (5 * index) + starIndex < itemEquipments[slot].starforce ?
                                                                            itemEquipments[slot].starforce_scroll_flag != "사용" ? "yellow" : "cyan" :
                                                                            "gray"
                                                                        }
                                                                        alt="별"
                                                                        key={starIndex}
                                                                        width={12}
                                                                      />
                                                                    )
                                                                  })
                                                              }
                                                              {[0, 5, 15].includes((5 * index)) ? <div className="w-[10px]"></div> : <></>}
                                                            </div>
                                                          </Fragment>
                                                        )
                                                      })
                                                    }
                                                  </div> :
                                                  <></>
                                              }
                                              <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                <span>{itemEquipments[slot].item_name}</span>
                                                <span>{itemEquipments[slot].scroll_upgrade && itemEquipments[slot].scroll_upgrade >= 1 ? `( + ${itemEquipments[slot].scroll_upgrade} )` : ""}</span>
                                              </div>
                                              {
                                                itemEquipments[slot].potential_option_grade &&
                                                <>
                                                  <div className="text-sm mx-auto flex flex-wrap justify-center">
                                                    <span>({itemEquipments[slot].potential_option_grade} 아이템)</span>
                                                  </div>
                                                </>
                                              }
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                              <div className="px-2 mt-1">
                                                <div className="flex gap-1">
                                                  <div className="w-auto">
                                                    <div
                                                      className={cn(itemEquipments[slot]?.potential_option_grade == "레어" && "border-2 border-sky-400",
                                                        itemEquipments[slot]?.potential_option_grade == "에픽" && "border-2 border-purple-400",
                                                        itemEquipments[slot]?.potential_option_grade == "유니크" && "border-2 border-yellow-400",
                                                        itemEquipments[slot]?.potential_option_grade == "레전드리" && "border-2 border-green-400",
                                                        "relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300")}
                                                    >
                                                      <Image alt={slot} src={itemImageSrcs[slot]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                      {
                                                        itemEquipments[slot]?.special_ring_level >= 1 &&
                                                        <div className="absolute bottom-0 right-1 text-black">
                                                          <span className="text-xs">Lv </span>
                                                          <span className="font-bold">{itemEquipments[slot]?.special_ring_level}</span>
                                                        </div>
                                                      }
                                                      <FlagIcon
                                                        alt="flag"
                                                        className={cn(
                                                          !itemEquipments[slot]?.potential_option_grade && "hidden",
                                                          itemEquipments[slot]?.potential_option_grade == "레어" && "fill-sky-400",
                                                          itemEquipments[slot]?.potential_option_grade == "에픽" && "fill-purple-400",
                                                          itemEquipments[slot]?.potential_option_grade == "유니크" && "fill-yellow-400",
                                                          itemEquipments[slot]?.potential_option_grade == "레전드리" && "fill-green-400",
                                                          "absolute -right-[11px] top-1"
                                                        )}
                                                        width={11}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="w-full">
                                                    <div className="text-end text-neutral-400 text-[9px]">
                                                      공격력 증가량
                                                    </div>
                                                    <div className="text-end text-3xl font-bold">
                                                      0
                                                    </div>
                                                    <ul className="text-[13px] mb-[3px]">
                                                      <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>
                                                        REQ LEV : {itemEquipments[slot]?.item_add_option?.equipment_level_decrease != 0 ?
                                                          <>
                                                            <span>{itemEquipments[slot].item_base_option?.base_equipment_level - itemEquipments[slot]?.item_add_option?.equipment_level_decrease}</span>
                                                            <span> ({itemEquipments[slot].item_base_option?.base_equipment_level}</span>
                                                            <span className="text-amber-400">-{itemEquipments[slot]?.item_add_option?.equipment_level_decrease}</span>
                                                            <span>)</span>
                                                          </> :
                                                          itemEquipments[slot].item_base_option?.base_equipment_level}
                                                      </li>
                                                    </ul>
                                                    <ul className="grid grid-cols-2 text-[13px]">
                                                      <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                      <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                      <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                      <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                    </ul>
                                                  </div>
                                                </div>
                                                <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                                  <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                    <div>초보자</div>
                                                    <div>전사</div>
                                                    <div>마법사</div>
                                                    <div>궁수</div>
                                                    <div>도적</div>
                                                    <div>해적</div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              {
                                                (user.characterAndroidEquipment && slot == "안드로이드") &&
                                                <>
                                                  <div className="px-2 mt-2 text-sm">
                                                    <div className="mb-2">
                                                      <span>별명 :</span>
                                                      <span> {user.characterAndroidEquipment.android_nickname}</span>
                                                    </div>
                                                    {
                                                      user.characterAndroidEquipment.android_skin_name &&
                                                      <>
                                                        <div>
                                                          {
                                                            user.characterAndroidEquipment.android_hair_mix_color ?
                                                              <span>믹스 {user.characterAndroidEquipment.android_hair_name.replace(user.characterAndroidEquipment.android_hair_base_color, "")}</span> :
                                                              <span> {(user.characterAndroidEquipment.android_hair_name).includes(user.characterAndroidEquipment.android_hair_base_color) ? user.characterAndroidEquipment.android_hair_name : user.characterAndroidEquipment.android_hair_base_color + user.characterAndroidEquipment.android_hair_name}</span>
                                                          }
                                                          {
                                                            user.characterAndroidEquipment.android_hair_mix_color &&
                                                            <>
                                                              <span> ( </span>
                                                              <span>{user.characterAndroidEquipment.android_hair_base_color}</span>
                                                              <span> {100 - user.characterAndroidEquipment.android_hair_mix_rate}</span>
                                                              <span> : </span>
                                                              <span>{user.characterAndroidEquipment.android_hair_mix_color}</span>
                                                              <span> {user.characterAndroidEquipment.android_hair_mix_rate}</span>
                                                              <span> )</span>
                                                            </>
                                                          }
                                                        </div>
                                                        <div>
                                                          {
                                                            user.characterAndroidEquipment.android_face_mix_color ?
                                                              <span>믹스 {user.characterAndroidEquipment.android_face_name.replace(user.characterAndroidEquipment.android_face_base_color, "")}</span> :
                                                              <span> {(user.characterAndroidEquipment.android_face_name).includes(user.characterAndroidEquipment.android_face_base_color) ? user.characterAndroidEquipment.android_face_name : user.characterAndroidEquipment.android_face_base_color + " " + user.characterAndroidEquipment.android_face_name}</span>
                                                          }
                                                          {
                                                            user.characterAndroidEquipment.android_face_mix_color &&
                                                            <>
                                                              <span> ( </span>
                                                              <span>{user.characterAndroidEquipment.android_face_base_color}</span>
                                                              <span> {100 - user.characterAndroidEquipment.android_face_mix_rate}</span>
                                                              <span> : </span>
                                                              <span>{user.characterAndroidEquipment.android_face_mix_color}</span>
                                                              <span> {user.characterAndroidEquipment.android_face_mix_rate}</span>
                                                              <span> )</span>
                                                            </>
                                                          }
                                                        </div>
                                                        <div>
                                                          <span> {user.characterAndroidEquipment.android_skin_name}</span>
                                                        </div>
                                                      </>
                                                    }
                                                  </div>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2 mb-2"></div>
                                                </>
                                              }
                                              <div className="px-2 mt-2 text-sm">
                                                {
                                                  itemEquipments[slot]?.growth_level >= 1 &&
                                                  <div className="text-amber-400">
                                                    <div>
                                                      <span>성장 레벨 :</span>
                                                      <span> {itemEquipments[slot]?.growth_level}</span>
                                                    </div>
                                                    <div>
                                                      <span>성장 경험치 :</span>
                                                      <span> {itemEquipments[slot]?.growth_exp}%</span>
                                                    </div>
                                                  </div>
                                                }
                                                <div>
                                                  <span>장비분류 : </span>
                                                  <span>{itemEquipments[slot]?.item_equipment_part}</span>
                                                </div>
                                                {
                                                  itemStatOptionOrder.map((stat, index) => {
                                                    return (
                                                      itemEquipments[slot]?.item_total_option?.[stat] || 0 != 0 ?
                                                        <div key={index} className={
                                                          itemEquipments[slot]?.item_add_option?.[stat] || 0 +
                                                            itemEquipments[slot]?.item_etc_option?.[stat] || 0 +
                                                            itemEquipments[slot]?.item_starforce_option?.[stat] || 0
                                                            >= 1 ?
                                                            "text-cyan-300" :
                                                            ""
                                                        }>
                                                          <span className="uppercase">{itemStatKorean[stat] || stat} : </span>
                                                          <span>+{itemEquipments[slot]?.item_total_option?.[stat]}</span>
                                                          <span>{itemStatUnit?.[stat]}</span>
                                                          {
                                                            itemEquipments[slot]?.item_add_option?.[stat] || 0 +
                                                              itemEquipments[slot]?.item_etc_option?.[stat] || 0 +
                                                              itemEquipments[slot]?.item_starforce_option?.[stat] || 0
                                                              >= 1 ?
                                                              <>
                                                                <span className="text-white ml-1">(</span>
                                                                <><span className="text-white">{itemEquipments[slot]?.item_base_option?.[stat]}</span><span className="text-white">{itemStatUnit?.[stat]}</span></>
                                                                {itemEquipments[slot]?.item_add_option?.[stat] >= 1 ?
                                                                  <><span className="text-lime-400"> +{itemEquipments[slot]?.item_add_option?.[stat]}</span><span className="text-lime-400">{itemStatUnit?.[stat]}</span></> :
                                                                  <></>}
                                                                {itemEquipments[slot]?.item_etc_option?.[stat] || 0 != 0 ?
                                                                  <><span className={itemEquipments[slot]?.item_etc_option?.[stat] >= 0 ? "text-violet-300" : "text-red-600 font-bold"}>{itemEquipments[slot]?.item_etc_option?.[stat] >= 0 ? ` +${itemEquipments[slot]?.item_etc_option?.[stat]}` : ` ${itemEquipments[slot]?.item_etc_option?.[stat]}`}</span><span className={itemEquipments[slot]?.item_etc_option?.[stat] >= 0 ? "text-violet-300" : "text-red-600 font-bold"}>{itemStatUnit?.[stat]}</span></> :
                                                                  <></>}
                                                                {itemEquipments[slot]?.item_starforce_option?.[stat] >= 1 ?
                                                                  <><span className="text-amber-400"> +{itemEquipments[slot]?.item_starforce_option?.[stat]}</span><span className="text-amber-400">{itemStatUnit?.[stat]}</span></> :
                                                                  <></>}
                                                                <span className="text-white">)</span>
                                                              </> :
                                                              ""
                                                          }
                                                        </div> :
                                                        <Fragment key={index}></Fragment>
                                                    )
                                                  })
                                                }
                                                {
                                                  itemEquipments[slot]?.item_add_option?.equipment_level_decrease != 0 &&
                                                  <div>
                                                    <span className="text-lime-400">착용 레벨 감소 : </span>
                                                    <span className="text-lime-400">- {itemEquipments[slot]?.item_add_option?.equipment_level_decrease}</span>
                                                  </div>
                                                }
                                                {
                                                  itemEquipments[slot].item_name.indexOf("제네시스 ") == 0 ||
                                                    itemEquipments[slot].item_name.indexOf("블랙 하트") == 0 ?
                                                    <div>강화불가</div> :
                                                    <>
                                                      {
                                                        itemEquipments[slot].scroll_upgrade +
                                                        itemEquipments[slot].scroll_upgradeable_count +
                                                        itemEquipments[slot].scroll_resilience_count >= 1 &&
                                                        <div>
                                                          <span>업그레이드 가능 횟수 : </span>
                                                          <span className="mr-1">{itemEquipments[slot]?.scroll_upgradeable_count}</span>
                                                          <span className="text-amber-400">(복구 가능 횟수 : </span>
                                                          <span className="text-amber-400">{itemEquipments[slot]?.scroll_resilience_count}</span>
                                                          <span className="text-amber-400">)</span>
                                                        </div>
                                                      }
                                                    </>
                                                }
                                                {
                                                  itemEquipments[slot].golden_hammer_flag == "적용" &&
                                                  <div>
                                                    황금망치 재련 적용
                                                  </div>
                                                }
                                                {
                                                  itemEquipments[slot].cuttable_count != 255 &&
                                                  <div>
                                                    <span className="text-amber-400">가위 사용 가능 횟수 : </span>
                                                    <span className="text-amber-400">{itemEquipments[slot].cuttable_count}회</span>
                                                  </div>
                                                }

                                                {/* 잠재능력 설정 불가 */}
                                                {
                                                  (
                                                    slot == "안드로이드" ||
                                                    slot == "포켓 아이템" ||
                                                    slot == "뱃지" ||
                                                    slot == "훈장" ||
                                                    itemEquipments[slot]?.item_name == "어드벤처 딥다크 크리티컬 링" ||
                                                    itemEquipments[slot]?.item_name == "어비스 헌터스 링" ||
                                                    itemEquipments[slot]?.item_name.includes("정령의 펜던트") ||
                                                    itemEquipments[slot]?.special_ring_level >= 1
                                                  ) &&
                                                  <div>
                                                    잠재능력 설정 불가
                                                  </div>
                                                }
                                                {/* 에디셔널 잠재능력 설정 불가 */}
                                                {
                                                  (
                                                    itemEquipments[slot].item_name.indexOf("블랙 하트") == 0
                                                  ) &&
                                                  <div>
                                                    에디셔널 잠재능력 설정 불가
                                                  </div>
                                                }
                                              </div>
                                              {
                                                itemEquipments[slot].potential_option_grade &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div className="flex">
                                                      <span className={cn(
                                                        itemEquipments[slot].potential_option_grade == "레어" && "bg-sky-400",
                                                        itemEquipments[slot].potential_option_grade == "에픽" && "bg-purple-400",
                                                        itemEquipments[slot].potential_option_grade == "유니크" && "bg-yellow-400",
                                                        itemEquipments[slot].potential_option_grade == "레전드리" && "bg-green-400",
                                                        "rounded-md text-center w-5 h-5 mr-1")}
                                                      >
                                                        {
                                                          itemEquipments[slot].potential_option_grade == "레어" && "R" ||
                                                          itemEquipments[slot].potential_option_grade == "에픽" && "E" ||
                                                          itemEquipments[slot].potential_option_grade == "유니크" && "U" ||
                                                          itemEquipments[slot].potential_option_grade == "레전드리" && "L"
                                                        }
                                                      </span>
                                                      <span className={cn(
                                                        itemEquipments[slot].potential_option_grade == "레어" && "text-sky-400",
                                                        itemEquipments[slot].potential_option_grade == "에픽" && "text-purple-400",
                                                        itemEquipments[slot].potential_option_grade == "유니크" && "text-yellow-400",
                                                        itemEquipments[slot].potential_option_grade == "레전드리" && "text-green-400",
                                                        "flex")}>잠재옵션</span>
                                                    </div>
                                                    {
                                                      itemEquipments[slot].potential_option_grade &&
                                                      <div className="px-2">
                                                        {
                                                          !itemEquipments[slot].potential_option_1 &&
                                                          <div>잠재능력이 봉인되어 있습니다.</div>

                                                        }
                                                        {
                                                          itemEquipments[slot].potential_option_1 &&
                                                          <div>
                                                            {itemEquipments[slot].potential_option_1}
                                                          </div>
                                                        }
                                                        {
                                                          itemEquipments[slot].potential_option_2 &&
                                                          <div>
                                                            {itemEquipments[slot].potential_option_2}
                                                          </div>
                                                        }
                                                        {
                                                          itemEquipments[slot].potential_option_3 &&
                                                          <div>
                                                            {itemEquipments[slot].potential_option_3}
                                                          </div>
                                                        }
                                                      </div>
                                                    }
                                                  </div>
                                                </>
                                              }
                                              {/* TODO: 오전 1시 지나서 싹찍 캐릭터 모자 에디셔널 확인 */}
                                              {
                                                itemEquipments[slot].additional_potential_option_grade &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div className="flex">
                                                      <span className={cn(
                                                        itemEquipments[slot].additional_potential_option_grade == "레어" && "bg-sky-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "에픽" && "bg-purple-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "유니크" && "bg-yellow-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "레전드리" && "bg-green-400",
                                                        "rounded-md text-center w-5 h-5 mr-1")}
                                                      >
                                                        {
                                                          itemEquipments[slot].additional_potential_option_grade == "레어" && "R" ||
                                                          itemEquipments[slot].additional_potential_option_grade == "에픽" && "E" ||
                                                          itemEquipments[slot].additional_potential_option_grade == "유니크" && "U" ||
                                                          itemEquipments[slot].additional_potential_option_grade == "레전드리" && "L"
                                                        }
                                                      </span>
                                                      <span className={cn(
                                                        itemEquipments[slot].additional_potential_option_grade == "레어" && "text-sky-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "에픽" && "text-purple-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "유니크" && "text-yellow-400",
                                                        itemEquipments[slot].additional_potential_option_grade == "레전드리" && "text-green-400",
                                                        "flex")}>에디셔널 잠재옵션</span>
                                                    </div>
                                                    {
                                                      itemEquipments[slot].additional_potential_option_grade &&
                                                      <div className="px-2">
                                                        {
                                                          !itemEquipments[slot].additional_potential_option_2 &&
                                                          <>
                                                            <div>에디셔널 잠재능력이 봉인되어 있는상태입니다.</div>
                                                            <div className="mb-2">(돋보기 버튼을 클릭하여 확인할 수 있습니다.)</div>
                                                          </>
                                                        }
                                                        {
                                                          itemEquipments[slot].additional_potential_option_1 &&
                                                          <div>
                                                            {itemEquipments[slot].additional_potential_option_1}
                                                          </div>
                                                        }
                                                        {
                                                          itemEquipments[slot].additional_potential_option_2 &&
                                                          <div>
                                                            {itemEquipments[slot].additional_potential_option_2}
                                                          </div>
                                                        }
                                                        {
                                                          itemEquipments[slot].additional_potential_option_3 &&
                                                          <div>
                                                            {itemEquipments[slot].additional_potential_option_3}
                                                          </div>
                                                        }
                                                      </div>
                                                    }
                                                  </div>
                                                </>
                                              }
                                              {
                                                Object.keys(itemEquipments[slot].item_exceptional_option || {}).map((stat) => {
                                                  return itemEquipments[slot].item_exceptional_option[stat] != 0 ? true : false;
                                                }).includes(true) &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div className="flex">
                                                      <span className="bg-red-500 rounded-md text-center w-5 h-5 mr-1">EX</span>
                                                      <span className="text-red-500 flex">익셉셔널</span>
                                                    </div>
                                                    <div className="px-2">
                                                      {
                                                        (
                                                          itemEquipments[slot].item_exceptional_option?.str || 0 ==
                                                          itemEquipments[slot].item_exceptional_option?.dex || 0 ==
                                                          itemEquipments[slot].item_exceptional_option?.luk || 0 ==
                                                          itemEquipments[slot].item_exceptional_option?.int || 0
                                                        ) ? <div>올스탯 : +{itemEquipments[slot].item_exceptional_option?.str}</div> :
                                                          <>
                                                            <div>STR : +{itemEquipments[slot].item_exceptional_option?.str}</div>
                                                            <div>DEX : +{itemEquipments[slot].item_exceptional_option?.dex}</div>
                                                            <div>INT : +{itemEquipments[slot].item_exceptional_option?.int}</div>
                                                            <div>LUK : +{itemEquipments[slot].item_exceptional_option?.luk}</div>
                                                          </>
                                                      }
                                                      {
                                                        (
                                                          itemEquipments[slot].item_exceptional_option?.max_hp || 0 ==
                                                          itemEquipments[slot].item_exceptional_option?.max_mp || 0
                                                        ) ? <div>최대 HP / 최대 MP : +{itemEquipments[slot].item_exceptional_option?.max_hp}</div> :
                                                          <>
                                                            <div>최대 HP : +{itemEquipments[slot].item_exceptional_option?.max_hp}</div>
                                                            <div>최대 MP : +{itemEquipments[slot].item_exceptional_option?.max_mp}</div>
                                                          </>
                                                      }
                                                      {
                                                        (
                                                          itemEquipments[slot].item_exceptional_option?.attack_power || 0 ==
                                                          itemEquipments[slot].item_exceptional_option?.magic_power || 0
                                                        ) ? <div>공격력 / 마력 : +{itemEquipments[slot].item_exceptional_option?.attack_power}</div> :
                                                          <>
                                                            <div>공격력 : +{itemEquipments[slot].item_exceptional_option?.attack_power}</div>
                                                            <div>마력 : +{itemEquipments[slot].item_exceptional_option?.magic_power}</div>
                                                          </>
                                                      }
                                                    </div>
                                                  </div>
                                                </>
                                              }
                                              {
                                                itemEquipments[slot].soul_name &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div className="text-yellow-300">
                                                      <span>{itemEquipments[slot].soul_name}</span>
                                                      <span>의 소울 적용</span>
                                                    </div>
                                                    <div>
                                                      <span>{itemEquipments[slot].soul_option}</span>
                                                    </div>
                                                  </div>
                                                </>
                                              }
                                              {
                                                itemEquipments[slot].item_description &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div>
                                                      <span className="whitespace-pre-line">{(itemEquipments[slot].item_description).replace(/\\n/g, "</br>")}</span>
                                                    </div>
                                                    {
                                                      itemEquipments[slot]?.special_ring_level >= 1 &&
                                                      <>
                                                        <div className="text-amber-400">
                                                          <span>[특수 스킬 반지]</span>
                                                          <span> {itemEquipments[slot].item_name}</span>
                                                          <span> {itemEquipments[slot]?.special_ring_level}</span>
                                                          <span> 레벨</span>
                                                        </div>
                                                        <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2 mb-2"></div>
                                                        <div className="text-amber-400">
                                                          <span>특수 스킬 반지는 중복 착용이 불가능합니다.</span>
                                                        </div>
                                                      </>
                                                    }
                                                  </div>
                                                </>
                                              }
                                              {
                                                itemEquipments[slot].item_name != itemEquipments[slot].item_shape_name &&
                                                <>
                                                  <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                  <div className="px-1 mt-2 text-sm">
                                                    <div className="text-lime-400">
                                                      <span>신비의 모루에 의해</span>
                                                      <span> [{itemEquipments[slot].item_shape_name}]</span>
                                                      <span>의 외형이 합성됨</span>
                                                    </div>
                                                  </div>
                                                </>
                                              }
                                            </HoverCardContent>
                                          </HoverCard>
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <div className="items-center mt-2 py-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                              <div className="flex space-x-2">
                                <Checkbox id="terms" checked={itemMorooShapeView} onCheckedChange={setItemMorooShapeView} />
                                <Label htmlFor="terms">모루 외형 끄기</Label>
                              </div>
                            </div>
                          </>
                        }
                        {
                          currentViewingItemEquipmentTab != "item_equipment" &&
                          <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                            <div className="grid grid-cols-5">
                              {
                                (Object.keys(itemEquipments) || [0]).map((subItemSlot, subItemIndex) => {
                                  return (
                                    <Fragment key={subItemIndex}>
                                      <div></div>
                                      <div></div>
                                      <div className="relative items-center aspect-square m-[2.5px] bg-background rounded">
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard[`${currentViewingItemEquipmentTab}_slot_${subItemIndex}`]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ [`${currentViewingItemEquipmentTab}_slot_${subItemIndex}`]: true })}
                                          >
                                            {
                                              itemImageSrcs[subItemSlot] &&
                                              <Image alt={`${currentViewingItemEquipmentTab}_slot_${subItemIndex}`} src={itemImageSrcs[subItemSlot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                            }
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ [`${currentViewingItemEquipmentTab}_slot_${subItemIndex}`]: false })}
                                          >
                                            <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                              <span>{itemEquipments[subItemSlot].item_name}</span>
                                              <span>{itemEquipments[subItemSlot].scroll_upgrade && itemEquipments[subItemSlot].scroll_upgrade >= 1 ? `( + ${itemEquipments[subItemSlot].scroll_upgrade} )` : ""}</span>
                                            </div>
                                            <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                            <div className="px-2 mt-1">
                                              <div className="flex gap-1">
                                                <div className="w-auto">
                                                  <div
                                                    className={cn(itemEquipments[subItemSlot]?.potential_option_grade == "레어" && "border-2 border-sky-400",
                                                      itemEquipments[subItemSlot]?.potential_option_grade == "에픽" && "border-2 border-purple-400",
                                                      itemEquipments[subItemSlot]?.potential_option_grade == "유니크" && "border-2 border-yellow-400",
                                                      itemEquipments[subItemSlot]?.potential_option_grade == "레전드리" && "border-2 border-green-400",
                                                      "relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300")}
                                                  >
                                                    <Image alt={subItemSlot} src={itemImageSrcs[subItemSlot]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                    <FlagIcon
                                                      alt="flag"
                                                      className={cn(
                                                        !itemEquipments[subItemSlot]?.potential_option_grade && "hidden",
                                                        itemEquipments[subItemSlot]?.potential_option_grade == "레어" && "fill-sky-400",
                                                        itemEquipments[subItemSlot]?.potential_option_grade == "에픽" && "fill-purple-400",
                                                        itemEquipments[subItemSlot]?.potential_option_grade == "유니크" && "fill-yellow-400",
                                                        itemEquipments[subItemSlot]?.potential_option_grade == "레전드리" && "fill-green-400",
                                                        "absolute -right-[11px] top-1"
                                                      )}
                                                      width={11}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full">
                                                  <div className="text-end text-neutral-400 text-[9px]">
                                                    공격력 증가량
                                                  </div>
                                                  <div className="text-end text-3xl font-bold">
                                                    0
                                                  </div>
                                                  <ul className="text-[13px] mb-[3px]">
                                                    <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>
                                                      REQ LEV : {itemEquipments[subItemSlot]?.item_add_option?.equipment_level_decrease != 0 ?
                                                        <>
                                                          <span>{itemEquipments[subItemSlot].item_base_option?.base_equipment_level - itemEquipments[subItemSlot]?.item_add_option?.equipment_level_decrease}</span>
                                                          <span> ({itemEquipments[subItemSlot].item_base_option?.base_equipment_level}</span>
                                                          <span className="text-amber-400">-{itemEquipments[subItemSlot]?.item_add_option?.equipment_level_decrease}</span>
                                                          <span>)</span>
                                                        </> :
                                                        itemEquipments[subItemSlot].item_base_option?.base_equipment_level}
                                                    </li>
                                                  </ul>
                                                  <ul className="grid grid-cols-2 text-[13px]">
                                                    <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                    <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                    <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                    <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                                <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                  <div>초보자</div>
                                                  <div>전사</div>
                                                  <div>마법사</div>
                                                  <div>궁수</div>
                                                  <div>도적</div>
                                                  <div>해적</div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                            <div className="px-2 mt-2 text-sm">
                                              {
                                                itemEquipments[subItemSlot]?.growth_level >= 1 &&
                                                <div className="text-amber-400">
                                                  <div>
                                                    <span>성장 레벨 :</span>
                                                    <span> {itemEquipments[subItemSlot]?.growth_level}</span>
                                                  </div>
                                                  <div>
                                                    <span>성장 경험치 :</span>
                                                    <span> {itemEquipments[subItemSlot]?.growth_exp}%</span>
                                                  </div>
                                                </div>
                                              }
                                              <div>
                                                <span>장비분류 : </span>
                                                <span>{itemEquipments[subItemSlot]?.item_equipment_part}</span>
                                              </div>
                                              {
                                                itemStatOptionOrder.map((stat, index) => {
                                                  return (
                                                    itemEquipments[subItemSlot]?.item_total_option?.[stat] || 0 != 0 ?
                                                      <div key={index} className={
                                                        itemEquipments[subItemSlot]?.item_add_option?.[stat] || 0 +
                                                          itemEquipments[subItemSlot]?.item_etc_option?.[stat] || 0 +
                                                          itemEquipments[subItemSlot]?.item_starforce_option?.[stat] || 0
                                                          >= 1 ?
                                                          "text-cyan-300" :
                                                          ""
                                                      }>
                                                        <span className="uppercase">{itemStatKorean[stat] || stat} : </span>
                                                        <span>+{itemEquipments[subItemSlot]?.item_total_option?.[stat]}</span>
                                                        <span>{itemStatUnit?.[stat]}</span>
                                                        {
                                                          itemEquipments[subItemSlot]?.item_add_option?.[stat] || 0 +
                                                            itemEquipments[subItemSlot]?.item_etc_option?.[stat] || 0 +
                                                            itemEquipments[subItemSlot]?.item_starforce_option?.[stat] || 0
                                                            >= 1 ?
                                                            <>
                                                              <span className="text-white ml-1">(</span>
                                                              <><span className="text-white">{itemEquipments[subItemSlot]?.item_base_option?.[stat]}</span><span className="text-white">{itemStatUnit?.[stat]}</span></>
                                                              {itemEquipments[subItemSlot]?.item_add_option?.[stat] >= 1 ?
                                                                <><span className="text-lime-400"> +{itemEquipments[subItemSlot]?.item_add_option?.[stat]}</span><span className="text-lime-400">{itemStatUnit?.[stat]}</span></> :
                                                                <></>}
                                                              {itemEquipments[subItemSlot]?.item_etc_option?.[stat] || 0 != 0 ?
                                                                <><span className={itemEquipments[subItemSlot]?.item_etc_option?.[stat] >= 0 ? "text-violet-300" : "text-red-600 font-bold"}>{itemEquipments[subItemSlot]?.item_etc_option?.[stat] >= 0 ? ` +${itemEquipments[subItemSlot]?.item_etc_option?.[stat]}` : ` ${itemEquipments[subItemSlot]?.item_etc_option?.[stat]}`}</span><span className={itemEquipments[subItemSlot]?.item_etc_option?.[stat] >= 0 ? "text-violet-300" : "text-red-600 font-bold"}>{itemStatUnit?.[stat]}</span></> :
                                                                <></>}
                                                              {itemEquipments[subItemSlot]?.item_starforce_option?.[stat] >= 1 ?
                                                                <><span className="text-amber-400"> +{itemEquipments[subItemSlot]?.item_starforce_option?.[stat]}</span><span className="text-amber-400">{itemStatUnit?.[stat]}</span></> :
                                                                <></>}
                                                              <span className="text-white">)</span>
                                                            </> :
                                                            ""
                                                        }
                                                      </div> :
                                                      <Fragment key={index}></Fragment>
                                                  )
                                                })
                                              }
                                              {
                                                itemEquipments[subItemSlot].scroll_upgrade +
                                                itemEquipments[subItemSlot].scroll_upgradeable_count +
                                                itemEquipments[subItemSlot].scroll_resilience_count >= 1 &&
                                                <div>
                                                  <span>업그레이드 가능 횟수 : </span>
                                                  <span className="mr-1">{itemEquipments[subItemSlot]?.scroll_upgradeable_count}</span>
                                                  <span className="text-amber-400">(복구 가능 횟수 : </span>
                                                  <span className="text-amber-400">{itemEquipments[subItemSlot]?.scroll_resilience_count}</span>
                                                  <span className="text-amber-400">)</span>
                                                </div>
                                              }
                                              <div>
                                                잠재능력 설정 불가
                                              </div>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </div>
                                      <div></div>
                                      <div></div>
                                    </Fragment>
                                  )
                                })
                              }
                            </div>
                          </div>
                        }
                      </TabsContent>

                      <TabsContent value="cashitemEquipment">
                        {
                          user.characterCashitemEquipment?.additional_cash_item_equipment_preset_1 &&
                          <>
                            <Tabs defaultValue="normalCashitem" activationMode="manual" className="w-full" onValueChange={(value) => setAdditionalCashitemTabViewing(value == "additionalCashitem" ? true : false)}>
                              <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-2">
                                <TabsTrigger value="normalCashitem">
                                  {user.characterBasic.character_class == "제로" && "알파(남)"}
                                  {user.characterBasic.character_class == "엔젤릭버스터" && "일반"}
                                </TabsTrigger>
                                <TabsTrigger value="additionalCashitem">
                                  {user.characterBasic.character_class == "제로" && "베타(여)"}
                                  {user.characterBasic.character_class == "엔젤릭버스터" && "드레스 업"}
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </>
                        }

                        <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                          <div className="grid grid-cols-5">
                            {
                              cashitemEquipmentSlotArrangement.map((slot, index) => {
                                if (slot == null) return (<div key={index} className="aspect-square"></div>);

                                if (slot == "하의" && cashitemEquipments["상의"]?.cash_item_equipment_part == "한벌옷") {
                                  return (
                                    <div
                                      key={index}
                                      className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                    >
                                      <div key={index} className="aspect-square bg-opacity-30 bg-red-500 rounded"></div>
                                    </div>
                                  )
                                }

                                if (slot == "헤어" || slot == "성형" || slot == "피부") {
                                  return (
                                    <div
                                      key={index}
                                      className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                    >
                                      {
                                        cashitemEquipments[slot] &&
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard[slot]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ [slot]: true })}
                                          >
                                            <Image alt={slot} src={cashitemImageSrcs[slot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ [slot]: false })}
                                          >
                                            {
                                              slot == "헤어" &&
                                              <div>
                                                {
                                                  cashitemEquipments["헤어"].mix_color ?
                                                    <span>믹스 {cashitemEquipments["헤어"].name.replace(cashitemEquipments["헤어"].base_color, "")}</span> :
                                                    <span> {(cashitemEquipments["헤어"].name).includes(cashitemEquipments["헤어"].base_color) ? cashitemEquipments["헤어"].name : cashitemEquipments["헤어"].base_color + cashitemEquipments["헤어"].name}</span>
                                                }
                                                {
                                                  cashitemEquipments["헤어"].mix_color &&
                                                  <>
                                                    <span> ( </span>
                                                    <span>{cashitemEquipments["헤어"].base_color}</span>
                                                    <span> {100 - cashitemEquipments["헤어"].mix_rate}</span>
                                                    <span> : </span>
                                                    <span>{cashitemEquipments["헤어"].mix_color}</span>
                                                    <span> {cashitemEquipments["헤어"].mix_rate}</span>
                                                    <span> )</span>
                                                  </>
                                                }
                                              </div>
                                            }
                                            {
                                              slot == "성형" &&
                                              <div>
                                                {
                                                  cashitemEquipments["성형"].mix_color ?
                                                    <span>믹스 {cashitemEquipments["성형"].name.replace(cashitemEquipments["성형"].base_color, "")}</span> :
                                                    <span> {(cashitemEquipments["성형"].name).includes(cashitemEquipments["성형"].base_color) ? cashitemEquipments["성형"].name : cashitemEquipments["성형"].base_color + " " + cashitemEquipments["성형"].name}</span>
                                                }
                                                {
                                                  cashitemEquipments["성형"].mix_color &&
                                                  <>
                                                    <span> ( </span>
                                                    <span>{cashitemEquipments["성형"].base_color}</span>
                                                    <span> {100 - cashitemEquipments["성형"].mix_rate}</span>
                                                    <span> : </span>
                                                    <span>{cashitemEquipments["성형"].mix_color}</span>
                                                    <span> {cashitemEquipments["성형"].mix_rate}</span>
                                                    <span> )</span>
                                                  </>
                                                }
                                              </div>
                                            }
                                            {
                                              slot == "피부" &&
                                              <div>
                                                <span> {cashitemEquipments["피부"].name}</span>
                                              </div>
                                            }
                                          </HoverCardContent>
                                        </HoverCard>
                                      }
                                    </div>
                                  )
                                }

                                return (
                                  <div
                                    key={index}
                                    className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                  >
                                    {
                                      cashitemEquipments[slot]?.cash_item_coloring_prism &&
                                      <div className="absolute bottom-1 left-1 pointer-events-none z-10">
                                        <Image
                                          alt={"컬러링 프리즘"}
                                          src={ColoringPrismIcon}
                                          className="w-[22px] h-[20px]"
                                        />
                                      </div>
                                    }
                                    {
                                      (cashitemEquipments[slot] && Object.keys(cashitemEquipments[slot]).length != 0 && !["헤어", "성형", "피부"].includes(slot)) &&
                                      <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                        <Image
                                          alt={cashitemEquipments[slot].cash_item_label || "캐시 아이템"}
                                          src={
                                            cashitemEquipments[slot].cash_item_label == "마스터라벨" && MasterLabelIcon ||
                                            cashitemEquipments[slot].cash_item_label == "레드라벨" && RedLabelIcon ||
                                            cashitemEquipments[slot].cash_item_label == "스페셜라벨" && SpecialLabelIcon ||
                                            cashitemEquipments[slot].cash_item_label == "블랙라벨" && BlackLabelIcon ||
                                            CashitemCoinIcon
                                          }
                                          height={20}
                                          width={20}
                                        />
                                      </div>
                                    }
                                    {
                                      (cashitemImageSrcs?.[slot] || "") &&
                                      <HoverCard
                                        openDelay={0}
                                        closeDelay={0}
                                        open={openHoverCard[slot]}
                                        onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                      >
                                        <HoverCardTrigger
                                          asChild
                                          onClick={() => setOpenHoverCard({ [slot]: true })}
                                        >
                                          <Image alt={slot} src={cashitemImageSrcs[slot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                        </HoverCardTrigger>
                                        <HoverCardContent
                                          className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                          side={window.innerWidth < 768 ? "top" : "right"}
                                          sideOffset={10}
                                          onClick={() => setOpenHoverCard({ [slot]: false })}
                                        >
                                          <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                            <span>{cashitemEquipments[slot].cash_item_name}</span>
                                          </div>
                                          <div className="text-orange-400 text-xs mx-auto flex flex-wrap justify-center">
                                            <span>교환 불가</span>
                                          </div>
                                          {
                                            cashitemEquipments[slot].cash_item_label &&
                                            <>
                                              <div
                                                className={cn(
                                                  cashitemEquipments[slot].cash_item_label == "마스터라벨" && "text-cyan-400",
                                                  cashitemEquipments[slot].cash_item_label == "레드라벨" && "text-pink-700 font-bold",
                                                  cashitemEquipments[slot].cash_item_label == "스페셜라벨" && "text-neutral-400",
                                                  cashitemEquipments[slot].cash_item_label == "블랙라벨" && "text-amber-400",
                                                  "text-xs mx-auto flex flex-wrap justify-center"
                                                )}
                                              >
                                                <span>{cashitemEquipments[slot].cash_item_label}</span>
                                              </div>
                                            </>
                                          }
                                          {/* TODO: 넥슨 이새끼들 뭔가 아이템 유효기간이랑 옵션 유효기간이랑 뭔가 오류있는거같으니까 나중에 바뀌면 바꿀것 */}
                                          {
                                            cashitemEquipments[slot].date_option_expire &&
                                            <>
                                              <div className="text-xs mx-auto flex flex-wrap justify-center">
                                                <span>유효기간 :</span>
                                                <span className="ml-1">{new Date(cashitemEquipments[slot].date_option_expire).getFullYear()}년</span>
                                                <span className="ml-1">{String(new Date(cashitemEquipments[slot].date_option_expire).getMonth() + 1).padStart(2, "0")}월</span>
                                                <span className="ml-1">{String(new Date(cashitemEquipments[slot].date_option_expire).getDate()).padStart(2, "0")}일 </span>
                                                <span className="ml-1">{String(new Date(cashitemEquipments[slot].date_option_expire).getHours()).padStart(2, "0")}시 </span>
                                                <span className="ml-1">{String(new Date(cashitemEquipments[slot].date_option_expire).getMinutes()).padStart(2, "0")}분 </span>
                                                <span>까지 사용가능</span>
                                              </div>
                                            </>
                                          }
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                          <div className="px-2 mt-1">
                                            <div className="flex gap-1">
                                              <div className="w-auto">
                                                <div className={"relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300"}>
                                                  {
                                                    cashitemEquipments[slot]?.cash_item_coloring_prism &&
                                                    <div className="absolute bottom-1 left-1 pointer-events-none z-10">
                                                      <Image
                                                        alt={"컬러링 프리즘"}
                                                        src={ColoringPrismIcon}
                                                        className="w-[22px] h-[20px]"
                                                      />
                                                    </div>
                                                  }
                                                  {
                                                    (cashitemEquipments[slot] && !["헤어", "성형", "피부"].includes(slot)) &&
                                                    <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                                      <Image
                                                        alt={cashitemEquipments[slot].cash_item_label || "캐시 아이템"}
                                                        src={
                                                          cashitemEquipments[slot].cash_item_label == "마스터라벨" && MasterLabelIcon ||
                                                          cashitemEquipments[slot].cash_item_label == "레드라벨" && RedLabelIcon ||
                                                          cashitemEquipments[slot].cash_item_label == "스페셜라벨" && SpecialLabelIcon ||
                                                          cashitemEquipments[slot].cash_item_label == "블랙라벨" && BlackLabelIcon ||
                                                          CashitemCoinIcon
                                                        }
                                                        height={20}
                                                        width={20}
                                                      />
                                                    </div>
                                                  }
                                                  <Image alt={slot} src={cashitemImageSrcs[slot]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                </div>
                                              </div>
                                              <div className="w-full">
                                                <div className="text-end text-neutral-400 text-[9px]">
                                                  공격력 증가량
                                                </div>
                                                <div className="text-end text-3xl font-bold">
                                                  0
                                                </div>
                                                <ul className="text-[13px] mb-[3px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LEV : 0</li>
                                                </ul>
                                                <ul className="grid grid-cols-2 text-[13px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                              <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                <div>초보자</div>
                                                <div>전사</div>
                                                <div>마법사</div>
                                                <div>궁수</div>
                                                <div>도적</div>
                                                <div>해적</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                          <div className="px-2 mt-2 text-sm">
                                            <div>
                                              <span>장비분류 : </span>
                                              <span>{cashitemEquipments[slot]?.cash_item_equipment_part}</span>
                                            </div>
                                            {
                                              cashitemEquipments[slot]?.cash_item_option?.map((option, index) => {
                                                return (
                                                  <div key={index} className="text-cyan-300">
                                                    <span className="uppercase">{itemStatKorean[option.option_type] || option.option_type} : </span>
                                                    <span>+{option.option_value}</span>
                                                    <span className="text-white"> (0</span>
                                                    <span className="text-violet-300"> +{option.option_value}</span>
                                                    <span className="text-white">)</span>
                                                  </div>
                                                )
                                              })
                                            }
                                          </div>
                                          {
                                            cashitemEquipments[slot].cash_item_description &&
                                            <>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              <div className="px-1 mt-2 text-sm">
                                                <span className="whitespace-pre-line">{(cashitemEquipments[slot].cash_item_description).replace(/\\n/g, "</br>")}</span>
                                              </div>
                                            </>
                                          }
                                          {
                                            cashitemEquipments[slot].cash_item_coloring_prism &&
                                            <>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              <div className="px-1 mt-2 text-sm text-lime-400">
                                                <div>
                                                  <span>컬러링 프리즘이 적용된 아이템입니다.</span>
                                                </div>
                                                <div>
                                                  <span>적용 범위 :</span>
                                                  <span> {cashitemEquipments[slot].cash_item_coloring_prism.color_range}</span>
                                                </div>
                                                <div>
                                                  <span>색조 :</span>
                                                  <span> {cashitemEquipments[slot].cash_item_coloring_prism.hue > 0 ? "+" : ""}{cashitemEquipments[slot].cash_item_coloring_prism.hue}, </span>
                                                  <span>채도 :</span>
                                                  <span> {cashitemEquipments[slot].cash_item_coloring_prism.saturation > 0 ? "+" : ""}{cashitemEquipments[slot].cash_item_coloring_prism.saturation}, </span>
                                                  <span>명도 :</span>
                                                  <span> {cashitemEquipments[slot].cash_item_coloring_prism.value > 0 ? "+" : ""}{cashitemEquipments[slot].cash_item_coloring_prism.value}</span>
                                                </div>
                                              </div>
                                            </>
                                          }
                                        </HoverCardContent>
                                      </HoverCard>
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        <div className="items-center mt-2 py-1 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                          <ToggleGroup
                            variant="outline"
                            type="single"
                            rovingFocus={false}
                            defaultValue={currentCashitemPresetNo || user.characterCashitemEquipment?.preset_no || 1}
                            onValueChange={(value) => setCurrentCashitemPresetNo(value)}
                          >
                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={1} aria-label="cashitemPreset1">
                              <div className="h-auto w-4">1</div>
                            </ToggleGroupItem>
                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={2} aria-label="cashitemPreset2" disabled={user.characterCashitemEquipment?.cash_item_equipment_preset_2 ? false : true}>
                              <div className="h-auto w-4">2</div>
                            </ToggleGroupItem>
                            <ToggleGroupItem className="dark:data-[state=on]:bg-background data-[state=on]:pointer-events-none" value={3} aria-label="cashitemPreset3" disabled={user.characterCashitemEquipment?.cash_item_equipment_preset_3 ? false : true}>
                              <div className="h-auto w-4">3</div>
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                      </TabsContent>

                      <TabsContent value="petEquipment">
                        <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 relative select-none rounded-md shadow-md pb-1">
                          <div className="absolute h-full w-full">
                            <div className="flex flex-row w-full h-full">
                              <div className="basis-1/2 bg-neutral-400 dark:bg-neutral-600 rounded-s"></div>
                              <div className="w-[14px] bg-neutral-400 dark:bg-neutral-600"></div>
                              <div className="w-[6px]"></div>
                              <div className="basis-1/2"></div>
                              <div className="w-16"></div>
                              <div className="basis-1/2"></div>
                              <div className="basis-1/2"></div>
                            </div>
                          </div>
                          {
                            Array(3).fill().map((row, index) => {
                              return (
                                <div key={index} className="flex flex-row w-full pt-1 px-1">
                                  <div className="basis-1/2 relative items-center aspect-square m-[2.5px] bg-background rounded">
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_name &&
                                      <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                        <Image
                                          alt={"아이템 분류 아이콘"}
                                          src={
                                            user.characterPetEquipment.pet_equipment[index].pet_type == "루나 쁘띠" && LunaPetitIcon ||
                                            user.characterPetEquipment.pet_equipment[index].pet_type == "루나 스윗" && LunaSweetIcon ||
                                            user.characterPetEquipment.pet_equipment[index].pet_type == "루나 드림" && LunaDreamIcon ||
                                            CashitemCoinIcon
                                          }
                                          height={20}
                                          width={20}
                                        />
                                      </div>
                                    }
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_name &&
                                      <>
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard["펫" + index]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ ["펫" + index]: true })}
                                          >
                                            <Image
                                              className="object-contain mx-auto transition-all scale-75 hover:scale-100"
                                              alt={"펫"}
                                              src={user.characterPetEquipment.pet_equipment[index].pet_icon}
                                              fill
                                              sizes="50px"
                                            />
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ ["펫" + index]: false })}
                                          >
                                            <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                              {
                                                user.characterPetEquipment.pet_equipment[index].pet_nickname != user.characterPetEquipment.pet_equipment[index].pet_name ?
                                                  <>
                                                    <span>{user.characterPetEquipment.pet_equipment[index].pet_nickname}</span>
                                                    <span>({user.characterPetEquipment.pet_equipment[index].pet_name})</span>
                                                  </> :
                                                  <>
                                                    <span>{user.characterPetEquipment.pet_equipment[index].pet_name}</span>
                                                  </>
                                              }
                                            </div>
                                            {
                                              user.characterPetEquipment.pet_equipment[index].pet_type &&
                                              <>
                                                <div
                                                  className={cn(
                                                    user.characterPetEquipment.pet_equipment[index].pet_type == "루나 쁘띠" && "text-violet-400",
                                                    user.characterPetEquipment.pet_equipment[index].pet_type == "루나 스윗" && "text-pink-400",
                                                    user.characterPetEquipment.pet_equipment[index].pet_type == "루나 드림" && "text-cyan-400",
                                                    "text-xs mx-auto flex flex-wrap justify-center"
                                                  )}
                                                >
                                                  <span>{user.characterPetEquipment.pet_equipment[index].pet_type}</span>
                                                </div>
                                              </>
                                            }
                                            <div className="text-orange-400 text-sm mx-auto flex flex-wrap justify-center">
                                              <span>교환 불가</span>
                                            </div>
                                            {
                                              user.characterPetEquipment.pet_equipment[index].pet_date_expire &&
                                              <div className="text-sm mx-auto flex justify-center">
                                                <span>마법의시간 :</span>
                                                <span className="ml-1">{new Date(user.characterPetEquipment.pet_equipment[index].pet_date_expire).getFullYear()}년</span>
                                                <span className="ml-1">{String(new Date(user.characterPetEquipment.pet_equipment[index].pet_date_expire).getMonth() + 1).padStart(2, "0")}월</span>
                                                <span className="ml-1">{String(new Date(user.characterPetEquipment.pet_equipment[index].pet_date_expire).getDate()).padStart(2, "0")}일 </span>
                                                <span className="ml-1">{String(new Date(user.characterPetEquipment.pet_equipment[index].pet_date_expire).getHours()).padStart(2, "0")}시 </span>
                                                <span>까지</span>
                                              </div>
                                            }
                                            <div className="px-2 flex gap-2 mt-3 text-[15px]">
                                              <div className="w-auto">
                                                <div className="relative flex items-center w-[80px] h-[80px] rounded bg-gradient-to-b from-gray-500 to-neutral-300">
                                                  {
                                                    user.characterPetEquipment.pet_equipment[index].pet_icon &&
                                                    <Image alt="펫 아이콘" src={user.characterPetEquipment.pet_equipment[index].pet_icon} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                  }
                                                  {
                                                    user.characterPetEquipment.pet_equipment[index].pet_icon &&
                                                    <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                                      <Image
                                                        alt={"아이템 분류 아이콘"}
                                                        src={
                                                          user.characterPetEquipment.pet_equipment[index].pet_type == "루나 쁘띠" && LunaPetitIcon ||
                                                          user.characterPetEquipment.pet_equipment[index].pet_type == "루나 스윗" && LunaSweetIcon ||
                                                          user.characterPetEquipment.pet_equipment[index].pet_type == "루나 드림" && LunaDreamIcon ||
                                                          CashitemCoinIcon
                                                        }
                                                        height={20}
                                                        width={20}
                                                      />
                                                    </div>
                                                  }
                                                </div>
                                              </div>
                                              <div>
                                                {
                                                  user.characterPetEquipment.pet_equipment[index].pet_description &&
                                                  <div className="w-auto">
                                                    <span className="whitespace-pre-line">{(user.characterPetEquipment.pet_equipment[index].pet_description).replace(/\\n/g, "</br>")}</span>
                                                  </div>
                                                }
                                                {
                                                  user.characterPetEquipment.pet_equipment[index].pet_skill_1 &&
                                                  <>
                                                    <div className="text-orange-400">
                                                      <span>스킬 : </span>
                                                      {
                                                        Object.keys(user.characterPetEquipment.pet_equipment[index]).map((key, skillIndex) => {
                                                          if (!key.includes("pet_skill_")) return;
                                                          if (!user.characterPetEquipment.pet_equipment[index][key]) return;

                                                          return (
                                                            <span className="after:content-[','] last-of-type:after:content-[''] mr-2 last-of-type:mr-0" key={skillIndex}>{user.characterPetEquipment.pet_equipment[index][key]}</span>
                                                          )
                                                        })
                                                      }
                                                    </div>
                                                  </>
                                                }
                                              </div>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </>
                                    }
                                  </div>
                                  <div className="w-5"></div>
                                  <div className="basis-1/2 relative items-center aspect-square m-[2.5px] bg-background rounded">
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_equipment_name &&
                                      <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                        <Image
                                          alt={"캐시 아이템"}
                                          src={CashitemCoinIcon}
                                          height={20}
                                          width={20}
                                        />
                                      </div>
                                    }
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_equipment_name &&
                                      <HoverCard
                                        openDelay={0}
                                        closeDelay={0}
                                        open={openHoverCard["펫 아이템" + index]}
                                        onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                      >
                                        <HoverCardTrigger
                                          asChild
                                          onClick={() => setOpenHoverCard({ ["펫 아이템" + index]: true })}
                                        >
                                          <Image alt="펫 아이템" src={user.characterPetEquipment.pet_equipment[index].pet_equipment_icon} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                        </HoverCardTrigger>
                                        <HoverCardContent
                                          className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                          side={window.innerWidth < 768 ? "top" : "right"}
                                          sideOffset={10}
                                          onClick={() => setOpenHoverCard({ ["펫 아이템" + index]: false })}
                                        >
                                          <div
                                            className={cn(
                                              user.characterPetEquipment.pet_equipment[index].scroll_upgrade >= 1 && "text-amber-500",
                                              "gap-1 mx-auto flex flex-wrap justify-center font-semibold"
                                            )}
                                          >
                                            <span>{user.characterPetEquipment.pet_equipment[index].pet_equipment_name}</span>
                                            {
                                              user.characterPetEquipment.pet_equipment[index].scroll_upgrade >= 1 &&
                                              <>
                                                <span className="ml-1">(</span>
                                                <span>+{user.characterPetEquipment.pet_equipment[index].scroll_upgrade}</span>
                                                <span>)</span>
                                              </>
                                            }
                                          </div>
                                          <div className="text-amber-500 text-xs mx-auto flex flex-wrap justify-center">
                                            <span>교환 불가</span>
                                          </div>
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                          <div className="px-2 mt-1">
                                            <div className="flex gap-1">
                                              <div className="w-auto">
                                                <div className={"relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300"}>
                                                  <Image alt="펫 아이템" src={user.characterPetEquipment.pet_equipment[index].pet_equipment_icon} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                  <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                                    <Image
                                                      alt={"캐시 아이템"}
                                                      src={CashitemCoinIcon}
                                                      height={20}
                                                      width={20}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="w-full">
                                                <div className="text-end text-neutral-400 text-[9px]">
                                                  공격력 증가량
                                                </div>
                                                <div className="text-end text-3xl font-bold">
                                                  0
                                                </div>
                                                <ul className="text-[13px] mb-[3px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LEV : 0</li>
                                                </ul>
                                                <ul className="grid grid-cols-2 text-[13px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                              <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                <div>초보자</div>
                                                <div>전사</div>
                                                <div>마법사</div>
                                                <div>궁수</div>
                                                <div>도적</div>
                                                <div>해적</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                          <div className="px-2 mt-2 text-sm">
                                            <div>
                                              <span>장비분류 : 펫장비</span>
                                            </div>
                                            {
                                              user.characterPetEquipment.pet_equipment[index]?.item_option?.map((option, optionIndex) => {
                                                return (
                                                  <div key={optionIndex} className="text-cyan-300">
                                                    <span>{option.option_type} : </span>
                                                    <span>+{option.option_value}</span>
                                                  </div>
                                                )
                                              })
                                            }
                                            {
                                              user.characterPetEquipment.pet_equipment[index]?.scroll_upgradable != null &&
                                              <div>
                                                <span>업그레이드 가능 횟수 : </span>
                                                <span>{user.characterPetEquipment.pet_equipment[index]?.scroll_upgradable}</span>
                                              </div>
                                            }
                                          </div>
                                          {
                                            user.characterPetEquipment.pet_equipment[index]?.pet_equipment_description &&
                                            <>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              <div className="px-2 mt-2 text-sm">
                                                <span className="whitespace-pre-line">{(user.characterPetEquipment.pet_equipment[index]?.pet_equipment_description).replace(/\\n/g, "</br>")}</span>
                                              </div>
                                            </>
                                          }
                                        </HoverCardContent>
                                      </HoverCard>
                                    }
                                  </div>
                                  <div className="w-16"></div>
                                  <div className="basis-1/2 relative items-center aspect-square m-[2.5px] bg-background rounded">
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_auto_skill_1 &&
                                      <div className="relative items-center aspect-square m-[2.5px] bg-background rounded">
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard["펫스킬1_" + index]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ ["펫스킬1_" + index]: true })}
                                          >
                                            <Image alt={"펫스킬1_" + index} src={user.characterPetEquipment.pet_equipment[index]?.pet_auto_skill_1_icon} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ ["펫스킬1_" + index]: false })}
                                          >
                                            <div>
                                              <span>{user.characterPetEquipment.pet_equipment[index]?.pet_auto_skill_1}</span>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </div>
                                    }
                                  </div>
                                  {/* TODO: 넥슨 십쌔들 일 개같이 안해서 스킬1 아이콘이랑 스킬2 아이콘 똑같음 추후 확인 */}
                                  <div className="basis-1/2 relative items-center aspect-square m-[2.5px] bg-background rounded">
                                    {
                                      user.characterPetEquipment.pet_equipment?.[index]?.pet_auto_skill_2 &&
                                      <div className="relative items-center aspect-square m-[2.5px] bg-background rounded">
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard["펫스킬2_" + index]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ ["펫스킬2_" + index]: true })}
                                          >
                                            <Image alt={"펫스킬2_" + index} src={user.characterPetEquipment.pet_equipment[index]?.pet_auto_skill_2_icon} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ ["펫스킬2_" + index]: false })}
                                          >
                                            <div>
                                              <span>{user.characterPetEquipment.pet_equipment[index]?.pet_auto_skill_2}</span>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </div>
                                    }
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>

                        <Alert className="mt-2">
                          <AlertTitle>알림</AlertTitle>
                          <AlertDescription>
                            넥슨 API의 문제로 인해 펫 스킬 2의 아이콘이<br />펫 스킬 1의 아이콘과 같은 문제가 있습니다.<br />아이콘에 커서를 올릴 시 스킬 명은 제대로 표기 됨
                          </AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="androidEquipment">
                        <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-1 relative select-none rounded-md shadow-md">
                          <div className="grid grid-cols-5">
                            {
                              androidCashitemEquipmentSlotArrangement.map((slot, index) => {
                                if (slot == null) return (<div key={index} className="aspect-square"></div>);

                                if (slot == "하의" && androidCashitemEquipments["상의"]?.cash_item_equipment_part == "한벌옷") {
                                  return (
                                    <div
                                      key={index}
                                      className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                    >
                                      <div key={index} className="aspect-square bg-opacity-30 bg-red-500 rounded"></div>
                                    </div>
                                  )
                                }

                                if (slot == "헤어" || slot == "성형" || slot == "피부") {
                                  return (
                                    <div
                                      key={index}
                                      className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                    >
                                      {
                                        androidCashitemEquipments[slot] &&
                                        <HoverCard
                                          openDelay={0}
                                          closeDelay={0}
                                          open={openHoverCard[slot]}
                                          onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                        >
                                          <HoverCardTrigger
                                            asChild
                                            onClick={() => setOpenHoverCard({ [slot]: true })}
                                          >
                                            <Image alt={slot} src={androidCashitemImageSrcs[slot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            className="text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                            side={window.innerWidth < 768 ? "top" : "right"}
                                            sideOffset={10}
                                            onClick={() => setOpenHoverCard({ [slot]: false })}
                                          >
                                            {
                                              (slot == "헤어" && androidCashitemEquipments["헤어"].name) &&
                                              <div>
                                                {
                                                  androidCashitemEquipments["헤어"].mix_color ?
                                                    <span>믹스 {androidCashitemEquipments["헤어"].name.replace(androidCashitemEquipments["헤어"].base_color, "")}</span> :
                                                    <span> {(androidCashitemEquipments["헤어"].name).includes(androidCashitemEquipments["헤어"].base_color) ? androidCashitemEquipments["헤어"].name : androidCashitemEquipments["헤어"].base_color + androidCashitemEquipments["헤어"].name}</span>
                                                }
                                                {
                                                  androidCashitemEquipments["헤어"].mix_color &&
                                                  <>
                                                    <span> ( </span>
                                                    <span>{androidCashitemEquipments["헤어"].base_color}</span>
                                                    <span> {100 - androidCashitemEquipments["헤어"].mix_rate}</span>
                                                    <span> : </span>
                                                    <span>{androidCashitemEquipments["헤어"].mix_color}</span>
                                                    <span> {androidCashitemEquipments["헤어"].mix_rate}</span>
                                                    <span> )</span>
                                                  </>
                                                }
                                              </div>
                                            }
                                            {
                                              (slot == "성형" && androidCashitemEquipments["성형"].name) &&
                                              <div>
                                                {
                                                  androidCashitemEquipments["성형"].mix_color ?
                                                    <span>믹스 {androidCashitemEquipments["성형"].name.replace(androidCashitemEquipments["성형"].base_color, "")}</span> :
                                                    <span> {(androidCashitemEquipments["성형"].name).includes(androidCashitemEquipments["성형"].base_color) ? androidCashitemEquipments["성형"].name : androidCashitemEquipments["성형"].base_color + " " + androidCashitemEquipments["성형"].name}</span>
                                                }
                                                {
                                                  androidCashitemEquipments["성형"].mix_color &&
                                                  <>
                                                    <span> ( </span>
                                                    <span>{androidCashitemEquipments["성형"].base_color}</span>
                                                    <span> {100 - androidCashitemEquipments["성형"].mix_rate}</span>
                                                    <span> : </span>
                                                    <span>{androidCashitemEquipments["성형"].mix_color}</span>
                                                    <span> {androidCashitemEquipments["성형"].mix_rate}</span>
                                                    <span> )</span>
                                                  </>
                                                }
                                              </div>
                                            }
                                            {
                                              (slot == "피부" && androidCashitemEquipments["피부"].name) &&
                                              <div>
                                                <span> {androidCashitemEquipments["피부"].name}</span>
                                              </div>
                                            }
                                          </HoverCardContent>
                                        </HoverCard>
                                      }
                                    </div>
                                  )
                                }

                                return (
                                  <div
                                    key={index}
                                    className="relative items-center aspect-square m-[2.5px] bg-background rounded"
                                  >
                                    {
                                      androidCashitemEquipments[slot]?.cash_item_coloring_prism &&
                                      <div className="absolute bottom-1 left-1 pointer-events-none z-10">
                                        <Image
                                          alt={"컬러링 프리즘"}
                                          src={ColoringPrismIcon}
                                          className="w-[22px] h-[20px]"
                                        />
                                      </div>
                                    }
                                    {
                                      androidCashitemEquipments[slot] && !["헤어", "성형", "피부"].includes(slot) &&
                                      <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                        <Image
                                          alt={androidCashitemEquipments[slot].cash_item_label || "캐시 아이템"}
                                          src={
                                            androidCashitemEquipments[slot].cash_item_label == "마스터라벨" && MasterLabelIcon ||
                                            androidCashitemEquipments[slot].cash_item_label == "레드라벨" && RedLabelIcon ||
                                            androidCashitemEquipments[slot].cash_item_label == "스페셜라벨" && SpecialLabelIcon ||
                                            androidCashitemEquipments[slot].cash_item_label == "블랙라벨" && BlackLabelIcon ||
                                            CashitemCoinIcon
                                          }
                                          height={20}
                                          width={20}
                                        />
                                      </div>
                                    }
                                    {
                                      (androidCashitemImageSrcs?.[slot] || "") &&
                                      <HoverCard
                                        openDelay={0}
                                        closeDelay={0}
                                        open={openHoverCard[slot]}
                                        onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                      >
                                        <HoverCardTrigger
                                          asChild
                                          onClick={() => setOpenHoverCard({ [slot]: true })}
                                        >
                                          <Image alt={slot} src={androidCashitemImageSrcs[slot]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                        </HoverCardTrigger>
                                        <HoverCardContent
                                          className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                          side={window.innerWidth < 768 ? "top" : "right"}
                                          sideOffset={10}
                                          onClick={() => setOpenHoverCard({ [slot]: false })}
                                        >
                                          <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                            <span>{androidCashitemEquipments[slot].cash_item_name}</span>
                                          </div>
                                          <div className="text-orange-400 text-xs mx-auto flex flex-wrap justify-center">
                                            <span>교환 불가</span>
                                          </div>
                                          {
                                            androidCashitemEquipments[slot].cash_item_label &&
                                            <>
                                              <div
                                                className={cn(
                                                  androidCashitemEquipments[slot].cash_item_label == "마스터라벨" && "text-cyan-400",
                                                  androidCashitemEquipments[slot].cash_item_label == "레드라벨" && "text-pink-700 font-bold",
                                                  androidCashitemEquipments[slot].cash_item_label == "스페셜라벨" && "text-neutral-400",
                                                  androidCashitemEquipments[slot].cash_item_label == "블랙라벨" && "text-amber-400",
                                                  "text-xs mx-auto flex flex-wrap justify-center"
                                                )}
                                              >
                                                <span>{androidCashitemEquipments[slot].cash_item_label}</span>
                                              </div>
                                            </>
                                          }
                                          {/* TODO: 넥슨 이새끼들 뭔가 아이템 유효기간이랑 옵션 유효기간이랑 뭔가 오류있는거같으니까 나중에 바뀌면 바꿀것 */}
                                          {
                                            androidCashitemEquipments[slot].date_option_expire &&
                                            <>
                                              <div className="text-xs mx-auto flex flex-wrap justify-center">
                                                <span>유효기간 :</span>
                                                <span className="ml-1">{new Date(androidCashitemEquipments[slot].date_option_expire).getFullYear()}년</span>
                                                <span className="ml-1">{String(new Date(androidCashitemEquipments[slot].date_option_expire).getMonth() + 1).padStart(2, "0")}월</span>
                                                <span className="ml-1">{String(new Date(androidCashitemEquipments[slot].date_option_expire).getDate()).padStart(2, "0")}일 </span>
                                                <span className="ml-1">{String(new Date(androidCashitemEquipments[slot].date_option_expire).getHours()).padStart(2, "0")}시 </span>
                                                <span className="ml-1">{String(new Date(androidCashitemEquipments[slot].date_option_expire).getMinutes()).padStart(2, "0")}분 </span>
                                                <span>까지 사용가능</span>
                                              </div>
                                            </>
                                          }
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                          <div className="px-2 mt-1">
                                            <div className="flex gap-1">
                                              <div className="w-auto">
                                                <div className={"relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300"}>
                                                  {
                                                    androidCashitemEquipments[slot]?.cash_item_coloring_prism &&
                                                    <div className="absolute bottom-1 left-1 pointer-events-none z-10">
                                                      <Image
                                                        alt={"컬러링 프리즘"}
                                                        src={ColoringPrismIcon}
                                                        className="w-[22px] h-[20px]"
                                                      />
                                                    </div>
                                                  }
                                                  {
                                                    (androidCashitemEquipments[slot] && !["헤어", "성형", "피부"].includes(slot)) &&
                                                    <div className="absolute bottom-1 right-1 pointer-events-none z-10">
                                                      <Image
                                                        alt={androidCashitemEquipments[slot].cash_item_label || "캐시 아이템"}
                                                        src={
                                                          androidCashitemEquipments[slot].cash_item_label == "마스터라벨" && MasterLabelIcon ||
                                                          androidCashitemEquipments[slot].cash_item_label == "레드라벨" && RedLabelIcon ||
                                                          androidCashitemEquipments[slot].cash_item_label == "스페셜라벨" && SpecialLabelIcon ||
                                                          androidCashitemEquipments[slot].cash_item_label == "블랙라벨" && BlackLabelIcon ||
                                                          CashitemCoinIcon
                                                        }
                                                        height={20}
                                                        width={20}
                                                      />
                                                    </div>
                                                  }
                                                  <Image alt={slot} src={androidCashitemImageSrcs[slot]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                </div>
                                              </div>
                                              <div className="w-full">
                                                <div className="text-end text-neutral-400 text-[9px]">
                                                  공격력 증가량
                                                </div>
                                                <div className="text-end text-3xl font-bold">
                                                  0
                                                </div>
                                                <ul className="text-[13px] mb-[3px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LEV : 0</li>
                                                </ul>
                                                <ul className="grid grid-cols-2 text-[13px]">
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                  <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                              <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                <div>초보자</div>
                                                <div>전사</div>
                                                <div>마법사</div>
                                                <div>궁수</div>
                                                <div>도적</div>
                                                <div>해적</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                          <div className="px-2 mt-2 text-sm">
                                            <div>
                                              <span>장비분류 : </span>
                                              <span>{androidCashitemEquipments[slot]?.cash_item_equipment_part}</span>
                                            </div>
                                            {
                                              androidCashitemEquipments[slot]?.cash_item_option?.map((option, index) => {
                                                return (
                                                  <div key={index} className="text-cyan-300">
                                                    <span className="uppercase">{itemStatKorean[option.option_type] || option.option_type} : </span>
                                                    <span>+{option.option_value}</span>
                                                    <span className="text-white"> (0</span>
                                                    <span className="text-violet-300"> +{option.option_value}</span>
                                                    <span className="text-white">)</span>
                                                  </div>
                                                )
                                              })
                                            }
                                          </div>
                                          {
                                            androidCashitemEquipments[slot].cash_item_description &&
                                            <>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              <div className="px-1 mt-2 text-sm">
                                                <span className="whitespace-pre-line">{(androidCashitemEquipments[slot].cash_item_description).replace(/\\n/g, "</br>")}</span>
                                              </div>
                                            </>
                                          }
                                          {
                                            androidCashitemEquipments[slot].cash_item_coloring_prism &&
                                            <>
                                              <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                              <div className="px-1 mt-2 text-sm text-lime-400">
                                                <div>
                                                  <span>컬러링 프리즘이 적용된 아이템입니다.</span>
                                                </div>
                                                <div>
                                                  <span>적용 범위 :</span>
                                                  <span> {androidCashitemEquipments[slot].cash_item_coloring_prism.color_range}</span>
                                                </div>
                                                <div>
                                                  <span>색조 :</span>
                                                  <span> {androidCashitemEquipments[slot].cash_item_coloring_prism.hue > 0 ? "+" : ""}{androidCashitemEquipments[slot].cash_item_coloring_prism.hue}, </span>
                                                  <span>채도 :</span>
                                                  <span> {androidCashitemEquipments[slot].cash_item_coloring_prism.saturation > 0 ? "+" : ""}{androidCashitemEquipments[slot].cash_item_coloring_prism.saturation}, </span>
                                                  <span>명도 :</span>
                                                  <span> {androidCashitemEquipments[slot].cash_item_coloring_prism.value > 0 ? "+" : ""}{androidCashitemEquipments[slot].cash_item_coloring_prism.value}</span>
                                                </div>
                                              </div>
                                            </>
                                          }
                                        </HoverCardContent>
                                      </HoverCard>
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="symbolEquipment">

                        <Tabs defaultValue="arcane" activationMode="manual" className="w-full">
                          <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-2">
                            <TabsTrigger value="arcane">아케인</TabsTrigger>
                            <TabsTrigger value="authentic" disabled={Object.keys(authenticSymbolEquipments).length >= 1 ? false : true}>어센틱</TabsTrigger>
                          </TabsList>

                          <TabsContent value="arcane">
                            <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 py-1 px-14 relative select-none rounded-md shadow-md">
                              <div className="grid grid-cols-3">
                                {
                                  Object.keys(arcaneSymbolEquipments)?.map((symbolName, symbolIndex) => {
                                    return (
                                      <div key={symbolIndex} className="rounded-lg border border-black dark:border-white border-opacity-50 text-card-foreground shadow-sm p-1 mt-2 mx-1">
                                        <div className="relative items-center aspect-square mt-[2.5px] mx-[2.5px] bg-background rounded">
                                          {
                                            <HoverCard
                                              openDelay={0}
                                              closeDelay={0}
                                              open={openHoverCard[symbolName]}
                                              onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                            >
                                              <HoverCardTrigger
                                                asChild
                                                onClick={() => setOpenHoverCard({ [symbolName]: true })}
                                              >
                                                {
                                                  arcaneSymbolImageSrcs?.[symbolName] &&
                                                  <Image alt={symbolName} src={arcaneSymbolImageSrcs[symbolName]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                                }
                                              </HoverCardTrigger>
                                              <HoverCardContent
                                                className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                                side={window.innerWidth < 768 ? "top" : "right"}
                                                sideOffset={10}
                                                onClick={() => setOpenHoverCard({ [symbolName]: false })}
                                              >
                                                <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                  <span>{arcaneSymbolEquipments[symbolName].symbol_name}</span>
                                                </div>
                                                <div className="text-orange-400 text-xs mx-auto flex flex-wrap justify-center">
                                                  <span>교환 불가</span>
                                                </div>
                                                <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                                <div className="px-2 mt-1">
                                                  <div className="flex gap-1">
                                                    <div className="w-auto">
                                                      <div className={"relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300"}>
                                                        <Image alt={symbolName} src={arcaneSymbolImageSrcs[symbolName]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                      </div>
                                                    </div>
                                                    <div className="w-full">
                                                      <div className="text-end text-neutral-400 text-[9px]">
                                                        공격력 증가량
                                                      </div>
                                                      <div className="text-end text-3xl font-bold">
                                                        0
                                                      </div>
                                                      <ul className="text-[13px] mb-[3px]">
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LEV : 200</li>
                                                      </ul>
                                                      <ul className="grid grid-cols-2 text-[13px]">
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                                    <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                      <div>초보자</div>
                                                      <div>전사</div>
                                                      <div>마법사</div>
                                                      <div>궁수</div>
                                                      <div>도적</div>
                                                      <div>해적</div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                <div className="px-2 mt-2 text-sm">
                                                  {
                                                    arcaneSymbolEquipments[symbolName].symbol_level &&
                                                    <div className="text-yellow-400">
                                                      <span>성장 레벨 : </span>
                                                      <span>{arcaneSymbolEquipments[symbolName].symbol_level}</span>
                                                    </div>
                                                  }
                                                  {
                                                    arcaneSymbolEquipments[symbolName].symbol_level < 20 ?
                                                      <div className="text-yellow-400">
                                                        <span>성장치 : </span>
                                                        <span>{arcaneSymbolEquipments[symbolName].symbol_growth_count}</span>
                                                        <span> / </span>
                                                        <span>{arcaneSymbolEquipments[symbolName].symbol_require_growth_count}</span>
                                                        <span> ( </span>
                                                        <span>
                                                          {
                                                            parseInt((arcaneSymbolEquipments[symbolName].symbol_growth_count / arcaneSymbolEquipments[symbolName].symbol_require_growth_count) * 100) > 100 ?
                                                              100 :
                                                              parseInt((arcaneSymbolEquipments[symbolName].symbol_growth_count / arcaneSymbolEquipments[symbolName].symbol_require_growth_count) * 100)
                                                          }%
                                                        </span>
                                                        <span> )</span>
                                                      </div> :
                                                      <div className="text-yellow-400">
                                                        <span>성장치 : MAX</span>
                                                      </div>
                                                  }
                                                  {
                                                    Object.keys(arcaneSymbolEquipments[symbolName]).map((symbolInnerKey, symbolInnerIndex) => {
                                                      if (arcaneSymbolEquipments[symbolName][symbolInnerKey] == 0) return;
                                                      return (
                                                        itemStatOptionOrder.includes(symbolInnerKey.replace("symbol_", "")) &&
                                                        <div key={symbolInnerIndex}>
                                                          <span className="uppercase">{itemStatKorean[arcaneSymbolEquipments[symbolName][symbolInnerKey]] || symbolInnerKey.replace("symbol_", "")} : </span>
                                                          <span>+{arcaneSymbolEquipments[symbolName][symbolInnerKey]}</span>
                                                        </div>
                                                      )
                                                    })
                                                  }
                                                  {
                                                    arcaneSymbolEquipments[symbolName].symbol_force &&
                                                    <div>
                                                      <span>ARC : </span>
                                                      <span> +{arcaneSymbolEquipments[symbolName].symbol_force}</span>
                                                    </div>
                                                  }
                                                  <div>
                                                    <span>잠재능력 설정 불가</span>
                                                  </div>
                                                </div>
                                                {
                                                  arcaneSymbolEquipments[symbolName].symbol_description &&
                                                  <>
                                                    <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                    <div className="px-1 mt-2 text-sm">
                                                      <span className="whitespace-pre-line">{(arcaneSymbolEquipments[symbolName].symbol_description).replace(/\\n/g, "</br>")}</span>
                                                    </div>
                                                  </>
                                                }
                                              </HoverCardContent>
                                            </HoverCard>
                                          }
                                        </div>
                                        {
                                          arcaneSymbolEquipments[symbolName].symbol_level < 20 ?
                                            <div className="text-center mb-1">
                                              <div className="mb-1">
                                                Lv.{arcaneSymbolEquipments[symbolName].symbol_level}
                                              </div>
                                              <div>
                                                <Progress className="h-[6px] bg-background" value={parseInt((arcaneSymbolEquipments[symbolName].symbol_growth_count / arcaneSymbolEquipments[symbolName].symbol_require_growth_count) * 100)} />
                                              </div>
                                            </div> :
                                            <div className="text-center mb-1 mt-2">
                                              <span>MAX</span>
                                            </div>
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="authentic">
                            <div className="mt-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 py-1 px-14 relative select-none rounded-md shadow-md">
                              <div className="grid grid-cols-3">
                                {
                                  Object.keys(authenticSymbolEquipments)?.map((symbolName, symbolIndex) => {
                                    return (
                                      <div key={symbolIndex} className="rounded-lg border border-black dark:border-white border-opacity-50 text-card-foreground shadow-sm p-1 mt-2 mx-1">
                                        <div className="relative items-center aspect-square mt-[2.5px] mx-[2.5px] bg-background rounded">
                                          {
                                            <HoverCard
                                              openDelay={0}
                                              closeDelay={0}
                                              open={openHoverCard[symbolName]}
                                              onOpenChange={(stat) => setOpenHoverCard(() => ({ [stat]: false }))}
                                            >
                                              <HoverCardTrigger
                                                asChild
                                                onClick={() => setOpenHoverCard({ [symbolName]: true })}
                                              >
                                                {
                                                  authenticSymbolImageSrcs?.[symbolName] &&
                                                  <Image alt={symbolName} src={authenticSymbolImageSrcs[symbolName]} className="object-contain mx-auto transition-all scale-75 hover:scale-100" fill sizes="50px"></Image>
                                                }
                                              </HoverCardTrigger>
                                              <HoverCardContent
                                                className="text-white w-80 py-3 px-1 bg-neutral-800 dark:bg-popover"
                                                side={window.innerWidth < 768 ? "top" : "right"}
                                                sideOffset={10}
                                                onClick={() => setOpenHoverCard({ [symbolName]: false })}
                                              >
                                                <div className="gap-1 mx-auto flex flex-wrap justify-center font-semibold">
                                                  <span>{authenticSymbolEquipments[symbolName].symbol_name}</span>
                                                </div>
                                                <div className="text-orange-400 text-xs mx-auto flex flex-wrap justify-center">
                                                  <span>교환 불가</span>
                                                </div>
                                                <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-3"></div>
                                                <div className="px-2 mt-1">
                                                  <div className="flex gap-1">
                                                    <div className="w-auto">
                                                      <div className={"relative flex items-center w-[80px] h-[80px] mt-2 rounded bg-gradient-to-b from-gray-500 to-neutral-300"}>
                                                        {
                                                          authenticSymbolImageSrcs?.[symbolName] &&
                                                          <Image alt={symbolName} src={authenticSymbolImageSrcs[symbolName]} className="object-contain scale-75 mx-auto" fill sizes="50px"></Image>
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="w-full">
                                                      <div className="text-end text-neutral-400 text-[9px]">
                                                        공격력 증가량
                                                      </div>
                                                      <div className="text-end text-3xl font-bold">
                                                        0
                                                      </div>
                                                      <ul className="text-[13px] mb-[3px]">
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LEV : 200</li>
                                                      </ul>
                                                      <ul className="grid grid-cols-2 text-[13px]">
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ STR : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ LUK : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ DEX : ---</li>
                                                        <li className={cn(interVT323.className, "h-3 ml-4 text-neutral-400 tracking-[.1em] list-disc marker:text-neutral-400")}>REQ INT : ---</li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  <div className="mt-2 bg-neutral-900 border-neutral-600 border-[1px] justify-between flex flex-col flex-1 py-[1px] px-1 relative rounded">
                                                    <div className="grid grid-cols-6 justify-items-center text-[12px] text-neutral-500">
                                                      <div>초보자</div>
                                                      <div>전사</div>
                                                      <div>마법사</div>
                                                      <div>궁수</div>
                                                      <div>도적</div>
                                                      <div>해적</div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                <div className="px-2 mt-2 text-sm">
                                                  {
                                                    authenticSymbolEquipments[symbolName].symbol_level &&
                                                    <div className="text-yellow-400">
                                                      <span>성장 레벨 : </span>
                                                      <span>{authenticSymbolEquipments[symbolName].symbol_level}</span>
                                                    </div>
                                                  }
                                                  {
                                                    authenticSymbolEquipments[symbolName].symbol_level < 11 ?
                                                      <div className="text-yellow-400">
                                                        <span>성장치 : </span>
                                                        <span>{authenticSymbolEquipments[symbolName].symbol_growth_count}</span>
                                                        <span> / </span>
                                                        <span>{authenticSymbolEquipments[symbolName].symbol_require_growth_count}</span>
                                                        <span> ( </span>
                                                        <span>
                                                          {
                                                            parseInt((authenticSymbolEquipments[symbolName].symbol_growth_count / authenticSymbolEquipments[symbolName].symbol_require_growth_count) * 100) > 100 ?
                                                              100 :
                                                              parseInt((authenticSymbolEquipments[symbolName].symbol_growth_count / authenticSymbolEquipments[symbolName].symbol_require_growth_count) * 100)
                                                          }%
                                                        </span>
                                                        <span> )</span>
                                                      </div> :
                                                      <div className="text-yellow-400">
                                                        <span>성장치 : MAX</span>
                                                      </div>
                                                  }
                                                  {
                                                    Object.keys(authenticSymbolEquipments[symbolName]).map((symbolInnerKey, symbolInnerIndex) => {
                                                      if (authenticSymbolEquipments[symbolName][symbolInnerKey] == 0) return;
                                                      return (
                                                        itemStatOptionOrder.includes(symbolInnerKey.replace("symbol_", "")) &&
                                                        <div key={symbolInnerIndex}>
                                                          <span className="uppercase">{itemStatKorean[authenticSymbolEquipments[symbolName][symbolInnerKey]] || symbolInnerKey.replace("symbol_", "")} : </span>
                                                          <span>+{authenticSymbolEquipments[symbolName][symbolInnerKey]}</span>
                                                        </div>
                                                      )
                                                    })
                                                  }
                                                  {
                                                    authenticSymbolEquipments[symbolName].symbol_force &&
                                                    <div>
                                                      <span>AUT : </span>
                                                      <span> +{authenticSymbolEquipments[symbolName].symbol_force}</span>
                                                    </div>
                                                  }
                                                  <div>
                                                    <span>잠재능력 설정 불가</span>
                                                  </div>
                                                </div>
                                                {
                                                  authenticSymbolEquipments[symbolName].symbol_description &&
                                                  <>
                                                    <div className="border-dotted border-b-[1px] border-gray-600 w-full mt-2"></div>
                                                    <div className="px-1 mt-2 text-sm">
                                                      <span className="whitespace-pre-line">{(authenticSymbolEquipments[symbolName].symbol_description).replace(/\\n/g, "</br>")}</span>
                                                    </div>
                                                  </>
                                                }
                                              </HoverCardContent>
                                            </HoverCard>
                                          }
                                        </div>
                                        {
                                          authenticSymbolEquipments[symbolName].symbol_level < 11 ?
                                            <div className="text-center mb-1">
                                              <div className="mb-1">
                                                Lv.{authenticSymbolEquipments[symbolName].symbol_level}
                                              </div>
                                              <div>
                                                <Progress className="h-[6px] bg-background" value={parseInt((authenticSymbolEquipments[symbolName].symbol_growth_count / authenticSymbolEquipments[symbolName].symbol_require_growth_count) * 100)} />
                                              </div>
                                            </div> :
                                            <div className="text-center mb-1 mt-2">
                                              <span>MAX</span>
                                            </div>
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>

                      </TabsContent>
                    </Tabs>
                  </div>
                  <div className="col-span-3 lg:col-span-2 bg-muted bg-opacity-20 justify-between flex flex-col flex-1 p-2 relative rounded-md shadow-md">
                    {
                      characterStat &&
                      <div className="flex flex-col">
                        <div className="bg-background rounded">
                          <div className="text-3xl text-center my-2">
                            <span>전투력 : </span>
                            <span>{parseInt(characterStat["전투력"] || 0).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col lg:flex-row mt-2 gap-2">
                          <div className="text-lg basis-full lg:basis-1/3 bg-background rounded py-2">
                            <div className="basis-auto space-y-2 px-5 lg:px-12 flex flex-col h-full justify-center">
                              <div className="flex justify-between">
                                <div className="text-start">STR</div>
                                <div className="text-end">{parseInt(characterStat["STR"] || 0).toLocaleString()}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">DEX</div>
                                <div className="text-end">{parseInt(characterStat["DEX"] || 0).toLocaleString()}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">INT</div>
                                <div className="text-end">{parseInt(characterStat["INT"] || 0).toLocaleString()}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">LUK</div>
                                <div className="text-end">{parseInt(characterStat["LUK"] || 0).toLocaleString()}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">HP</div>
                                <div className="text-end">{parseInt(characterStat["HP"] || 0).toLocaleString()}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">MP</div>
                                <div className="text-end">{parseInt(characterStat["MP"] || 0).toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-lg basis-full lg:basis-2/3 bg-background rounded py-2">
                            <div className="basis-auto space-y-2 px-5 lg:px-20 flex flex-col h-full justify-center">
                              <div className="flex justify-between">
                                <div className="text-start">보스 몬스터 데미지</div>
                                <div className="text-end">{parseFloat(characterStat["보스 몬스터 데미지"] || 0).toLocaleString()}%</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">방어율 무시</div>
                                <div className="text-end">{parseFloat(characterStat["방어율 무시"] || 0).toLocaleString()}%</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">크리티컬 확률</div>
                                <div className="text-end">{parseFloat(characterStat["크리티컬 확률"] || 0).toLocaleString()}%</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">크리티컬 데미지</div>
                                <div className="text-end">{parseFloat(characterStat["크리티컬 데미지"] || 0).toLocaleString()}%</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-start">재사용 대기시간 감소</div>
                                <div className="text-end">{parseInt(characterStat["재사용 대기시간 감소 (초)"] || 0).toLocaleString()}초/{parseFloat(characterStat["재사용 대기시간 감소 (%)"] || 0).toLocaleString()}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg basis-full bg-background rounded py-2 mt-2">
                          <div className="flex flex-col lg:flex-row gap-2">
                            <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                              <div className="basis-auto space-y-2 pl-5 lg:pl-12 pr-5 lg:pr-6 flex flex-col h-full justify-center">
                                <div className="flex justify-between">
                                  <div className="text-start">최대 스탯 공격력</div>
                                  <div className="text-end">{parseInt(characterStat["최대 스탯공격력"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">최소 스탯 공격력</div>
                                  <div className="text-end">{parseInt(characterStat["최소 스탯공격력"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">최종 데미지</div>
                                  <div className="text-end">{parseInt(characterStat["최종 데미지"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">데미지</div>
                                  <div className="text-end">{parseInt(characterStat["데미지"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">공격력</div>
                                  <div className="text-end">{parseInt(characterStat["공격력"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">마력</div>
                                  <div className="text-end">{parseInt(characterStat["마력"] || 0).toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                              <div className="basis-auto space-y-2 pr-5 lg:pr-12 pl-5 lg:pl-6 flex flex-col h-full justify-center">
                                <div className="flex justify-between">
                                  <div className="text-start">재사용 대기시간 미적용</div>
                                  <div className="text-end">{parseFloat(characterStat["재사용 대기시간 미적용"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">일반 몬스터 데미지</div>
                                  <div className="text-end">{parseFloat(characterStat["일반 몬스터 데미지"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">소환수 지속시간</div>
                                  <div className="text-end">{parseFloat(characterStat["소환수 지속시간 증가"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">버프 지속시간</div>
                                  <div className="text-end">{parseFloat(characterStat["버프 지속시간"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">속성 내성 무시</div>
                                  <div className="text-end">{parseFloat(characterStat["속성 내성 무시"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">상태이상 추가 데미지</div>
                                  <div className="text-end">{parseFloat(characterStat["상태이상 추가 데미지"] || 0).toLocaleString()}%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg basis-full bg-background rounded py-2 mt-2">
                          <div className="flex flex-col lg:flex-row gap-2">
                            <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                              <div className="basis-auto space-y-2 pl-5 lg:pl-12 pr-5 lg:pr-6 flex flex-col h-full justify-center">
                                <div className="flex justify-between">
                                  <div className="text-start">아케인포스</div>
                                  <div className="text-end">{parseInt(characterStat["아케인포스"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">어센틱포스</div>
                                  <div className="text-end">{parseInt(characterStat["어센틱포스"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">스타포스</div>
                                  <div className="text-end">{parseInt(characterStat["스타포스"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">공격속도</div>
                                  <div className="text-end">{parseInt(characterStat["공격 속도"] || 0).toLocaleString()}단계</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">스탠스</div>
                                  <div className="text-end">{parseFloat(characterStat["스탠스"] || 0).toLocaleString()}%</div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-1/2 flex flex-col lg:flex-ro gap-2">
                              <div className="basis-auto space-y-2 pr-5 lg:pr-12 pl-5 lg:pl-6 flex flex-col h-full justify-center">
                                <div className="flex justify-between">
                                  <div className="text-start">메소 획득량</div>
                                  <div className="text-end">{parseFloat(characterStat["메소 획득량"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">아이템 드롭률</div>
                                  <div className="text-end">{parseFloat(characterStat["아이템 드롭률"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">추가 경험치 획득</div>
                                  <div className="text-end">{parseFloat(characterStat["추가 경험치 획득"] || 0).toLocaleString()}%</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">상태이상 내성</div>
                                  <div className="text-end">{parseInt(characterStat["상태이상 내성"] || 0).toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-start">방어력</div>
                                  <div className="text-end">{parseInt(characterStat["방어력"] || 0).toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </TabsContent >

              <TabsContent value="skill">content</TabsContent>
              <TabsContent value="union">content</TabsContent>
              <TabsContent value="contents">content</TabsContent>
              <TabsContent value="accountCharacters">content</TabsContent>
            </Tabs >
          </div >
        </>
      }
    </>
  );
}