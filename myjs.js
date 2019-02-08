
$(document).ready(function(){
  popup();
  let backtrack = new Audio('audio/music.mp3');
  // backtrack.play();
});

//GLOBAL VARIABLE INITIALIZERS
var droppedObj = 0;
var trashTarget = 0;
var points = 0;
var wrong = 0;
var level = 0;
let msgCount = 0; // used in displayMessage()
// var trashAudio  = new Audio('audio/trash.mp3');
// var recAudio = new Audio('audio/recycle.mp3');
var correctAudio  = new Audio('audio/correct.mp3');
var wrongAudio = new Audio('audio/wrong.mp3');
var cheerAudio = new Audio('audio/cheer.mp3');
var timeupAudio = new Audio('audio/zonk.mp3');


   //POPUP INSTRUCTIONS BOX & INITIALIZE FIRST LEVEL
  //var popupClosed = false;
  function popup(){
    $( "#dialog-message" ).dialog({
          modal: true,
          buttons: {
            Start: function() {
              level ++;
              $( this ).dialog( "close" );
              callTimer(15);
              makeTrash(5, trashArray1);
              
              
            }
          }
  });
};

//NEXT LEVEL POPUP
function levelPopup(){
  playAudio(cheerAudio);
  $( "#newlevel-message" ).dialog({
        modal: true,
        buttons: {
          Next: function() {
            cheerAudio.pause();
            $( this ).dialog( "close" );
            clearInterval(timerInt);
             $('#game-container').empty();
            display.text('0');
            if (level == 2){
              i = 0;
              callTimer(20);
              makeTrash(10, trashArray2);
              trashTarget = 10;
            
            }
            else if (level == 3){
              $('.dumpsters').css("background-image", "url(night2.png)"); 
              $('.header').css("background-color", "#1b1464");  
              $('#game-container').css("background-color", "#006837");
              i=0;
              callTimer(30);
              makeTrash(15, trashArray3);
              trashTarget = 15;
            
            }
            else if (level == 4){
              $('.dumpsters').css("background-image", "url(night2.png)"); 
              $('.header').css("background-color", "#1b1464");  
              $('#game-container').css("background-color", "#006837");
              i=0;
              callTimer(30);
              makeTrash(20, trashArray3);
              trashTarget = 20;
              
            }
            
          },
          End: function() {
            cheerAudio.pause();
            $( this ).dialog( "close" );
            location.reload();
          }
        }
});
};

//TIME UP POPUP
function timeUpPopup(){
  if (droppedObj != trashTarget && wrong < 3) {
    playAudio(timeupAudio);
    clearInterval(timerInt);
    $( "#out-of-time" ).dialog({
          modal: true,
          buttons: {
            Try_Again: function() {
              timeupAudio.pause();
              $( this ).dialog( "close" );
              location.reload();
          },
          End: function() {
            timeupAudio.pause();
            $( this ).dialog( "close" );
            location.reload();
          }
        }
    });
  }
  else{
    clearInterval(timerInt);
  }

}





