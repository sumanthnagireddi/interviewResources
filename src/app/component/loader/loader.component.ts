import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() variant: 'spinner' | 'dots' | 'pulse' | 'skeleton' = 'spinner';
  @Input() text: string = '';
  @Input() fullScreen: boolean = false;
  @Input() overlay: boolean = false;
}
