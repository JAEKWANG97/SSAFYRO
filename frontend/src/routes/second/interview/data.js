// Array of dummy user data
export const users = [
    {
        userId: 1,
        name: "Alice",
        email: "alice@example.com",
    },
    {
        userId: 2,
        name: "Bob",
        email: "bob@example.com",
    },
    {
        userId: 3,
        name: "Charlie",
        email: "charlie@example.com",
    },
]

export const currentUser = { userId: 4, name: "Jun" };

// Array of dummy room data
export let rooms = [
    {
        id: "1",
        title: "Frontend Developer PT Room",
        description: "Prepare for frontend developer interviews with peers.",
        type: "PRESENTATION",
        userList: [
            { userId: 1, name: "Alice" },
            { userId: 2, name: "Bob" },
        ],
        participantCount: 2,
        capacity: 3,
        status: "WAIT", // WAIT or closed
    },
    {
        id: "2",
        title: "Backend Developer PT Room",
        description: "Prepare for backend developer interviews with peers.",
        type: "PRESENTATION",
        userList: [{ userId: 3, name: "Charlie" }],
        participantCount: 1,
        capacity: 3,
        status: "WAIT",
    },
    {
        id: "3",
        title: "Personality Interview Practice Room",
        description: "Practice personality interview questions.",
        type: "PERSONALITY",
        userList: [],
        participantCount: 0,
        capacity: 2,
        status: "CLOSED",
    },
    {
        id: "4",
        title: "Personality Interview Practice Room22",
        description: "Practice personality interview questions.333",
        type: "PERSONALITY",
        userList: [],
        participantCount: 0,
        capacity: 2,
        status: "CLOSED",
    },
]