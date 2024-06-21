const whoiss = require('whois');

const whois = async (domain) => {
domain = domain.replace(/^https?:\/\//, '');
whoiss.lookup(domain, (err, data) => {
if (err) {
console.log(err.message)
return err
} else {
return data
}
});
}

module.exports = { whois };
