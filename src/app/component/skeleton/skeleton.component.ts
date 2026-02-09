import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonType = 'card' | 'list' | 'table' | 'article' | 'profile' | 'text' | 'image' | 'custom';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse" [ngClass]="containerClass">

      <!-- Card Skeleton -->
      @if (type === 'card') {
        <div class="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
          <div class="flex gap-2 mt-4">
            <div class="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div class="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
      }

      <!-- List Skeleton -->
      @if (type === 'list') {
        <div class="space-y-4">
          @for (item of getItems(count); track item) {
            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <div class="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
              <div class="w-20 h-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
            </div>
          }
        </div>
      }

      <!-- Table Skeleton -->
      @if (type === 'table') {
        <div class="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <!-- Header -->
          <div class="flex gap-4 p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
            <div class="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/4"></div>
          </div>
          <!-- Rows -->
          @for (item of getItems(count); track item) {
            <div class="flex gap-4 p-4 border-b border-gray-100 dark:border-slate-700 last:border-0">
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
            </div>
          }
        </div>
      }

      <!-- Article Skeleton -->
      @if (type === 'article') {
        <div class="space-y-6">
          <!-- Title -->
          <div class="space-y-3">
            <div class="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
          <!-- Meta -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
              <div class="h-3 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
            </div>
          </div>
          <!-- Tags -->
          <div class="flex gap-2">
            <div class="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div class="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            <div class="h-6 w-14 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          <!-- Content -->
          <div class="space-y-3">
            @for (item of getItems(8); track item) {
              <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded"
                   [style.width.%]="90 - (item % 3) * 10"></div>
            }
          </div>
        </div>
      }

      <!-- Profile Skeleton -->
      @if (type === 'profile') {
        <div class="flex flex-col items-center gap-4 p-6">
          <div class="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          <div class="h-6 bg-gray-200 dark:bg-slate-700 rounded w-40"></div>
          <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
          <div class="flex gap-4 mt-2">
            <div class="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
            <div class="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      }

      <!-- Text Skeleton -->
      @if (type === 'text') {
        <div class="space-y-3">
          @for (item of getItems(count); track item) {
            <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded"
                 [style.width.%]="100 - (item % 4) * 10"></div>
          }
        </div>
      }

      <!-- Image Skeleton -->
      @if (type === 'image') {
        <div class="bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center"
             [style.height.px]="height"
             [style.width]="width">
          <svg class="w-12 h-12 text-gray-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v10h16V7H4zm4 2a2 2 0 110 4 2 2 0 010-4zm8 2l-3 4-2-2-5 5h14l-4-7z"/>
          </svg>
        </div>
      }

      <!-- Custom/Inline Skeleton (for ng-content) -->
      @if (type === 'custom') {
        <ng-content></ng-content>
      }

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .animate-pulse > div {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Shimmer effect */
    :host(.shimmer) .animate-pulse > div > div {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.05) 50%,
        rgba(0, 0, 0, 0) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    :host(.shimmer.dark) .animate-pulse > div > div {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 200% 100%;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `]
})
export class SkeletonComponent {
  @Input() type: SkeletonType = 'card';
  @Input() count: number = 3;
  @Input() containerClass: string = '';
  @Input() height: number = 200;
  @Input() width: string = '100%';

  getItems(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
}
