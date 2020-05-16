const request = require("request");
let LeagueAPI = require("leagueapiwrapper");
LeagueAPI = new LeagueAPI(process.env.RIOT_DEV_KEY, Region.NA);

module.exports = {
  getChampRotation(callback) {
    /* this might be useful later
    request(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Ohgasmik?api_key=${process.env.RIOT_DEV_KEY}`, (err, res, body) => {
      if(err) {
        console.log(err);
      }else {
        var myJSON = JSON.parse(body);
        console.log(myJSON.name);
      }
    });*/
    LeagueAPI.initialize()
    .then(() => {
      return LeagueAPI.getFreeChampionRotation()
      .then((freeChampRotation) => {
        callback(null, freeChampRotation);
      })
    })
    .catch((err) => {
      callback(err);
    });
  }
}
