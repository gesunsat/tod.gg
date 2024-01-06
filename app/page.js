import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const notice = [
  {
    title: "2023.01.01",
    content: ["첫 오픈 할려했던것"],
  }
]

export default function Home() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5">
      <div>
        <div className="text-center text-xl">
          공지 / 업데이트
        </div>
        <Accordion type="single" collapsible className="w-full mt-5">
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
