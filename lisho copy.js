const axios = require("axios");
var matches = new Array();
const myApi = "RGAPI-fd46af36-71ed-4300-bcc2-3faeeef44669";
var totalTime = [];
axios
  .get(
    `https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/T1aEQePes2r4aOxwabLDfzB7mKPzGZNC8cVxbY92n9dlAHY?api_key=${myApi}`
  )
  .then(response => {
    let data = response.data.matches;
    for (var each in data) {
      matches.push(data[each].gameId);
    }
    console.log(matches); // tenho os matches, partiu catar os tempos

    async function getMatchTime() {
      totalTime = 0;
      for (var each in matches) {
        const response = await axios.get(
          `https://br1.api.riotgames.com/lol/match/v4/matches/${matches[each]}?api_key=${myApi}`
        );
        console.log(`Partida ${matches[each]} : ${response.data.gameDuration} segundos`);
        totalTime = totalTime + response.data.gameDuration;
        // totalTime = response.data.gameDuration;
      }
      var seconds = parseInt(totalTime, 10);

      var days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      var hrs = Math.floor(seconds / 3600);
      seconds -= hrs * 3600;
      var mnts = Math.floor(seconds / 60);
      seconds -= mnts * 60;
      console.log(
        "O total de horas q Davi perdeu nas ultimas 100 partidas é : " +
          days +
          " dias, " +
          hrs +
          " horas, " +
          mnts +
          " minutos, " +
          seconds +
          " segundos."
      );
      console.log("P4R4B3NZ D4V1!!!!");
    }
    getMatchTime();
  });
