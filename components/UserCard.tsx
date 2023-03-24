import { QuizAttemptNested } from "@/lib/Supabase";
function timeSince(date: Date) {

    var seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
var aDay = 24 * 60 * 60 * 1000;
console.log(timeSince(new Date(Date.now() - aDay)));
console.log(timeSince(new Date(Date.now() - aDay * 2)));

const AttemptCard = (props: { attempts: QuizAttemptNested, percentageOfParticipants: string }) => {

    let daysAgo = timeSince(new Date(props.attempts.inserted_at))

    return (
        <div className="bg-white rounded-md drop-shadow-lg col-span-1 px-8 py-8 justify-center h-min" >
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
                <span className="font-bold ">{props.percentageOfParticipants}%</span> of the participants have <span className="font-bold ">{props.attempts.quiz_entry.length}</span> steps in their design process.
            </div>
        </div >
    )


};

export default AttemptCard;
