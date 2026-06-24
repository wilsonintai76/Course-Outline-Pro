export interface LearningTimeRow {
  topic: string;
  f2fKuliah: string;
  f2fTutorial: string;
  f2fTugasan1: string;
  f2fTugasan2: string;
  f2fTugasan3: string;
  f2fPembentangan: string;
  nf2fBerpandu: string;
  nf2fKendiri: string;
  nf2fTugasan1: string;
  nf2fTugasan2: string;
  nf2fTugasan3: string;
  nf2fPembentangan: string;
  totalSLT: string;
}

export interface CourseOutlineData {
  departmentName: string;
  logoUrl: string;
  courseName: string;
  courseCode: string;
  synopsis: string;
  creditValue: string;
  prerequisite: string;
  clos: Array<{ id: string; description: string; mapping: string }>;
  plo: string;
  assessments: Array<{ type: string; quantity: string; percentage: string }>;
  learningTimes: LearningTimeRow[];
  weeklySchedule: Array<{
    topic: string;
    content: string;
    contactHours: string;
    assessment: string;
    week: string;
  }>;
  references: string;
  preparedByName: string;
  verifiedByName: string;
  datePrepared: string;
  dateVerified: string;
}

export type Theme = 'crimson' | 'contrast' | 'slate' | 'amber';

export interface OutlineMeta {
  id: string;
  courseName: string;
  lastUpdated: string;
}
