import {createServer} from 'http';

const server = createServer(function handler(req, res) { 
  fs.readFile('public/index.html', function (err, data) { 
    if (err) {
      res.writeHead(500);
      return res.end('Error loading socket.io.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

export {server}