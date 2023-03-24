import AttemptCard from '@/components/UserCard';
import { useStore } from '@/lib/Supabase';
import { useRouter } from 'next/router';

const HomePage = () => {
    const { attempts } = useStore({})
    const router = useRouter()

    return (
        <div className="h-screen bg-[url(/background.png)]">

            <div className=' grid gap-2 px-4 mx-auto max-w-screen-xl'>
                <div className='grid grid-cols-3 drop-shadow-md py-5 text-white font-bold text-center text-gray-900 content-between'>
                    <div className='text-4xl col-span-2 text-left'>
                        Every designer has their unique design process. What is yours?
                    </div>
                    <div className='text-left span-1 px-5 cursor-pointer hover:underline text-red-900'>
                        <a onClick={() => router.push('/quiz')}>IM A QR CODE :)</a>
                    </div>
                </div>

                <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                    {attempts.map(x => { return <AttemptCard attempts={x} key={`${x.created_by}_${x.id}`}></AttemptCard> })}
                </div>
            </div>
        </div>
    )
}

export default HomePage
