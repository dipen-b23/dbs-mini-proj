export const events = [
  {
    id: 1,
    EVENT_ID: 1,
    name: 'React Summit 2024',
    EVENT_NAME: 'React Summit 2024',
    date: '2024-12-15',
    EVENT_DATE: '2024-12-15',
    category: 'Technology',
    venue: 'San Francisco, CA',
    description: 'The biggest React conference in the world. Join core team members and community leaders for talks, workshops, and networking.',
    DESCRIPTION: 'The biggest React conference in the world. Join core team members and community leaders for talks, workshops, and networking.',
    price: 299,
    tickets: [
      { TICKET_ID: 1, TICKET_NAME: 'General Admission', PRICE: 299 },
      { TICKET_ID: 2, TICKET_NAME: 'VIP Pass', PRICE: 499 },
      { TICKET_ID: 3, TICKET_NAME: 'Student', PRICE: 99 }
    ],
    sessions: [
      { time: '09:00 AM', title: 'Keynote: The Future of React', speaker: 'Sophie Alpert' },
      { time: '11:00 AM', title: 'Server Components Deep Dive', speaker: 'Dan Abramov' },
      { time: '02:00 PM', title: 'Performance Optimization', speaker: 'Ben Schwarz' },
    ],
    image: 'https://source.unsplash.com/1600x900/?react,conference'
  },
  {
    id: 2,
    EVENT_ID: 2,
    name: 'Design Systems Summit',
    EVENT_NAME: 'Design Systems Summit',
    date: '2024-11-20',
    EVENT_DATE: '2024-11-20',
    category: 'Design',
    venue: 'New York, NY',
    description: 'Learn how to build and scale design systems that your engineering team will love using.',
    DESCRIPTION: 'Learn how to build and scale design systems that your engineering team will love using.',
    price: 199,
    tickets: [
      { TICKET_ID: 4, TICKET_NAME: 'General Admission', PRICE: 199 },
      { TICKET_ID: 5, TICKET_NAME: 'VIP Pass', PRICE: 349 },
      { TICKET_ID: 6, TICKET_NAME: 'Student', PRICE: 79 }
    ],
    sessions: [
      { time: '10:00 AM', title: 'Tokens and Architecture', speaker: 'Jina Anne' },
      { time: '01:00 PM', title: 'Figma to Code Automation', speaker: 'Addy Osmani' },
    ],
    image: 'https://source.unsplash.com/1600x900/?design,ui'
  },
  {
    id: 3,
    EVENT_ID: 3,
    name: 'Startup Founder Meetup',
    EVENT_NAME: 'Startup Founder Meetup',
    date: '2024-10-05',
    EVENT_DATE: '2024-10-05',
    category: 'Business',
    venue: 'Austin, TX',
    description: 'Connect with fellow founders and investors. Pitch your idea and get real-time feedback.',
    DESCRIPTION: 'Connect with fellow founders and investors. Pitch your idea and get real-time feedback.',
    price: 49,
    tickets: [
      { TICKET_ID: 7, TICKET_NAME: 'General Admission', PRICE: 49 },
      { TICKET_ID: 8, TICKET_NAME: 'Premium', PRICE: 99 }
    ],
    sessions: [
      { time: '06:00 PM', title: 'Networking Hour', speaker: 'Community' },
      { time: '07:30 PM', title: 'Pitch Competition', speaker: 'VC Panel' },
    ],
    image: 'https://source.unsplash.com/1600x900/?startup,meeting'
  },
  {
    id: 4,
    EVENT_ID: 4,
    name: 'AI & Machine Learning Conf',
    EVENT_NAME: 'AI & Machine Learning Conf',
    date: '2025-01-10',
    EVENT_DATE: '2025-01-10',
    category: 'Technology',
    venue: 'Virtual',
    description: 'Exploring the cutting edge of artificial intelligence, LLMs, and neural networks.',
    DESCRIPTION: 'Exploring the cutting edge of artificial intelligence, LLMs, and neural networks.',
    price: 149,
    tickets: [
      { TICKET_ID: 9, TICKET_NAME: 'General Access', PRICE: 149 },
      { TICKET_ID: 10, TICKET_NAME: 'Premium Access', PRICE: 249 },
      { TICKET_ID: 11, TICKET_NAME: 'Student Access', PRICE: 59 }
    ],
    sessions: [
      { time: '09:00 AM', title: 'Introduction to Transformers', speaker: 'Dr. Andrew Ng' },
      { time: '12:00 PM', title: 'Ethics in AI', speaker: 'Timnit Gebru' },
    ],
    image: 'https://source.unsplash.com/1600x900/?ai,technology'
  },
  {
    id: 5,
    EVENT_ID: 5,
    name: 'Web3 Developer Workshop',
    EVENT_NAME: 'Web3 Developer Workshop',
    date: '2024-12-01',
    EVENT_DATE: '2024-12-01',
    category: 'Technology',
    venue: 'Singapore',
    description: 'Hands-on workshop for building decentralized applications with blockchain.',
    DESCRIPTION: 'Hands-on workshop for building decentralized applications with blockchain.',
    price: 179,
    tickets: [
      { TICKET_ID: 12, TICKET_NAME: 'Workshop Pass', PRICE: 179 },
      { TICKET_ID: 13, TICKET_NAME: 'Workshop + Meal', PRICE: 229 }
    ],
    sessions: [
      { time: '09:00 AM', title: 'Smart Contracts 101', speaker: 'Vitalik Buterin' },
      { time: '02:00 PM', title: 'Building dApps', speaker: 'Evan Van Ness' },
    ],
    image: 'https://source.unsplash.com/1600x900/?blockchain,code'
  },
  {
    id: 6,
    EVENT_ID: 6,
    name: 'Cloud Architecture Summit',
    EVENT_NAME: 'Cloud Architecture Summit',
    date: '2024-11-15',
    EVENT_DATE: '2024-11-15',
    category: 'Technology',
    venue: 'Seattle, WA',
    description: 'Explore microservices, Kubernetes, and cloud-native architecture patterns.',
    DESCRIPTION: 'Explore microservices, Kubernetes, and cloud-native architecture patterns.',
    price: 249,
    tickets: [
      { TICKET_ID: 14, TICKET_NAME: 'Single Day Pass', PRICE: 249 },
      { TICKET_ID: 15, TICKET_NAME: 'Two Day Pass', PRICE: 429 },
      { TICKET_ID: 16, TICKET_NAME: 'Student', PRICE: 119 }
    ],
    sessions: [
      { time: '08:30 AM', title: 'Kubernetes Best Practices', speaker: 'Kelsey Hightower' },
      { time: '12:00 PM', title: 'Serverless Deep Dive', speaker: 'Alex DeBrie' },
    ],
    image: 'https://source.unsplash.com/1600x900/?cloud,server'
  }
];

export const getUser = () => ({
  name: 'Alex Johnson',
  email: 'alex@company.com',
  avatar: 'https://i.pravatar.cc/150?img=68'
});
