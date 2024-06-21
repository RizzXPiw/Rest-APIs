const whoiss = require('whois');
const { promisify } = require('util');

const lookup = promisify(whoiss.lookup);

const whois = async (domain) => {
    try {
        domain = domain.replace(/^https?:\/\//, '');
        const data = await lookup(domain);
        return data;
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
};

module.exports = { whois };
