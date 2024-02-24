import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import DiscordIcon from "@/public/discord.svg";

const notice = [
  {
    title: "2024.02.25",
    content: ["캐릭터 페이지 > 히스토리 전체 갱신 버튼 추가", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.02.17",
    content: ["랭킹 페이지 추가", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.02.01",
    content: ["즐겨찾기 기능 추가", "넥슨 API 업데이트 대응", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.18",
    content: ["캐릭터 페이지 > 유니온 아티펙트 탭 활성화", "넥슨 API 업데이트 대응", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.18",
    content: ["캐릭터 페이지 > 히스토리 탭 활성화", "버그 수정 및 성능 개선"],
  }
]

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex justify-center">
          <Link target="_blank" href="https://discord.gg/kGpvfKynwC">
            <DiscordIcon
              className="fill-black dark:fill-white"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5">
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 mt-2">
        <div className="text-center text-xl">
          공지 / 업데이트
        </div>
        <Accordion type="single" defaultValue="item-0" collapsible className="w-full mt-5">
          {
            notice.map((item, index) => (
              <AccordionItem key={index} value={"item-" + index}>
                <AccordionTrigger className="">{item.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside">
                    {
                      item.content.map((content, index) => (
                        <li key={index}>{content}</li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>
    </>
  )
}
