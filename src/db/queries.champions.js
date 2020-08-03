const champions = require("../../dragontail-10.9.1/10.9.1/data/en_US/champion.json");

module.exports = {
  getAllChampions(callback) {
    const championObjects = Object.keys(champions.data);
    const championIcon = Object.keys(champions.data);

    for (let i = 0; i < championObjects.length; i++) {
      if(championObjects[i] == "AurelionSol") {
        championObjects[i] = "Aurelion Sol";
      }else if(championObjects[i] == "Chogath") {
        championObjects[i] = "Cho'Gath";
      }else if(championObjects[i] == "DrMundo") {
        championObjects[i] = "Dr. Mundo";
      }else if(championObjects[i] == "JarvanIV") {
        championObjects[i] = "Jarvan IV";
      }else if(championObjects[i] == "Kaisa") {
        championObjects[i] = "Kai'Sa";
      }else if(championObjects[i] == "Khazix") {
        championObjects[i] = "Kha'Zix";
      }else if(championObjects[i] == "KogMaw") {
        championObjects[i] = "Kog'Maw";
      }else if(championObjects[i] == "Leblanc") {
        championObjects[i] = "LeBlanc";
      }else if(championObjects[i] == "LeeSin") {
        championObjects[i] = "Lee Sin";
      }else if(championObjects[i] == "MasterYi") {
        championObjects[i] = "Master Yi";
      }else if(championObjects[i] == "MissFortune") {
        championObjects[i] = "Miss Fortune";
      }else if(championObjects[i] == "MonkeyKing") {
        championObjects[i] = "Wukong";
      }else if(championObjects[i] == "RekSai") {
        championObjects[i] = "Rek'Sai";
      }else if(championObjects[i] == "TahmKench") {
        championObjects[i] = "Tahm Kench";
      }else if(championObjects[i] == "TwistedFate") {
        championObjects[i] = "Twisted Fate";
      }else if(championObjects[i] == "Velkoz") {
        championObjects[i] = "Vel'Koz";
      }else if(championObjects[i] == "XinZhao") {
        championObjects[i] = "Xin Zhao";
      }
    }
    championObjects.sort();

    callback(null, championObjects, championIcon);
  }
}