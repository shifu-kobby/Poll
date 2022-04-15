export interface User {
  userId: number;
  email: String;
  firstName: String;
  lastName: String;
  passwords: String;
  polls: Poll[];
  userName: String;
}

export interface Poll {
  pollId: number;
  pollName: String;
  pollDescription: String;
  userId: User;
  pollStatus: String;
  startDate: String;
  endDate: String;
  candidates: Candidate[];
}

export interface Candidate {
  candidateId: number;
  candidateName: String;
  pollId: number;
  score: number;
}
