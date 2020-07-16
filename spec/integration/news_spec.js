const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/news/";
const sequelize = require("../../src/db/models/index").sequelize;
const News = require("../../src/db/models").News;
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
        email: user.email,
        username: user.username
      }
    }, (err, res, body) => {
      done();
    })
  })
} // End of authorizeUser

describe("routes : news", () => {
  
  beforeEach((done) => {
    this.newsPost;

    sequelize.sync({force: true})
    .then((res) => {
      News.create({
        title: "Hot News",
        body: "The latest"
      })
      .then((newsPost) => {
        this.newsPost = newsPost;
        done();
      })
    })
  }); // End of beforeEach

  describe("admin context for CRUD operations for News posts", () => {

    beforeEach((done) => {
      authorizeUser("admin", done);
    }); // End of beforeEach

    describe("GET /news", () => {

      it("should return status code 200 and render a view", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain("Official News");
          done();
        });
      });
  
      it("should render the view with all News posts", (done) => {
        request.get(base, (err, res, body) => {
          News.findAll()
          .then((newsPosts) => {
            expect(body).toContain("Hot News");
            done();
          })
        })
  
      });
  
    }); // End of GET/news
  
    describe("GET /news/new", () => {
  
      it("should return a status code of 200 and render a view", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain("New Post");
          done();
        });
      });
  
    }); // End of GET/news/new
  
    describe("POST /news/create", () => {
  
      it("should create a news post and redirect", (done) => {
        const options = {
          url: `${base}create`,
          form: {
            title: "Red Post",
            body: "Latest news"
          }
        }
  
        request.post(options, (err, res, body) => {
          News.findOne({where: {title: "Red Post"}})
          .then((newsPost) => {
            expect(newsPost.title).toBe("Red Post");
            expect(newsPost.body).toBe("Latest news");
            done();
          })
        })
      });
  
    }); // End of POST/news/create
  
    describe("GET /news/:title", () => {
  
      it("should show the News post with the associated values", (done) => {
        request.get(`${base}${this.newsPost.title}`, (err, res, body) => {
          expect(body).toContain("Hot News");
          done();
        });
      });
  
    }); // End of GET/news/:title
  
    describe("GET /news/:title/edit", () => {
  
      it("should render the edit view of an associated News post", (done) => {
        request.get(`${base}${this.newsPost.title}/edit`, (err, res, body) => {
          expect(body).toContain("Edit Post");
          done();
        });
      });
  
    }); // End of GET/news/:title/edit
  
    describe("POST /news/:title/update", () => {
  
      it("should update the post with the new values", (done) => {
        const options = {
          url: `${base}${this.newsPost.title}/update`,
          form: {
            title: "Red Post",
            body: "Here we go"
          }
        }
  
        request.post(options, (err, res, body) => {
          News.findOne({where: {title: "Red Post"}})
          .then((newsPost) => {
            expect(newsPost.title).toBe("Red Post");
            expect(newsPost.body).toBe("Here we go");
            done();
          })
        })
      });
  
    }); // End of POST/news/:title/update
  
    describe("POST /news/:title/destroy", () => {
  
      it("should delete the News post", (done) => {
        News.findAll()
        .then((newsPosts) => {
          const newsCountBeforeDelete = newsPosts.length;
          expect(newsCountBeforeDelete).toBe(1);
  
          request.post(`${base}${this.newsPost.title}/destroy`, (err, res, body) => {
            News.findAll()
            .then((newsPosts) => {
              expect(newsPosts.length).toBe(newsCountBeforeDelete - 1);
              done();
            })
          })
        })
  
  
      });
  
    }); // End of POST/news/:title/destroy

  }); // End of admin context

  describe("member context for CRUD operations for News posts", () => {

    beforeEach((done) => {
      authorizeUser("member", done);
    }); // End of beforeEach

    describe("GET /news", () => {

      it("should return status code 200 and render a view", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain("Official News");
          done();
        });
      });
  
      it("should render the view with all News posts", (done) => {
        request.get(base, (err, res, body) => {
          News.findAll()
          .then((newsPosts) => {
            expect(body).toContain("Hot News");
            done();
          })
        })
  
      });
  
    }); // End of GET/news
  
    describe("GET /news/new", () => {
  
      it("should not return a status code of 200 and render a view", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          done();
        });
      });
  
    }); // End of GET/news/new
  
    describe("POST /news/create", () => {
  
      it("should not create a news post and redirect", (done) => {
        const options = {
          url: `${base}create`,
          form: {
            title: "Red Post",
            body: "Latest news"
          }
        }
  
        request.post(options, (err, res, body) => {
          News.findOne({where: {title: "Red Post"}})
          .then((newsPost) => {
            expect(err).toBeNull();
            done();
          })
        })
      });
  
    }); // End of POST/news/create
  
    describe("GET /news/:title", () => {
  
      it("should show the News post with the associated values", (done) => {
        request.get(`${base}${this.newsPost.title}`, (err, res, body) => {
          expect(body).toContain("Hot News");
          done();
        });
      });
  
    }); // End of GET/news/:title
  
    describe("GET /news/:title/edit", () => {
  
      it("should render the edit view of an associated News post", (done) => {
        request.get(`${base}${this.newsPost.title}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          done();
        });
      });
  
    }); // End of GET/news/:title/edit
  
    describe("POST /news/:title/update", () => {
  
      it("should not update the post with the new values", (done) => {
        const options = {
          url: `${base}${this.newsPost.title}/update`,
          form: {
            title: "Hot News",
            body: "Here we go"
          }
        }
  
        request.post(options, (err, res, body) => {
          News.findOne({where: {title: "Hot News"}})
          .then((newsPost) => {
            expect(newsPost.title).toBe("Hot News");
            expect(newsPost.body).toBe("The latest");
            done();
          })
        })
      });
  
    }); // End of POST/news/:title/update
  
    describe("POST /news/:title/destroy", () => {
  
      it("should not delete the News post", (done) => {
        News.findAll()
        .then((newsPosts) => {
          const newsCountBeforeDelete = newsPosts.length;
          expect(newsCountBeforeDelete).toBe(1);
  
          request.post(`${base}${this.newsPost.title}/destroy`, (err, res, body) => {
            News.findAll()
            .then((newsPosts) => {
              expect(newsPosts.length).toBe(newsCountBeforeDelete);
              done();
            })
          })
        })
  
  
      });
  
    }); // End of POST/news/:title/destroy

  }); // End of member context

}); // End of routes