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
    const [collations, setCollations] = useState<Map<number, number>>(new Map<number, number>());

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
            fetchSingleAttempt(newSingleAttempt.id, attempts, setAttempts)

        }
    }, [newSingleAttempt])

    // update collation amount
    useEffect(() => {

        console.log("called", attempts)
        let collation = new Map<number, number>();
        for (let i = 0; i < attempts.length; i++) {
            const steps = attempts[i].quiz_entry.length;
            let curr = collation.get(steps);
            if (curr == null) {
                curr = 0
            }
            collation.set(steps, curr + 1)
        }
        setCollations(collation)

    }, [attempts])

    return {
        attempts,
        collations
    }
}

export const fetchAllAttempts = async (setState?: any) => {
    try {
        let { data } = await supabase.from('quiz_attempt').select(`id, created_by, inserted_at, quiz_entry(\*), users(\*)`).order('inserted_at', { ascending: false })
        console.log(data)
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
        let { data } = await supabase.from('quiz_attempt').select(`id, created_by, inserted_at, quiz_entry(\*), users(\*)`).eq('id', id).order('inserted_at', { ascending: false }).single()

        if (setState) {
            const result = [data].concat(initialState)
            setState(result)
        }
        return data
    }
    catch (error) {
        console.log('error', error)
    }
}


type QuizAttemptInsert = Database['public']['Tables']['quiz_attempt']['Insert']
type QuizEntryInsert = Database['public']['Tables']['quiz_entry']['Insert']

// creates a new attempt with the given options
export const createAttemptWithEntries = async (auth_id: string, quiz_entry: QuizEntry[]) => {
    try {
        const handleQuizAttemptInsertAsync = async () => {
            try {

                const { data, error } = await supabase.from('quiz_attempt').insert<QuizAttemptInsert>({ created_by: auth_id }).select().single<QuizAttemptInsert>()
                const quiz_attempt_insert = data;
                if (data && data.id) {
                    // set attempt id to the attempt one's
                    const attempt_id = data.id
                    quiz_entry = quiz_entry.map(x => {
                        x.attempt_id = attempt_id;
                        return x
                    })
                }
            }
            catch (error) {
                console.log('error', error)
            }

        }
        const handleQuizEntryInsertAsync = async () => {
            try {
                const { data, error } = await supabase.from('quiz_entry').insert<QuizEntry[]>(quiz_entry)
            }
            catch (error) {
                console.log('error', error)
            }
        }

        await handleQuizAttemptInsertAsync()
        await handleQuizEntryInsertAsync()
        return true;

    }
    catch (error) {
        console.log('error', error)
    }
}

type UserInsert = Database['public']['Tables']['users']['Insert']

export const createUser = async (auth_id: string, username: string) => {
    try {
        const { data, error } = await supabase.from('users').insert<UserInsert>({ id: auth_id, username: username }).select().single<UserInsert>()
        return data
    }
    catch (error) {
        console.log('error', error)
    }
}

export const signUpAndLoginAnonymously = async () => {
    const randomValue = Date.now().valueOf().toString()
    try {
        const { data, error } = await supabase.auth.signUp({
            email: `${randomValue}@soonann.dev`,
            password: process.env.NEXT_PUBLIC_ANON_ACCOUNT_PASSWORD ?? '',
        })
        await supabase.auth.signInWithPassword({
            email: `${randomValue}@soonann.dev`,
            password: process.env.NEXT_PUBLIC_ANON_ACCOUNT_PASSWORD ?? ''
        })
        return data;
    }
    catch (error) {
        console.log('error', error)
    }
}

