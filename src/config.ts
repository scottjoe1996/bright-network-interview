import { JobMatcherApi, JobMatcherApiI } from "./apis/job-matcher-api";

interface Config {
  jobMatchApi: JobMatcherApiI;
}

export const getConfig = (): Config => {
  const jobMatcherUri = process.env.JOB_MATCHER_URI;

  if (!jobMatcherUri) {
    throw new Error(
      "Failed to generate config as JOB_MATCHER_URI is not defined"
    );
  }

  return { jobMatchApi: new JobMatcherApi(jobMatcherUri) };
};
