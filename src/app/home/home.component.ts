import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
<<<<<<< HEAD
import {RouterLink, RouterOutlet } from '@angular/router';
=======
import {RouterLink } from '@angular/router';
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [NavbarComponent,RouterLink,RouterOutlet],
=======
  imports: [NavbarComponent,RouterLink,],
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
    // Add JavaScript code here
    const btns=document.querySelectorAll(".nav-btn");
    const slides=document.querySelectorAll(".video-slide");
   
  var sliderNav=function(manual: number){
    btns.forEach((btn)=>{
      btn.classList.remove("active");
    });
    slides.forEach((slide)=>{
      slide.classList.remove("active");
    });
    
    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
   
  }
  btns.forEach((btn,i ) => {
    btn.addEventListener("click",() => {
        sliderNav(i);
    });
  });
    console.log('Component initialized');
  }
}

