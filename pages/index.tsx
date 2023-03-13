import UserCard from '@/components/UserCard';
import { supabase } from '@/lib/Store'
import { useState } from 'react'

const Home = () => {
    const fake = [1, 1, 1, 1, 1];

    return (
        <div className='max-w-screen-xl px-4 mx-auto'>
            <div className='drop-shadow-md h-10 bg-white'>

            </div>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>

                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>

            </div>
        </div>

    )
}

export default Home
