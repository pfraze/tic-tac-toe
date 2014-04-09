
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;

var pastMatches;
try { pastMatches = JSON.parse(localStorage.getItem('pastMatches')); }
catch (e) {}
if (!pastMatches) {
  pastMatches = [];
}

var historyHtml = '';
for (var i=0; i < pastMatches.length; i++) {
  historyHtml += pastMatches[i].winner + ' with '+pastMatches[i].win+'<br>';
}
$('#history').html(historyHtml);

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  var win = classifyWin();

  if (win) {
    $(document).trigger('game-win', { winner: currentPlayer, win: win });
  }
};

function classifyWin() {
  var winMap = {
    'top row': [0, 1, 2],
    'middle row': [3, 4, 5],
    'bottom row': [6, 7, 8],
    'left column': [0, 3, 6],
    'middle column': [1, 4, 7],
    'right column': [2, 5, 8],
    'top left to bottom right': [0, 4, 8],
    'top right to bottom left': [2, 4, 6]
  };

  for (var win in winMap) {
    var a = winMap[win][0];
    var b = winMap[win][1];
    var c = winMap[win][2];
    if (spaces[a] == spaces[b] && spaces[b] == spaces[c]) {
      return win;
    }
  }
  return false;
}

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();

  // Marks the space with the current player's name
  if (spaces[spaceNum]) return false;
  spaces[spaceNum] = currentPlayer;
  // Adds a class to elem so css can take care of the visuals
  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

  checkForWinner();
  setNextTurn();
});

$(document).on('game-win', function (e, details) {
  alert('Winner: '+details.winner+' with '+details.win);
  pastMatches.push(details);
  localStorage.setItem('pastMatches', JSON.stringify(pastMatches));
  document.location.reload();
});

// Start the game
setNextTurn();
