// * Express.js의 Middleware


// Middleware 란?
// 미들웨어는 Express.js 동작의 핵심
// HTTP 요청과 응답 사이에서 단계별 동작을 수행해주는 함수

// Middleware 동작 원리
// Express.js의 미들 웨어는 HTTP 요청이 들어온 순간부터 시작이 됨
// 미들웨어는 HTTP 요청과 응답 객체를 처리하거나, 다음 미들웨어를 실행할 수 있음
// HTTP 응답이 마무리될 때 까지 미들웨어 동작 사이클이 실행 됨


// 