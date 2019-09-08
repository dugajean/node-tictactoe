const inquirer = require('inquirer');
const Player = require('../player');

const makePlayers = async () => {
  const symbols = ['X', 'O'];

  const questions = [
    {
      type: 'input',
      name: 'p1_name',
      message: 'Enter name for Player 1:',
      validate: answer => !!answer
    },
    {
      type: 'list',
      name: 'p1_symbol',
      choices: symbols,
      message: 'Enter symbol for Player 1:'
    },
    {
      type: 'input',
      name: 'p2_name',
      message: 'Enter name for Player 2:',
      validate: (answer, answersHash) => !!answer && answer !== answersHash.p1_name
    },
    {
      type: 'list',
      name: 'p2_symbol',
      choices: answersHash => symbols.filter(symbol => symbol !== answersHash.p1_symbol),
      message: 'Enter symbol for Player 2:'
    }
  ];

  const players = {};
  const answers = await inquirer.prompt(questions);

  try {
    players[1] = new Player(answers.p1_name, answers.p1_symbol);
    players[2] = new Player(answers.p2_name, answers.p2_symbol);
  } catch (err) {
    console.error(err);
    return makePlayers();
  }

  return players;
};

module.exports = makePlayers;
