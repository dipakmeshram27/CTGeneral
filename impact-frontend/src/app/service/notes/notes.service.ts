import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import {Notes} from '../../model/notes';
import { environment } from '../../../environments/environment';
import { env } from 'process';
import { usernotes } from '../../model/UserNotes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http:HttpClient) { }

  getUsersByRole():Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}/user-api/user/getUsersByRole?role=Physician`, );
  }
  sendNotes(newNote: Notes){
    return this.http.post(`${environment.baseUrl}/notes-service/note/addNote`, newNote);
  }
  getSentNotes(senderId: number):Observable<usernotes[]>{
    return this.http.get<usernotes[]>(`${environment.baseUrl}/notes-service/note/getSentNotes?senderId=${senderId}`, );
  }
  getRecieveNotes(recieverId: number):Observable<usernotes[]>{
    return this.http.get<usernotes[]>(`${environment.baseUrl}/notes-service/note/getRecieveNotes?recieverId=${recieverId}`,);
  }
  reply(replyNote: string, noteId:number):Observable<any>{
    const data = {
      noteId: noteId,
      reply: replyNote
    };
    return this.http.post(`${environment.baseUrl}/notes-service/note/reply`,  data);
  }
}
