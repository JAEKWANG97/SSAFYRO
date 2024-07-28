// Array of dummy user data
export const users = [
  {
    userId: 'user1',
    name: 'Alice',
    email: 'alice@example.com',
  },
  {
    userId: 'user2',
    name: 'Bob',
    email: 'bob@example.com',
  },
  {
    userId: 'user3',
    name: 'Charlie',
    email: 'charlie@example.com',
  },
];

// Array of dummy room data
export let rooms = [
  {
    roomId: '1',
    title: 'Frontend Developer PT Room',
    description: 'Prepare for frontend developer interviews with peers.',
    type: 'PT',
    participants: [
      { userId: 'user1', name: 'Alice' },
      { userId: 'user2', name: 'Bob' },
    ],
    maxParticipants: 3,
    status: 'open', // open or closed
  },
  {
    roomId: '2',
    title: 'Backend Developer PT Room',
    description: 'Prepare for backend developer interviews with peers.',
    type: 'PT',
    participants: [
      { userId: 'user3', name: 'Charlie' },
    ],
    maxParticipants: 3,
    status: 'open',
  },
  {
    roomId: '3',
    title: 'Personality Interview Practice Room',
    description: 'Practice personality interview questions.',
    type: 'Personality',
    participants: [],
    maxParticipants: 2,
    status: 'closed',
  },
  {
    roomId: '4',
    title: 'Personality Interview Practice Room22',
    description: 'Practice personality interview questions.333',
    type: 'Personality',
    participants: [],
    maxParticipants: 2,
    status: 'closed',
  },
];

