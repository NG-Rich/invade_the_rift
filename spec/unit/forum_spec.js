const sequelize = require("../../src/db/models/index").sequelize;
const Discussion = require("../../src/db/models").Discussion;

describe("Discussion", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then((res) => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  }); // End of beforeEach

  describe("create()", () => {

    it("should create a new Discussion object with valid values", (done) => {
      Discussion.create({
        title: "Top Champs Bot",
        description: "Top champions for botlane"
      })
      .then((discussion) => {
        expect(discussion.title).toBe("Top Champs Bot");
        expect(discussion.description).toBe("Top champions for botlane");
        expect(discussion.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      }); // End of discussion create

    }); // End of discussion create object

  }); // End create() discussion

}); // End Discussion describe
