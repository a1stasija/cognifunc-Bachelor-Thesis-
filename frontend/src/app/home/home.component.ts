import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
constructor(private router: Router){}

  ngOnInit(): void {
    const newSessionId = crypto.randomUUID(); // koristi Web Crypto API
    //localStorage.removeItem('sessionId') ne mora jer nova vrednosr sa setItem pregazi staru
    localStorage.setItem('sessionId', newSessionId);
    console.log('Nova test sesija:', newSessionId);
  }


  routeFlanker(){
    localStorage.setItem("test",JSON.stringify("flanker"))
    this.router.navigate(['/consent']);
  }

  routeVisual(){
    localStorage.setItem("test",JSON.stringify("visual"))
    this.router.navigate(['/consent']);
  }
}
