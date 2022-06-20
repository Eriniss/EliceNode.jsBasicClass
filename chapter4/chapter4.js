// * Express.js의 Middleware


// Middleware 란?
// 미들웨어는 Express.js 동작의 핵심
// HTTP 요청과 응답 사이에서 단계별 동작을 수행해주는 함수


// Middleware 동작 원리
// Express.js의 미들 웨어는 HTTP 요청이 들어온 순간부터 시작이 됨
// 미들웨어는 HTTP 요청과 응답 객체를 처리하거나, 다음 미들웨어를 실행할 수 있음
// HTTP 응답이 마무리될 때 까지 미들웨어 동작 사이클이 실행 됨


// * Middleware의 작성과 사용


// req, res, next를 가진 함수를 작성하면 해당 함수는 미들웨어로 동작할 수 있음


// Route Handler도 미들웨어의 한 종류
// Route Handler는 라우팅 함수(get, post, put, delete 등)에 적용된 미들웨어
// 일반적인 미들웨어와는 다르게 path parameter를 사용할 수 있음


// Middleware 작성법

{
  const logger = (req, res, next) => {
    console.log('Request ${req.path}');
  }

  const auth = (req, res, next) => {
    if (!isAdmin(req)) {
      res.send("Not Authorized");
      return;
    }
    next();
  }
}
// req, res, next를 인자로 갖는 함수 작성
// req, res 객체로 HTTP 요청과 응담을, next 함수를 통해 다음 미들웨어를 호출
// next()함수가 호출되지 않으면 미들웨어 사이클이 멈추기 때문에 주의


// Middlaware 사용법
// Middleware는 적용되는 위치에 따라서 어플리케이션 미들웨어, 라우터 미들웨어, 오류처리 미들웨어로 분류 가능
// 필요한 동작 방식에 따라 미들웨어를 적용할 위치를 결정


// Middleware 사용법 - 어플리케이션 미들웨어
{
  app.use((req, res, next) => {
    console.log(('Request ${req.path}'));
    next();
  });

  app.use(auth);

  app.get('/', (req, res, next) => {
    res.send("Hello Express");
  });
}
// usesk http method 함수를 사용하여 미들웨어를 연결할 수 있음
// 미들웨어를 모든 요청에 공통적으로 적용하기 위한 방법
// HTTP 요청이 들어온 순간부터 적용된 순서대로 동작 함


// Middleware 사용법 - 라우터 미들웨어
{
  router.use(auth);

  router.get('/', (req, res, next) => {
    res.send('Hello Router');
  });

  app.use((req, res, next) => {
    console.log('Request ${req.path}');
    next();
  });

  app.use('/admin', router);
}
// router 객체에 미들웨어가 적용되는 것 외에는 어플리케이션 미들웨어와 사용방법은 동일
// 특정 경로의 라우팅에만 미들웨어를 적용하기 위한 방법
// app 객체에 라우터가 적용 된 이후로 순서대로 동작 함


// Middleware 사용법 - 미들웨어 서브스택
{
  app.use(middleware1, middleware2, etc);

  app.use('/admin', auth, adminRouter);
  
  app.get('/', logger, (req, res, next) => {
    res.send('Hello Express');
  });
}
// use나 http method 함수에 여러개의 미들웨어를 동시에 적용할 수 있음
// 주로 한개의 경로에 특정해서 미들웨어를 적용하기 위해 사용
// 전달된 인자의 순서 순으로 동작


// 오류처리 미들웨어
// 오류처리 미들웨어는 일반적으로 가장 마지막에 위치하는 미들웨어
// 다른 미들웨어들과는 달리 err, req, res, next 네가지 인자를 가지며 앞선 미들웨어에서 next 함수에 인자가 전달되면 실행됨
{
  app.use((err, req, res, next) => {
    res.send('Error Occurred');
  })
}


