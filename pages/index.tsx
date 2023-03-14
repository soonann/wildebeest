import AttemptCard from '@/components/UserCard';
import { useStore } from '@/lib/Supabase';

const Home = () => {
    const { attempts } = useStore({})

    return (
        <div className='max-w-screen-xl px-4 mx-auto'>
            <div className='drop-shadow-md h-10 bg-white'>

            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                {attempts.map(x => { return <AttemptCard attempts={x} key={x.users.id}></AttemptCard> })}
            </div>
        </div>

    )
}

export default Home
