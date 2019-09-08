const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');
const Choice = require('../field/choice');

const startGame = (matrix, players) => {
  let playerTurn = 1;
  let playerColor = 'blue';

  const chosenFields = [];
  const fieldPrompt = async () => {
    const field = await inquirer.prompt([
      {
        type: 'list',
        name: 'player_choice',
        message: chalk[playerColor](`Choose a field (Player ${playerTurn} / ${players[playerTurn].name}): `),
        choices: () =>
          Choice.possibleChoices
            .filter(field => !chosenFields.includes(field))
            .concat(chosenFields.filter(field => !Choice.possibleChoices.includes(field)))
            .map(field => field.toUpperCase())
      }
    ]);

    try {
      matrix.addChoice(new Choice(field.player_choice, players[playerTurn]));
      chosenFields.push(field.player_choice.toLowerCase());
    } catch (err) {
      console.error(err);
    }

    playerTurn = playerTurn === 1 ? 2 : 1;
    playerColor = playerTurn === 1 ? 'blue' : 'red';

    clear();

    matrix.outputTable();
    matrix.checkWin();

    fieldPrompt();
  };

  fieldPrompt();
};

module.exports = startGame;
