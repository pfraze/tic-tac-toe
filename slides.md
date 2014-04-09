title: Local Storage Workshop - Makersquare
author:
  name: Paul Frazee
  twitter: pfrazee
output: index.html
controls: true

--

# Local Storage!
## Save data in the user's browser

--

### Saving data on the Web

Submit form or make an Ajax call (usually POST).

```javascript
$.post("bob/messages", { to: "alice", message: "Hi!" });
```

Takes 50-300ms, requires a Webservice, not private, can fail. (Still handy.)

--

### But if the data...

* Doesn't need to be shared
* Can live on one device
* Is private, but not scary private

There's Local Storage!

--

### How does it work?

To set/get/remove:

```javascript
localStorage.setItem('name', 'Ed');
localStorage.getItem('name'); // => 'Ed'
localStorage.removeItem('name');
```

To iterate the entries:

```javascript
for (var i=0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  localStorage.getItem(key);
}
```

--

### What are the rules?

* Can only read items in app's origin
* Only 5MB of space per-origin
* Values must be strings

--

### What about non-string values?

Easy: use JSON

```javascript
localStorage.setItem('user', JSON.stringify({ name: 'Ed' }));

var user = localStorage.getItem('user');
try { user = JSON.parse(user); }
catch(e) { user = null; }

console.log(user.name); // => 'Ed'
```

--

### Also, there's Session Storage

```javascript
sessionStorage.setItem('name', 'Ray');
sessionStorage.getItem('name'); // => 'Ray'
```

Exactly like Local Storage, but clears out when the session ends. 

"A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated."

--

### Tracking wins in Tic-Tac-Toe

```javascript
var player1Wins = localStorage.getItem('player1Wins') || 0;
var player2Wins = localStorage.getItem('player2Wins') || 0;
$('#history').html(
   '<strong>Player1</strong>: '+player1Wins+'<br>'
  +'<strong>Player2</strong>: '+player2Wins
);
```

```javascript
$(document).on('game-win', function (e, winner) {
  if (winner == player1) {
    player1Wins++;
    localStorage.setItem('player1Wins', player1Wins);
  } else if (winner == player2) {
    player2Wins++;
    localStorage.setItem('player2Wins', player2Wins);
  }
  document.location.reload();
});
```

--

### Tracking game history?

Clone https://github.com/pfraze/tic-tac-toe

Tasks:
* Describe the win ("top row", "middle column")
* Load and draw past wins
* Save new wins

Finish early? Now redraw past boards