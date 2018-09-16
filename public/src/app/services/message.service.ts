import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8000/api/cotidienMe'


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(senderId, receiverId, receiverName, message):Observable<any>{
    return this.http.post(`${BASEURL}/chat-message/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message

    });
  }

  getAllMessage(senderId, receiverId):Observable<any>{
    return this.http.get(`${BASEURL}/chat-message/${senderId}/${receiverId}`);
  }
}
