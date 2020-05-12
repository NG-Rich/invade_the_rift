const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Discussion = require("../../src/db/models").Discussion;
const Post = require("../../src/db/models").Post;

describe("routes : User ", () => {

  beforeEach((done) => {
    this.user;
    this.discussion;
    this.post;

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
          title: "Best Champs",
          description: "What are your favorite champs?",
          userId: this.user.id
        })
        .then((discussion) => {
          this.discussion = discussion;

          Post.create({
            title: "Draven is BEST",
            body: "Draven is my favorite!",
            discussionId: this.discussion.id,
            userId: this.user.id
          })
          .then((post) => {
            this.post = post;
            done();
          })
        })

        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            email: this.user.email,
            role: this.user.role,
            userId: this.user.id,
            username: this.user.username
          }
        }, (err, res, body) => {
          done();
        })
      })
    })
    .catch((err) => {
      console.log(err);
      done();
    })
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
          password: "123456",
          role: "admin"
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
          password: "123456",
          role: "member"
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

  describe("GET /users/:id", () => {

    it("should render a view for user's profile", (done) => {
      request.get(`${base}${this.user.username}`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    }); // End of userprofile

    it("should list the discussions and posts a user has made", (done) => {
      request.get(`${base}${this.user.username}`, (err, res, body) => {
        expect(body).toContain("Best Champs");
        expect(body).toContain("Draven is BEST");
        done();
      });
    }); // End of discussion/post display

  }); // End of users/:id

}); // End of routes : User
