import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import _ from 'lodash'
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  socket: any;
  users = [];
  loggedInUser: any;
  userArr = [];

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:8000')
   }

  ngOnInit() {
    this.loggedInUser = this.tokenService.getPayLoad();
    this.getUsers();
    this.getUser();
    this.socket.on('refreshPage', ()=>{
      this.getUsers();
      this.getUser();
    })

    
  }
  getUsers(){
    this.usersService.getAllUsers().subscribe(data => {
      _.remove(data.result, {username: this.loggedInUser.username });
      this.users = data.result
   
    })
  }
  getUser(){
    this.usersService.getUserById(this.loggedInUser._id).subscribe(data => {
      
      this.userArr = data.result.following;
   
    })
  }
  followUser(user){
    this.usersService.followUser(user._id).subscribe(data =>{
     this.socket.emit('refresh', {})
    })
  }

  CheckInArray(arr, id){
    const result = _.find(arr, ['userFollowed._id', id]);
    if(result){
      return true;
    }else{
      return false;
    }
  }

}
