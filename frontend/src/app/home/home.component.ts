import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  //lang: string = 'SRP'
  serbian: boolean = true;

constructor(private router: Router){}

  ngOnInit(): void {
    const newSessionId = crypto.randomUUID(); // koristi Web Crypto API
    //localStorage.removeItem('sessionId') ne mora jer nova vrednosr sa setItem pregazi staru
    localStorage.setItem('sessionId', newSessionId);
    console.log('Nova test sesija:', newSessionId);
    this.serbian = true;
    const  l = localStorage.getItem('language');
    if(l){
      if(l == "srp"){
        this.serbian = true;
      }else{
        this.serbian = false;
      }
    }else{
      this.serbian = true;
    }
  }



routeFlanker(event: MouseEvent) {
  localStorage.setItem("test", JSON.stringify("flanker"));
  this.saveMousePosition(event);
  this.router.navigate(['/consent']);
}

routeVisual(event: MouseEvent) {
  localStorage.setItem("test", JSON.stringify("visual"));
  this.saveMousePosition(event);
  this.router.navigate(['/consent']);
}

private saveMousePosition(event: MouseEvent) {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  };
  localStorage.setItem('startMousePosition', JSON.stringify(mousePosition));
  console.log('Pozicija miša pri izboru testa:', mousePosition);
}

changeLanguage(event: Event) {
  const lang = (event.target as HTMLSelectElement).value;
  console.log("Izabrani jezik:", lang);
  // ovde dodaj logiku za menjanje jezika
  localStorage.setItem('language', lang);
  this.ngOnInit();
}


}