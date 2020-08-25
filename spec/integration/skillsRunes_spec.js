const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/skills-runes/";
const sequelize = require("../../src/db/models").sequelize;
//const User = require("../../src/db/models").User;

describe("routes : skills-runes", () => {

  describe("GET /skills-runes", () => {

    it("should return a status code 200 and have 'Skills and Runes' in body of response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Skills and Runes List");
        done();
      });
    }); // End of skills-runes page

  }); // End of "GET/skills-runes" describe

}); // End of "routes:skills-runes" describe
