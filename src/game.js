const Matrix = require('./field/matrix');
const startGame = require('./cli/startGame');
const makePlayers = require('./cli/makePlayers');

(async () => startGame(new Matrix(), await makePlayers()))();
