import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import * as m from 'materialize-css'
import { UsersService } from '../../services/users.service';
import * as moment from 'moment'
import io from 'socket.io-client'
import _ from 'lodash'


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notificationsArr =[];
  socket: any;
  count = [];


  constructor(private tokenService: TokenService, private router: Router, private userService:UsersService) {
    this.socket = io('http://localhost:8000')

   }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    
    const dropDownElement = document.querySelector('.dropdown-trigger');
    m.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
    this.getNoti()
    this.socket.on('refreshPage', ()=>{
      this.getNoti();
     })
  
  }

  logout(){
    this.tokenService.deleteToken();
    this.router.navigate(['']);

  }
  goTOHome(){
    this.router.navigate(['streams']);
  }
  getNoti(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.notificationsArr = data.result.notifications.reverse();
      const value = _.filter(this.notificationsArr, ['read', false]);
      this.count = value
      
    }, err => {
      if(err.console.error.token === null ){
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }
  TimeFromNow(time){
    return moment(time).fromNow();
  }
  markAll(){
    this.userService.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
      console.log(data);
    })
  }

}
