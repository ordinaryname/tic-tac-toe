function getUser() {
  let user = {};
  fetch('https://tictactoeplus.com:3001/users/me', {method: 'GET', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')})})
  .then(response => {})
  .then(data => {
    user = data;
  })
  .catch(error => console.log(error));
  return user;
}

function saveGame(gamePackage) {
  const game = `game=${JSON.stringify(gamePackage)}`;
  fetch('https://tictactoeplus.com:3001/users/game', {method: 'PUT', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')}), body: game})
  .then(response => {})
  .catch(error => console.log(error));
}

exports.user = getUser();
exports.saveGame = saveGame();
