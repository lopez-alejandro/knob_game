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
  var isAlive = true;
  var makeId = 0;
  var boundaryId = 0;
  var moveId = 0;
  var scoreId = 0;
  var currentScore = 0;

  if(sessionStorage.getItem('newUser') == null){
    // new user, display welcome message and instructions
    $('#game_container').append('<h1>Welcome!</h1><h1>Put your mouse over the circle one the right and scroll to move Taylor</h1>');
    sessionStorage.setItem('newUser', true);
  }



  var makeObject = function(){
    var width = $('#game_container').width();
    width = parseInt(width);

    var x = Math.random() * width;

    /*
          var newObject = {
            xPos: x,
            yPos: 0,
            id: counter++,
          };
          objects.push(newObject);
          */
    $('#game_container').append("<div class='falling_object' id="+counter + " ><img src='images/kanye_1.png' style='width: 25px;'></div>");
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

      var charLeft = $('#character').css('left');
      charLeft = parseInt(charLeft);
      if(curBot >= 500 && (curLeft >= charLeft && curLeft <= charLeft + 100)){
        // collision
        if (!$(this).hasClass('deleted')) {
          // stop the game now
          stopGame();
        }


      }
      if(curBot >= 500){
        $("#"+index).fadeOut('fast');
        $('#'+index).addClass('deleted');
      }
    });

  }

  var increaseScore = function(){
    currentScore++;

    $('#current_score').html('<p>' + currentScore + '</p>');
  }


  var stopTimer = function(timerId){
    clearInterval(timerId);
    timerId = undefined;
  }

  var stopAllTimers = function(){
    stopTimer(makeId);
    stopTimer(boundaryId);
    stopTimer(moveId);
    stopTimer(scoreId);
  }


  var startAllTimers = function(){
    makeId = setInterval(makeObject, 1000);
    boundaryId = setInterval(checkBoundaries, 20);
    moveId = setInterval(moveObjects, 500);
    scoreId = setInterval(increaseScore, 1000);
  }


  $(".dial").knob({
      'change' : function (v) {

      // var currentPosition =$('#character').css('left');
      // currentPosition = parseInt(currentPosition);
      if(isAlive){
        $('#character').css('left', v*10) }
      }
  });

  var clearObjects = function() {
    $('.falling_object').remove();
  }

  var stopGame = function(){
    isAlive = false;
    stopAllTimers();
    clearObjects();
    console.log("current high score: ", localStorage.getItem('highScore'));
    if(localStorage.getItem('highScore') !== null){
      if(localStorage.getItem('highScore') < currentScore){
        localStorage.setItem('highScore', currentScore);
      }
    }else {
      console.log("set high score for first time");
      localStorage.setItem('highScore', currentScore);
    }
    $('#control_div').find('p').html("High Score: " + localStorage.getItem('highScore'));
    $('#control').prop('disabled',true);
  }

  var restartGame = function(){
    isAlive = true;
    currentScore = 0;
    $('#current_score').html('<p>' + currentScore + '</p>');
    stopAllTimers();
    clearObjects();
    startAllTimers();
    $('#control').prop('value', '25');
    $('#control').prop('data-readOnly',false);

  }

  $('#game_button').click(function(){
    restartGame();

  });
  /*
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
  */
});
