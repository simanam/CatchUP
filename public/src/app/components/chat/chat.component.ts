import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  tabElement: any;

  constructor() { }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content')
  }
  ngAfterViewInit(){
    this.tabElement.style.display = 'none'
  }

}
