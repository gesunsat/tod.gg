import Link from "next/link";
import Style from "./footer.module.css";
import { cn } from "@/lib/utils"

export default function Footer(props) {
  return (
    <footer className="bg-card pb-5">
      <div className="container mx-auto">
        <div className="text-center text-sm">
          This site is not associated with Nexon Korea & Nexon.
        </div>
        <div className="text-center text-sm">
          Copyright © 2024-{new Date().getFullYear()} TOD.GG. All rights reserved.
        </div>
        <div className="text-center text-sm">
          <ul className="flex mx-auto justify-center">
            <li className={cn("flex justify-center items-center", Style.itemSeparator)}><Link href={"/policy"}>개인정보처리방침</Link></li>
            <li className={cn("flex justify-center items-center", Style.itemSeparator)}><Link href={"/contact"}>문의</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}