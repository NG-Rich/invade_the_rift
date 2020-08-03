const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/champions/";
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : champions", () => {

  describe("GET /champions", () => {

    it("should return a status code 200 and render a view", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Champions");
        done();
      });
    });

  }); // End of GET/champions

});