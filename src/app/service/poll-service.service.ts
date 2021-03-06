import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Candidate, Poll, User } from '../model';


@Injectable({
  providedIn: 'root'
})
export class PollServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://poll-mysql-db.herokuapp.com/api";

  getPolls() {
    return this.http.get<Poll[]>(`${this.baseUrl}/poll`);
  }

  getPollById(id: number) {
    return this.http.get<Poll>(`${this.baseUrl}/poll/${id}`);
  }

  userSignUp(data: User) {
    return this.http.post<Poll>(`${this.baseUrl}/user`, data);
  }

  authenticateUser(userName: string, passwords: string) {
    return this.http.get<User>(`${this.baseUrl}/user/userName/${userName}/password/${passwords}`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  createPoll(data: Poll) {
    return this.http.post<Poll>(`${this.baseUrl}/poll`, data);
  }

  updatePoll(data: Poll, id: number) {
    return this.http.put<Poll>(`${this.baseUrl}/poll/${id}`, data);
  }

  deletePoll(id: number){
    console.log(id);
    return this.http.delete(`${this.baseUrl}/poll/${id}`, {responseType: 'text'});
  }

  addCandidates(data: Candidate) {
    return this.http.post<Candidate>(`${this.baseUrl}/candidate`, data);
  }

  getCandidates(data: Poll) {
    return this.http.post<Candidate[]>(`${this.baseUrl}/candidate/id`, data);
  }

  updateCandidate(id: number, data: Candidate) {
    return this.http.put<Candidate>(`${this.baseUrl}/candidate/${id}`, data);
  }
}
