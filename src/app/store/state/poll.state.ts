import { Candidate, User } from "src/app/model";

export interface PollState {
  pollId: number;
  pollName: String;
  pollDescription: String;
  userId: User;
  pollStatus: String;
  startDate: String;
  endDate: String;
  candidates: Candidate[];
}