// COUNTDOWN TIMER
      function startTimer(duration, display) {
        //var timer = duration, minutes, seconds;
        var timer = duration, seconds;
        timerInt = setInterval(function () {
            //minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            //minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            //display.text(minutes + ":" + seconds);
            display.text(seconds);
    
            if (--timer < 0) {
                //timer = duration;
                //alert("You ran out of time!");
                timeUpPopup();
                //clearInterval(timerInt);
            }
        }, 1000);
    }
    
        function callTimer(secs){
        var secs = secs;
            display = $('#time');
        startTimer(secs, display);
  };

       


  //RANDOM TRASH

  var trashArray1=[
    {name: 'bananaTrash', image: 'images/banana.png'},
    {name: 'cigTrash', image: 'images/cig.gif'},
    {name: 'candyTrash', image: 'images/candy.gif'},
    {name: 'bottleRec', image: 'images/bottle.png'},
    {name: 'canRec', image: 'images/can.png'},
    {name: 'cardBoardRec', image: 'images/cardboard.png'}
  ];

  var trashArray2 = [
    //{name: 'bananaTrash', image: 'images/banana.png'},
    {name: 'cigTrash', image: 'images/cig.gif'},
    {name: 'pinWheelTrash', image: 'images/pinwheel.gif' },
   // {name: 'candyTrash', image: 'images/candy.png'},
    {name: 'bottleRec', image: 'images/bottle.png'},
    //{name: 'canRec', image: 'images/can.png'},
    {name: 'poopTrash', image: 'images/poop.gif'},
    {name: 'burgerTrash', image: 'images/burger.gif'},
    {name: 'paperplaneRec', image: 'images/paperplane.gif'},
    {name: 'newspaperRec', image: 'images/newspaper2.png'}
  ];

  var trashArray3 = [
    //{name: 'bananaTrash', image: 'images/banana.png'},
    //{name: 'cigTrash', image: 'images/cigarette.png'},
    //{name: 'candyTrash', image: 'images/candy.png'},
    //{name: 'bottleRec', image: 'images/bottle.png'},
    //{name: 'canRec', image: 'images/can.png'},
    //{name: 'poopTrash', image: 'images/poop.png'},
   // {name: 'burgerTrash', image: 'images/burger.png'},
    //{name: 'paperplaneRec', image: 'images/paperplane.png'},
    //{name: 'newspaperRec', image: 'images/newspaper.png'},
    {name: 'pinWheelTrash', image: 'images/pinwheel.gif' },
    {name: 'juulTrash', image: 'images/juul.png'},
    {name: 'cerealRec', image: 'images/cereal.png'},
    {name: 'bagTrash', image: 'images/bag.png'},
    {name: 'takeoutTrash', image: 'images/takeout.png'},
    {name: 'plasticcupTrash', image: 'images/plasticcup.png'},
    {name: 'eggcartonRec', image: 'images/eggcarton.png'},
  ];

  

  //MAKE TRASH FUNCTION
  function makeTrash(trashNum, trashArray) {
    droppedObj = 0;
     i=0;
    myObj = [];
    var trashArray = trashArray;
    trashTarget = trashNum;
    $('#level').text(level);// +1 bc off by one
 

    setInterval(function(){
        if(myObj.length < trashNum){
     
        var trash = trashArray[Math.floor(Math.random() * trashArray.length)];

        if(trash.name.includes('Trash')){
          $('#game-container').append('<div class="trash-img" id="trash' + i + '"><img src="'+trash.image+'"></div>');
          var obj = $('#trash' + i).draggable({
          zIndex: 100
          });
        }

        if(trash.name.includes('Rec')){
          $('#game-container').append('<div class="trash-img" id="rec' + i + '"><img src="'+trash.image+'"></div>');
          var obj = $('#rec' + i).draggable({
          zIndex: 100
          });
        }

        var width = $('#game-container').width();
        //console.log(width);
        var height = $('#game-container').height();

        var left = Math.floor(Math.random() * (width - 50 - 50 + 1)+ 50);
        //console.log(left);
        var top = Math.floor(Math.random() * (height+100 - 300 + 1)+300); 
        obj.css("left", left);
        obj.css("top", top); 
        myObj.push(obj);
        i +=1;
      }
    },1000);
  }





     
//CHECK IF OBJECT DROPPED IS RECYCLABLE AND UPDATE POINTS
      function checkRecycling(){
        if(currentID.includes('trash')){
          playAudio(wrongAudio);
          points--;
          wrong++;
          checkWrong();
          displayMessage(incorrect);
        }
        else if(currentID.includes('rec')){
          playAudio(correctAudio);
          points++;
          displayMessage(motivation);
        }
        $('#points').text(points);
      };
