//list of streamers
var streamers = ["freecodecamp", "riotgames", "starladder1", "beyondthesummit",
                 "tsm_theoddone", "Tsm_dyrus", "esl_csgo", "garenatw", "smitegame",
                 "nl_kripp", "Nightblue3", "esl_lol", "imaqtpie", "asiagodtonegg3be0",
                 "sodapoppin", "trick2g", "LIRIK", "gamesdonequick", "PhantomL0rd",
                 "faceittv", "syndicate", "summit1g", "goldglove", "captainsparklez",
                 "imaqtpie", "tsm_bjergsen", "ggnetworktv", "jennythesquirrel",
                 "w1tch_house", "HSdogdog"];

function buildList() {
  streamers.forEach(function(streamer) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?', function(data) {

      var url;
      var name;
      var viewers;
      var status;
      var livePreview = "";
      var livePreviewHTML = livePreview;
      var currentGame;
      var sorted;

      // creates modal for offline user
      if (data.stream === null) {
        //checks name length and cuts it off if too long
        if (streamer.length < 16) {
          currentGame = streamer + " is offline";
        } else {
          currentGame = streamer.substring(0,13) + "... is offline";
        }
        livePreview = "http://cashlessevent.com/wp-content/uploads/2013/01/Card-Offline.jpg";
        livePreviewHTML = "<img class='livePreview' src='" + livePreview + "'>";
        viewers = "No";
        status = "<div class='offline'>"
        sorted = 1;

        // creates modal for undefined user
      } else if (data.stream === undefined) {
        currentGame = "Account Closed";
        status = "<div class='offline'>"
        sorted = 2;

        //creates modal for online user
      } else {
        viewers = data.stream.viewers;
        currentGame = data.stream.game;
          if (currentGame.length > 27) {
            currentGame = currentGame.substring(0,24) + "..."
          }
        livePreview = data.stream.preview.large;
        livePreviewHTML = "<img class='livePreview' src='" + livePreview + "'>";
        status = "<div class='online'>"
        sorted = 0;
      };

      $.getJSON('https://api.twitch.tv/kraken/channels/' + streamer + '?callback=?', function(data) {

        if (data.name === undefined) {
          name = "";
        } else {
          name = data.name;
          url = data.url;
        };

        var html = status + "<a target='_blank' href='" + url + "'><div class='selector'><div class='channelInfo'>";
        html += currentGame + "<br>";
        html += "<span class='grayText'>" + viewers + " viewers on " + name + "</span></div>";
        html += livePreviewHTML + "</a>";
        html += "</div></div>";

        //if "all" is selected, this places online first
        if (sorted===0) {
          $('#testContainer').prepend(html);
        } else {
          $('#testContainer').append(html);
        }

        // button functions to display online/offline/all w/ animations
        $('.online').hide();
        $('.offline').hide();
        setTimeout(function(){
          $('.online').show("fade", 2000)
        }, 2500)


        $('#all').click(function() {
          $('.offline').hide("fade", 2000);
          $('.online').hide("fade", 2000);
          setTimeout(function(){
          $('.online').show("fade", 2000)
          $('.offline').show("fade", 2000)
        }, 2500)
        })

        $('#online').click(function() {
          $('.offline').hide("fade", 2000);
          $('.online').hide("fade", 2000);
          setTimeout(function(){
          $('.online').show("fade", 2000)
        }, 2500)
        })

        $('#offline').click(function() {
          $('.online').hide("fade", 2000);
          $('.offline').hide("fade", 2000);
          setTimeout(function(){
          $('.offline').show("fade", 2000)
        }, 2500)
        })

      }); /* getJSON channel */
    }); /* /getJSON streamer */
  }); /* /streamers.forEach */
}; /* /buildList */

$(document).ready(function() {
  buildList();
});
