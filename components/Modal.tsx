import React from "react"

const Modal = (props: { addItem: any }) => {
    return (<div className="grid grid-cols-5 p-5 space-y-6 my-5">
        <div></div>

        <div className=" col-span-5 md:col-span-5 lg:col-span-3  text-black p-5 rounded-lg  bg-[url(/card-background.png)] bg-center bg-cover drop-shadow-[0_0px_10px_rgba(153,109,247,1)] ">

            <div className="text-white text-center py-4 text-xs underline-offset-8 underline">
                Design Brief
            </div>
            <div className="rounded-md shadow-sm ">
                <div className="py-2 flex place-items-center"></div>
            </div>
        </div>

        <div className="col-span-5 flex justify-center">
            <div>
                <button type="submit" className="relative rounded-md bg-[#996DF7] py-2 px-6 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-[#996DF72B]" onClick={() => props.addItem()} >
                    {"Add"}
                </button>

            </div>
        </div>

    </div>)

}

export default Modal
