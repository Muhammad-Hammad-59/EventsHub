 
export class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
  }
  
  export class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthorizationError';
      this.statusCode = 403;
    }
  }
  
  export class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  }
  
  export class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthenticationError';
      this.statusCode = 401;
    }
  }

//   export class CustomError extends Error {
//     constructor(message, statusCode = 500,metadata = {}) {
//       super(message);
//       this.name = "CustomError";
//       this.statusCode = statusCode;
//     }
//   }

export class CustomError extends Error {
    constructor(message, statusCode = 500, metadata = {}) {
      super(message);
      this.statusCode = statusCode;
      this.metadata = metadata;
      this.name = 'CustomError'; // Explicitly set name
    }
  }