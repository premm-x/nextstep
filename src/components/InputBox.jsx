import { icons } from "./CodePreview";


export default function InputBox({ input, setInput, showUpgrade, setShowUpgrade, onSend, onKeyDown, textareaRef, compact }) {
    
    return (
        <div className="w-full bg-[#111] border border-[#222] rounded-2xl overflow-hidden focus-within:border-[#333] transition-colors">
            <textarea
                ref={textareaRef}
                className="w-full bg-transparent border-none outline-none text-[#e5e5e5] text-sm px-4 pt-4 pb-2 resize-none placeholder-[#444] leading-relaxed"
                placeholder="Ask v0 to build..."
                rows={compact ? 2 : 3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
            />

            <div className="flex items-center justify-between px-3 pb-2">
                <div className="flex items-center gap-2">
                    <button className="w-6.5 h-6.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-[#888] hover:border-[#3a3a3a] transition-all">
                        {icons.PlusIcon}
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.25 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-[#777] text-[12px] hover:border-[#3a3a3a] hover:text-[#aaa] transition-all">
                        <span className="w-1.75 h-1.75 rounded-full bg-[#666] border-[1.5px] border-[#444]" />
                        v0 Mini
                        {icons.ChevronDownIcon}
                    </button>
                </div>
                <button
                    onClick={() => onSend(input)}
                    disabled={!input.trim()}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${input.trim()
                        ? "bg-white text-black hover:bg-[#e8e8e8]"
                        : "bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#2a2a2a]"
                        }`}
                >
                    {icons.ArrowUpIcon}
                </button>
            </div>

            {showUpgrade && (
                <div className="flex items-center justify-between px-4 py-2 border-t border-[#1a1a1a] bg-[#0d0d0d]">
                    <span className="text-[#666] text-[13px]">
                        Upgrade to Team to unlock all of v0's features and more credits
                        <span className="text-[#e5e5e5] font-semibold ml-2 cursor-pointer hover:text-white transition-colors">Upgrade Plan</span>
                    </span>
                    <button className="text-[#444] hover:text-[#888] transition-colors ml-3 shrink-0" onClick={() => setShowUpgrade(false)}>
                        {icons.XIcon}
                    </button>
                </div>
            )}

        </div>
    );
}