// 함수형 Middleware
{
  const auth = (memberType) => {
    return (req, res, next) => {
      if (!checkMember(req, memberType)) {
        next(new Error('member not ${memberType}'));
        return;
      }
      next();
    }
  }

  app.use('/admin', auth('admin'), adminRouter);

  app.use('/users', auth('member'), userRouter);
}
// auth 함수는 미들웨어 함수를 반환하는 함수
// auth 함수 실행 시 미들웨어의 동작이 결정되는 방식으로 작성 됨
// 일반적으로 동일한 로직에 설정 값만 다르게 미들웨어를 사용하고 싶을 경우에 활용 됨


// Middleware Libraries
// Express.js는 다양한 미들웨어들이 이미 만들어져 라이브러리로 제공됨
// 유용한 미들웨어를 npm을 통해 추가하여 사용할 수 있음
// Express.js 홈페이지나 npm 온라인 저장소에서 찾아볼 수 있음


// Middleware 요약
// 미들웨어는 HTTP 요청과 응답 사이에서 동작하는 함수
// req, res, next를 인자로 갖는 함수는 미들웨어로 동작할 수 있음
// app 혹은 router 객체에 연결해서 사용 가능
// next에 인자를 넘기는 경우 오류처리 미들웨어가 실행 됨
// 미들웨어에 값을 설정하고 싶은 경우는 함수형 미들웨어로 작성 가능


// * REST API


// API란?
// 서비스나 프로그램 간에 미리 정해진 기능을 실행할 수 있도록 하는 규약


// REST란?
// 웹에서 자료를 전송하기 위한 표현 방법에 대한 아키텍쳐
// REST를 정확하게 구현하기 위해선 많은 제한조건이 있지만 기본적인 REST 가이드를 따르면 조금 더 좋은 구조의 API를 구성할 수 있음


// REST AIP 기본 가이드 - HTTP method
// REST API는 API의 동작을 HTTP method + 명사형 URL로 표현함
// /post라는 URL은 '게시글' 이라는 자원을 가리킨다고 할때 GET(취득), POST(생성), PUT(수정), DELETE(삭제)의 HTTP method와 결합하여 API 동작을 정의하여야 함


// REST AIP 기본 가이드 - URL 표현법
// REST AIP URL의 자원은 복수형으로 표현되며 하나의 자원에 대한 접근은 복수형 + 아이디를 통해 특정 자원에 접근
// /post는 '게시글 전체' 를 칭하는 URL 이라고 할떄 /post/1은 '1번 게시글' 이라는 자원을 표현함


// REST AIP 기본 가이드 - 계층적 자원
// REST API는 ARL을 통해 자원을 계층적으로 표현함
// /users/1/posts라는 URL은 '1번 유저의 게시글 전체' 라는 자원을 나타냄


// REST API 정리
// REST API는 REST 아키텍쳐를 준수하는 웹 API를 의미함
// URL을 통한 자원의 표현 방법과, HTTP method를 통한 API 동작의 정의 정도만 사용해도 훌륭한 REST API를 구현할 수 있음


// * JSON


// JSON이란?
// 자바스크립트에서 객체를 표현하는 표현식으로 시작함
// 데이터를 표현하는 방법이 단순하고 이해하기 쉬워서 웹 API에서 데이터를 전송할 떄 표현식으로 주로 사용됨


// JSON을 사용하는 이유
// 웹 API는 기본적으로 데이터를 문자열로 전송하게 됨
// 어떤 객체를 웹 API를 통해서 문자열로 전달하기 위해 JSON을 사용함

// JSON 사용방법
{
  [
    { "name": "cat", "legs": 4 },
    { "name": "chicken", "name": 2},
  ]
}
// JSON에서 Oject는 { "key": value }로 표현함
// value에는 어떤 값이라도 사용될 수 있음

// JSON 에서 Array는 [item1, item2]로 표현함
// item에는 어떤 값이라도 사용될 수 있음


