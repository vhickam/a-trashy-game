
$(document).ready(function(){
  popup();
});

  

   //POPUP INSTRUCTIONS BOX
   var popupClosed = false;
  function popup(){
    $( "#dialog-message" ).dialog({
          modal: true,
          buttons: {
            Start: function() {
              $( this ).dialog( "close" );
              callTimer();
              makeTrash();
            }
          }
  });
};



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
                clearInterval(timerInt);
            }
        }, 1000);
    }
    
        function callTimer(){
        var thirtysecs = 30;
            display = $('#time');
        startTimer(thirtysecs, display);
  };

       


  //RANDOM TRASH

  function makeTrash() {
    var i=0;
    var myObj = [];
    var trashArray=[
      {name: 'bananaTrash', image: 'images/banana.png'},
      {name: 'cigTrash', image: 'images/cigarette.png'},
      {name: 'candyTrash', image: 'images/candy.png'},
      {name: 'bottleRec', image: 'images/bottle.png'},
      {name: 'canRec', image: 'images/can.png'}
    ];


    setInterval(function(){
        if(myObj.length < 5){
        var trash = trashArray[Math.floor(Math.random() * trashArray.length)];
        //console.log(trash.name);
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
        var height = $('#game-container').height();
        var left = Math.floor(Math.random() * width);
        var top = Math.floor(Math.random() * (height+100 - 300 + 1)+300); 
        obj.css("left", left);
        obj.css("top", top); 
        myObj.push(obj);
        i +=1;
      }
    },1000);
  }





      var points = 0;
      var wrong = 0;
//CHECK IF OBJECT DROPPED IS RECYCLABLE AND UPDATE POINTS
      function checkRecycling(){
        if(currentID.includes('trash')){
          points--;
          wrong++;
          checkWrong();
        }
        else if(currentID.includes('rec')){
          points++;
        }
        $('#points').text(points);
      };
//CHECK IF OBJECT DROPPED IS TRASH AND UPDATE POINTS
      function checkTrash(){
        if(currentID.includes('trash')){
          points++;
        }
        else if(currentID.includes('rec')){
          points--;
          wrong++;
          checkWrong();
        }
        $('#points').text(points);
      };

  //IF YOU GET 3 WRONG YOU DIE
  function checkWrong(){
    if (wrong == 3){
      var playAgain = confirm("You died - press Ok to play again");
      if(playAgain == true){
        clearInterval(timerInt);
        popup();
        $('#game-container').empty();
        points = 0;
        display.text('0');
    
       
      }
    }
  }

  //RECYLING BIN DROP
      $( "#recycling-bin" ).droppable({
        classes: {
          'ui-droppable-hover': 'hover'
        },
    
        drop: function(event, ui){
          currentID = ui.draggable.attr('id');
          ui.draggable.hide();
          checkRecycling();
        }
       
      });
//TRASH BIN DROP
      $( "#trash-bin" ).droppable({
        classes: {
          'ui-droppable-hover': 'hover'
        },
    
        drop: function(event, ui){
          currentID = ui.draggable.attr('id');
          ui.draggable.hide();
          checkTrash();
        }
       
      });
    
    
      




