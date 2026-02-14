import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnippetsService } from '../../services/snippets.service';
import { DashboardService } from '../../services/dashboard.service';
import {
  CodeSnippet,
  SnippetLanguage,
  SNIPPET_LANGUAGES,
  LanguageConfig,
} from '../../model/snippet.model';

@Component({
  selector: 'app-snippets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './snippets.component.html',
  styleUrl: './snippets.component.css',
})
export class SnippetsComponent {
  private readonly snippetsService = inject(SnippetsService);
  private readonly dashboardService = inject(DashboardService);

  languages = SNIPPET_LANGUAGES;

  // Filters
  searchQuery = signal('');
  filterLanguage = signal<SnippetLanguage | ''>('');
  filterTag = signal('');
  filterFavOnly = signal(false);
  viewMode = signal<'grid' | 'list'>('grid');

  // Form
  showForm = signal(false);
  isEditing = signal(false);
  editingId = signal<string | null>(null);

  formData = signal({
    title: '',
    description: '',
    code: '',
    language: 'typescript' as SnippetLanguage,
    tags: '',
  });

  // Detail view
  selectedSnippet = signal<CodeSnippet | null>(null);
  showDetail = signal(false);

  // Delete confirm
  deleteConfirmId = signal<string | null>(null);

  // Clipboard feedback
  copiedId = signal<string | null>(null);

  allTags = this.snippetsService.allTags;
  totalCount = this.snippetsService.totalCount;
  favoriteCount = this.snippetsService.favoriteCount;

  filteredSnippets = computed(() => {
    return this.snippetsService.searchSnippets(
      this.searchQuery(),
      this.filterLanguage() || undefined,
      this.filterTag() || undefined,
      this.filterFavOnly() || undefined
    );
  });

  filteredCount = computed(() => this.filteredSnippets().length);

  // ──── FORM ────

  openAddForm(): void {
    this.formData.set({
      title: '',
      description: '',
      code: '',
      language: 'typescript',
      tags: '',
    });
    this.isEditing.set(false);
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEditForm(snippet: CodeSnippet): void {
    this.formData.set({
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language: snippet.language,
      tags: snippet.tags.join(', '),
    });
    this.isEditing.set(true);
    this.editingId.set(snippet.id);
    this.showDetail.set(false);
    this.showForm.set(true);
  }

  submitForm(): void {
    const form = this.formData();
    if (!form.title.trim() || !form.code.trim()) return;

    const tags = form.tags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    if (this.isEditing() && this.editingId()) {
      this.snippetsService.updateSnippet(this.editingId()!, {
        title: form.title.trim(),
        description: form.description.trim(),
        code: form.code,
        language: form.language,
        tags,
      });
      this.dashboardService.logActivity({
        type: 'snippet',
        action: 'Updated snippet',
        title: form.title.trim(),
        icon: 'edit',
        color: 'text-blue-500',
      });
    } else {
      this.snippetsService.addSnippet({
        title: form.title.trim(),
        description: form.description.trim(),
        code: form.code,
        language: form.language,
        tags,
      });
      this.dashboardService.logActivity({
        type: 'snippet',
        action: 'Created snippet',
        title: form.title.trim(),
        icon: 'add',
        color: 'text-green-500',
      });
    }

    this.showForm.set(false);
  }

  cancelForm(): void {
    this.showForm.set(false);
  }

  // ──── ACTIONS ────

  toggleFavorite(event: Event, snippet: CodeSnippet): void {
    event.stopPropagation();
    this.snippetsService.toggleFavorite(snippet.id);
  }

  confirmDelete(event: Event, id: string): void {
    event.stopPropagation();
    this.deleteConfirmId.set(id);
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null);
  }

  deleteSnippet(id: string): void {
    const snippet = this.snippetsService.getSnippetById(id);
    this.snippetsService.deleteSnippet(id);
    if (snippet) {
      this.dashboardService.logActivity({
        type: 'snippet',
        action: 'Deleted snippet',
        title: snippet.title,
        icon: 'delete',
        color: 'text-red-500',
      });
    }
    this.deleteConfirmId.set(null);
    if (this.showDetail() && this.selectedSnippet()?.id === id) {
      this.showDetail.set(false);
    }
  }

  copyCode(event: Event, snippet: CodeSnippet): void {
    event.stopPropagation();
    navigator.clipboard.writeText(snippet.code).then(() => {
      this.copiedId.set(snippet.id);
      setTimeout(() => this.copiedId.set(null), 2000);
    });
  }

  openDetail(snippet: CodeSnippet): void {
    this.selectedSnippet.set(snippet);
    this.showDetail.set(true);
  }

  closeDetail(): void {
    this.showDetail.set(false);
    this.selectedSnippet.set(null);
  }

  // ──── FILTER HELPERS ────

  clearFilters(): void {
    this.searchQuery.set('');
    this.filterLanguage.set('');
    this.filterTag.set('');
    this.filterFavOnly.set(false);
  }

  toggleFavFilter(): void {
    this.filterFavOnly.update(v => !v);
  }

  setLanguageFilter(lang: SnippetLanguage | ''): void {
    this.filterLanguage.set(lang);
  }

  setTagFilter(tag: string): void {
    this.filterTag.set(this.filterTag() === tag ? '' : tag);
  }

  // ──── UTILS ────

  getLanguageConfig(key: SnippetLanguage): LanguageConfig {
    return this.snippetsService.getLanguageConfig(key);
  }

  getTimeAgo(timestamp: string): string {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getCodePreview(code: string, lines = 4): string {
    return code.split('\n').slice(0, lines).join('\n');
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  updateFormField(field: string, value: string): void {
    this.formData.update(f => ({ ...f, [field]: value }));
  }

  updateFormLanguage(value: string): void {
    this.formData.update(f => ({ ...f, language: value as SnippetLanguage }));
  }
}
