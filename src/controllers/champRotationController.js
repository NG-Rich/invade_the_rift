const champRotationQueries = require("../db/queries.champRotation.js");
const fs = require("fs");

var readJson = (path, callback) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if(err) {
      callback(err);
    }else {
      callback(null, JSON.parse(data));
    }
  });
}

module.exports = {
  index(req, res, next) {
    champRotationQueries.getChampRotation((err, freeChampRotation) => {
      if(err) {
        req.flash("notice", "Could not get champion rotation!");
        res.redirect("/");
      }else {
        res.render("champRotation/index", {freeChampRotation});
      }
    });
  }
}
