/*
1. make a box div
2. make it move with arrow keys(left and right)
3. make it move with the knob
4. create falling objects
5. make collisions
6. game logic
 */


$(function(){
  var objects = [];
  var counter = 0;
  var makeObject = function(){
    console.log('make object');
    var x = Math.random() * 500;
    console.log(x);

    /*
          var newObject = {
            xPos: x,
            yPos: 0,
            id: counter++,
          };
          objects.push(newObject);
          */
    $('#game_container').append("<div class='falling_object' id="+counter + " ></div>");
    $("#" + counter +"").css('left', x);
    $("#" +counter +"").css('top', 200);
    counter++;

  }
  var moveObjects = function(){
    $('.falling_object').each(function(index){
      var curTop = $(this).css('top');
      curTop = parseInt(curTop);
      $(this).css('top', curTop + 200);
    });
  }

  var checkBoundaries= function(){
    $('.falling_object').each(function(index){
      var curTop = $(this).css('top');
      var curLeft = $(this).css('left');
      curLeft = parseInt(curLeft);
      curTop = parseInt(curTop);
      var curBot = curTop + 50;
      console.log(curTop);
      var charLeft = $('#character').css('left');
      charLeft = parseInt(charLeft);
      if(curBot >= 500 && (curLeft >= charLeft && curLeft <= charLeft + 100)){
        // collision
        if (!$(this).hasClass('deleted')) {
          stopTimer(makeId);
          stopTimer(boundaryId);
          stopTimer(moveId);
        }

        
      }
      if(curTop >= 425){
        $("#"+index).fadeOut('fast');
        $('#'+index).addClass('deleted');
      }
    });
  }

  var stopTimer = function(timerId){
    clearInterval(timerId);
    timerId = undefined;
  }
  var makeId = setInterval(makeObject, 1000);
  var boundaryId = setInterval(checkBoundaries, 500);

  var moveId = setInterval(moveObjects, 500);

  $(".dial").knob({
      'change' : function (v) {

      // var currentPosition =$('#character').css('left');
      // currentPosition = parseInt(currentPosition);
      $('#character').css('left', v*10) }
  });
  $(window).on('keydown', function(e){
    var key = e.keyCode;
    if(key == 39){
      console.log('pressed right');
      var currentLeft = $('#character').css('left');
      currentLeft = parseInt(currentLeft);
      console.log('currentLeft: ', currentLeft );
      $('#character').css('left', currentLeft + 5);
    }
    if(key == 37){
      console.log('pressed left');
      var currentRight = $('#character').css('left');
      currentRight = parseInt(currentRight);
      console.log('currentRight: ', currentRight );
      $('#character').css('left', currentRight - 5);
    }
  });
});
