import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api";

  getPolls(): any {
    return this.http.get<any>(`${this.baseUrl}/poll`);
  }
}
