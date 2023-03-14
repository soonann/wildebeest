import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Database } from './database.types'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
)

type QuizAttempt = Database['public']['Tables']['quiz_attempt']['Row']
type QuizEntry = Database['public']['Tables']['quiz_entry']['Row']
type User = Database['public']['Tables']['users']['Row']
export type QuizAttemptNested = ({ users: User, quiz_entry: QuizEntry[] } & QuizAttempt)

export const useStore = (props: any) => {
    // main states
    const [attempts, setAttempts] = useState<QuizAttemptNested[]>([]);

    // data handlers
    const [newAttempt, handleNewAttempt] = useState<QuizAttempt>();
    //const [newUser, handleNewUser] = useState<User>();
    //const [newEntries, handleNewEntries] = useState<QuizEntry[]>();

    // intial load
    const [newMultiAttempt, handleNewMultiAttempt] = useState<QuizAttemptNested[]>();

    useEffect(() => {
        // initial retrieval
        fetchAllAttempts(handleNewMultiAttempt)


        // listen to results and handle them
        const resultListener = supabase
            .channel('public:quiz_attempt')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'quiz_attempt',
                },
                (payload: { new: any }) => {
                    handleNewAttempt(payload.new)
                }
            )
            .subscribe()


        // cleanup 
        return () => {
            supabase.removeChannel(resultListener)
        }
    }, [])



    // handle initial retrieval for attempts
    useEffect(() => {
        if (newMultiAttempt) {
            setAttempts(newMultiAttempt)
            console.log(newMultiAttempt)
        }
    }, [newMultiAttempt])

    // handle new attempts populated
    //useEffect(() => {
    //if (newAttempt) {
    //const handleUserAndEntryAsync = async () => {
    //// try to get the user from local data before retrieving 
    //if (!users.get(newAttempt.created_by)) {
    //// if we cant find, search for it in the db and set it to newUser state
    //console.log("cant find user", users.get(newAttempt.created_by))
    //await fetchUserById(newAttempt.created_by, handleNewUser)
    //}
    //if (!entries.get(newAttempt.id)) {
    //await fetchEntries(newAttempt.id, handleNewEntries)
    //}
    //// append to current results
    //setAttempts(attempts.concat(newAttempt))
    //}
    //handleUserAndEntryAsync();
    //}
    //}, [newAttempt])

    // handle new user populated
    //useEffect(() => {
    //if (newUser) {
    //users.set(newUser.id, newUser)
    //console.log(users)
    //}
    //}, [newUser])

    // handle new entries
    //useEffect(() => {
    //if (newEntries && newEntries.length > 0) {
    //entries.set(newEntries[0].attempt_id, newEntries)
    //}
    //}, [newEntries])

    return {
        attempts
    }
}

export const fetchAllAttempts = async (handleNewAttempt?: any) => {
    try {
        let { data } = await supabase.from('quiz_attempt').select(`id, created_by, inserted_at, quiz_entry(\*), users(\*)`).order('inserted_at', { ascending: false })
        if (handleNewAttempt) {
            handleNewAttempt(data)
        }
        return data
    }
    catch (error) {
    }
}

export const fetchUserById = async (userId?: any, handleNewUser?: any) => {
    if (!userId) {
        return
    }
    try {
        let { data } = await supabase.from('users').select(`*`).eq('id', userId)
        if (!data) {
            return;
        }
        console.log(data)
        if (handleNewUser) {
            handleNewUser(data[0])
        }
        return data[0]
    } catch (error) {
        console.log('error', error)
    }
}

export const fetchEntries = async (id?: number, handleNewEntries?: any) => {
    if (!id) {
        return
    }
    try {
        let { data } = await supabase.from('quiz_entry').select(`*`).eq('attempt_id', id).order('sequence', { ascending: true })
        if (handleNewEntries) {
            handleNewEntries(data)
        }
        return data

    }
    catch (error) {
        console.log('error', error)
    }
}

