import AttemptCard from '@/components/UserCard';
import { useStore } from '@/lib/Supabase';
import { useRouter } from 'next/router';

const HomePage = () => {
    const { attempts, collations } = useStore({})
    const router = useRouter()

    return (
        <div className="p-2 pb-10 bg-[url(/background.png)] bg-cover ">

            <div className=' grid gap-2 px-4 mx-auto '>
                <div className='grid lg:grid-cols-4 sm:col-span-3 drop-shadow-md py-5 text-white font-bold text-center content-between'>
                    <div className='text-4xl col-span-3 text-left'>
                        Every designer has their unique design process. What is yours?
                    </div>
                    <div className='text-left col-span-1 w-[9rem] h-[9rem] hover:underline bg-center bg-cover bg-no-repeat bg-[url(/wildebeest-vercel-qr.jpg)]'>
                    </div>
                </div>

                <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                    {attempts.map(x => { return <AttemptCard attempts={x} percentageOfParticipants={((collations.get(x.quiz_entry.length) ?? 1) / attempts.length * 100).toFixed(2)} key={`${x.created_by}_${x.id}`}></AttemptCard> })}
                </div>
            </div>
        </div>
    )
}

export default HomePage
