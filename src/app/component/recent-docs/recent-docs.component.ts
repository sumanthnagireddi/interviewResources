import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FirestoreDatePipe } from '../../pipes/firestore-date.pipe';

@Component({
  selector: 'app-recent-docs',
  standalone: true,
  imports: [CommonModule,FirestoreDatePipe],
  templateUrl: './recent-docs.component.html',
  styleUrls: ['./recent-docs.component.css']
})
export class RecentDocsComponent {
  @Input() docs: any
  ngOnInit(): void {
    console.log("d",this.docs)
  }
}
