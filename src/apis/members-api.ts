export interface Member {
  name: string;
  bio: string;
}

export interface MembersApiI {
  getMembers: () => Promise<Member[]>;
}

export class MembersApi implements MembersApiI {
  constructor(private membersUri: string) {}

  public getMembers(): Promise<Member[]> {
    return fetch(`${this.membersUri}/members.json`).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status code [${response.status}]`);
      }

      throw new Error("Not implemented");
    });
  }
}
