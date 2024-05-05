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
    this.message =
      this.getDatabaseErrorMessage(err.original) || 'Database Error';
    this.detail = err.original.detail;
    this.original = err.original;
  }

  getDatabaseErrorMessage(original) {
    if (
      original &&
      original.detail &&
      original.detail.includes('already exists')
    ) {
      return 'Unable to create user. Please try again later.';
    }
    return null;
  }
}

module.exports = { CustomError, DatabaseError };
