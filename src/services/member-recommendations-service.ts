import { Job, Member } from "../apis/job-matcher-api";

export class MemberRecommendationsService {
  constructor(private availableJobs: Job[]) {}

  public getRecommendations(member: Member): Job[] {
    throw new Error("Not implemented");
  }
}
