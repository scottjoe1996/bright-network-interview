import { Job, Member } from "../apis/job-matcher-api";
import { removePunctuation } from "./remove-punctuation";

export class MemberRecommendationsService {
  constructor(private availableJobs: Job[]) {}

  // TODO: add location filter
  public getRecommendations(member: Member): Job[] {
    const recommendedJobs: Job[] = [];

    this.availableJobs.forEach((job) => {
      if (this.isTitleMentioned(member.bio, job.title)) {
        recommendedJobs.push(job);
      }
    });

    return recommendedJobs;
  }

  private isTitleMentioned(bio: string, title: string): boolean {
    const formattedBio = removePunctuation(bio).toLowerCase();
    const eachWordsOfTitle = title.toLowerCase().split(" ");

    const titleIsMentioned = eachWordsOfTitle.some((word) =>
      formattedBio.includes(word)
    );

    return titleIsMentioned;
  }
}
