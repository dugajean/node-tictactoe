class Choice {
  static xAxisMap = {
    1: 0,
    2: 1,
    3: 2
  };

  static yAxisMap = {
    a: 0,
    b: 1,
    c: 2
  };

  static possibleChoices = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

  positionY;
  positionX;

  player;
  rawPosition;

  constructor(rawPosition, player) {
    this.player = player;
    this.rawPosition = rawPosition;

    [this.positionY, this.positionX] = this.parse();
  }

  parse() {
    if (!Choice.possibleChoices.includes(this.rawPosition.toLowerCase())) {
      throw 'You have made an invalid choice. Try again buddy!';
    }

    const [y, x] = this.rawPosition.toLowerCase().split('');

    return [Choice.yAxisMap[y], Choice.xAxisMap[x]];
  }

  toString() {
    return this.player.symbol;
  }
}

module.exports = Choice;
