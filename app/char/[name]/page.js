import { getCharPopularity } from "@/lib/nexonAPI/getCharPopularity";
import Equipment from "./statEquipment/equipment";
import Stat from "./statEquipment/stat";
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

export default async function StatEquipment({ params, searchParams }) {
    const characterName = decodeURI(params.name);
    const selectedDate = searchParams?.date;
    const OCID = await getCharOCID(characterName);

    const [
        charBasic,
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
        getCharBasic(OCID.ocid, selectedDate),
        getCharPopularity(OCID.ocid, selectedDate),
        getCharAbility(OCID.ocid, selectedDate),
        getCharStat(OCID.ocid, selectedDate),
        getCharHyperStat(OCID.ocid, selectedDate),
        getCharItemEquipment(OCID.ocid, selectedDate),
        getCharCashitemEquipment(OCID.ocid, selectedDate),
        getCharSymbolEquipment(OCID.ocid, selectedDate),
        getCharBeautyEquipment(OCID.ocid, selectedDate),
        getCharAndroidEquipment(OCID.ocid, selectedDate),
        getCharPetEquipment(OCID.ocid, selectedDate),
    ]);

    const character = {
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
        <div className="grid grid-cols-3 gap-2">
            <Equipment character={character} />
            <Stat character={character} />
        </div>
    )
}