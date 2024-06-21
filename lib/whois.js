const whois = require('whois');

const whois = async (domain) => {
domain = domain.replace(/^https?:\/\//, '');
whois.lookup(domain, (err, data) => {
if (err) {
console.log(err.message);
return err.message
} else {
return data
}
});
}
