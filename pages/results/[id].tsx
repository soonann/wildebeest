import AttemptCard from "@/components/UserCard"
import { useStore } from "@/lib/Supabase"
import { useRouter } from "next/router"

const ResultPage = () => {
    const { attempts, collations } = useStore({})
    const router = useRouter()
    const { id } = router.query



    return (
        <div className="flex items-center justify-center bg-[url(/background.png)] bg-cover h-full ">
            <div className='mx-8'>
                <div className="text-white text-4xl text-center pb-8 font-bold">Your results!</div>
                {attempts.map(x => {
                    return x.users.id == id ? <AttemptCard attempts={x} percentageOfParticipants={((collations.get(x.quiz_entry.length) ?? 1) / attempts.length * 100).toFixed(2)} key={`${x.created_by}_${x.id}`}></AttemptCard> : null
                })}
            </div>
        </div>
    )
}

export default ResultPage
