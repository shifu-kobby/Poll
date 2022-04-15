import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Candidate, Poll, User } from '../model';


@Injectable({
  providedIn: 'root'
})
export class PollServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api";

  getPolls() {
    return this.http.get<Poll[]>(`${this.baseUrl}/poll`);
  }

  userSignUp(data: User) {
    return this.http.post<Poll>(`${this.baseUrl}/user`, data);
  }

  getUserById(userName: string, passwords: string){
    return this.http.get<User>(`${this.baseUrl}/user/userName/${userName}/password/${passwords}`);
  }

  createPoll(data: Poll) {
    return this.http.post<Poll>(`${this.baseUrl}/poll`, data);
  }

  addCandidates(data: Candidate) {
    return this.http.post<Candidate>(`${this.baseUrl}/candidate`, data);
  }
}
