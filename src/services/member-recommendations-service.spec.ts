import { Job } from "../apis/job-matcher-api";

import { MemberRecommendationsService } from "./member-recommendations-service";

const AWAILABLE_JOBS: Job[] = [
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

describe("MemberRecommendationsService", () => {
  let service: MemberRecommendationsService;

  beforeEach(() => {
    service = new MemberRecommendationsService(AWAILABLE_JOBS);
  });

  describe("getRecommendations", () => {
    it("should throw not implemented error", () => {
      expect(() =>
        service.getRecommendations({ name: "Joe", bio: "developer" })
      ).toThrow("Not implemented");
    });
  });
});
