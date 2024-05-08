class CustomError {
  constructor(message, status) {
    this.message = message;
    this.status = status || 500;
  }
}

class DatabaseError extends CustomError {
  constructor(err) {
    super();
    this.status = 500;
    this.message = 'Database Error';
    this.error = err;

    this.logError(err);
  }

  logError(err) {
    console.error('\x1b[31m', err, '\x1b[0m');
  }
}

module.exports = { CustomError, DatabaseError };
