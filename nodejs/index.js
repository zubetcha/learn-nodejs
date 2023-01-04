// node의 기본 모듈인 http를 불러와서 http라는 변수에 할당
const http = require('node:http');

// 서버의 주소를 호스트네임 이라고 함
const hostname = '127.0.0.1';
// 내 컴퓨터의 수많은 포트 번호 중 어떤 포트를 서버로 열 건지
const port = 3000;

// req: 클라이언트의 요청에 대한 정보를 가지고 있는 객체
const server = http.createServer((req, res) => {
  // 클라이언트 요청의 경로에 따라 분기처리 해서 응답 보내기

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  }

  if (req.url === '/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('User list\n');
  }

  if (req.url !== '/') {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

// listen(포트 번호, 호스트네임(컴퓨터 이름), callback)
// 서버를 요청 대기 상태로 만들어주는 함수
// callback: listen이 완료되면 호출되는 함수
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
