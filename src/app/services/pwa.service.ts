import { Injectable, ApplicationRef, inject, signal, computed } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  // Reactive signals for PWA state
  isOnline = signal(navigator.onLine);
  isStandalone = signal(this.checkStandaloneMode());
  canInstall = signal(false);
  updateAvailable = signal(false);

  // Computed signals
  showInstallPrompt = computed(() => this.canInstall() && !this.isStandalone());

  constructor() {
    this.initializePwa();
  }

  private initializePwa(): void {
    this.listenForOnlineStatus();
    this.listenForInstallPrompt();
    this.setupUpdateChecks();
    this.listenForUpdates();
  }

  /**
   * Check if app is running in standalone PWA mode
   */
  private checkStandaloneMode(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    );
  }

  /**
   * Listen for online/offline status changes
   */
  private listenForOnlineStatus(): void {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      this.hideOfflineIndicator();
    });

    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      this.showOfflineIndicator();
    });
  }

  /**
   * Show offline indicator in the UI
   */
  private showOfflineIndicator(): void {
    let indicator = document.querySelector('.offline-indicator') as HTMLElement;
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'offline-indicator';
      indicator.innerHTML = '📶 You\'re offline. Some features may be unavailable.';
      document.body.prepend(indicator);
    }
    setTimeout(() => indicator.classList.add('visible'), 100);
  }

  /**
   * Hide offline indicator
   */
  private hideOfflineIndicator(): void {
    const indicator = document.querySelector('.offline-indicator');
    if (indicator) {
      indicator.classList.remove('visible');
      setTimeout(() => indicator.remove(), 300);
    }
  }

  /**
   * Listen for the beforeinstallprompt event
   */
  private listenForInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.canInstall.set(true);

      // Check if user dismissed install prompt before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (dismissed) {
        const dismissedTime = parseInt(dismissed, 10);
        const dayInMs = 24 * 60 * 60 * 1000 * 7; // 7 days
        if (Date.now() - dismissedTime < dayInMs) {
          return;
        }
      }

      // Show custom install prompt after a delay
      setTimeout(() => this.showCustomInstallPrompt(), 3000);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.canInstall.set(false);
      this.isStandalone.set(true);
      console.log('PWA was installed');
    });
  }

  /**
   * Show custom install prompt UI
   */
  private showCustomInstallPrompt(): void {
    if (!this.canInstall() || this.isStandalone()) return;

    const existingPrompt = document.querySelector('.pwa-install-prompt');
    if (existingPrompt) return;

    const prompt = document.createElement('div');
    prompt.className = 'pwa-install-prompt';
    prompt.innerHTML = `
      <div class="pwa-install-prompt-content">
        <div class="pwa-install-prompt-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="pwa-install-prompt-text">
          <h3>Install Resources</h3>
          <p>Get quick access from your home screen</p>
        </div>
      </div>
      <div class="pwa-install-prompt-actions">
        <button class="pwa-install-btn pwa-install-btn-secondary" id="pwaInstallLater">Later</button>
        <button class="pwa-install-btn pwa-install-btn-primary" id="pwaInstallNow">Install App</button>
      </div>
    `;

    document.body.appendChild(prompt);

    document.getElementById('pwaInstallNow')?.addEventListener('click', () => {
      this.installApp();
      prompt.remove();
    });

    document.getElementById('pwaInstallLater')?.addEventListener('click', () => {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      prompt.remove();
    });
  }

  /**
   * Trigger the native install prompt
   */
  async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const result = await this.deferredPrompt.userChoice;

      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.canInstall.set(false);
        return true;
      }

      console.log('User dismissed the install prompt');
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      return false;
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  }

  /**
   * Setup periodic update checks
   */
  private setupUpdateChecks(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Service Worker is not enabled');
      return;
    }

    // Check for updates when the app becomes stable and then every 6 hours
    const appIsStable$ = this.appRef.isStable.pipe(
      first(isStable => isStable)
    );

    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        console.log(updateFound ? 'Update found!' : 'No updates available');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  /**
   * Listen for available updates
   */
  private listenForUpdates(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY')
      )
      .subscribe(event => {
        console.log('Current version:', event.currentVersion);
        console.log('New version:', event.latestVersion);
        this.updateAvailable.set(true);
        this.showUpdateNotification();
      });
  }

  /**
   * Show update notification
   */
  private showUpdateNotification(): void {
    const notification = document.createElement('div');
    notification.className = 'pwa-install-prompt';
    notification.style.background = 'linear-gradient(135deg, #065f46 0%, #047857 100%)';
    notification.innerHTML = `
      <div class="pwa-install-prompt-content">
        <div class="pwa-install-prompt-icon" style="background: #10b981;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12z"/>
          </svg>
        </div>
        <div class="pwa-install-prompt-text">
          <h3>Update Available</h3>
          <p>A new version is ready to install</p>
        </div>
      </div>
      <div class="pwa-install-prompt-actions">
        <button class="pwa-install-btn pwa-install-btn-secondary" id="updateLater">Later</button>
        <button class="pwa-install-btn pwa-install-btn-primary" id="updateNow" style="background: #10b981;">Update Now</button>
      </div>
    `;

    document.body.appendChild(notification);

    document.getElementById('updateNow')?.addEventListener('click', () => {
      this.activateUpdate();
    });

    document.getElementById('updateLater')?.addEventListener('click', () => {
      notification.remove();
    });
  }

  /**
   * Activate the waiting service worker and reload
   */
  async activateUpdate(): Promise<void> {
    try {
      await this.swUpdate.activateUpdate();
      document.location.reload();
    } catch (error) {
      console.error('Failed to activate update:', error);
    }
  }
}
