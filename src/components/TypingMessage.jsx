import { useEffect, useRef, useState } from "react";



export default function TypingMessage({ text, onDone }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const idx = useRef(0);

    useEffect(() => {
        idx.current = 0;
        setDisplayed("");
        setDone(false);
        const interval = setInterval(() => {
            if (idx.current < text.length) {
                setDisplayed(text.slice(0, idx.current + 1));
                idx.current++;
            } else {
                clearInterval(interval);
                setDone(true);
                onDone && onDone();
            }
        }, 12);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="whitespace-pre-wrap leading-relaxed text-[14px] text-[#d4d4d4]">
            {displayed}
            {!done && <span className="inline-block w-0.5 h-3.5 bg-[#666] ml-0.5 animate-pulse align-middle" />}
        </span>
    );
}