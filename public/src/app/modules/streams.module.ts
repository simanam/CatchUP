import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StreamsComponent} from '../components/streams/streams.component'
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostformComponent } from '../components/postform/postform.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule
  ],
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostformComponent, PostsComponent, CommentsComponent, UserComponent, FollowingComponent, FollowersComponent, NotificationsComponent, TopStreamsComponent, ChatComponent, MessageComponent],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService, UsersService, MessageService]

})
export class StreamsModule { }
