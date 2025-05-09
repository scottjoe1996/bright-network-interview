export interface Member {
  name: string;
  bio: string;
}

export interface Job {
  title: string;
  location: string;
}

export interface JobMatcherApiI {
  getMembers: () => Promise<Member[]>;
  getJobs: () => Promise<Job[]>;
}

export class JobMatcherApi implements JobMatcherApiI {
  constructor(private jobMatcherUri: string) {}

  public getMembers(): Promise<Member[]> {
    return this.fetchArrayResponse(`${this.jobMatcherUri}/members.json`).then(
      (responseJson) => {
        const invalidObjectIndex = responseJson.findIndex(
          (obj) => !this.isMember(obj)
        );

        if (invalidObjectIndex !== -1) {
          throw new Error(
            `Response item [${JSON.stringify(
              responseJson[invalidObjectIndex]
            )}] is not a valid Member object`
          );
        }

        return responseJson as Member[];
      }
    );
  }

  public getJobs(): Promise<Job[]> {
    return this.fetchArrayResponse(`${this.jobMatcherUri}/jobs.json`).then(
      async (responseJson) => {
        throw new Error("Not implemented");
      }
    );
  }

  private fetchArrayResponse(url: string): Promise<unknown[]> {
    return fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status code [${response.status}]`);
      }

      const responseJson = await response.json();

      if (!Array.isArray(responseJson)) {
        throw new Error("Response is not an array");
      }

      return responseJson;
    });
  }

  private isMember(obj: unknown): obj is Member {
    return (
      obj !== null &&
      obj !== undefined &&
      typeof obj === "object" &&
      "name" in obj &&
      typeof obj.name === "string" &&
      "bio" in obj &&
      typeof obj.bio === "string"
    );
  }
}
