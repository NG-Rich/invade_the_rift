const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("routes : User ", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  }); // End of beforeEach

  describe("GET /users/sign_up", () => {

    it("should render a view for a sign up page", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });

  }); // End of GET users/sign_up describe

  describe("POST /users", () => {

    it("should create a new user with valid values and redirect", (done) => {

      const options = {
        url: base,
        form: {
          username: "admin",
          email: "admin@example.com",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({where: {email: "admin@example.com"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe("admin@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

    }); // End of create new user

    it("should not create a new user with invalid values and redirect", (done) => {

      const options = {
        url: base,
        form: {
          username: "admino",
          email: "totally-validEMAIL",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({where: {email: "totally-validEMAIL"}})
        .then((user) => {
          expect(user).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

    }); // End of not create user

  }); // End of POST user/sign_up describe

  describe("GET /users/sign_in", () => {

    it("should render a view for the sign in page", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign In");
        done();
      });
    }); // End of sign_in page

  }); // End of GET users/sign_in describe

}); // End of routes : User
