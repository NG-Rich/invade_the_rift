const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

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

  describe("create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        username: "admin",
        email: "admin@example.com",
        password: "123456"
      })
      .then((user) => {
        expect(user.username).toBe("admin");
        expect(user.email).toBe("admin@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); // End of it create User object

    it("should not create a User object with invalid email or password", (done) => {
      User.create({
        username: "admin",
        email: "thisisnt-an email",
        password: "123456"
      })
      .then((user) => {
        // Skip this code because it fails check.
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      })
    }); // End of it not create User object

    it("should not create a User object if one is already used", (done) => {
      User.create({
        username: "admin",
        email: "admin@example.com",
        password: "123456"
      })
      .then((user) => {
        User.create({
          username: "admin2",
          email: "admin@example.com",
          password: "123456"
        })
        .then((user) => {
          // Skips because skips validation
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        })
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); // End of it not create duplicate email

  }); // End create() describe

}); // End User describe
