const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";
const sequelize = require("../../src/db/models").sequelize;
//const User = require("../../src/db/models").User;

describe("routes : items", () => {

  describe("GET /items", () => {

    it("should return a status code 200 and have 'Items' in body of response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Items List");
        done();
      });
    }); // End of landing page

  }); // End of "GET/items" describe

}); // End of "routes:items" describe
