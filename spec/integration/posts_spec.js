const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/forums/discussion/";
const sequelize = require("../../src/db/models/index").sequelize;
const Discussion = require("../../src/db/models").Discussion;
const Post = require("../../src/db/models").Post;

describe("routes : post", () => {

  beforeEach((done) => {
    this.discussion;
    this.post;

    sequelize.sync({force: true})
    .then((res) => {
      Discussion.create({
        title: "Best Champs",
        description: "What are the best champs?"
      })
      .then((discussion) => {
        this.discussion = discussion;

        Post.create({
          title: "Draven BEST",
          body: "Draven is the best!",
          discussionId: this.discussion.id
        })
        .then((post) => {
          this.post = post;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /forums/discussion/:id/post/new", () => {

    it("should render a view for a post page to the associated discussion", (done) => {
      request.get(`${base}${this.discussion.id}/post/new`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("New Post");
        done();
      });
    }); // End of post page render

  }); // End of GET post/new

  describe("POST /forums/discussion/:id/post/create", () => {

    it("should create a post and redirect", (done) => {
      const options = {
        url: `${base}${this.discussion.id}/post/create`,
        form: {
          title: "Draven is BEST",
          body: "Draven is the best champ"
        }
      };

      request.post(options, (err, res, body) => {
        Post.findOne({where: {title: "Draven is BEST"}})
        .then((post) => {
          expect(post).not.toBeNull();
          expect(post.title).toBe("Draven is BEST");
          expect(post.body).toBe("Draven is the best champ");
          expect(post.discussionId).not.toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    }); // End of post create

  }); // End of POST/post create

  describe("POST /forums/discussion/:discussionId/post/:id/destroy", () => {

    it("should destroy the post associated to the discussion", (done) => {
      expect(this.post.id).toBe(1);

      request.post(`${base}${this.discussion.id}/post/${this.post.id}/destroy`,
      (err, res, body) => {
        Post.findByPk(1)
        .then((post) => {
          expect(err).toBeNull();
          expect(post).toBeNull();
          done();
        });
      });
    }); // End of post destroy

  }); // End of POST/post destroy

  describe("GET /forums/discussion/:discussionId/post/:id/edit", () => {

    it("should render post edit view", (done) => {
      request.get(`${base}${this.discussion.id}/post/${this.post.id}/edit`,
      (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Post");
        done();
      });
    }); // End of post edit

  }); // End of GET/post edit

  describe("POST /forums/discussion/:discussionId/post/:id/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}${this.discussion.id}/post/${this.post.id}/update`,
        form: {
          title: "Support Champs MVP",
          body: "Support champs are the best"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    }); // End of statusCode

    it("should update the post with the given values", (done) => {
      const options = {
        url: `${base}${this.discussion.id}/post/${this.post.id}/update`,
        form: {
          title: "Support Champs MVP"
        }
      };

      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        Post.findOne({where: {id: this.post.id}})
        .then((post) => {
          expect(post.title).toBe("Support Champs MVP");
          done();
        });
      });
    }); // End of post update

  }); // End of POST/post update

}); // End of routes:posts
