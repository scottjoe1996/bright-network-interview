import { Member, JobMatcherApi } from "./job-matcher-api";

const API_URI = "https://domain.com";

const MEMBERS: Member[] = [
  { name: "Steve", bio: "Send me anywhere" },
  { name: "Dave", bio: "Anywhere without Steve" },
];

describe("JobMatcherApi", () => {
  let api: JobMatcherApi;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    api = new JobMatcherApi(API_URI);
  });

  describe("getMembers", () => {
    it.each([[[]], [[MEMBERS[0]]], [MEMBERS]])(
      "should resolve with expected members",
      async (expectedMembers) => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(expectedMembers),
        });
        await expect(api.getMembers()).resolves.toEqual(expectedMembers);

        expect(fetchMock).toHaveBeenCalledWith(`${API_URI}/members.json`);
      }
    );

    it("should reject if response is not ok", async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
      });
      await expect(api.getMembers()).rejects.toEqual(
        new Error("Request failed with status code [404]")
      );

      expect(fetchMock).toHaveBeenCalledWith(`${API_URI}/members.json`);
    });

    it("should reject if response is not an array", async () => {
      const invalidObject = { any: "object" };
      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(invalidObject),
      });
      await expect(api.getMembers()).rejects.toEqual(
        new Error("Members response is not an array")
      );

      expect(fetchMock).toHaveBeenCalledWith(`${API_URI}/members.json`);
    });

    it.each([[undefined], [null], [""], [[]], [{ any: "object" }], [5]])(
      "should reject if response contains object that is not a member",
      async (invalidObject) => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve([MEMBERS[0], invalidObject]),
        });
        await expect(api.getMembers()).rejects.toEqual(
          new Error(
            `Response item [${JSON.stringify(
              invalidObject
            )}] is not a valid Member object`
          )
        );

        expect(fetchMock).toHaveBeenCalledWith(`${API_URI}/members.json`);
      }
    );
  });
});
