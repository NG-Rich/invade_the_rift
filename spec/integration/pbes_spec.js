const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/pbe/";
const sequelize = require("../../src/db/models/index").sequelize;
const Pbe = require("../../src/db/models").Pbe;

describe("routes : pbe", () => {

  describe("GET /pbe", () => {

    it("should get status code 200 and render view", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("PBE News");
        done();
      });
    });

  }); // End of GET/pbe

  describe("GET /pbe/new", () => {

    it("should get status code 200 and render view", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("New PBE Post");
        done();
      });
    });

  }); // End of GET/pbe/new

  describe("POST /pbe/create", () => {

    it("should create a new pbe post and redirect", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          title: "PBE Changes",
          body: "Upcoming changes"
        }
      }

      request.post(options, (err, res, body) => {
        Pbe.findOne({where: {title: "PBE Changes"}})
        .then((pbe) => {
          expect(pbe).not.toBeNull();
          expect(pbe.title).toBe("PBE Changes");
          expect(pbe.body).toBe("Upcoming changes");
          done();
        })
      })
    });

  }); // End of POST/pbe/create

}); // End of routes
