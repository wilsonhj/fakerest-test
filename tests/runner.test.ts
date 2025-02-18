import { run } from "../src/runner";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Runner Integration Tests", () => {
  beforeEach(() => {
    // Configure environment if needed
    process.env.ENDPOINT = "http://test.brightsign.io:3000";
    process.env.RAW_OUTPUT = "true";
    process.env.DEBUG = "false";

    // Mock axios response
    mockedAxios.get.mockResolvedValue({
      data: JSON.stringify([
        {
          id: 1,
          name: "Test User",
          age: 30,
          city: "Test City",
          friends: []
        }
      ])
    });
  });

  test("returns computed JSON", async () => {
    const output = await run(process.env.ENDPOINT!, true, false);
    // Validate that the output contains expected keys
    const result = JSON.parse(output);
    expect(result).toHaveProperty("averageAgePerCity");
    expect(result).toHaveProperty("averageFriendsPerCity");
    expect(result).toHaveProperty("userWithMostFriendsPerCity");
  });
}); 