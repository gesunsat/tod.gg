import { Button } from "@/components/ui/button";
import { serverIconImg } from "@/mapleData/serverIconImg";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { serverOpenList } from "@/mapleData/serverOpenList";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { getLastWeekRankingDate } from "@/lib/getLastWeekRankingDate";

export default async function IndexGuildList(props) {
  const guildName = props.guildName;

  const guildBasics = {};
  const promises = [];
  for (const server of serverOpenList) {
    promises.push((async () => {
      const OGUILD = (await getGuildID(server, guildName))?.oguild_id;
      if (!OGUILD) return;
      guildBasics[server] = await getGuildBasic(OGUILD, getLastWeekRankingDate());
    })());
  }
  await Promise.all(promises);

  // console.log(guildBasics)

  return (
    <div>
      {
        guildName != "" &&
        <div className="text-center text-3xl mb-3">
          &quot;{guildName}&quot; 길드 검색 결과
        </div>
      }
      {
        (guildName != "" && Object.keys(guildBasics).length == 0) &&
        <PlusCircleIcon className="mx-auto my-14 rotate-45 scale-[3]" />
      }
      {
        (guildName != "" && Object.keys(guildBasics).length >= 1) &&
        <div className="grid grid-cols-4 gap-2 p-2 mt-10">
          {
            Object.keys(guildBasics).map((server, serverIndex) => {
              return (
                <div key={serverIndex} className="col-span-4 lg:col-span-1">
                  <Button variant="secondary" className="w-full h-16" asChild>
                    <Link href={`/guild/${server}/${guildName}`} className="h-auto space-x-2">
                      {
                        (guildBasics[server].guild_mark || guildBasics[server].guild_mark_custom) &&
                        <div className="w-[51px] h-[51px] relative self-center">
                          {
                            guildBasics[server]?.guild_mark ?
                              <div
                                style={{ '--image-url': `url(${guildBasics[server].guild_mark})` }}
                                className={"w-full h-full bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                              /> :
                              <div
                                style={{ '--image-url': `url(data:image/png;base64,${guildBasics[server].guild_mark_custom || ""})` }}
                                className={"w-full h-full bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                              />
                          }
                        </div>
                      }
                      <div>
                        <div className="flex gap-1 justify-center">
                          <div className="self-center">
                            <Image
                              src={serverIconImg[server]}
                              alt={server}
                              height={0}
                              width={0}
                              className="w-auto h-[28px]"
                            />
                          </div>
                          <span className="text-base self-center">{server}</span>
                        </div>
                        <div className="text-base text-center">Lv.{guildBasics[server].guild_level} | {guildBasics[server].guild_member_count}명</div>
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