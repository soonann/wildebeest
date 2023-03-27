import AttemptCard from '@/components/UserCard';
import { useStore } from '@/lib/Supabase';
import { useRouter } from 'next/router';

const HomePage = () => {
    const { attempts, collations } = useStore({})
    const router = useRouter()

    return (
        <div className="bg-[url(/background.png)] bg-cover px-4 py-4">

            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 place-items-center'>

                <div className='col-span-1 py-5 '>
                    <div className='flex justify-center items-center'>
                        <span className='text-white text-[1.6rem] text-center font-semibold'>SCAN HERE</span>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img className='rounded-md  w-40 h-40' src='/wildebeest-vercel-qr.jpg' />
                    </div>
                </div>
                <div className='text-7xl font-bold text-white lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1 md:text-left text-center py-5'>
                    Every designer has their unique<br /> <span className='underline text-white '>design process.</span> What is yours?
                </div>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-4 mt-5'>
                {attempts.map(x => { return <AttemptCard attempts={x} percentageOfParticipants={((collations.get(x.quiz_entry.length) ?? 1) / attempts.length * 100).toFixed(2)} key={`${x.created_by}_${x.id}`}></AttemptCard> })}
            </div>
        </div>
    )
}

export default HomePage
