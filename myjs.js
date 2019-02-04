
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
   


  //RANDOM WHITE BOXES
    var i=0;
    var objArray=[];
    setInterval(function(){
      if(objArray.length <= 5){
     $('#game-container').append('<div class="square" id="square' + i + '"></div>');
     var obj = $('#square' + i).draggable({
      zIndex: 100
    });
     var width = $('#game-container').width();
      var height = $('#game-container').height();
     var left = Math.floor(Math.random() * width); 
      var top = Math.floor(Math.random() * height); 
      obj.css("left", left);
   obj.css("top", top); 
   objArray.push(obj);
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

