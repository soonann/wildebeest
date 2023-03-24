import CredentialCard from "@/components/CredentialCard"
import DesignBriefCard from "@/components/DesignBriefCard"
import QuizAttempt from "@/components/QuizAttempt"
import { createAttemptWithEntries, createUser, signUpAndLoginAnonymously } from "@/lib/Supabase"
import { useRouter } from "next/router"
import { useState } from "react"


const QuizPage = () => {
    const [username, setUsername] = useState('')
    const [designField, setDesignField] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('Play')

    const [showDesignBrief, setShowDesignBrief] = useState(false)
    const [showQuizAttempt, setShowQuizAttempt] = useState(true)
    const [showQuizResult, setShowQuizResult] = useState(true)

    const [supabaseUser, setSupabaseUser] = useState(null)
    const router = useRouter()

    const handleSubmit = () => {
        setSubmitted(true)
        setPlayButtonText('Get ready ...')

        // validation for username field
        if (username && username.trim() != '' && designField && designField.trim() != '') {
            // if valid, start quiz
            console.log(username)
            handleNewAttempt(username)
            return;
        }
        setSubmitted(false)
        setPlayButtonText('Play')

    }

    const handleNewAttempt = async (username: string,) => {
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
        else {
            setShowDesignBrief(true);
        }
    }

    const submitAnswers = async (anon: any) => {

        // create attempt and entries
        let attempt_success = await createAttemptWithEntries(anon.user.id, [
            { attempt_id: 0, sequence: 0, process: 'process 1' },
            { attempt_id: 0, sequence: 1, process: 'process 2' },
            { attempt_id: 0, sequence: 2, process: 'process 2' },
            { attempt_id: 0, sequence: 3, process: 'process 2' },
            { attempt_id: 0, sequence: 4, process: 'process 2' },
            { attempt_id: 0, sequence: 5, process: 'process 2' },
            { attempt_id: 0, sequence: 6, process: 'process 3' },
            { attempt_id: 0, sequence: 7, process: 'process 4' },
        ])
        if (!attempt_success) {
            console.log("failed")
            setPlayButtonText("Play")
            setSubmitted(false)
            return;
        }


        router.push('/')
    }

    return (
        <div className='w-full bg-quiz-bg '>
            {
                showDesignBrief ?
                    <CredentialCard
                        username={username}
                        setUsername={setUsername}
                        designField={designField}
                        setDesignField={setDesignField}
                        handleSubmit={handleSubmit}
                        submitted={submitted}
                        playButtonText={playButtonText} />
                    : null
            }
            {
                showDesignBrief ? < DesignBriefCard startGame={false} /> : null
            }
            {
                showQuizAttempt ? <QuizAttempt /> : null
            }

        </div>

    )

}


export default QuizPage
