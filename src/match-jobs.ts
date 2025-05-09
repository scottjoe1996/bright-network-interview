import { getConfig } from "./config";

const config = getConfig();

Promise.all([
  config.jobMatchApi.getJobs(),
  config.jobMatchApi.getMembers(),
]).then(([jobs, members]) => {
  console.log("JOBS");
  jobs.forEach((job) => {
    console.group();
    console.log(`TITLE: ${job.title}`);
    console.log(`LOCATION: ${job.location} \n`);
    console.groupEnd();
  });

  console.log("MEMBERS");
  members.forEach((member) => {
    console.group();
    console.log(`NAME: ${member.name}`);
    console.log(`BIO: ${member.bio} \n`);
    console.groupEnd();
  });

  console.log("I will match jobs later I swear!");
});
