import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {
  
  socketHost: any;
  socket: any;
  postForm: FormGroup

  constructor(private fb:FormBuilder, private postService: PostService ) { 
    this.socketHost = 'http://localhost:8000';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.init();
  }

  init(){
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    })
  }

  submitPost(){
    this.postService.addPost(this.postForm.value).subscribe(data => {
      this.socket.emit('refresh', {});
      this.postForm.reset()
    });

  }

}
