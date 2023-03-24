import { createAttemptWithEntries, createUser, signUpAndLoginAnonymously } from "@/lib/Supabase"
import { useRouter } from "next/router"
import { useState } from "react"

const QuizPage = () => {
    const [username, setUsername] = useState('')
    const [designField, setDesignField] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('Play')
    const router = useRouter()

    const handleSubmit = () => {
        setSubmitted(true)
        setPlayButtonText('Get ready ...')

        // validation for username field
        if (username && username.trim() != '') {
            // if valid, start quiz
            console.log(username)
            handleNewAttempt(username)
        }

    }

    const handleNewAttempt = async (username: string,) => {
        // TODO: check if there is a token already, if there isn't, create an anon user
        // sign up an anon user 
        const anon = await signUpAndLoginAnonymously()
        if (!anon || !anon.user) {
            return
        }

        // assign username to created anon user
        let user_success = await createUser(anon.user.id, username)
        if (!user_success) {
            return;
        }

        // create attempt and entries
        let attempt_success = await createAttemptWithEntries(anon.user.id, [
            { attempt_id: 0, sequence: 0, process: 'process 1' },
            { attempt_id: 0, sequence: 1, process: 'process 2' },
            { attempt_id: 0, sequence: 2, process: 'process 3' },
            { attempt_id: 0, sequence: 3, process: 'process 4' },
        ])
        if (!attempt_success) {
            return;
        }


        router.push('/')


    }

    //<div>
    //<button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400" onClick={() => handleSubmit()} disabled={submitted}>
    //{playButtonText}
    //</button>
    //</div>

    return (
        <div className='h-screen bg-quiz-bg mx-auto py-5'>
            <div className="grid grid-cols-5 p-5 space-y-6">
                <div className=""></div>

                <div className=" col-span-5 md:col-span-5 lg:col-span-3  text-black p-5 rounded-lg drop-shadow-xl bg-[url(/card-background.png)] bg-cover brightness-100">

                    <div className="text-white text-center py-4 text-xs ">
                        You’re about to embark on a self-discovery journey
                    </div>
                    <div className="rounded-md shadow-sm ">
                        <div className="py-2 flex place-items-center">

                            <input id="username" name="username" type="text" autoComplete="username" required className="text-white flex-shrink w-full outline-none rounded-md border-[0.12rem] mr-4 border-white bg-transparent placeholder:text-[#F3F3F3B2] sm:text-sm sm:leading-6 py-1.5 px-3 caret-white" placeholder="username" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                            {username.trim() == '' ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7.5" stroke="#F3F3F3" />
                                <path d="M7.41379 9.79H8.41379C8.41379 8.48 10.1838 8.37 10.1838 6.7C10.1838 5.59 9.25379 4.92 7.81379 4.92C6.64379 4.92 5.77379 5.33 5.22379 6.04L5.95379 6.56C6.35379 6.05 6.93379 5.77 7.74379 5.77C8.64379 5.77 9.17379 6.21 9.17379 6.85C9.17379 8 7.41379 8.22 7.41379 9.79ZM7.92379 12.06C8.29379 12.06 8.56379 11.77 8.56379 11.42C8.56379 11.06 8.29379 10.78 7.92379 10.78C7.54379 10.78 7.27379 11.06 7.27379 11.42C7.27379 11.77 7.54379 12.06 7.92379 12.06Z" fill="white" />
                            </svg>
                                :

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="8" fill="#61C19D" />
                                    <path d="M4.5 8.78013L6.55333 10.8335L11.5 5.88672" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>


                            }
                        </div>
                        <div className="py-2 flex place-items-center">

                            <input id="designField" name="designField" type="text" autoComplete="designField" required className="text-white flex-shrink w-full outline-none rounded-md border-[0.12rem] mr-4 border-white bg-transparent placeholder:text-[#F3F3F3B2] sm:text-sm sm:leading-6 py-1.5 px-3 caret-white" placeholder="design field" value={designField} onChange={(event) => { setDesignField(event.target.value) }} />
                            {designField.trim() == '' ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7.5" stroke="#F3F3F3" />
                                <path d="M7.41379 9.79H8.41379C8.41379 8.48 10.1838 8.37 10.1838 6.7C10.1838 5.59 9.25379 4.92 7.81379 4.92C6.64379 4.92 5.77379 5.33 5.22379 6.04L5.95379 6.56C6.35379 6.05 6.93379 5.77 7.74379 5.77C8.64379 5.77 9.17379 6.21 9.17379 6.85C9.17379 8 7.41379 8.22 7.41379 9.79ZM7.92379 12.06C8.29379 12.06 8.56379 11.77 8.56379 11.42C8.56379 11.06 8.29379 10.78 7.92379 10.78C7.54379 10.78 7.27379 11.06 7.27379 11.42C7.27379 11.77 7.54379 12.06 7.92379 12.06Z" fill="white" />
                            </svg>
                                :

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="8" fill="#61C19D" />
                                    <path d="M4.5 8.78013L6.55333 10.8335L11.5 5.88672" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>


                            }
                        </div>
                    </div>
                </div>

                <div className=""></div>
            </div>
        </div>
    )

}


export default QuizPage
