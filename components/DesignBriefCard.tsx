const DesignBriefCard = (props: { startGame: any }) => {
    return (<div className="animate-tilt grid grid-cols-5 p-5 space-y-6 mb-5">
        <div className="h-52"></div>

        <div className=" col-span-5 md:col-span-5 lg:col-span-3  text-black p-5 rounded-lg  bg-[url(/card-background.png)] bg-center bg-cover drop-shadow-[0_0px_10px_rgba(153,109,247,1)] ">

            <div className="text-white text-center py-4 text-xs underline-offset-8 underline">
                Design Brief
            </div>
            <div className="text-white text-xl font-bold text-center py-4">
                You’re given the task to rebrand <span className="mix-blend-hard-light rounded-md bg-[#E96482] px-2">Youtube</span> for a premium experience for users that wishes for a <span className="px-2 rounded-md bg-[#479275] mix-blend-hard-light">personalised experience.</span>
            </div>
            <div className="text-white text-sm text-center">
                To the best of your ability, imagine your process when tackling this brief.
            </div>
            <div className="rounded-md shadow-sm ">
                <div className="py-2 flex place-items-center"></div>
            </div>
        </div>

        <div className="col-span-5 flex justify-center">
            <div>
                <button type="submit" className="relative rounded-md bg-[#996DF7] py-2 px-6 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-[#996DF72B]" onClick={() => props.startGame()} >
                    {"Start Designing"}
                </button>

            </div>
        </div>

    </div>)

}

export default DesignBriefCard
