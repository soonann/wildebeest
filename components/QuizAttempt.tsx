import { images } from "@/constants/Buttons"
import { useState } from "react"
import CredentialCard from "./CredentialCard"
import DesignBriefCard from "./DesignBriefCard"
import Modal from "./Modal"


// show first 9 only
export type CustomButton = {
    image: string
    text: string
}

const QuizAttempt = (props: { handleSubmit: (selectedItems: string[]) => void; }) => {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const limit = 6;
    const closeModal = () => {
        setModalVisible(false)
    }
    const addItem = (item: string) => {
        handleClick(null, item)
        setModalVisible(false)
    }

    const handleClick = (e: any, key: string) => {
        if (key == 'others') {
            setModalVisible(true)
            return
        }

        let currItems = selectedItems.slice();
        let found = false
        for (let i = 0; i < currItems.length; i++) {
            if (currItems[i] == key) {
                found = true
                currItems.splice(i, 1)
                setSelectedItems(currItems)
                return
            }
        }

        if (!found) {
            currItems.push(key)
            console.log("added " + key)
        }
        setSelectedItems(currItems)
    }

    return (
        <div className="w-full">
            {modalVisible ?
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" ></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto" >
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg z-40">
                                <Modal addItem={addItem} closeModal={closeModal}></Modal>
                            </div>
                        </div>
                    </div>
                </div> : null}

            <div className="rounded-b-lg bg-[url(/header-background.png)] bg-cover h-20 bg-center mb-3 grid grid-cols-8 justify-start content-center px-5 ">
                <div className="flex col-span-7">
                    {
                        selectedItems.slice(0, limit + 1).map((x, i) =>
                            i == limit ? <div className="w-12 h-12 drop-shadow-md flex place-content-center " key={x}> <span className="m-auto text-white ">+{selectedItems.length - limit}</span></div> :
                                images.get(x) == null ? <div className="w-12 h-12 drop-shadow-md rounded-full flex place-content-center bg-[url(/background.png)] bg-cover " key={x}>
                                    <span className="m-auto text-white text-[0.5rem] overflow-hidden">{x}</span></div> : <img width={10} height={10} className="w-12 h-12 drop-shadow-md" key={x} src={'/buttons/' + images.get(x)?.image} />
                        )
                    }
                </div>
                <div className="col-span-1 place-self-end ">

                    <button onClick={(e) => props.handleSubmit(selectedItems)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                    </button>
                </div>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 pb-5 px-5">
                <div className="flex">
                    <span className="place-self-center text-white p-4 text-center">
                        Select your process, from start to finish

                    </span>

                </div>
                {
                    Array.from(images).map(([key, value]) => (
                        <div className="even:top-20 relative" key={key}>
                            <button onClick={(e) => handleClick(e, key)}>
                                <img src={`/buttons/${value.image}`} />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div >

    )
}


export default QuizAttempt
