import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SearchResult {
  id: string;
  title: string;
  type: 'resource' | 'topic' | 'blog';
  description: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.css'
})
export class GlobalSearchComponent implements OnInit {
  isOpen = signal(false);
  searchQuery = signal('');
  selectedIndex = signal(0);

  // Dummy search results
  dummyResults: SearchResult[] = [
    {
      id: '1',
      title: 'Angular Dependency Injection',
      type: 'resource',
      description: 'Learn about dependency injection patterns in Angular applications',
      url: '/content/angular-di',
      icon: 'article'
    },
    {
      id: '2',
      title: 'React Hooks Best Practices',
      type: 'resource',
      description: 'Master React hooks with practical examples and patterns',
      url: '/content/react-hooks',
      icon: 'article'
    },
    {
      id: '3',
      title: 'Node.js Performance Optimization',
      type: 'blog',
      description: 'Tips and tricks for optimizing Node.js applications',
      url: '/blogs/nodejs-performance',
      icon: 'rate_review'
    },
    {
      id: '4',
      title: 'TypeScript Advanced Types',
      type: 'topic',
      description: 'Deep dive into TypeScript type system',
      url: '/content/typescript-types',
      icon: 'topic'
    },
    {
      id: '5',
      title: 'CSS Grid Layout Guide',
      type: 'resource',
      description: 'Complete guide to CSS Grid with examples',
      url: '/content/css-grid',
      icon: 'article'
    },
    {
      id: '6',
      title: 'REST API Design Principles',
      type: 'blog',
      description: 'Best practices for designing RESTful APIs',
      url: '/blogs/rest-api-design',
      icon: 'rate_review'
    }
  ];

  filteredResults = signal<SearchResult[]>([]);

  ngOnInit(): void {
    this.filteredResults.set(this.dummyResults);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Ctrl+K or Cmd+K to open search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.toggleSearch();
    }

    // Escape to close
    if (event.key === 'Escape' && this.isOpen()) {
      this.closeSearch();
    }

    // Arrow navigation when search is open
    if (this.isOpen()) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.navigateDown();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.navigateUp();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        this.selectResult();
      }
    }
  }

  toggleSearch() {
    this.isOpen.update(val => !val);
    if (this.isOpen()) {
      // Focus search input after a short delay
      setTimeout(() => {
        const input = document.getElementById('global-search-input');
        input?.focus();
      }, 100);
    }
  }

  openSearch() {
    this.isOpen.set(true);
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      input?.focus();
    }, 100);
  }

  closeSearch() {
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.selectedIndex.set(0);
    this.filteredResults.set(this.dummyResults);
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.selectedIndex.set(0);

    if (!query.trim()) {
      this.filteredResults.set(this.dummyResults);
      return;
    }

    // Filter dummy results based on search query
    const filtered = this.dummyResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );

    this.filteredResults.set(filtered);
  }

  navigateDown() {
    const maxIndex = this.filteredResults().length - 1;
    if (this.selectedIndex() < maxIndex) {
      this.selectedIndex.update(val => val + 1);
      this.scrollToSelected();
    }
  }

  navigateUp() {
    if (this.selectedIndex() > 0) {
      this.selectedIndex.update(val => val - 1);
      this.scrollToSelected();
    }
  }

  scrollToSelected() {
    setTimeout(() => {
      const selected = document.querySelector('.search-result-selected');
      selected?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
  }

  selectResult() {
    const result = this.filteredResults()[this.selectedIndex()];
    if (result) {
      console.log('Navigate to:', result.url);
      // TODO: Implement navigation
      this.closeSearch();
    }
  }

  onResultClick(index: number) {
    this.selectedIndex.set(index);
    this.selectResult();
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'resource':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'blog':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'topic':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  }
}
