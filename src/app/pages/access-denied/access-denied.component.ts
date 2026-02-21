import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface IPCheckResult {
  allowed: boolean;
  userIP: string | null;
  message: string;
}

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="access-denied-container">
      <div class="access-denied-card">
        <div class="icon">🚫</div>
        <h1>Access Denied</h1>
        <p class="message">{{ message }}</p>
        
        <div *ngIf="ipCheckResult" class="details">
          <p><strong>Your IP Address:</strong> <span>{{ ipCheckResult.userIP }}</span></p>
        </div>

        <div class="info-box">
          <p>
            <strong>Why?</strong> This application is restricted to specific IP addresses only.
            Your current IP address is not whitelisted.
          </p>
        </div>

        <div class="actions">
          <button (click)="goHome()" class="btn btn-primary">Go to Home</button>
          <button (click)="contactSupport()" class="btn btn-secondary">Contact Support</button>
        </div>

        <div class="footer">
          <p class="text-muted">If you believe this is an error, please contact the administrator.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .access-denied-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      padding: 20px;
    }

    .access-denied-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 60px 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    h1 {
      color: #1a1a1a;
      font-size: 32px;
      margin: 20px 0;
      font-weight: 700;
    }

    .message {
      color: #666;
      font-size: 16px;
      margin: 15px 0;
      line-height: 1.6;
    }

    .details {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }

    .details p {
      margin: 8px 0;
      color: #333;
      word-break: break-all;
    }

    .details span {
      font-family: 'Courier New', monospace;
      background: white;
      padding: 5px 10px;
      border-radius: 4px;
      color: #667eea;
      font-weight: bold;
    }

    .info-box {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      color: #856404;
    }

    .info-box p {
      margin: 0;
      font-size: 14px;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin: 30px 0;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 150px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5568d3;
    }

    .btn-secondary {
      background: #e0e0e0;
      color: #333;
    }

    .btn-secondary:hover {
      background: #d0d0d0;
    }

    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .text-muted {
      color: #999;
      font-size: 13px;
      margin: 0;
    }

    @media (max-width: 600px) {
      .access-denied-card {
        padding: 40px 20px;
      }

      h1 {
        font-size: 24px;
      }

      .btn {
        min-width: 100%;
        flex: 1 1 100%;
      }

      .actions {
        flex-direction: column;
      }
    }
  `]
})
export class AccessDeniedComponent implements OnInit {
  message = 'Your IP address is not authorized to access this application.';
  ipCheckResult: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = sessionStorage.getItem('ipCheckResult');
    if (stored) {
      this.ipCheckResult = JSON.parse(stored);
      this.message = this.ipCheckResult.message || this.message;
    }
  }

  goHome(): void {
    // Try to go back, otherwise go to root
    sessionStorage.removeItem('ipCheckResult');
    this.router.navigate(['/']);
  }

  contactSupport(): void {
    // Open email client or support page
    const email = 'admin@example.com'; // Change to your support email
    window.location.href = `mailto:${email}?subject=Access%20Denied%20-%20IP%20Whitelist&body=I%20was%20denied%20access.%20My%20IP:%20${this.ipCheckResult?.userIP}`;
  }
}
