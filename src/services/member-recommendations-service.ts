import Fuse from "fuse.js";
import nlp from "compromise";

import { Job, Member } from "../apis/job-matcher-api";

import { removePunctuation } from "./remove-punctuation";

export class MemberRecommendationsService {
  constructor(private availableJobs: Job[]) {}

  public getRecommendations(member: Member): Job[] {
    const formattedBio = removePunctuation(member.bio);
    const eachWordInBio = formattedBio.split(" ");
    const mentionsAnyLocations =
      (nlp(formattedBio).places().json() as object[]).length > 0;

    const recommendedJobs = this.availableJobs.filter((job) => {
      const locationFilter = mentionsAnyLocations
        ? this.isLocationMentioned(eachWordInBio, job.location)
        : true;

      return this.isTitleMentioned(eachWordInBio, job.title) && locationFilter;
    });

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
