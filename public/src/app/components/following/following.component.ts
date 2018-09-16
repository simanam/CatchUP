import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from "socket.io-client"

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  socket: any;
  following = [];
  user: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:8000')
   }

  ngOnInit() {
    this.user =  this.tokenService.getPayLoad();
    this.getFollower();
    this.socket.on('refreshPage', ()=>{
     this.getFollower();
    })

  }
  getFollower(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.following = data.result.following;
      
    }, err => console.log(err))
  }

  unfollowUser(user){
  this.userService.unfollowUser(user._id).subscribe(data => {
    
    this.socket.emit('refresh', {});
  })

  }
}
