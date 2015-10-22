/*
 * Requirements:
 *  A floor can be selected from the elevator panel.
 *  A visual cue is provided of which floor was selected.
 *  A visual cue is provided of the current floor.
 *  A visual cue is provided of the elevator's direction (up/down).
 *  The panel provides a visual cue when you have arrived at the selected floor.
 *  Selecting a button anchor does not navigate or change the URL.
 */

$(document).ready(function() {

  var floors = ['zero', 'one', 'two', 'three', 'four'];
  var currentFloor = 1;
  var destinationFloors = [];
  var selectedFloors = [];
  var intervalId;
  var moveTimeout;
  var multipleTimeout;

  $('.floorNumber').html(currentFloor);
  $('#container').addClass(floors[currentFloor] + 'Floor');

  $('button').click(function() {
    clearTimeout(moveTimeout);
    clearInterval(intervalId);
    clearTimeout(multipleTimeout);
    if ($(this).html() != currentFloor) {
      $(this).addClass('highlight');
      selectedFloors.push($(this).attr('id'));
      destinationFloors.push($(this).html());

      var elevator = function() {
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(function() {
          clearInterval(intervalId);
          intervalId = setInterval(function() {
            if (currentFloor < destinationFloors[0]) {
              $('.up').addClass('green');
              $('.down').removeClass('red');
              currentFloor++;
              $('#container').removeClass();
              $('#container').addClass(floors[currentFloor] + 'Floor');
              $('.floorNumber').html(currentFloor);
            }
            if (currentFloor > destinationFloors[0]) {
              $('.down').addClass('red');
              $('.up').removeClass('green');
              currentFloor--;
              $('#container').removeClass();
              $('#container').addClass(floors[currentFloor] + 'Floor');
              $('.floorNumber').html(currentFloor);
            }
            if (currentFloor == destinationFloors[0]) {
              $('#' + selectedFloors[0]).removeClass('highlight');
              $('.up').removeClass('green');
              $('.down').removeClass('red');
              destinationFloors.splice(0, 1);
              selectedFloors.splice(0, 1);
              if (!!destinationFloors[0]) {
                multipleTimeout = setTimeout(elevator, 2500);
              }
            }
          }, 2500);
        }, 2500);
      };
       elevator();
    }
  });
});