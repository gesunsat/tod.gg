"use client";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function CharHeaderCharacterImage(props) {
    const character = props.character;

    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const [isFavoriteCharacter, setIsFavoriteCharacter] = useState(false);
    useEffect(() => {
        const favoriteCharacters = JSON.parse(localStorage.getItem("favoriteCharacters") || "[]");

        const character_name = character.characterBasic.character_name;
        for (const character of Object.values(favoriteCharacters)) {
            if (character.character_name === character_name) {
                setIsFavoriteCharacter(true);
                break;
            }
        }

        setFavoriteCharacters(favoriteCharacters);
    }, [])

    const handleFavoritesCharacters = () => {
        const character_name = character.characterBasic.character_name;

        let existCharacterIndex = -1;
        for (const [index, character] of Object.entries(favoriteCharacters)) {
            if (character.character_name === character_name) {
                existCharacterIndex = index;
                break;
            }
        }

        const newFavoritesCharacters = [...favoriteCharacters];
        const handleData = {
            "character_image": character.characterBasic?.character_image || "",
            "character_class": character.characterBasic.character_class || "",
            "character_name": character.characterBasic?.character_name || "",
            "character_level": character.characterBasic.character_level || "",
            "world_name": character.characterBasic.world_name || "",
        }
        if (existCharacterIndex == -1) {
            newFavoritesCharacters.push(handleData);
            setIsFavoriteCharacter(true);
        } else {
            newFavoritesCharacters.splice(existCharacterIndex, 1);
            setIsFavoriteCharacter(false);
        }

        localStorage.setItem("favoriteCharacters", JSON.stringify(newFavoritesCharacters))

        setFavoriteCharacters(newFavoritesCharacters);
    }

    return (
        <div className="col-span-4 lg:col-span-1 text-center p-3 relative">
            {
                character?.characterBasic?.character_image &&
                <div
                    style={{ '--image-url': `url(${character.characterBasic.character_image})` }}
                    className={"relative h-56 lg:h-full overflow-hidden bg-negative-fixed-more text-positive-fixed bg-center bg-no-repeat bg-contain bg-[image:var(--image-url)]"}
                />
            }
            <div className="absolute top-0 right-0 p-1">
                <Star
                    onClick={handleFavoritesCharacters}
                    className={cn(
                        "transition-all ease-in hover:stroke-yellow-500 dark:hover:stroke-yellow-500 cursor-pointer",
                        isFavoriteCharacter ? "stroke-yellow-500 fill-yellow-500" : "stroke-black dark:stroke-white fill-transparent"
                    )}
                />
            </div>
        </div>
    )
}
