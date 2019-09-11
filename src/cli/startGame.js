const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');
const Choice = require('../field/choice');

const startGame = (matrix, players) => {
  let whoseTurn = 1;
  let turnColor = 'blue';

  const chosenFields = [];
  const fieldPrompt = async () => {
    const turn = await inquirer.prompt([
      {
        type: 'list',
        name: 'player_choice',
        message: chalk[turnColor](`Choose a field (Player ${whoseTurn} / ${players[whoseTurn].name}): `),
        choices: () =>
          Choice.possibleChoices
            .filter(field => !chosenFields.includes(field))
            .concat(chosenFields.filter(field => !Choice.possibleChoices.includes(field)))
            .map(field => field.toUpperCase())
      }
    ]);

    try {
      matrix.addChoice(new Choice(turn.player_choice, players[whoseTurn]));
      chosenFields.push(turn.player_choice.toLowerCase());
    } catch (err) {
      console.error(err);
    }

    whoseTurn = whoseTurn === 1 ? 2 : 1;
    turnColor = whoseTurn === 1 ? 'blue' : 'red';

    clear();

    matrix.outputTable();
    matrix.checkWin();

    fieldPrompt();
  };

  fieldPrompt();
};

module.exports = startGame;
