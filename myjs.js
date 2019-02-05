
$(document).ready(function(){

 //POPUP INSTRUCTIONS BOX
      $( function() {
        $( "#dialog-message" ).dialog({
          modal: true,
          buttons: {
            Start: function() {
              $( this ).dialog( "close" );
            }
          }
        });
      } );
   
// COUNTDOWN TIMER
      function startTimer(duration, display) {
        //var timer = duration, minutes, seconds;
        var timer = duration, seconds;
        var timerInt = setInterval(function () {
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
    
    $(function(){
        //var fiveMinutes = 60 * 5,
        var thirtysecs = 30;
            display = $('#time');
        startTimer(thirtysecs, display);
    });


  //RANDOM TRASH
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
      if(myObj.length <= 5){
     //$('#game-container').append('<div class="square" id="square' + i + '"></div>');
     var trash = trashArray[Math.floor(Math.random() * trashArray.length)];
     $('#game-container').append('<div class="trash-img" id="square' + i + '"><img src="'+trash.image+'"></div>');
     var obj = $('#square' + i).draggable({
      zIndex: 100
    });
     var width = $('#game-container').width();
      var height = $('#game-container').height();
     //var left = Math.floor(Math.random() * (width+20 - 20) + 1); 
     var left = Math.floor(Math.random() * width);
      var top = Math.floor(Math.random() * (height+100 - 300 + 1)+300); 
      obj.css("left", left);
      obj.css("top", top); 
   myObj.push(obj);
   i +=1;
  }
  },1000);

    
      $( ".dump-img" ).droppable({
        classes: {
          'ui-droppable-hover': 'hover'
        },
    
        drop: function(event, ui){
          ui.draggable.hide();
        }
       
      });
    
      


});

