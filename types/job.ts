export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead';
export type Domain = 
  | 'Frontend' 
  | 'Backend' 
  | 'Full Stack' 
  | 'Mobile' 
  | 'DevOps' 
  | 'Data Science' 
  | 'Machine Learning' 
  | 'UI/UX' 
  | 'Product Management' 
  | 'QA' 
  | 'Other';

export interface Job {
  id: string;
  title: string;
  company: string;
  url: string;
  dateAdded: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  domain: Domain;
}

export const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
export const experienceLevels: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead'];
export const domains: Domain[] = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Mobile',
  'DevOps',
  'Data Science',
  'Machine Learning',
  'UI/UX',
  'Product Management',
  'QA',
  'Other'
];