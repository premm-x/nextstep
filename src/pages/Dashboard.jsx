import { useEffect, useRef, useState } from "react";
import CodePreview from "@/Components/CodePreview";
import InputBox from "@/Components/InputBox";
import TypingMessage from "@/Components/TypingMessage";
import { icons } from "@/Components/CodePreview";
import { ConfirmJobs, JobsPanel } from "@/components/Job";
import { ChevronDown, ChevronRight, ExternalLink, List, Plus, Trash, X } from "lucide-react";

export const JOBS_DATA = [

    { id: 1, title: "Senior Frontend Engineer", company: "Vercel", logo: "V", logoColor: "#000000", accentColor: "#ffffff", location: "Remote · USA", type: "Full-time", salary: "$160k – $200k", tags: ["React", "Next.js", "TypeScript"], posted: "2d ago", description: "Join the team building the world's best frontend deployment platform. You'll work on core product features, improve DX, and collaborate with open-source communities worldwide.", link: "https://vercel.com/careers" },
    { id: 2, title: "UI/UX Designer", company: "Linear", logo: "L", logoColor: "#5e6ad2", accentColor: "#818cf8", location: "San Francisco, CA", type: "Full-time", salary: "$130k – $160k", tags: ["Figma", "Design Systems", "Prototyping"], posted: "1d ago", description: "Shape the future of project management tools. Own end-to-end design for new features, from early concepts to polished pixels with a team that cares deeply about craft.", link: "https://linear.app/careers" },
    { id: 3, title: "Full Stack Engineer", company: "Notion", logo: "N", logoColor: "#ffffff", accentColor: "#e5e5e5", location: "Hybrid · NYC", type: "Full-time", salary: "$150k – $185k", tags: ["Node.js", "PostgreSQL", "React"], posted: "3d ago", description: "Work on a product used by millions of teams worldwide. Build scalable systems and beautiful interfaces that help people think and collaborate better every day.", link: "https://www.notion.so/careers" },
    { id: 4, title: "DevRel Engineer", company: "Supabase", logo: "S", logoColor: "#3ecf8e", accentColor: "#3ecf8e", location: "Remote · Worldwide", type: "Full-time", salary: "$120k – $150k", tags: ["PostgreSQL", "Open Source", "Content"], posted: "5d ago", description: "Be the bridge between our open-source community and engineering team. Create tutorials, run workshops, and help developers get the most out of Supabase.", link: "https://supabase.com/careers" },
    { id: 5, title: "Staff Software Engineer", company: "Figma", logo: "F", logoColor: "#f24e1e", accentColor: "#fb7a57", location: "San Francisco, CA", type: "Full-time", salary: "$220k – $280k", tags: ["C++", "WebGL", "Performance"], posted: "1w ago", description: "Lead technical direction across teams working on Figma's core rendering engine. Tackle hard performance challenges and mentor engineers across the org.", link: "https://www.figma.com/careers" },

];

const SAMPLE_PROMPTS = [
    { icon: icons.SparkleIcon, label: "Landing page for a SaaS product" },
    { icon: icons.CodeIcon, label: "Dashboard with charts & analytics" },
    { icon: icons.ZapIcon, label: "E-commerce product card grid" },
    { icon: icons.PaletteIcon, label: "Portfolio site with dark theme" },
];

const AI_RESPONSES = {
    default: "Here are 5 curated job openings that match your interest. Each role is from a top-tier tech company — click **Apply Now** to explore the full listing.",
    "Landing page for a SaaS product": "Found 5 great roles focused on SaaS marketing, landing pages, and conversion. These teams are actively hiring right now.",
    "Dashboard with charts & analytics": "Here are 5 data & analytics roles perfect for dashboard engineers and designers. All are remote-friendly.",
    "E-commerce product card grid": "Here are 5 e-commerce and frontend roles with a focus on product UI. Great picks if you love building shopping experiences.",
    "Portfolio site with dark theme": "These 5 creative and design-engineering roles would love someone who builds beautiful portfolio sites. Check them out!",
};

