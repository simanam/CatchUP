import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  receiver: string;
  user: any;
  message: string;
  receiverData: any;
  messagesArr = [];

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.getUserName(this.receiver);
    });
  }
  getUserName(name) {
    this.userService.getUserByName(name).subscribe(data => {
      this.receiverData = data.result;
      // this.getAllMsg(this.user._id, data.result._id)
    });
  }

  sendMessage() {
    if (this.message) {
      this.msgService
        .sendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(data => {
          console.log(data);
          this.message = '';
        });
    }
  }

  // getAllMsg(senderid, receiverid){
  //   this.msgService.getAllMessage(senderid, receiverid).subscribe(data =>{
  //     console.log(data)
  //   })

  // }
}
