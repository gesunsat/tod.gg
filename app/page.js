import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

const notice = [
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
  },
  {
    title: "2024.01.18",
    content: ["캐릭터 페이지 > 데이터 조회 날짜 선택 기능 추가", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.16",
    content: ["캐릭터 페이지 > 유니온 탭 활성화", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.15",
    content: ["캐릭터 페이지 > 컨텐츠/랭킹 탭 활성화", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.13",
    content: ["캐릭터 페이지 > 스킬 탭 > 6차, 5차, 링크 스킬 표기", "넥슨 API 업데이트 대응", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.12",
    content: ["캐릭터 페이지 > 스킬 탭 > 6차 스킬 작업", "버그 수정 및 성능 개선"],
  },
  {
    title: "2024.01.11",
    content: ["캐릭터 페이지 > 스탯/장비 탭 > 하이퍼 스탯, 어빌리티 표기", "캐릭터 페이지 > 보유 캐릭터 탭 활성화"],
  },
  {
    title: "2024.01.10",
    content: ["길드 페이지 > 캐릭터 정보(이미지, 레벨, 직업, 전투력) 표기", "길드 페이지 > 검색, 정렬, 갱신 버튼 추가"],
  },
  {
    title: "2024.01.09",
    content: ["길드 검색 지원", "길드 페이지 추가"],
  },
  {
    title: "2024.01.07",
    content: ["가오픈"],
  }
]

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex justify-center">
          <Link target="_blank" href="https://discord.gg/kGpvfKynwC">
            <Image
              src="/discord.svg"
              alt="Discord"
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
