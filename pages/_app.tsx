import { Database } from '@/lib/database.types'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session, }>) {
    const [supabase] = useState(() => createBrowserSupabaseClient<Database>())

    return (<SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
    </SessionContextProvider>);
}
