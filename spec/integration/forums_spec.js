const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/forums/";
const sequelize = require("../../src/db/models/index").sequelize;
const Discussion = require("../../src/db/models").Discussion;
const User = require("../../src/db/models").User;

function authorizeUser(role, done) {

  return User.create({
    username: `${role}`,
    email: `${role}@example.com`,
    password: "123456",
    role: `${role}`
  })
  .then((user) => {

    request.get({
      url: "http://localhost:3000/auth/fake",
      form: {
        role: user.role,
        userId: user.id,
        email: user.email
      }
    }, (err, res, body) => {
      done();
    });
  });
} // End of authorizeUser

describe("routes : forums", () => {

  beforeEach((done) => {
    this.user;
    this.discussion;

    sequelize.sync({force: true})
    .then((res) => {

      User.create({
        username: "Tester",
        email: "test@example.com",
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

  describe("admin user performing CRUD actions for forums", () => {

    beforeEach((done) => {
      authorizeUser("admin", done);
    }); // End of beforeEach

    describe("GET /forums", () => {

      it("should render a view for the forums page and list all discussions", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Forums");
          expect(body).toContain("Best Champs Bot");
          done();
        });
      }); // End of page view

    }); // End of GET/forums describe

    describe("GET /forums/discussion/new", () => {

      it("should render a view for new discussion page", (done) => {
        request.get(`${base}discussion/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Discussion");
          done();
        });
      }); // End of discussion view

    }); // End of GET/forums/discussion/new

    describe("POST /forums/discussion/create", () => {
      const options = {
        url: `${base}discussion/create`,
        form: {
          title: "Top Champs Bot",
          description: "Top champions for botlane",
          userId: this.userId
        }
      };

      it("should post a new discussion and redirect", (done) => {

        request.post(options, (err, res, body) => {
          Discussion.findOne({where: {title: "Top Champs Bot"}})
          .then((discussion) => {
            expect(res.statusCode).toBe(303);
            expect(discussion.title).toBe("Top Champs Bot");
            expect(discussion.description).toBe("Top champions for botlane");
            expect(discussion.id).toBe(2);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      }); // End of discussion creation/redirect

    }); // End of POST/forums/discussion/create

    describe("GET /forums/discussion/:id", () => {

      it("should render a view for the selected discussion", (done) => {
        request.get(`${base}discussion/${this.discussion.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Best Champs Bot");
          done();
        });
      }); // End of discussion view

    }); // End of GET/forums/discussion/:id

    describe("POST /forums/discussion/:id/destroy", () => {

      it("should delete the discussion with the selected ID", (done) => {
        Discussion.findAll()
        .then((discussions) => {
          const discussionCountBeforeDelete = discussions.length;

          expect(discussionCountBeforeDelete).toBe(1);

          request.post(`${base}discussion/${this.discussion.id}/destroy`, (err, res, body) => {
            Discussion.findAll()
            .then((discussions) => {
              expect(err).toBeNull();
              expect(discussions.length).toBe(discussionCountBeforeDelete - 1);
              done();
            });
          });
        })


      }); // End of discussion delete

    }); // End of POST/forums/discussion/:id/destory

    describe("GET /forums/discussion/:id/edit", () => {

      it("should render a view for an edit page for selected discussion", (done) => {
        request.get(`${base}discussion/${this.discussion.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Discussion");
          expect(body).toContain("Best Champs Bot");
          done();
        });
      }); // End of dicussion edit

    }); // End of GET/forums/discussion/:id/edit

    describe("POST /forums/discussion/:id/update", () => {

      it("should update the discussion with the new values", (done) => {
        const options = {
          url: `${base}discussion/${this.discussion.id}/update`,
          form: {
            title: "Support is MVP",
            description: "Supports are the true MVPs",
            userId: this.user.id
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();

          Discussion.findOne({
            where: {id: this.discussion.id}
          })
          .then((discussion) => {
            expect(discussion.title).toBe("Support is MVP");
            done();
          });
        });

      }); // End of update discussion

    }); // End of POST/forums/discussion/:id/update

  }); // End of admin user describe

  describe("member user performing CRUD actions for forums", () => {

    beforeEach((done) => {
      authorizeUser("member", done);
    }); // End of beforeEach

    describe("GET /forums", () => {
  // CHANGE FOR ADMIN USE
      it("should render a view for the forums page and list all discussions", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Forums");
          expect(body).toContain("Best Champs Bot");
          done();
        });
      }); // End of page view

    }); // End of GET/forums describe

    describe("GET /forums/discussion/new", () => {

      it("should render a view for new discussion page", (done) => {
        request.get(`${base}discussion/new`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain("New Discussion");
          done();
        });
      }); // End of discussion view

    }); // End of GET/forums/discussion/new

    describe("POST /forums/discussion/create", () => {
      const options = {
        url: `${base}discussion/create`,
        form: {
          title: "Top Champs Bot",
          description: "Top champions for botlane",
          userId: this.userId
        }
      };

      it("should post a new discussion and redirect", (done) => {

        request.post(options, (err, res, body) => {
          Discussion.findOne({where: {title: "Top Champs Bot"}})
          .then((discussion) => {
            expect(res.statusCode).toBe(303);
            expect(discussion.title).toBe("Top Champs Bot");
            expect(discussion.description).toBe("Top champions for botlane");
            expect(discussion.id).toBe(2);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      }); // End of discussion creation/redirect

    }); // End of POST/forums/discussion/create

    describe("GET /forums/discussion/:id", () => {

      it("should render a view for the selected discussion", (done) => {
        request.get(`${base}discussion/${this.discussion.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Best Champs Bot");
          done();
        });
      }); // End of discussion view

    }); // End of GET/forums/discussion/:id

    describe("POST /forums/discussion/:id/destroy", () => {

      it("should not delete the discussion with the selected ID", (done) => {
        Discussion.findAll()
        .then((discussions) => {
          const discussionCountBeforeDelete = discussions.length;

          expect(discussionCountBeforeDelete).toBe(1);

          request.post(`${base}discussion/${this.discussion.id}/destroy`, (err, res, body) => {
            Discussion.findAll()
            .then((discussions) => {
              expect(err).toBeNull();
              expect(discussions.length).toBe(discussionCountBeforeDelete);
              done();
            });
          });
        })


      }); // End of discussion delete

    }); // End of POST/forums/discussion/:id/destory

    describe("GET /forums/discussion/:id/edit", () => {

      it("should not render a view for an edit page for selected discussion", (done) => {
        request.get(`${base}discussion/${this.discussion.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          //expect(authorizeUser("admin", done).user).toBe(this.user.id);
          done();
        });
      }); // End of dicussion edit

    }); // End of GET/forums/discussion/:id/edit

    describe("POST /forums/discussion/:id/update", () => {

      it("should not update the discussion with the new values", (done) => {
        const options = {
          url: `${base}discussion/${this.discussion.id}/update`,
          form: {
            title: "Support is MVP",
            description: "Supports are the true MVPs",
            userId: this.userId
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();

          Discussion.findOne({
            where: {id: 1}
          })
          .then((discussion) => {
            expect(discussion.title).toBe("Best Champs Bot");
            done();
          });
        });

      }); // End of update discussion

    }); // End of POST/forums/discussion/:id/update

  }); // End of member user describe

}); // End of routes:forums
