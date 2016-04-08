/*
1. make a box div
2. make it move with arrow keys(left and right)
3. make it move with the knob
4. create falling objects
5. make collisions
6. game logic
 */
$(function(){
//  $(".dial").knob();
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
