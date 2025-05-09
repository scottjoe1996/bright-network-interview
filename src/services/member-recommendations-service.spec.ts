import { Job, Member } from "../apis/job-matcher-api";

import { MemberRecommendationsService } from "./member-recommendations-service";

const AVAILABLE_JOBS: Job[] = [
  {
    title: "Software Developer",
    location: "London",
  },
  {
    title: "Marketing Internship",
    location: "York",
  },
  {
    title: "Data Scientist",
    location: "London",
  },
  {
    title: "Legal Internship",
    location: "London",
  },
  {
    title: "Project Manager",
    location: "Manchester",
  },
  {
    title: "Sales Internship",
    location: "London",
  },
  {
    title: "UX Designer",
    location: "London",
  },
  {
    title: "Software Developer",
    location: "Edinburgh",
  },
];

const MEMBERS: Member[] = [
  {
    name: "Joe",
    bio: "I'm a designer from London, UK",
  },
  {
    name: "Marta",
    bio: "I'm looking for an internship in London",
  },
  {
    name: "Hassan",
    bio: "I'm looking for a design job",
  },
  {
    name: "Grace",
    bio: "I'm looking for a job in marketing outside of London",
  },
  {
    name: "Daisy",
    bio: "I'm a software developer currently in Edinburgh but looking to relocate to London",
  },
];

describe("MemberRecommendationsService", () => {
  let service: MemberRecommendationsService;

  beforeEach(() => {
    service = new MemberRecommendationsService(AVAILABLE_JOBS);
  });

  describe("getRecommendations", () => {
    it.each([
      [MEMBERS[0], [AVAILABLE_JOBS[6]]],
      [MEMBERS[1], [AVAILABLE_JOBS[3], AVAILABLE_JOBS[5]]],
      [MEMBERS[2], [AVAILABLE_JOBS[6]]],
      [MEMBERS[3], []], // TODO: add logic to exclude locations
      [MEMBERS[4], [AVAILABLE_JOBS[0], AVAILABLE_JOBS[7]]], // TODO: add logic to exclude locations
    ])("should return expected jobs", (member, expectedJobs) => {
      expect(service.getRecommendations(member)).toEqual(expectedJobs);
    });
  });
});
