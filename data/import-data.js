const fs = require('fs');

// READ JSON FILE
exports.coreData = JSON.parse(
  fs.readFileSync(`${__dirname}/core.json`, 'utf-8')
);

exports.techData = JSON.parse(
  fs.readFileSync(`${__dirname}/technical.json`, 'utf-8')
);

exports.designData = JSON.parse(
  fs.readFileSync(`${__dirname}/design.json`, 'utf-8')
);

exports.marketingData = JSON.parse(
  fs.readFileSync(`${__dirname}/marketing.json`, 'utf-8')
);

exports.socialData = JSON.parse(
  fs.readFileSync(`${__dirname}/social.json`, 'utf-8')
);

exports.eventsData = JSON.parse(
  fs.readFileSync(`${__dirname}/events.json`, 'utf-8')
);

exports.prData = JSON.parse(fs.readFileSync(`${__dirname}/pr.json`, 'utf-8'));
