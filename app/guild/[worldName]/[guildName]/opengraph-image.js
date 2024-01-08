/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";

export const size = {
    width: 64,
    height: 64,
};
export const alt = "길드 이미지 | TOD.GG";
export const contentType = "image/png";

export default async function og({ params }) {
    try {
        const guildID = await getGuildID(decodeURI(params.worldName), decodeURI(params.guildName));
        const guildBasic = await getGuildBasic(guildID.oguild_id);

        return new ImageResponse(
            (
                <div tw="relative flex w-full h-full items-center justify-center">
                    {/* Background */}
                    <div tw="absolute flex inset-0">
                        <img
                            tw="flex flex-1"
                            src={guildBasic?.guild_mark || `data:image/png;base64,${guildBasic.guild_mark_custom}`}
                            alt={guildBasic?.guild_name}
                        />
                    </div>
                </div>
            ),
            size
        );
    } catch (err) {
        console.log(`${err.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}