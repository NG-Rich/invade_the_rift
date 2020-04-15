const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return a status code 200 and have 'Invade The Rift' in body of response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Invade The Rift");
        done();
      });
    }); // End of "it"

  }); // End of "GET /"" describe

  // ADD SPEC FOR DISPLAYING TRENDING DISCUSSIONS + OFFICIAL POSTS

}); // End of "routes:static" describe
