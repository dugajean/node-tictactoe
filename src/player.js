class Player {
  name;
  symbol;

  constructor(name, symbol, order) {
    this.name = name;
    this.symbol = this.validateSymbol(symbol);
  }

  validateSymbol(symbol) {
    if (!['x', 'o'].includes(symbol.toLowerCase())) {
      throw 'You have chosen an invalid symbol. Choose either X or O.';
    }

    return symbol;
  }
}

module.exports = Player;
