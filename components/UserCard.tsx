import { QuizAttemptNested } from "@/lib/Supabase";

const AttemptCard = (props: { attempts: QuizAttemptNested }) => {

    return (
        <div className="bg-white rounded-md drop-shadow-lg col-span-1 p-10 justify-center" >
            <div className="text-lg font-semibold">
                {props.attempts.users.username}
            </div>
            <ul className="text-sm ">
                {props.attempts.quiz_entry.map(x => <li key={`${x.attempt_id}_${x.sequence}`}>{x.process}</li>)}
            </ul>
        </div>
    )


};

export default AttemptCard;
