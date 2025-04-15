import { Job } from '@/types/job';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    url: 'https://techcorp.com/careers',
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    domain: 'Frontend'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    url: 'https://datasystems.io/jobs',
    dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    domain: 'Backend'
  },
  {
    id: '3',
    title: 'UX/UI Design Intern',
    company: 'CreativeMinds',
    url: 'https://creativeminds.design/internships',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Internship',
    experienceLevel: 'Entry',
    domain: 'UI/UX'
  },
  {
    id: '4',
    title: 'DevOps Specialist',
    company: 'CloudNative',
    url: 'https://cloudnative.dev/careers',
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Contract',
    experienceLevel: 'Senior',
    domain: 'DevOps'
  },
  {
    id: '5',
    title: 'Mobile Developer',
    company: 'AppWorks',
    url: 'https://appworks.io/jobs',
    dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    domain: 'Mobile'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    url: 'https://analyticspro.ai/careers',
    dateAdded: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Part-time',
    experienceLevel: 'Senior',
    domain: 'Data Science'
  },
  {
    id: '7',
    title: 'Product Manager',
    company: 'InnovateTech',
    url: 'https://innovatetech.com/jobs',
    dateAdded: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Full-time',
    experienceLevel: 'Lead',
    domain: 'Product Management'
  },
  {
    id: '8',
    title: 'QA Engineer Intern',
    company: 'QualitySoft',
    url: 'https://qualitysoft.com/internships',
    dateAdded: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Internship',
    experienceLevel: 'Entry',
    domain: 'QA'
  },
  {
    id: '9',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    url: 'https://websolutions.dev/careers',
    dateAdded: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Full-time',
    experienceLevel: 'Mid',
    domain: 'Full Stack'
  },
  {
    id: '10',
    title: 'Machine Learning Engineer',
    company: 'AILabs',
    url: 'https://ailabs.tech/jobs',
    dateAdded: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    jobType: 'Contract',
    experienceLevel: 'Senior',
    domain: 'Machine Learning'
  }
];

export default mockJobs;