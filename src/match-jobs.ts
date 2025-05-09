import { getConfig } from "./config";
import { MemberRecommendationsService } from "./services/member-recommendations-service";

const config = getConfig();

Promise.all([
  config.jobMatchApi.getJobs(),
  config.jobMatchApi.getMembers(),
]).then(([jobs, members]) => {
  const memberRecommendationsService = new MemberRecommendationsService(jobs);

  members.forEach((member) => {
    const recommendedJobs =
      memberRecommendationsService.getRecommendations(member);

    console.log(member.name);
    console.group();
    recommendedJobs.forEach((job) => {
      console.log(job.title);
    });
    console.log("\n");
    console.groupEnd();
  });
});
