export interface Project {
  id: number;
  name: string;
  description: string;
  primaryLanguage: string | null;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}
