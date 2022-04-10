export interface Poll {
  pollId: number;
  pollName: String;
  pollDescription: String;
  userId: User;
  pollStatus: String;
  startDate: String;
  endDate: String;
}

export interface User {
  userId: number;
  email: String;
  firstName: String;
  lastName: String;
  passwords: String;
  polls: number[];
  userName: String;
}
