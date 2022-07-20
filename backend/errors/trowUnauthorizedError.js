class TrowUnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'trowUnauthorizedError';
    this.statusCode = 401;
  }
}

module.exports = { TrowUnauthorizedError };
