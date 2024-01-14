import { getCharPopularity } from "@/lib/nexonAPI/getCharPopularity";
import Equipment from "./equipment";
import Stat from "./stat";
import { getCharAbility } from "@/lib/nexonAPI/getCharAbility";
import { getCharStat } from "@/lib/nexonAPI/getCharStat";
import { getCharHyperStat } from "@/lib/nexonAPI/getCharHyperStat";
import { getCharItemEquipment } from "@/lib/nexonAPI/getCharItemEquipment";
import { getCharCashitemEquipment } from "@/lib/nexonAPI/getCharCashitemEquipment";
import { getCharSymbolEquipment } from "@/lib/nexonAPI/getCharSymbolEquipment";
import { getCharBeautyEquipment } from "@/lib/nexonAPI/getCharBeautyEquipment";
import { getCharAndroidEquipment } from "@/lib/nexonAPI/getCharAndroidEquipment";
import { getCharPetEquipment } from "@/lib/nexonAPI/getCharPetEquipment";
import { getCharOCID } from "@/lib/nexonAPI/getCharOCID";
import { getCharBasic } from "@/lib/nexonAPI/getCharBasic";
import { getGuildID } from "@/lib/nexonAPI/getGuildID";
import { getGuildBasic } from "@/lib/nexonAPI/getGuildBasic";

export default async function StatEquipment({ params }) {
    const characterName = decodeURI(params.name);
    const OCID = await getCharOCID(characterName);
    const charBasic = await getCharBasic(OCID.ocid);

    const guildName = charBasic?.character_guild_name;
    const worldName = charBasic?.world_name;
    let guildID = {};
    let guildBasic = {};
    if (guildName) {
        guildID = await getGuildID(worldName, guildName);
        guildBasic = await getGuildBasic(guildID.oguild_id);
    }

    const [
        charPopularity,
        charAbility,
        charStat,
        charHyperStat,
        charItemEquipment,
        charCashitemEquipment,
        charSymbolEquipment,
        charBeautyEquipment,
        charAndroidEquipment,
        charPetEquipment,
    ] = await Promise.all([
        getCharPopularity(OCID.ocid),
        getCharAbility(OCID.ocid),
        getCharStat(OCID.ocid),
        getCharHyperStat(OCID.ocid),
        getCharItemEquipment(OCID.ocid),
        getCharCashitemEquipment(OCID.ocid),
        getCharSymbolEquipment(OCID.ocid),
        getCharBeautyEquipment(OCID.ocid),
        getCharAndroidEquipment(OCID.ocid),
        getCharPetEquipment(OCID.ocid),
    ]);

    const user = {
        "characterBasic": charBasic,
        "characterPopularity": charPopularity,
        "characterPopularity": charPopularity,
        "characterAbility": charAbility,
        "characterStat": charStat,
        "characterHyperStat": charHyperStat,
        "characterItemEquipment": charItemEquipment,
        "characterCashitemEquipment": charCashitemEquipment,
        "characterSymbolEquipment": charSymbolEquipment,
        "characterBeautyEquipment": charBeautyEquipment,
        "characterAndroidEquipment": charAndroidEquipment,
        "characterPetEquipment": charPetEquipment,
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                <Equipment character={user} />
                <Stat character={user} />
            </div>
        </div>
    )
}