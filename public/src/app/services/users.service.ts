import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8000/api/cotidienMe';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getAllUsers():Observable<any> {
    return this.http.get(`${BASEURL}/users`)
  }
  getUserById(id):Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`)
  }
  getUserByName(username):Observable<any> {
    return this.http.get(`${BASEURL}/users/${username}`)
  }

  followUser(userFollowed):Observable<any>{
    return this.http.post(`${BASEURL}/follow-user`,{
      userFollowed
    })
  }
  unfollowUser(userFollowed):Observable<any>{
    return this.http.post(`${BASEURL}/unfollow-user`,{
      userFollowed
    })
  }
  markNoti(id, deleteValue?):Observable<any> {
    return this.http.post(`${BASEURL}/mark/${id}`, {id, deleteValue})
  }
  markAllAsRead():Observable<any> {
    return this.http.post(`${BASEURL}/mark-all`, {
      all:true});  
    }
}
