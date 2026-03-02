import { useEffect, useRef, useState } from "react";

const titles = [
    "Find Jobs by Skill or Role",
    "Discover Jobs That Match You",
    "Your Job Search Starts Here",
    "Search Smarter. Get Hired Faster.",
];

export function RotatingTitleo() {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = titles[index];
        const speed = isDeleting ? 50 : 70;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(current.substring(0, text.length + 1));
                if (text === current) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setText(current.substring(0, text.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);

    return (
        <div className="text-4xl font-bold">
            {text}
            <span className="animate-pulse">|</span>
        </div>
    );
}





export function RotatingUpwardTitle() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setAnimate(false);
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden font-bold text-xl sm:text-xl md:text-4xl h-[1.5em] flex items-center justify-center">
      <div
        key={index}
        className={`transition-all duration-800 ${
          animate ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {titles[index]}
      </div>
    </div>
  );
}