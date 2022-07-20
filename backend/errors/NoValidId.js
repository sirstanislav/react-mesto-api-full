class NoValidId extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoValidId';
    this.statusCode = 404;
  }
}

module.exports = { NoValidId };
