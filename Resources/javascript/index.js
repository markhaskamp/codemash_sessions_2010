
function displaySessionStartTimes(h) {
    htmlStr = '';

		dayHash = {};
    dayHash['2010-01-14'] = 'Thursday';
    dayHash['2010-01-15'] = 'Friday';

    // sort hash by start time
    sortedTimes = [];
    $.each(h, function(startTime) {
            sortedTimes.push(startTime);
        });

    
    $.each(sortedTimes.sort(), function (ndx, startTime) {
						var foo = startTime.split('T');
            htmlStr += '<div><div class="startTime">' + foo[1] + ', ' + dayHash[foo[0]] + '</div>';
            htmlStr += '<div class="SelectedSessionForStartTime"></div>';
            htmlStr += '<div class="sessionTitlesList">';

            $.each(h[startTime],  function(ndx, sessionJson) {
                    htmlStr += 
                        '<div class="sessionTitleOld">' +
                        '  <div class="selectImage" style="margin-right: 1.0em">0</div>' +
                        '  <div class="sessionTitle">' + sessionJson.Title + ' (' + sessionJson.Room + ')</div>' +
                        '</div>' +
                        '<div class="sessionInfoContainer">' +
                        '  <div class="sessionSpeaker">' + sessionJson.SpeakerName + '</div>' +
                        '  <div class="sessionRoom">Room ' + sessionJson.Room + '</div>' +
                        '  <div class="sessionAbstract">' + sessionJson.Abstract + '</div>' +
                        '</div>';

                });
            htmlStr += '</div></div>';
        });

    $('#startTimeList')[0].innerHTML = htmlStr;
}

function getSelectedSessions(db, startTimeHash) {
}

function log(msg) {
    $('#messages')[0].innerHTML += '<br />' + msg;
}

var sessionData;
var sessionDataParser;
var userDB;
var selectedSessions = {};

$(function() {
  try {

      $("#sessionData").hide();
      sessionDataParser = new SessionDataParser();
      sessionData = sessionDataParser.parse($('#sessionData')[0].innerHTML);
      hStartTime = sessionDataParser.buildStartTimeHash(sessionData);

      userDB = UserDatabase.create(UserDatabase.types.local);
      userDB.open();
      userDB.init();
      selectedSessions = getSelectedSessions(userDB, hStartTime);

      displaySessionStartTimes(hStartTime);

      $('.sessionTitle').mouseover( function(evt) { 
              $(this).addClass("sessionTitleHover"); 
              $(this).removeClass("sessionTitle"); 
          } );

      $('.sessionTitle').mouseout( function(evt) {
              $(this).addClass("sessionTitle");
              $(this).removeClass("sessionTitleHover");
          });

      $('.sessionTitle').toggle( function() { $(this).parent().next().slideDown("medium"); },
                                 function() { $(this).parent().next().slideUp("fast"); });

      $('.selectImage').click( function(evt) {
              var currParent = $(this).parent();
              var selectedTitle = $(this).next()[0].innerHTML;

              currParent.parent().prev()[0].innerHTML = selectedTitle;
							$(this).addClass("selectImageSelect");
							$(this).removeClass("selectImage");
            });

           $('.startTime').toggle( function() { $(this).next().next().slideDown("medium"); },
                                   function() { $(this).next().next().slideUp("fast"); });

      $('.sessionTitlesList').hide();
      $('.sessionInfoContainer').hide();

  }
  catch(exc) {
      log(exc);
  }
});
