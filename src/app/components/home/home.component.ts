import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tech:any
  constructor() {
   
  }

  ngOnInit(): void {
     this.tech = sessionStorage.getItem('currentTechnology');
    // Initialization logic can go here
  }
}
