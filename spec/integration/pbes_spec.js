const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/pbe/";
const sequelize = require("../../src/db/models/index").sequelize;
const Pbe = require("../../src/db/models").Pbe;

describe("routes : pbe", () => {

  beforeEach((done) => {
    this.pbePost;

    sequelize.sync({force: true})
    .then((res) => {
      Pbe.create({
        title: "PBE Post",
        body: "This week"
      })
      .then((pbePost) => {
        this.pbePost = pbePost;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

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
        .then((pbePost) => {
          expect(pbePost).not.toBeNull();
          expect(pbePost.title).toBe("PBE Changes");
          expect(pbePost.body).toBe("Upcoming changes");
          done();
        })
      })
    });

  }); // End of POST/pbe/create

  describe("GET /pbe/:title/edit", () => {

    it("should render the edit view with associated PBE post", (done) => {
      request.get(`${base}${this.pbePost.title}/edit`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Edit PBE Post");
        done();
      })
    });

  }); // End of GET/pbe/edit

  describe("POST /pbe/:title/update", () => {

    it("should update the associated PBE post with new values", (done) => {
      const options = {
        url: `${base}${this.pbePost.title}/update`,
        form: {
          title: "PBE Post",
          body: "New changes"
        }
      }

      request.post(options, (err, res, body) => {
        Pbe.findOne({where: {title: "PBE Post"}})
        .then((pbePost) => {
          expect(pbePost.title).toBe("PBE Post");
          expect(pbePost.body).toBe("New changes");
          done();
        })
      })
    });

  }); // End of POST/pbe/update

  describe("POST /pbe/:title/destroy", () => {

    it("should delete the associated PBE post", (done) => {
      Pbe.findAll()
      .then((pbePosts) => {
        const pbePostCountBeforeDelete = pbePosts.length;
        expect(pbePostCountBeforeDelete).toBe(1);

        request.post(`${base}${this.pbePost.title}/destroy`, (err, res, body) => {
          Pbe.findAll()
          .then((pbePosts) => {
            expect(err).toBeNull();
            expect(pbePosts.length).toBe(pbePostCountBeforeDelete - 1);
            done();
          })
        })
      })

    });

  }); // End of POST/pbe/destroy

}); // End of routes
