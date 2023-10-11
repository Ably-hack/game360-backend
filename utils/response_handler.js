class ResponseHandler {
    static sendResponseWithData(res, code, message, data) {
        return res.status(code)
            .send({
                statusCode: code,
                message: message,
                data: data
            });
    }

    static sendResponseWithoutData(res, code, message) {
        return res.status(code).send({ statusCode: code, message: message });
    }
    static sendErrorResponse(res, code, error) {
        return res.status(code).send({ statusCode: code, error: error });
    }
}

export default ResponseHandler;