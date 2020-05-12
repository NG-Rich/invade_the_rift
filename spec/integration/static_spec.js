const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models").sequelize;
const Discussion = require("../../src/db/models").Discussion;
const User = require("../../src/db/models").User;

describe("routes : static", () => {

  beforeEach((done) => {
    this.user;
    this.discussion;

    sequelize.sync({force: true})
    .then((res) => {

      User.create({
        username: "Admin",
        email: "admin@example.com",
        password: "123456",
        role: "admin"
      })
      .then((user) => {
        this.user = user;

        Discussion.create({
          title: "Best Champs Bot",
          description: "Best champions to use botlane",
          userId: this.user.id
        })
        .then((discussion) => {
          this.discussion = discussion;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  }); // End of beforeEach

  describe("GET /", () => {

    it("should return a status code 200 and have 'Invade The Rift' in body of response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Invade The Rift");
        done();
      });
    }); // End of landing page

    it("should list the latest discussions", (done) => {
      request.get(base, (err, res, body) => {
        expect(body).toContain("Best Champs Bot");
        done();
      });
    }); // End of latest discussions

  }); // End of "GET /"" describe

}); // End of "routes:static" describe
