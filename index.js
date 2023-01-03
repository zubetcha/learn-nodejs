// node의 기본 모듈인 http를 불러와서 http라는 변수에 할당
const http = require('node:http');

// 내 컴퓨터
const hostname = '127.0.0.1';
// 포트
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
