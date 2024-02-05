import Link from "next/link";
import Style from "./footer.module.css";
import { cn } from "@/lib/utils"

export default function Footer(props) {
  return (
    <footer className="bg-card py-5">
      <div className="container px-3 mx-auto text-center text-sm">
        <div>This site is not associated with Nexon Korea & Nexon.</div>
        <div>Data based on NEXON Open API.</div>
        <div>Copyright © 2024-{new Date().getFullYear()} TOD.GG. All rights reserved.</div>
        <div>
          <ul className="flex justify-center">
            <li className={cn("flex justify-center items-center", Style.itemSeparator)}><Link href={"/policy"}>개인정보처리방침</Link></li>
            <li className={cn("flex justify-center items-center", Style.itemSeparator)}><Link href={"/contact"}>문의</Link></li>
          </ul>
        </div>
        <div className="text-xs text-gray-400">토드지지</div>
      </div>
    </footer>
  );
}