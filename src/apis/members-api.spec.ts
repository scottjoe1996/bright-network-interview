import { MembersApi } from "./members-api";

const API_URI = "https://domain.com";

describe("MembersApi", () => {
  let api: MembersApi;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    api = new MembersApi(API_URI);
  });

  describe("getMembers", () => {
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
  });
});
