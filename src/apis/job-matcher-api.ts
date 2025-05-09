export interface Member {
  name: string;
  bio: string;
}

export interface JobMatcherApiI {
  getMembers: () => Promise<Member[]>;
}

export class JobMatcherApi implements JobMatcherApiI {
  constructor(private membersUri: string) {}

  public getMembers(): Promise<Member[]> {
    return this.fetchArrayResponse(`${this.membersUri}/members.json`).then(
      async (responseJson) => {
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

  private fetchArrayResponse(url: string): Promise<unknown[]> {
    return fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status code [${response.status}]`);
      }

      const responseJson = await response.json();

      if (!Array.isArray(responseJson)) {
        throw new Error("Members response is not an array");
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
