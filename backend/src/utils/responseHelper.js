class ResponseHelper {
    static success(message, data) {
        return {
            statusCode: 200,
            message,
            data
        };
    }

    static error(message, error = null, statusCode = 400) {
        return {
            statusCode,
            message,
            error
        };
    }
}

module.exports = ResponseHelper;
