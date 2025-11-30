import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        media.addEventListener("change", listener);
        return () => {
            window.removeEventListener("resize", listener);
            media.removeEventListener("change", listener);
        }
    }, [matches, query]);

    return matches;
}
