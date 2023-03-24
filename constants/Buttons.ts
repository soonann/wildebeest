import { CustomButton } from "@/components/QuizAttempt";


export let images: Map<string, CustomButton> = new Map<string, CustomButton>([
    [
        'google', {
            image: 'button-google.png',
            text: 'Google'
        }
    ]
    ,
    [
        'behance', {
            image: 'button-behance.png',
            text: 'Behance'
        },
    ],
    [
        'sketching',
        {
            image: 'button-sketching.png',
            text: 'Sketching'
        }
    ],

    [

        'userTesting', {
            image: 'button-usertesting.png',
            text: 'User Testing'
        },
    ],
    [

        'defineProblem', {
            image: 'button-define.png',
            text: 'Define Problem'
        },
    ],
    [

        'brainStorming', {
            image: 'button-brainstorming.png',
            text: 'Brain Storming'
        },
    ],
    [

        'pinterest', {
            image: 'button-pinterest.png',
            text: 'Pinterest'
        },
    ],
    [

        'mindMap', {
            image: 'button-mindmap.png',
            text: 'Mindmap'
        },
    ],
    [

        'workshop', {
            image: 'button-workshop.png',
            text: 'Workshop'
        },
    ],
    [

        'prototype', {
            image: 'button-prototype.png',
            text: 'Prototype'
        },
    ],
    [

        'test', {
            image: 'button-test.png',
            text: 'Test'
        },
    ],
    [

        'talkToMyself', {
            image: 'button-talk.png',
            text: 'Talk to Myself'
        },
    ],
    [
        'others', {
            image: 'button-others.png',
            text: 'Others'
        }
    ]
])
