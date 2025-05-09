import Fuse from "fuse.js";

import { Job, Member } from "../apis/job-matcher-api";

import { removePunctuation } from "./remove-punctuation";

export class MemberRecommendationsService {
  constructor(private availableJobs: Job[]) {}

  public getRecommendations(member: Member): Job[] {
    const eachWordInBio = removePunctuation(member.bio).split(" ");

    const recommendedJobs = this.availableJobs.filter(
      (job) =>
        this.isTitleMentioned(eachWordInBio, job.title) &&
        this.isLocationMentioned(eachWordInBio, job.location)
    );

    return recommendedJobs;
  }

  private isTitleMentioned(eachWordInBio: string[], title: string): boolean {
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

  private isLocationMentioned(
    eachWordInBio: string[],
    location: string
  ): boolean {
    const fuse = new Fuse(eachWordInBio, {
      threshold: 0.3,
    });

    const results = fuse.search(location);

    return results.length > 0;
  }
}
