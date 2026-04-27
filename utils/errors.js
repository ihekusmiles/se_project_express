const BAD_REQUEST = 400; // For invalid data
const UNAUTHORIZED_ERROR = 401; // lacks valid authentication credentials
const NOT_FOUND = 404; // For items not found
const CONFLICT_ERROR = 409; // For duplicated emails
const INTERNAL_SERVER_ERROR = 500; // For server error

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED_ERROR,
  NOT_FOUND,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
};
