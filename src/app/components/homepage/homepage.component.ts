import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent{

  showMore:boolean=false;
  

  show(){
    this.showMore=!this.showMore;
  }
}
