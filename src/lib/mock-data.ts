export type Freelancer = {
  id: string;
  name: string;
  skills: string[];
  availability: string;
  capacity: number; // percentage
  avatarUrl: string;
};

export type Project = {
  id: string;
  name: string;
  pm: string;
  status: 'Active' | 'Completed' | 'At Risk';
  budget: number;
  progress: number; // percentage
};

export const freelancers: Freelancer[] = [
  { id: '1', name: 'Alice Johnson', skills: ['React', 'Node.js', 'TypeScript'], availability: 'Next week', capacity: 80, avatarUrl: 'https://picsum.photos/seed/f1/100/100' },
  { id: '2', name: 'Bob Williams', skills: ['Vue', 'Firebase', 'Go'], availability: '2 weeks', capacity: 40, avatarUrl: 'https://picsum.photos/seed/f2/100/100' },
  { id: '3', name: 'Charlie Brown', skills: ['Angular', 'Java', 'Spring'], availability: 'This week', capacity: 100, avatarUrl: 'https://picsum.photos/seed/f3/100/100' },
  { id: '4', name: 'Diana Miller', skills: ['Python', 'Django', 'Machine Learning'], availability: 'Next month', capacity: 20, avatarUrl: 'https://picsum.photos/seed/f4/100/100' },
  { id: '5', name: 'Ethan Davis', skills: ['Next.js', 'GraphQL', 'PostgreSQL'], availability: 'Tomorrow', capacity: 90, avatarUrl: 'https://picsum.photos/seed/f5/100/100' },
];

export const projects: Project[] = [
  { id: 'p1', name: 'E-commerce Platform', pm: 'PM-A', status: 'Active', budget: 50000, progress: 65 },
  { id: 'p2', name: 'Mobile App Redesign', pm: 'PM-B', status: 'Active', budget: 35000, progress: 40 },
  { id: 'p3', name: 'AI Chatbot Integration', pm: 'PM-A', status: 'At Risk', budget: 20000, progress: 90 },
  { id: 'p4', name: 'Data Analytics Dashboard', pm: 'PM-C', status: 'Completed', budget: 75000, progress: 100 },
];
