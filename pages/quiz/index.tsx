import CredentialCard from "@/components/CredentialCard"
import DesignBriefCard from "@/components/DesignBriefCard"
import QuizAttempt from "@/components/QuizAttempt"
import { images } from "@/constants/Buttons"
import { Database } from "@/lib/database.types"
import { createAttemptWithEntries, createUser, signUpAndLoginAnonymously } from "@/lib/Supabase"
import { useRouter } from "next/router"
import { useState } from "react"


type QuizEntry = Database['public']['Tables']['quiz_entry']['Row']
const QuizPage = () => {
    const [username, setUsername] = useState('')
    const [designField, setDesignField] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('Play')

    const [showCredentials, setShowCredentials] = useState(true)
    const [showDesignBrief, setShowDesignBrief] = useState(false)
    const [showQuizAttempt, setShowQuizAttempt] = useState(false)
    const [showQuizResult, setShowQuizResult] = useState(false)

    const [supabaseUser, setSupabaseUser] = useState<any>(null)
    const router = useRouter()

    const handleSubmit = () => {
        setSubmitted(true)
        setPlayButtonText('Get ready ...')

        // validation for username field
        if (username && username.trim() != '' && designField && designField.trim() != '') {
            // if valid, start quiz
            console.log(username)
            handleNewAttempt(username, designField)
            return;
        }
        setSubmitted(false)
        setPlayButtonText('Play')

    }

    const handleStartGame = () => {
        setShowDesignBrief(false);
        setShowQuizAttempt(true);
    }

    const handleNewAttempt = async (username: string, design_field: string) => {
        // sign up an anon user 
        const anon = await signUpAndLoginAnonymously()
        if (!anon || !anon.user) {
            return
        }

        // assign username to created anon user
        let user_success = await createUser(anon.user.id, username, design_field)
        if (!user_success) {
            return;
        }
        else {
            setSupabaseUser(anon)
            setShowDesignBrief(true)
            setShowCredentials(false)
        }
    }

    const handleQuizSubmit = async (results: string[]) => {
        // must chose at least 1
        if (results.length < 1) {

        }
        else {
            if (supabaseUser != null) {
                let resultsDbFormatted = [
                ]
                for (let i = 0; i < results.length; i++) {
                    let val = images.get(results[i])
                    if (val == null) {
                        resultsDbFormatted.push({ attempt_id: 0, sequence: i, process: results[i] })
                    }
                    else {
                        resultsDbFormatted.push({ attempt_id: 0, sequence: i, process: val.text })
                    }
                }
                await submitAnswers(supabaseUser, resultsDbFormatted)

            }
        }

    }

    const submitAnswers = async (anon: any, resultsDbFormatted: QuizEntry[]) => {

        // create attempt and entries
        let attempt_success = await createAttemptWithEntries(anon.user.id, resultsDbFormatted)
        if (!attempt_success) {
            console.log("failed")
            setSubmitted(false)
            return;
        }
        router.push(`/results/${anon.user.id}`)
    }


    return (
        <div className='w-full bg-quiz-bg'>
            {
                showCredentials ?

                    <CredentialCard
                        username={username}
                        setUsername={setUsername}
                        designField={designField}
                        setDesignField={setDesignField}
                        handleSubmit={handleSubmit}
                        submitted={submitted}
                        playButtonText={playButtonText} /> : null
            }
            {
                showDesignBrief ? < DesignBriefCard startGame={handleStartGame} /> : null
            }
            {
                showQuizAttempt ? <QuizAttempt handleSubmit={handleQuizSubmit} /> : null
            }

        </div>

    )

}


export default QuizPage
