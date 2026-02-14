import { Injectable, signal, computed } from '@angular/core';
import { CodeSnippet, SnippetLanguage, SNIPPET_LANGUAGES, LanguageConfig } from '../model/snippet.model';
import { v4 as uuidv4 } from 'uuid';

const SNIPPETS_KEY = 'code_snippets';

@Injectable({ providedIn: 'root' })
export class SnippetsService {
  private readonly snippets = signal<CodeSnippet[]>([]);

  readonly allSnippets = this.snippets.asReadonly();
  readonly languages = SNIPPET_LANGUAGES;

  readonly totalCount = computed(() => this.snippets().length);
  readonly favoriteCount = computed(() => this.snippets().filter(s => s.isFavorite).length);

  readonly languageBreakdown = computed(() => {
    const map = new Map<SnippetLanguage, number>();
    this.snippets().forEach(s => map.set(s.language, (map.get(s.language) || 0) + 1));
    return Array.from(map.entries())
      .map(([lang, count]) => ({ language: lang, count, config: this.getLanguageConfig(lang) }))
      .sort((a, b) => b.count - a.count);
  });

  readonly allTags = computed(() => {
    const tagSet = new Set<string>();
    this.snippets().forEach(s => s.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  });

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(SNIPPETS_KEY);
      if (raw) {
        this.snippets.set(JSON.parse(raw));
      }
    } catch {
      localStorage.removeItem(SNIPPETS_KEY);
    }
  }

  private save(): void {
    localStorage.setItem(SNIPPETS_KEY, JSON.stringify(this.snippets()));
  }

  getSnippets(): CodeSnippet[] {
    return this.snippets();
  }

  getSnippetById(id: string): CodeSnippet | undefined {
    return this.snippets().find(s => s.id === id);
  }

  addSnippet(data: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>): void {
    const now = new Date().toISOString();
    const snippet: CodeSnippet = {
      ...data,
      id: uuidv4(),
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    };
    this.snippets.update(list => [snippet, ...list]);
    this.save();
  }

  updateSnippet(id: string, data: Partial<CodeSnippet>): void {
    this.snippets.update(list =>
      list.map(s => s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s)
    );
    this.save();
  }

  deleteSnippet(id: string): void {
    this.snippets.update(list => list.filter(s => s.id !== id));
    this.save();
  }

  toggleFavorite(id: string): void {
    this.snippets.update(list =>
      list.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s)
    );
    this.save();
  }

  searchSnippets(query: string, language?: SnippetLanguage, tag?: string, favOnly?: boolean): CodeSnippet[] {
    let results = this.snippets();
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (language) {
      results = results.filter(s => s.language === language);
    }
    if (tag) {
      results = results.filter(s => s.tags.includes(tag));
    }
    if (favOnly) {
      results = results.filter(s => s.isFavorite);
    }
    return results;
  }

  getLanguageConfig(key: SnippetLanguage): LanguageConfig {
    return this.languages.find(l => l.key === key) || this.languages[this.languages.length - 1];
  }

  getRecentSnippets(count: number): CodeSnippet[] {
    return [...this.snippets()]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, count);
  }
}
