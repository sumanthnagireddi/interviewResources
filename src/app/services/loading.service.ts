import { Injectable, signal, computed } from '@angular/core';

export interface LoadingState {
  key: string;
  isLoading: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Track loading states by key
  private _loadingStates = signal<Map<string, LoadingState>>(new Map());

  // Global loading indicator
  private _globalLoading = signal<boolean>(false);

  // Public signals
  readonly isGlobalLoading = this._globalLoading.asReadonly();

  // Computed: check if any component is loading
  readonly isAnyLoading = computed(() => {
    const states = this._loadingStates();
    return Array.from(states.values()).some(s => s.isLoading);
  });

  /**
   * Start loading for a specific component/key
   */
  startLoading(key: string, message?: string): void {
    const states = new Map(this._loadingStates());
    states.set(key, { key, isLoading: true, message });
    this._loadingStates.set(states);
  }

  /**
   * Stop loading for a specific component/key
   */
  stopLoading(key: string): void {
    const states = new Map(this._loadingStates());
    states.delete(key);
    this._loadingStates.set(states);
  }

  /**
   * Check if a specific key is loading
   */
  isLoading(key: string): boolean {
    return this._loadingStates().get(key)?.isLoading ?? false;
  }

  /**
   * Get loading state signal for a specific key
   */
  getLoadingSignal(key: string) {
    return computed(() => this._loadingStates().get(key)?.isLoading ?? false);
  }

  /**
   * Set global loading state
   */
  setGlobalLoading(isLoading: boolean): void {
    this._globalLoading.set(isLoading);
  }

  /**
   * Clear all loading states
   */
  clearAll(): void {
    this._loadingStates.set(new Map());
    this._globalLoading.set(false);
  }
}
