const championsQuery = require("../db/queries.champions.js");

module.exports = {
  index(req, res, next) {
    championsQuery.getAllChampions((err, champions, championIcons) => {
      if(err) {
        req.flash("notice", "Couldn't display champions");
        res.redirect("/");
      }else {
        //console.log(champions);
        res.render("champions/index", {champions, championIcons});
      }
    });
  }
}