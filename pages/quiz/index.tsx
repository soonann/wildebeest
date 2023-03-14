import { createAttemptWithEntries, createUser, signUpAndLoginAnonymously } from "@/lib/Supabase"
import { useRouter } from "next/router"
import { useState } from "react"

const QuizPage = () => {
    const [username, setUsername] = useState('')
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

    return (
        <div className='max-w-screen-xl mx-auto py-5'>
            <div className="grid grid-cols-5 p-5 space-y-6">
                <div className=""></div>

                <div className="col-span-5 md:col-span-5 lg:col-span-3 bg-white text-black p-5 rounded-lg drop-shadow-xl">
                    <div className="rounded-md shadow-sm">
                        <div className="py-5">
                            <label htmlFor="username" className="">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="relative block w-full rounded-b-md border-0 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1.5 px-3" placeholder="John Doe" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400" onClick={() => handleSubmit()} disabled={submitted}>
                            {playButtonText}
                        </button>
                    </div>
                </div>

                <div className=""></div>
            </div>
        </div>
    )

}


export default QuizPage
