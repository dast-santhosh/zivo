export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  tags: string[];
  createdAt: Date;
}

export interface StudyPlanItem {
  day: string;
  subject: string;
  topic: string;
  duration: string;
  activity: 'Study' | 'Practice' | 'Revision' | 'Break';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  topic: string;
  date: Date;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  TUTOR = 'tutor',
  NOTES = 'notes',
  PLANNER = 'planner',
  EXAM = 'exam',
  COMMUNITY = 'community',
}