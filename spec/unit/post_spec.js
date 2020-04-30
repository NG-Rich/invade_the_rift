const sequelize = require("../../src/db/models/index").sequelize;
const Discussion = require("../../src/db/models").Discussion;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {

  beforeEach((done) => {
    this.discussion;
    this.post;
    this.user;

    sequelize.sync({force: true})
    .then((res) => {

      User.create({
        username: "Admin",
        email: "admin@example.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;

        Discussion.create({
          title: "Best Champs",
          description: "What are the best champs?"
        })
        .then((discussion) => {
          this.discussion = discussion;

          Post.create({
            title: "Draven Best",
            body: "Draven is the best champ!",
            discussionId: this.discussion.id,
            userId: this.user.id
          })
          .then((post) => {
            this.post = post;
            done();
          })
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); // End of res
  }); // End of beforeEach

  describe("#create()", () => {

    it("should create a post object with valid values", (done) => {
      Post.create({
        title: "Teemo is BEST",
        body: "Teemo is the best champ!",
        discussionId: this.discussion.id,
        userId: this.user.id
      })
      .then((post) => {
        expect(post.title).toBe("Teemo is BEST");
        expect(post.body).toBe("Teemo is the best champ!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    }); // End of create post

    it("should not create a post object with invalid values", (done) => {
      Post.create({
        title: "Teemo is BEST"
      })
      .then((post) => {
        // This is skipped
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Post.body cannot be null");
        done();
      })
    }); // End of invalid create post

  }); // End of #create() describe

}); // End of Post describe
