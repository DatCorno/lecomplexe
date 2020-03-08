class Util {
  send(res, status, message, code, data) {
    var result = {
        status: status,
        message: message,
    };

    if (status === 'success' && data !== undefined)
        result['data'] = data

    return res.status(code).json(result);
  }
}

export default new Util()
