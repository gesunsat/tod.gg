import { Button } from "@/components/ui/button";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function IndexGuildList(props) {
  const guildName = props.guildName;

  const guildIds = {};
  await Promise.all([
    (async () => { guildIds["스카니아"] = (await getGuildID("스카니아", guildName))?.oguild_id })(),
    (async () => { guildIds["베라"] = (await getGuildID("베라", guildName))?.oguild_id })(),
    (async () => { guildIds["루나"] = (await getGuildID("루나", guildName))?.oguild_id })(),
    (async () => { guildIds["제니스"] = (await getGuildID("제니스", guildName))?.oguild_id })(),
    (async () => { guildIds["크로아"] = (await getGuildID("크로아", guildName))?.oguild_id })(),
    (async () => { guildIds["유니온"] = (await getGuildID("유니온", guildName))?.oguild_id })(),
    (async () => { guildIds["엘리시움"] = (await getGuildID("엘리시움", guildName))?.oguild_id })(),
    (async () => { guildIds["이노시스"] = (await getGuildID("이노시스", guildName))?.oguild_id })(),
    (async () => { guildIds["레드"] = (await getGuildID("레드", guildName))?.oguild_id })(),
    (async () => { guildIds["오로라"] = (await getGuildID("오로라", guildName))?.oguild_id })(),
    (async () => { guildIds["아케인"] = (await getGuildID("아케인", guildName))?.oguild_id })(),
    (async () => { guildIds["노바"] = (await getGuildID("노바", guildName))?.oguild_id })(),
    (async () => { guildIds["리부트"] = (await getGuildID("리부트", guildName))?.oguild_id })(),
    (async () => { guildIds["리부트2"] = (await getGuildID("리부트2", guildName))?.oguild_id })(),
  ])
  Object.keys(guildIds).map((guildId) => {
    if (!guildIds[guildId]) delete guildIds[guildId];
  })

  return (
    <div>
      {
        guildName != "" &&
        <div className="text-center text-3xl mb-3">
          &quot;{guildName}&quot; 길드 검색 결과
        </div>
      }
      {
        (guildName != "" && Object.keys(guildIds).length == 0) &&
        <PlusCircleIcon className="mx-auto my-14 rotate-45 scale-[3]" />
      }
      {
        (guildName != "" && Object.keys(guildIds).length >= 1) &&
        <div className="grid grid-cols-4 gap-2 p-2 mt-10">
          {
            Object.keys(guildIds).map((guildId, guildIdIndex) => {
              return (
                <div key={guildIdIndex} className="col-span-4 lg:col-span-1">
                  <Button variant="secondary" className="w-full h-16" asChild>
                    <Link href={`/guild/${guildId}/${guildName}`}>
                      <div className="flex gap-3">
                        <div className="self-center">
                          <Image
                            src={serverIconImg[guildId]}
                            alt={guildId}
                            height={21}
                            width={21}
                          />
                        </div>
                        <span className="text-xl">{guildId}</span>
                      </div>
                    </Link>
                  </Button>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}