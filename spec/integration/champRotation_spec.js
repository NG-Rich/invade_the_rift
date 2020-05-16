const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/champ_rotation/";
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : champ_rotation", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then((res) => {
      done();
    });
  });

  describe("GET /champ_rotation", () => {

    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Weekly Free Champ Rotation");
        done();
      });
    }); // End of render

  }); // End of champ_rotation GET

}); // End of routes describe
