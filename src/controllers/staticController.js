const staticQueries = require("../db/queries.static.js");

module.exports = {
  index(req, res, next) {
    staticQueries.showLatestEntries((err, discussions) => {
      if(err) {
        req.flash("notice", "Can't display pages");
      }else {
        res.render("static/index", {discussions});
      }
    });
  }
}
