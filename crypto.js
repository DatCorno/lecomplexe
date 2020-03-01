const clib = require('crypto')

var crypto = {}

crypto.getSalt = (length) => {
    return clib.randomBytes(Math.ceil(length / 2)).toString().slice(0, length)
};

crypto.hash = (password, salt) => {
    var hash = clib.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};

module.exports = crypto;
