import { useEffect, useRef } from "react";

const CHARS = {
    "4": [
        [1, 1, 0, 1, 1, 0, 0],
        [1, 1, 0, 1, 1, 0, 0],
        [1, 1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
    ],
    "0": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ],
};

const SEQUENCE = ["4", "0", "4"];
const CHAR_GAP = 2;
const DOT_SPACING = 28;
const CHAR_W = 5;
const CHAR_H = 7;

function build404Dots(canvasW, canvasH) {
    const totalCols = SEQUENCE.length * CHAR_W + (SEQUENCE.length - 1) * CHAR_GAP;
    const gridW = totalCols * DOT_SPACING;
    const gridH = CHAR_H * DOT_SPACING;
    const startX = (canvasW - gridW) / 2 + DOT_SPACING / 2;
    const startY = (canvasH - gridH) / 2 + DOT_SPACING / 2;
    const dots = [];
    SEQUENCE.forEach((char, ci) => {
        const pattern = CHARS[char];
        const colOffset = ci * (CHAR_W + CHAR_GAP);
        for (let r = 0; r < CHAR_H; r++) {
            for (let c = 0; c < CHAR_W; c++) {
                dots.push({
                    x: startX + (colOffset + c) * DOT_SPACING,
                    y: startY + r * DOT_SPACING,
                    active: pattern[r][c] === 1,
                });
            }
        }
    });
    return dots;
}

function SnowflakeIcon({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
            <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" />
            <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
            <line x1="12" y1="5" x2="10" y2="3" /><line x1="12" y1="5" x2="14" y2="3" />
            <line x1="12" y1="19" x2="10" y2="21" /><line x1="12" y1="19" x2="14" y2="21" />
            <line x1="5" y1="12" x2="3" y2="10" /><line x1="5" y1="12" x2="3" y2="14" />
            <line x1="19" y1="12" x2="21" y2="10" /><line x1="19" y1="12" x2="21" y2="14" />
        </svg>
    );
}

function DotGrid404() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animRef = useRef(null);
    const dotsRef = useRef([]);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            dotsRef.current = build404Dots(canvas.width, canvas.height);
        }

        function draw() {
            timeRef.current += 0.018;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            dotsRef.current.forEach((dot) => {
                const dx = dot.x - mx;
                const dy = dot.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const hover = Math.max(0, 1 - dist / 110);
                const pulse = dot.active
                    ? (Math.sin(timeRef.current * 1.5 + dot.x * 0.04 + dot.y * 0.04) + 1) / 2
                    : 0;

                let r, alpha, color;

                if (dot.active) {
                    r = 4 + hover * 5 + pulse * 1.5;
                    alpha = 0.55 + pulse * 0.25 + hover * 0.2;
                    color = hover > 0.35
                        ? `rgba(255, 100, 40, ${alpha})`
                        : `rgba(210, 210, 200, ${alpha})`;

                    if (hover > 0.1 || pulse > 0.6) {
                        const glowAlpha = (hover * 0.3 + pulse * 0.1) * alpha;
                        const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r * 4);
                        grad.addColorStop(0, hover > 0.35 ? `rgba(255,100,40,${glowAlpha})` : `rgba(210,210,200,${glowAlpha})`);
                        grad.addColorStop(1, "transparent");
                        ctx.beginPath();
                        ctx.arc(dot.x, dot.y, r * 4, 0, Math.PI * 2);
                        ctx.fillStyle = grad;
                        ctx.fill();
                    }
                } else {
                    r = 2 + hover * 3;
                    alpha = 0.08 + hover * 0.35;
                    color = hover > 0.5 ? `rgba(255, 80, 30, ${alpha})` : `rgba(90, 80, 70, ${alpha})`;
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });

            animRef.current = requestAnimationFrame(draw);
        }

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
        function onMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        resize();
        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", onMouseLeave);
        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
        </>
    )
}

export default function NotFound() {
    return (
        <div className="h-screen bg-black flex flex-col relative">

            <DotGrid404 />

            <a href="/dashboard"
                className="inline-flex absolute bottom-20 left-1/2 -translate-x-1/2 items-center text-white gap-2 border border-white 
            text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-colors w-fit">
                Back to Home <span>→</span>
            </a>


        </div>
    );
}