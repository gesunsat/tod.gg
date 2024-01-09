import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const notice = [
  {
    title: "2024.01.10",
    content: ["길드 페이지 > 캐릭터 정보(이미지, 레벨, 직업, 전투력) 표시", "길드 페이지 > 검색, 정렬, 갱신 버튼 추가"],
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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5">
      <div>
        <div className="text-center text-xs opacity-50">
          토드지지
        </div>
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
      </div >
    </div>
  )
}
