import Fuse from "fuse.js";

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

    return recommendedJobs.length === 0 ? this.availableJobs : recommendedJobs;
  }

  private isTitleMentioned(bio: string, title: string): boolean {
    const eachWordInBio = removePunctuation(bio).split(" ");
    const eachWordInTitle = title.toLocaleLowerCase().split(" ");

    const fuse = new Fuse(eachWordInBio, {
      threshold: 0.3,
    });

    const isTitleMentioned = eachWordInTitle.some((word) => {
      const results = fuse.search(word);

      return results.length > 0;
    });

    return isTitleMentioned;
  }
}
