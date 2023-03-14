import AttemptCard from '@/components/UserCard';
import { useStore } from '@/lib/Supabase';
import { useRouter } from 'next/router';

const HomePage = () => {
    const { attempts } = useStore({})
    const router = useRouter()

    return (
        <div className='max-w-screen-xl grid gap-2 px-4 mx-auto'>
            <div className='grid grid-cols-3 drop-shadow-md py-5 bg-white text-center text-gray-900 content-between'>
                <div>

                </div>
                <div>
                    Design is amazing
                </div>
                <div className='text-right px-5 cursor-pointer hover:underline text-red-900'>
                    <a onClick={() => router.push('/quiz')}>IM A QR CODE :)</a>
                </div>
            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                {attempts.map(x => { return <AttemptCard attempts={x} key={`${x.created_by}_${x.id}`}></AttemptCard> })}
            </div>
        </div>
    )
}

export default HomePage
