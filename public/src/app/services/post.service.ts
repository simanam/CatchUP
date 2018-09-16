import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8000/api/cotidienMe'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }
  getAllPosts():  Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }
  addLike(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-like`, body);
  }
  addComment(postId, comment): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-comment`, {
      postId,
      comment
    });
  }
  getPost(id):  Observable<any> {
    return this.http.get(`${BASEURL}/post/${id}`);
  }
}
