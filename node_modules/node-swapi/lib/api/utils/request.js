const http = require('http');

module.exports = (uri) => {
    
  return new Promise((resolve, reject) => {

    http.get(uri, (response) => {
      let body = '';
      
      response.on('data', (chunk) => {
          body += chunk;
      });

      response.on('end', () => {

        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch(e) {
          reject('Parsing error: ' + e.message);
        }

      });

    }).on('error', (e) => {
      reject('Request error: ' + e.message);
    });
  });
};
