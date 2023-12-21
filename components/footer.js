import Container from "@/components/container";
import Link from "next/link";
import Style from "./footer.module.css";
import { cx } from "@/utils/all";

export default function Footer(props) {
  return (
    <footer>
      <Container className="mt-10 border-t border-gray-100 dark:border-gray-700">
        <div className="mt-2 text-center text-sm">
          This site is not associated with Nexon Korea & Nexon.
        </div>
        <div className="text-center text-sm">
          Copyright © 2023-{new Date().getFullYear()} GE. All rights reserved.
        </div>
        <div className="text-center text-sm">
          <ul className="flex mx-auto justify-center">
            <li className={cx("flex justify-center items-center", Style.itemSeparator)}><Link href={"policy"}>개인정보처리방침</Link></li>
            <li className={cx("flex justify-center items-center", Style.itemSeparator)}><Link href={"contact"}>문의</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}