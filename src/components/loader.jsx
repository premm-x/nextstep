
export function OuterLoader() {

    return (
        <div className="w-full h-screen flex items-center justify-center bg-background text-primary">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-3 border-stone-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    )
}

export function InterLoader() {

    return (
        <div className="flex items-center justify-center bg-background text-primary">
            <div className="flex flex-col items-center gap-4">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    )
}