const NAV_ITEMS = [
    { icon: icons.SearchIcon, label: "Search" },
    { icon: icons.HomeIcon, label: "Home" },
    { icon: icons.LibraryIcon, label: "Library" },
    { icon: icons.GridIcon, label: "Projects" },
    { icon: icons.GlobeIcon, label: "Design Systems" },
    { icon: icons.LayoutIcon, label: "Templates" },
];

const INITIAL_CHATS = [
    { id: 1, label: "dashboard clone" },
    { id: 2, label: "Open in v0" },
    { id: 3, label: "Open in v0" },
    { id: 4, label: "Open in v0" },
    { id: 5, label: "Open in v0" },
];


export default function Dashboard() {

    const [input, setInput] = useState("");
    const [showUpgrade, setShowUpgrade] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([]);          // { role, text, id }
    const [isTyping, setIsTyping] = useState(false);
    const [activeNav, setActiveNav] = useState("Home");
    const [chats, setChats] = useState(INITIAL_CHATS);
    const [activeChat, setActiveChat] = useState(null);
    const [favOpen, setFavOpen] = useState(false);
    const [favList, setFavList] = useState([]);
    const [recentsOpen, setRecentsOpen] = useState(true);
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    const isHome = messages.length === 0;

    const [open, setOpen] = useState(false);
    const [openResume, setOpenResume] = useState(false);
    const [sheetName, setSheetName] = useState("");
    const [selectedResumeOption, setSelectedResumeOption] = useState("");
    const [selectedResumeOption2, setSelectedResumeOption2] = useState("");
    const dropdownRef = useRef(null);

    const [openModel, setOpenModel] = useState(false);
    const [newmsg, setNewmsg] = useState(true);

    const [options, setOptions] = useState([
        "Landing Page",
        "Dashboard",
        "E-commerce",
        "Portfolio",
    ]);

    const [optionsResume, setOptionsResume] = useState([
        "Add Resume",
        "Select Resume",
    ]);
    const [listOfResumes, setListOfResumes] = useState([
        { id: 1, name: "resume1", file: "file1" },
        { id: 2, name: "resume2", file: "file2" },
    ])

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = (text, isApicall = true) => {


        const trimmed = text.trim();
        if (!trimmed || isTyping) return;

        const userMsg = { role: "user", text: trimmed, id: Date.now() };
        const aiText = AI_RESPONSES[trimmed] || AI_RESPONSES.default;


        if (newmsg) {
            // Add to sidebar recents
            const newChat = { id: Date.now() + 1, label: trimmed.slice(0, 20) + (trimmed.length > 20 ? "..." : "") };
            // setChats(prev => [newChat, ...prev.slice(0, 7)]);
            setChats(prev => [newChat, ...prev]);
            setActiveChat(newChat.id);

            setNewmsg(false);
        }

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const aiMsg = { role: "ai", text: aiText, id: Date.now() + 2, prompt: trimmed, isApicall };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handleNewChat = () => {
        setNewmsg(true);
        setMessages([]);
        setActiveChat(null);
        setInput("");
        textareaRef.current?.focus();
    };

    const addToFavorate = (chat) => {

        setFavList((prev) => {
            const exists = prev.some((item) => item.id === chat.id);

            if (exists) return prev;

            return [chat, ...prev];
        });
    }

    const removeToFavorate = (chat) => {

        setFavList((prev) => {
            return prev.filter((item) => item.id !== chat.id);
        });

    }
    console.log(listOfResumes)

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-[#e5e5e5] font-sans text-sm overflow-hidden">

            {/* ── Sidebar ── */}
            <aside
                className={`flex flex-col border-r border-[#1f1f1f]  transition-all duration-300 ease-in-out ${sidebarOpen ? "w-58 min-w-58" : "w-0 min-w-0 -translate-x-60"
                    }`}
            >
                <div className="flex flex-col h-full w-58">

                    {/* Workspace header */}
                    <div className="flex items-center gap-2 px-3 pt-3 pb-2 shrink-0">
                        <div className="w-7 h-7 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                            {icons.V0Logo}
                        </div>
                        <span className="text-[13px] font-semibold text-[#e5e5e5] whitespace-nowrap">Personal</span>
                        <span className="text-[10px] text-[#666] bg-[#1a1a1a] border border-[#2a2a2a] rounded px-1.5 py-0.5 font-medium">Free</span>
                        <button className="ml-auto text-[#555] hover:text-[#888] transition-colors shrink-0">
                            {icons.ChevronDownIcon}
                        </button>
                    </div>

                    {/* New Chat */}
                    <div className="px-2 pb-2 shrink-0 pt-3">
                        <button
                            onClick={handleNewChat}
                            className="w-full flex items-center justify-between bg-[#1a1a1a] hover:bg-[#212121] border border-[#2a2a2a] rounded-lg px-3 py-1.75 text-[13px] font-medium text-[#d4d4d4] transition-colors"
                        >
                            <span className="flex items-center gap-2 whitespace-nowrap">
                                {icons.PlusIcon}
                                New Chat
                            </span>
                        </button>
                    </div>

                    <div className="mx-2 my-2 mb-4 border-t border-[#1a1a1a] shrink-0" />
                    {/* add sheet */}
                    <div className="px-2 pb-2 shrink-0 relative">

                        <div className="w-full flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg  text-[13px] font-medium text-[#d4d4d4] transition-colors">
                            <span className="flex items-center gap-2 whitespace-nowrap ml-4">
                                Add Sheet
                            </span>

                            <div className="flex">
                                <button
                                    onClick={() => setOpenModel(true)}
                                    className="w-full px-3 py-2 flex items-center justify-between bg-[#1a1a1a] hover:bg-[#212121] border-r-2 border-[#2a2a2a] font-medium text-[#d4d4d4] transition-colors"
                                >
                                    <span className={`transition-transform text-[#555]  `}> <Plus className="w-3.5" /> </span>
                                </button>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="w-full px-3 py-1 flex items-center justify-between bg-[#1a1a1a] hover:bg-[#212121] font-medium text-[#d4d4d4] transition-colors"
                                >
                                    <span className={`transition-transform ${open ? "rotate-180" : ""} text-[#555] `}> <ChevronDown className="w-3.5" /> </span>
                                </button>
                            </div>
                        </div>

                        <p className="pl-2 pt-2 italic text-gray-400">sheet ( {sheetName} ) in used</p>

                        {/* Dropdown Menu */}
                        {open && (
                            <div className="absolute top-10 right-3 z-20 mt-2 p-1 bg-[#1a1a1a] border border-[#2e2e2e]  rounded-lg shadow-lg overflow-hidden">
                                {options.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSheetName((prev) => prev == item ? "" : item);
                                            setOpen(false);
                                        }}
                                        className="block w-full rounded-lg  px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}

                        {openModel && (
                            <AddSheetModal setOpenModel={setOpenModel} setOptions={setOptions} />
                        )}


                    </div>

                    <div className="mx-2 my-2 mb-4 border-t border-[#1a1a1a] shrink-0" />
                    {/* resume */}
                    <div className="px-2 pb-2 shrink-0 relative">

                        <div className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg  text-[13px] font-medium text-[#d4d4d4] transition-colors">
                            <button
                                onClick={() => setOpenResume(!openResume)}
                                className="w-full px-3 py-1 flex items-center justify-between bg-[#1a1a1a] hover:bg-[#212121] font-medium text-[#d4d4d4] transition-colors"
                            >
                                <span className="flex items-center gap-2 whitespace-nowrap ">
                                    Resume
                                </span>

                                <span className={`transition-transform ${open ? "rotate-180" : ""} text-[#555] `}> <ChevronDown className="w-3.5" /> </span>
                            </button>
                        </div>

                        <p className="pl-2 pt-2 italic text-gray-400">resume ( {selectedResumeOption2} ) in used</p>

                        {/* Dropdown Menu */}
                        {sidebarOpen && openResume && (
                            <div className="absolute top-8 -right-3 z-20 mt-2 p-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg shadow-lg overflow-hidden">
                                {optionsResume.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSelectedResumeOption((prev) => prev == item ? "" : item);
                                        }}
                                        className="w-full rounded-lg flex items-center justify-between gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                                    >
                                        <p>{item} </p>
                                        <ChevronRight className="w-3.5" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {sidebarOpen && openResume && selectedResumeOption == "Select Resume" && (
                            <div className="absolute top-18.75 left-62 z-20 mt-2 p-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg shadow-lg overflow-hidden">
                                {listOfResumes.length > 0 ? listOfResumes.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <button

                                            onClick={() => {
                                                setSelectedResumeOption2((prev) => prev.name == item.name ? "" : item.name);
                                            }}
                                            className="block w-full rounded-lg whitespace-nowrap px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                                        >
                                            {item.name}
                                        </button>

                                        <button
                                            className="rounded-lg whitespace-nowrap px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                                        >
                                            <Trash className="w-3.5 text-red-500" />
                                        </button>

                                        <button
                                            className="rounded-lg whitespace-nowrap px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                                        >
                                            <ExternalLink className="w-3.5 text-blue-500" />
                                        </button>

                                    </div>
                                )) :
                                    <p className="whitespace-nowrap px-4 py-2 italic text-[#444] text-sm">add Resume first</p>
                                }
                            </div>
                        )}

                        {selectedResumeOption === "Add Resume" && (
                            <AddResumeModal setSelectedResumeOption={setSelectedResumeOption} setListOfResumes={setListOfResumes} />
                        )}


                    </div>

                    {/* Nav */}
                    {/* <nav className="px-2 space-y-px flex-shrink-0">
                        {NAV_ITEMS.map(({ icon, label }) => (
                            <button
                                key={label}
                                onClick={() => setActiveNav(label)}
                                className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] text-left transition-all whitespace-nowrap ${activeNav === label
                                        ? "bg-[#1e1e1e] text-[#e5e5e5]"
                                        : "text-[#888] hover:text-[#d4d4d4] hover:bg-[#161616]"
                                    }`}
                            >
                                <span className={activeNav === label ? "text-[#aaa]" : "text-[#555]"}>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </nav> */}

                    <div className="mx-2 my-2 border-t border-[#1a1a1a] shrink-0" />

                    {/* Favorites */}
                    <div className="px-2 shrink-0">
                        <button
                            onClick={() => setFavOpen(o => !o)}
                            className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] text-[#555] hover:text-[#777] transition-colors font-medium"
                        >
                            Favorites
                            <span className={`text-[#444] transition-transform ${favOpen ? "rotate-90" : ""}`}>
                                {icons.ChevronRightIcon}
                            </span>
                        </button>

                        {favOpen && (

                            <div className="space-y-px mt-0.5">
                                {favList.length !== 0 ? favList.map((chat, i) => (
                                    <div key={i} className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] text-left transition-all ${activeChat === chat.id
                                        ? "bg-[#1e1e1e] text-[#ccc]"
                                        : "text-[#666] hover:text-[#aaa] hover:bg-[#161616]"
                                        }`}>

                                        <button
                                            key={chat.id}
                                            onClick={() => setActiveChat(chat.id)}
                                            className="pl-4"
                                        >
                                            <span className="truncate">{chat.label}</span>
                                        </button>


                                        <button onClick={() => removeToFavorate(chat)} className="w-4 h-4 rounded-full border border-[#2a2a2a] border-t-[#555] shrink-0" >
                                            .
                                        </button>

                                    </div>
                                )) :
                                    <div className="px-2 py-2 text-[12px] text-[#444] italic">No favorites yet</div>
                                }
                            </div>

                        )}
                    </div>

                    {/* Recents */}
                    <div className="px-2 flex-1 overflow-y-auto">
                        <button
                            onClick={() => setRecentsOpen(o => !o)}
                            className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] text-[#555] hover:text-[#777] transition-colors font-medium"
                        >
                            Recents
                            <span className={`text-[#444] transition-transform duration-200 ${recentsOpen ? "" : "-rotate-90"}`}>
                                {icons.ChevronDownIcon}
                            </span>
                        </button>

                        {recentsOpen && (
                            <div className="space-y-px mt-0.5">
                                {chats.map((chat, i) => (
                                    <div key={i} className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] text-left transition-all ${activeChat === chat.id
                                        ? "bg-[#1e1e1e] text-[#ccc]"
                                        : "text-[#666] hover:text-[#aaa] hover:bg-[#161616]"
                                        }`}>

                                        <button
                                            key={chat.id}
                                            onClick={() => setActiveChat(chat.id)}
                                            className="pl-4"
                                        >
                                            <span className="truncate">{chat.label}</span>
                                        </button>


                                        <button onClick={() => addToFavorate(chat)} className="w-4 h-4 rounded-full border border-[#2a2a2a] border-t-[#555] shrink-0" >
                                            .
                                        </button>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* ── Main ── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Header */}
                <header className="flex items-center justify-between px-4 h-12 border-b border-[#1a1a1a] shrink-0">
                    <button
                        onClick={() => setSidebarOpen(o => !o)}
                        className="text-[#555] hover:text-[#999] transition-colors p-1.5 rounded-md hover:bg-[#1a1a1a]"
                    >
                        {icons.SidebarIcon}
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#222] rounded-md text-[#888] hover:text-[#ccc] hover:border-[#333] transition-all text-[13px] font-medium">
                            Feedback
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#222] rounded-md text-[#888] hover:text-[#ccc] hover:border-[#333] transition-all text-[13px] font-medium">
                            <span className="text-[#555]"> {icons.GiftIcon}  </span>
                            Refer
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#222] rounded-md text-[#888] hover:text-[#ccc] hover:border-[#333] transition-all text-[13px]">
                            <span className="text-[#555]"> {icons.ClockIcon}  </span>
                            5.00
                        </button>
                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold cursor-pointer ml-0.5">
                            P
                        </div>
                    </div>
                </header>


                {isHome ? (

                    <main className="flex-1 flex flex-col items-center justify-center gap-7 px-5 overflow-auto">

                        <h1 className="text-[42px] font-bold text-[#e8e8e8] tracking-tight text-center leading-tight m-0">
                            What do you want to create?
                        </h1>


                        <div className="w-full max-w-170">
                            <InputBox
                                input={input}
                                setInput={setInput}
                                showUpgrade={false}
                                setShowUpgrade={setShowUpgrade}
                                onSend={sendMessage}
                                onKeyDown={handleKeyDown}
                                textareaRef={textareaRef}
                            />
                        </div>


                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {SAMPLE_PROMPTS.map(({ icon, label }) => (
                                <button
                                    key={label}
                                    onClick={() => setInput(label)}
                                    className="flex items-center gap-2 px-4 py-1.75 border border-[#222] rounded-full text-[#888] text-[13px] font-medium hover:border-[#383838] hover:text-[#ccc] hover:bg-[#111] transition-all"
                                >
                                    <span className="text-[#555]">{icon}</span>
                                    {label}
                                </button>
                            ))}
                        </div>

                    </main>

                ) : (
                    /* CHAT view */
                    <div className="flex-1 flex flex-col overflow-hidden">

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                            <div className="max-w-200 mx-auto w-full space-y-6">
                                {messages.map((msg) => (
                                    <div key={msg.id}>
                                        {msg.role === "user" ? (
                                            /* User bubble */
                                            <div className="flex justify-end">
                                                <div className="max-w-[80%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] text-[#e5e5e5] leading-relaxed whitespace-pre-wrap">
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ) : (
                                            /* AI response */
                                            <div className="flex gap-3">
                                                <div className="w-7 h-7 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5">
                                                    {icons.V0Logo}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[13px] text-[#555] mb-1.5 font-medium">v0</div>
                                                    <TypingMessage text={msg.text} />

                                                    {msg.isApicall ? <JobsPanel prompt={msg.prompt} sendMessage={sendMessage} />
                                                        : <ConfirmJobs sheetName={sheetName} />}

                                                    {/* Action row */}
                                                    <div className="flex items-center gap-1 mt-3">
                                                        {[
                                                            { icon: icons.CopyIcon, tip: "Copy" },
                                                            { icon: icons.ThumbUpIcon, tip: "Good response" },
                                                            { icon: icons.ThumbDownIcon, tip: "Bad response" },
                                                            { icon: icons.RefreshIcon, tip: "Regenerate" },
                                                        ].map(({ icon, tip }) => (
                                                            <button
                                                                key={tip}
                                                                title={tip}
                                                                className="p-1.5 rounded-md text-[#444] hover:text-[#888] hover:bg-[#1a1a1a] transition-all"
                                                            >
                                                                {icon}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5">
                                            {icons.V0Logo}
                                        </div>
                                        <div className="flex items-center gap-1 mt-2">
                                            {[0, 1, 2].map(i => (
                                                <span
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>
                        </div>

                        {/* Chat input */}
                        <div className="px-4 pb-4 shrink-0">
                            <div className="max-w-200 mx-auto w-full">
                                <InputBox
                                    input={input}
                                    setInput={setInput}
                                    showUpgrade={false}
                                    setShowUpgrade={setShowUpgrade}
                                    onSend={sendMessage}
                                    onKeyDown={handleKeyDown}
                                    textareaRef={textareaRef}
                                    compact
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}





function AddSheetModal({ setOpenModel, setOptions }) {

    const [form, setForm] = useState({
        sheetName: "",
        link: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setForm({ sheetName: "", link: "" });
        setOpenModel(false);

        setOptions((prev) => [form.sheetName, ...prev]);

        console.log("Form Data:", form);
    };

    return (
        <div className="p-10 bg-black min-h-screen text-white">

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                <div className="bg-[#111111] w-105 rounded-xl border border-[#2e2e2e] shadow-xl">

                    {/* Header */}
                    <div className="flex justify-between items-center p-5 border-b border-[#2e2e2e]">
                        <div>
                            <h2 className="text-lg font-semibold">Add New Sheet</h2>
                            <p className="text-sm text-zinc-400 italic">
                                add name and link of your sheet
                            </p>
                        </div>

                        <button onClick={() => setOpenModel(false)}>
                            <X size={18} className="text-zinc-400 hover:text-white" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 space-y-4">
                        {/* Body */}
                        <div className="p-5 space-y-4">

                            <div>
                                <label className="text-sm text-zinc-400">Sheet Name</label>
                                <input
                                    name="sheetName"
                                    value={form.sheetName}
                                    onChange={handleChange}
                                    className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
                                    placeholder="Enter sheet name..."
                                />
                            </div>

                            <div>
                                <label className="text-sm text-zinc-400">Link</label>
                                <input
                                    name="link"
                                    value={form.link}
                                    onChange={handleChange}
                                    className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
                                    placeholder="Enter link..."
                                />
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 p-4 border-t border-[#2e2e2e] bg-[#0f0f0f] rounded-b-xl">
                            <button
                                onClick={() => setOpenModel(false)}
                                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-zinc-200"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}




function AddResumeModal({ setSelectedResumeOption, setListOfResumes }) {
    const [form, setForm] = useState({
        ResumeName: "",
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed");
            return;
        }

        setForm((prev) => ({
            ...prev,
            file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.ResumeName.trim()) {
            alert("Resume name is required");
            return;
        }

        if (!form.file) {
            alert("PDF file is required");
            return;
        }

        // Store structured resume object
        setListOfResumes((prev) => [
            {
                id: form.file.name,
                name: form.ResumeName,
                file: form.file
            },
            ...prev
        ]);

        // Reset form
        setForm({
            ResumeName: "",
            file: null
        });

        // Close modal
        setSelectedResumeOption("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="bg-[#111111] w-105 rounded-xl border border-[#2e2e2e] shadow-xl text-white">

                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-[#2e2e2e]">
                    <div>
                        <h2 className="text-lg font-semibold">Add New Resume</h2>
                        <p className="text-sm text-zinc-400 italic">
                            Add resume name and upload your PDF
                        </p>
                    </div>

                    <button onClick={() => setSelectedResumeOption("")}>
                        <X size={18} className="text-zinc-400 hover:text-white" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                    {/* Resume Name */}
                    <div>
                        <label className="text-sm text-zinc-400">Resume Name</label>
                        <input
                            type="text"
                            name="ResumeName"
                            value={form.ResumeName}
                            onChange={handleChange}
                            placeholder="Enter resume name"
                            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500"
                            required
                        />
                    </div>

                    {/* PDF Upload */}
                    <div>
                        <label className="text-sm text-zinc-400">PDF File</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 file:bg-zinc-800 file:border-0 file:text-white file:px-3 file:py-1 file:rounded file:mr-3 hover:file:bg-zinc-700"
                            required
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#2e2e2e]">
                        <button
                            type="button"
                            onClick={() => setSelectedResumeOption("")}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-zinc-200"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

