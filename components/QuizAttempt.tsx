import { useState } from "react"
import CredentialCard from "./CredentialCard"
import DesignBriefCard from "./DesignBriefCard"
import Modal from "./Modal"

// show first 9 only
type CustomButton = {
    image: string
    text: string
}

let images: Map<string, CustomButton> = new Map<string, CustomButton>([
    [
        'google', {
            image: 'button-google.png',
            text: 'Google'
        }
    ]
    ,
    [
        'behance', {
            image: 'button-behance.png',
            text: 'Behance'
        },
    ],
    [
        'sketching',
        {
            image: 'button-sketching.png',
            text: 'Sketching'
        }
    ],

    [

        'userTesting', {
            image: 'button-usertesting.png',
            text: 'User Testing'
        },
    ],
    [

        'defineProblem', {
            image: 'button-define.png',
            text: 'Define Problem'
        },
    ],
    [

        'brainStorming', {
            image: 'button-brainstorming.png',
            text: 'Brain Storming'
        },
    ],
    [

        'pinterest', {
            image: 'button-pinterest.png',
            text: 'Pinterest'
        },
    ],
    [

        'mindMap', {
            image: 'button-mindmap.png',
            text: 'Mindmap'
        },
    ],
    [

        'workshop', {
            image: 'button-workshop.png',
            text: 'Workshop'
        },
    ],
    [

        'prototype', {
            image: 'button-prototype.png',
            text: 'Prototype'
        },
    ],
    [

        'test', {
            image: 'button-test.png',
            text: 'Test'
        },
    ],
    [

        'talkToMyself', {
            image: 'button-talk.png',
            text: 'Talk to Myself'
        },
    ],
    [
        'others', {
            image: 'button-others.png',
            text: 'Others'
        }
    ]
])

const QuizAttempt = (props: { handleSubmit: (selectedItems: string[]) => void; }) => {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const limit = 6;

    const handleClick = (e: any, key: string) => {
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
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <Modal addItem={() => { }}></Modal>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-b-lg bg-[url(/header-background.png)] bg-cover h-20 bg-center mb-10 grid grid-cols-8 justify-start content-center px-5 ">
                <div className="flex col-span-7">
                    {
                        selectedItems.slice(0, limit + 1).map((x, i) =>
                            i == limit ? <div className="w-12 h-12 drop-shadow-md flex place-content-center " key={x}> <span className="m-auto text-white ">+{selectedItems.length - limit}</span></div> : <img width={10} height={10} className="w-12 h-12 drop-shadow-md" key={x} src={'/buttons/' + images.get(x)?.image} />
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
                        <div key={key}>
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
