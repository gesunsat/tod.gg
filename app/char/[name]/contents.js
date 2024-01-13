"use client";

import { useEffect, useState } from "react";

export default function Contents(props) {
    const [character, setCharacter] = useState({});
    useEffect(() => {
        setCharacter(props.character);
        console.log(props.character);
    }, [])

    const [openHoverCard, setOpenHoverCard] = useState({});

    return (
        <>
            asd
        </>
    )
}