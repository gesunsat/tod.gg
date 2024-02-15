import { Button } from "@/components/ui/button";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { serverOpenList } from "@/mapleData/serverOpenList";

export default async function IndexGuildList(props) {
  const guildName = props.guildName;

  const guildIds = {};

  const promises = [];
  for (const server of serverOpenList) {
    promises.push((async () => { guildIds[server] = (await getGuildID(server, guildName))?.oguild_id })());
  }
  await Promise.all(promises);

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
                      <div className="flex gap-2">
                        <div className="self-center">
                          <Image
                            src={serverIconImg[guildId]}
                            alt={guildId}
                            height={0}
                            width={0}
                            className="w-auto h-[28px]"
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