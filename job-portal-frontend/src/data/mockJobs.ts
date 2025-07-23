export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: string;
  location: string;
  isRemote: boolean;
  salary: string;
  description: string;
  postedTime: string;
  category: string;
  employmentType: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "🅰️",
    experience: "2+ 1-3 yr Exp",
    location: "London",
    isRemote: true,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "full-time"
  },
  {
    id: "2",
    title: "Node Js Developer",
    company: "Tesla",
    logo: "🚗",
    experience: "2+ 1-3 yr Exp",
    location: "Manchester",
    isRemote: false,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "full-time"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Bitcoin",
    logo: "₿",
    experience: "2+ 1-3 yr Exp",
    location: "Remote",
    isRemote: true,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "design",
    employmentType: "full-time"
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "🅰️",
    experience: "2+ 1-3 yr Exp",
    location: "Birmingham",
    isRemote: true,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "full-time"
  },
  {
    id: "5",
    title: "Node Js Developer",
    company: "Node.js Foundation",
    logo: "🟢",
    experience: "2+ 1-3 yr Exp",
    location: "London",
    isRemote: false,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "full-time"
  },
  {
    id: "6",
    title: "UX/UI Designer",
    company: "Tesla",
    logo: "🚗",
    experience: "2+ 1-3 yr Exp",
    location: "Remote",
    isRemote: true,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "design",
    employmentType: "contract"
  },
  {
    id: "7",
    title: "Full Stack Developer",
    company: "Amazon",
    logo: "🅰️",
    experience: "2+ 1-3 yr Exp",
    location: "Manchester",
    isRemote: true,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "part-time"
  },
  {
    id: "8",
    title: "Node Js Developer",
    company: "Node.js Foundation",
    logo: "🟢",
    experience: "2+ 1-3 yr Exp",
    location: "London",
    isRemote: false,
    salary: "121 PA",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    postedTime: "24h Ago",
    category: "development",
    employmentType: "full-time"
  }
];