export type SnippetLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'html'
  | 'css'
  | 'scss'
  | 'sql'
  | 'bash'
  | 'json'
  | 'yaml'
  | 'go'
  | 'rust'
  | 'ruby'
  | 'php'
  | 'swift'
  | 'kotlin'
  | 'dart'
  | 'other';

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: SnippetLanguage;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageConfig {
  key: SnippetLanguage;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
}

export const SNIPPET_LANGUAGES: LanguageConfig[] = [
  { key: 'typescript', label: 'TypeScript', icon: 'code', color: 'text-blue-600', bgColor: 'bg-blue-100', darkBgColor: 'dark:bg-blue-900/30' },
  { key: 'javascript', label: 'JavaScript', icon: 'javascript', color: 'text-yellow-600', bgColor: 'bg-yellow-100', darkBgColor: 'dark:bg-yellow-900/30' },
  { key: 'python', label: 'Python', icon: 'code', color: 'text-green-600', bgColor: 'bg-green-100', darkBgColor: 'dark:bg-green-900/30' },
  { key: 'java', label: 'Java', icon: 'coffee', color: 'text-red-600', bgColor: 'bg-red-100', darkBgColor: 'dark:bg-red-900/30' },
  { key: 'csharp', label: 'C#', icon: 'code', color: 'text-purple-600', bgColor: 'bg-purple-100', darkBgColor: 'dark:bg-purple-900/30' },
  { key: 'html', label: 'HTML', icon: 'html', color: 'text-orange-600', bgColor: 'bg-orange-100', darkBgColor: 'dark:bg-orange-900/30' },
  { key: 'css', label: 'CSS', icon: 'css', color: 'text-sky-600', bgColor: 'bg-sky-100', darkBgColor: 'dark:bg-sky-900/30' },
  { key: 'scss', label: 'SCSS', icon: 'css', color: 'text-pink-600', bgColor: 'bg-pink-100', darkBgColor: 'dark:bg-pink-900/30' },
  { key: 'sql', label: 'SQL', icon: 'database', color: 'text-indigo-600', bgColor: 'bg-indigo-100', darkBgColor: 'dark:bg-indigo-900/30' },
  { key: 'bash', label: 'Bash', icon: 'terminal', color: 'text-gray-600', bgColor: 'bg-gray-100', darkBgColor: 'dark:bg-gray-900/30' },
  { key: 'json', label: 'JSON', icon: 'data_object', color: 'text-emerald-600', bgColor: 'bg-emerald-100', darkBgColor: 'dark:bg-emerald-900/30' },
  { key: 'yaml', label: 'YAML', icon: 'data_object', color: 'text-teal-600', bgColor: 'bg-teal-100', darkBgColor: 'dark:bg-teal-900/30' },
  { key: 'go', label: 'Go', icon: 'code', color: 'text-cyan-600', bgColor: 'bg-cyan-100', darkBgColor: 'dark:bg-cyan-900/30' },
  { key: 'rust', label: 'Rust', icon: 'code', color: 'text-amber-600', bgColor: 'bg-amber-100', darkBgColor: 'dark:bg-amber-900/30' },
  { key: 'ruby', label: 'Ruby', icon: 'diamond', color: 'text-red-500', bgColor: 'bg-red-100', darkBgColor: 'dark:bg-red-900/30' },
  { key: 'php', label: 'PHP', icon: 'code', color: 'text-violet-600', bgColor: 'bg-violet-100', darkBgColor: 'dark:bg-violet-900/30' },
  { key: 'swift', label: 'Swift', icon: 'code', color: 'text-orange-500', bgColor: 'bg-orange-100', darkBgColor: 'dark:bg-orange-900/30' },
  { key: 'kotlin', label: 'Kotlin', icon: 'code', color: 'text-violet-500', bgColor: 'bg-violet-100', darkBgColor: 'dark:bg-violet-900/30' },
  { key: 'dart', label: 'Dart', icon: 'code', color: 'text-sky-500', bgColor: 'bg-sky-100', darkBgColor: 'dark:bg-sky-900/30' },
  { key: 'other', label: 'Other', icon: 'code', color: 'text-gray-500', bgColor: 'bg-gray-100', darkBgColor: 'dark:bg-gray-900/30' },
];
