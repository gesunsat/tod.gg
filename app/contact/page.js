import Link from "next/link";

export default function Contact() {
    return (
        <>
            <div className="flex flex-col justify-center place-items-center h-full space-y-5">
                <div>
                    <span>이메일 : </span>
                    {/* <Link href="mailto:admin@tod.gg">admin@tod.gg</Link> */}
                    <Link href="mailto:todgg@naver.com">todgg@naver.com</Link>
                </div>
                <div>
                    <span>디스코드 : </span>
                    <Link href="https://discord.gg/2p85XNddVS">https://discord.gg/2p85XNddVS</Link>
                </div>
            </div>
        </>
    );
}