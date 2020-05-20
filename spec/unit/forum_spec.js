const sequelize = require("../../src/db/models/index").sequelize;
const Discussion = require("../../src/db/models").Discussion;
const User = require("../../src/db/models").User;
const Post = require("../../src/db/models").Post;
const request = require("request");

describe("Discussion", () => {

  beforeEach((done) => {
    this.discussion;
    this.post;
    this.user;

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
          description: "What are the best champs?",
          userId: this.user.id
        })
        .then((discussion) => {
          this.discussion = discussion;

          Post.create({
            title: "Draven is BEST",
            body: "Draven is the best champ",
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
            role: this.user.role,
            userId: this.user.id,
            email: this.user.email
          }
        }, (err, res, body) => {
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    }); // End of res
  }); // End of beforeEach

  describe("create()", () => {

    it("should create a new Discussion object with valid values", (done) => {
      Discussion.create({
        title: "Top Champs Bot",
        description: "Top champions for botlane",
        userId: this.user.id
      })
      .then((discussion) => {
        expect(discussion.title).toBe("Top Champs Bot");
        expect(discussion.description).toBe("Top champions for botlane");
        expect(discussion.id).toBe(2);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      }); // End of discussion create

    }); // End of discussion create object

  }); // End create() discussion

}); // End Discussion describe
