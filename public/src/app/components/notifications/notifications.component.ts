import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socket: any;
  user: any;
  notificationArr = [];

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:8000')
  }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.getUserNoti();
    this.socket.on('refreshPage', ()=>{
      this.getUserNoti();
     })
  }
  getUserNoti(){
    
    this.userService.getUserByName(this.user.username).subscribe(data =>{
      this.notificationArr = data.result.notifications.reverse();
    })
  }
  markNoti(data){
    this.userService.markNoti(data._id).subscribe(value => {
      this.socket.emit('refresh', {})
    })

  }
  deleteNoti(data){
    this.userService.markNoti(data._id, true).subscribe(value => {
      this.socket.emit('refresh', {})
    });

  }




  TimeFromNow(time){
    return moment(time).fromNow();
  }

}