//CHECK IF OBJECT DROPPED IS TRASH AND UPDATE POINTS
      function checkTrash(){
        if(currentID.includes('trash')){
          playAudio(correctAudio);
          points++;
        }
        else if(currentID.includes('rec')){
          playAudio(wrongAudio);
          points--;
          wrong++;
          checkWrong();
        }
        $('#points').text(points);
      };


  //IF YOU GET 3 WRONG YOU DIE
  function checkWrong(){
    if (wrong == 3){
      playAudio(timeupAudio);
      // var playAgain = confirm("You contributed to global warming. - press Ok to play again & clear your name.");
      // if(playAgain == true){
      //   clearInterval(timerInt);
      //   popup();
      //   $('#game-container').empty();
      //   points = 0;
      //   display.text('0');
      //   level = 0;
      // }
      $("#end-game").dialog({
        buttons: {
          'Play Again': function() {
            timeupAudio.pause();
            // clearInterval(timerInt);
            // display.text('0');
            // $('#game-container').empty()
            // level = 0;
            // points = 0;
            // $('#points').text(points);
            // droppedObj = 0;
            // trashTarget = 0;
            // wrong = 0;
            // popup()//runs stat again
            // $(this).dialog('close');
            location.reload();
          },
          'No': function() {
            timeupAudio.pause();
            location.reload();
          }
        }
      });
    }
  }

  //BEAT LEVEL
  function beatLevel() {
    if(droppedObj == trashTarget && level < 4){
      levelPopup();
      level++;
    }
    else if (droppedObj == trashTarget && level == 4){
      winPopup();
    }
  }

  //WIN POPUP
  function winPopup(){
    playAudio(cheerAudio);
    $( "#win" ).dialog({
          modal: true,
          buttons: {
            Play_Again: function() {
              cheerAudio.pause();
              location.reload();
            },
            Finished: function(){
              location.reload();
              cheerAudio.pause();
            }
          }
  });
};

  //RECYLING BIN DROP
      $( "#recycling-bin" ).droppable({
        classes: {
          'ui-droppable-hover': 'hover'
        },
    
        drop: function(event, ui){
          currentID = ui.draggable.attr('id');
          //playAudio(recAudio);
          ui.draggable.hide();
          checkRecycling();
          droppedObj++;
          beatLevel();
        }
       
      });
//TRASH BIN DROP
      $( "#trash-bin" ).droppable({
        classes: {
          'ui-droppable-hover': 'hover'
        },
    
        drop: function(event, ui){
          currentID = ui.draggable.attr('id');
          //playAudio(trashAudio);
          ui.draggable.hide();
          checkTrash();
          droppedObj++;
          beatLevel();
        }
       
      });
    
    
      
    //displays messag every 3 called from checkRecycling() need to do other array, incorrect
    function displayMessage(textArray){
      msgCount +=1
      if(textArray == incorrect){
        let ranIndex = Math.floor(Math.random() * textArray.length)
        $('.in-game-message').text(textArray[ranIndex].text)
        $('.in-game-message').toggleClass('unhide')
        setTimeout(function(){
          $('.in-game-message').toggleClass('unhide')
        },5000)
      }else{
      if (msgCount % 3 == 0){
        let ranIndex = Math.floor(Math.random() * textArray.length)
        $('.in-game-message').text(textArray[ranIndex].text)
        $('.in-game-message').toggleClass('unhide')
        setTimeout(function(){
          $('.in-game-message').toggleClass('unhide')
        },5000)
      }
    }
  }

// audio handling
function playAudio(audioClip){
if(audioClip){
  audioClip.currentTime = 0;
  audioClip.play()
}
}

function tooManyMistakesPopup(){
$( "#too-many-mistakes" ).dialog({
      modal: true,
      buttons: {
        Start: function() {
          $( this ).dialog( "close" );
          location.reload();

      }
    }
});
}
if ($(window).width() < 960) {
$('body').empty()
let screenWidthWarning = document.createElement('p')
$(screenWidthWarning).text('Sorry this game is not avaialable on your device.')
$(screenWidthWarning).addClass('screen-size-warning')
 $('body').append($(screenWidthWarning))
}





