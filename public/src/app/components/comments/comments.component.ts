import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  posy : any;

  constructor(private fb: FormBuilder, private postservice: PostService, private route: ActivatedRoute) {
    this.socket = io('http://localhost:8000');
   }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.getPost();
    this.socket.on('refreshPage', (data) => {
      this.getPost();
    });
  }
  init(){
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })

  }
  ngAfterViewInit(){
    this.toolbarElement.style.display = 'none'
  }
  addComment(){
    this.postservice.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {})
      this.commentForm.reset();
      
    })

  }
  getPost(){
    this.postservice.getPost(this.postId).subscribe(data => {
      console.log(data)
     this.commentsArray = data.post.comments.reverse();
     this.posy = data.post.post;
    });
    
  }
  TimeFromNow(time){
    return moment(time).fromNow();
  }

}
