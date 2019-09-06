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

    for (var each in matches) {
      totalTime = 0;

      axios
        .get(
          `https://br1.api.riotgames.com/lol/match/v4/matches/${matches[each]}?api_key=${myApi}`
        )
        .then(response => {
          totalTime = totalTime + response.data.gameDuration;
          // console.log("Total: " + totalTime);
          var seconds = parseInt(totalTime, 10);

          var days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          var hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          var mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;
          console.log(
            days + " days, " + hrs + " Hrs, " + mnts + " Minutes, " + seconds + " Seconds"
          );
        });
    }
  });
