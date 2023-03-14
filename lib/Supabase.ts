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
type PartialQuizAttemptNested = ({ users: User, quiz_entry: QuizEntry[] })
export type QuizAttemptNested = ({ users: User, quiz_entry: QuizEntry[] } & QuizAttempt)

export const useStore = (props: any) => {
    // main states
    const [attempts, setAttempts] = useState<QuizAttemptNested[]>([]);

    // intial load
    const [newMultiAttempt, handleNewMultiAttempt] = useState<QuizAttemptNested[]>();

    // data handlers
    const [newSingleAttempt, handleNewSingleAttempt] = useState<QuizAttempt>();


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
                    handleNewSingleAttempt(payload.new)
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
            console.log(newMultiAttempt)
            setAttempts(newMultiAttempt)
        }
    }, [newMultiAttempt])

    // handle single attempt on live updates
    useEffect(() => {
        if (newSingleAttempt) {
            console.log(newSingleAttempt)
            fetchSingleAttempt(newSingleAttempt.id, setAttempts)
        }
    }, [newSingleAttempt])

    return {
        attempts
    }
}

export const fetchAllAttempts = async (setState?: any) => {
    try {
        let { data } = await supabase.from('quiz_attempt').select(`id, created_by, inserted_at, quiz_entry(\*), users(\*)`).order('inserted_at', { ascending: false })
        if (setState) {
            setState(data)
        }
        return data
    }
    catch (error) {
        console.log('error', error)
    }
}

export const fetchSingleAttempt = async (id: number, initialState?: any, setState?: any) => {
    try {
        let { data } = await supabase.from('quiz_attempt').select(`quiz_entry(\*), users(\*)`).eq('id', id).order('inserted_at', { ascending: false })
        if (setState) {
            initialState.concat(data)
            setState(data)
        }
        return data
    }
    catch (error) {
        console.log('error', error)
    }
}


