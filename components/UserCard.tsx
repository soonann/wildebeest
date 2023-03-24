import { QuizAttemptNested } from "@/lib/Supabase";

const AttemptCard = (props: { attempts: QuizAttemptNested }) => {

    let daysAgo = "2 hours"
    return (
        <div className="bg-white rounded-md drop-shadow-lg col-span-1 p-10 justify-center" >
            <div className="text-primary text-xs text-right font-normal">{daysAgo} ago</div>
            <div className="text-primary text-4xl font-extrabold">
                {props.attempts.users.username}
            </div>
            <span className="text-primary text-xs align-text-top font-normal">
                {props.attempts.quiz_entry.length} Steps
            </span>
            <div className="pb-2">

                <div className="">
                    {props.attempts.quiz_entry.map(x =>

                        <div key={`${x.attempt_id}_${x.sequence}`} className="" >
                            {
                                x.sequence == props.attempts.quiz_entry.length - 1 ?
                                    <div className="w-1.5 h-1.5 border-secondary bg-secondary z-50 border-1 rounded-full inline-block">
                                    </div> :
                                    <div className="w-1.5 h-1.5 border-primary border-[0.120rem] z-50 rounded-full inline-block">
                                    </div>
                            }
                            <span className="text-lg text-primary px-5">
                                {x.process}
                            </span>
                        </div>


                    )
                    }
                </div>

            </div >

            <div className="text-primary text-sm">
                <span className="font-bold ">{75}%</span> of the participants have <span className="font-bold ">{5}</span> steps in their design process.
            </div>
        </div >
    )


};

export default AttemptCard;
