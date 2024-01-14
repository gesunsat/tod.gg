import CharacterInfo from '@/app/char/[name]/menu'
import { getCharBasic } from '@/lib/nexonAPI/getCharBasic';
import { getCharOCID } from '@/lib/nexonAPI/getCharOCID';
import { getCharStat } from '@/lib/nexonAPI/getCharStat';
import { getUserUnion } from '@/lib/nexonAPI/getUserUnion';

export default function CharPage({ params, children }) {
  return (
    <>
      {/* <CharacterInfo characterName={decodeURI(params.name)} /> */}
      {/* {children} */}
    </>
  );
}
