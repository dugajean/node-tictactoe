const Table = require('cli-table3');
const chalk = require('chalk');
const Choice = require('./choice');

class Matrix {
  choices = [new Array(3).fill(null), new Array(3).fill(null), new Array(3).fill(null)];

  addChoice(choice) {
    if (this.choices[choice.positionY][choice.positionX] instanceof Choice) {
      throw `This field was already picked by ${choice.player.name}`;
    }

    this.choices[choice.positionY][choice.positionX] = choice;
  }

  outputTable() {
    const table = new Table();

    this.choices.forEach(row => table.push(row.map(col => (col ? col.toString() : ' '))));

    console.log(table.toString());
  }

  checkWin() {
    const winMsg = name => {
      console.log(chalk.green(`Yay! ${name} has won the game!`));
      process.exit();
    };

    for (let i = 0; i < this.choices.length; i++) {
      if (
        this.choices[i][0] &&
        this.choices[i][1] &&
        this.choices[i][0].player.symbol === this.choices[i][1].player.symbol &&
        this.choices[i][2] &&
        this.choices[i][1].player.symbol === this.choices[i][2].player.symbol
      ) {
        winMsg(this.choices[i][0].player.name);
      }
    }

    for (let i = 0; i < this.choices.length; i++) {
      if (
        this.choices[0][i] &&
        this.choices[1][i] &&
        this.choices[0][i].player.symbol === this.choices[1][i].player.symbol &&
        this.choices[2][i] &&
        this.choices[1][i].player.symbol === this.choices[2][i].player.symbol
      ) {
        winMsg(this.choices[0][i].player.name);
      }
    }

    if (
      this.choices[0][0] &&
      this.choices[1][1] &&
      this.choices[0][0].player.symbol === this.choices[1][1].player.symbol &&
      this.choices[2][2] &&
      this.choices[1][1].player.symbol === this.choices[2][2].player.symbol
    ) {
      this.choices[0][0].player.symbol;
    }

    if (
      this.choices[0][2] &&
      this.choices[1][1] &&
      this.choices[0][2].player.symbol === this.choices[1][1].player.symbol &&
      this.choices[2][0] &&
      this.choices[1][1].player.symbol === this.choices[2][0].player.symbol
    ) {
      winMsg(this.choices[0][2].player.name);
    }

    return false;
  }
}

module.exports = Matrix;
