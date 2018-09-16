import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  socket: any;
  user: any;
  userData: any;

  constructor(private tokeService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:8000')
   }

  ngOnInit() {
    this.user = this.tokeService.getPayLoad();
    this.getUserData();
    this.socket.on('refreshPage', () => {
      this.getUserData()
    })
  }
  getUserData(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.userData = data.result;

    })
  }

}
