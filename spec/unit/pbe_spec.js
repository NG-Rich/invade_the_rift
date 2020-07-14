const sequelize = require("../../src/db/models/index").sequelize;
const Pbe = require("../../src/db/models").Pbe;

describe("Pbe", () => {

  describe("create()", () => {

    it("should create a Pbe object", (done) => {
      Pbe.create({
        title: "PBE Post",
        body: "Upcoming changes"
      })
      .then((pbe) => {
        expect(pbe.title).toBe("PBE Post");
        expect(pbe.body).toBe("Upcoming changes");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });

  }); // End of create()

}); // End of Pbe describe
