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
    this.message = err.errors[0].message || 'Database Error';
    this.detail = err.original.detail;
    this.original = err.original;
  }
}

module.exports = { CustomError, DatabaseError };
