// * Node.js란?


// Node.js는 싱글 쓰레드이기 때문에 비동기 동작이 펼요하고 비동기 동작을 구현하기 위해 이벤트 기반의 동작방식을 사용


// * ES6


// ES6는 ECMAScript 버전6 이후를 통틀어 일반적으로 ES6 라고 부름
// ES6는 현대적인 문법으로 생산성 향상에 도움을 줌


// * 비동기 코딩


// 비동기 - 이벤트 동작을 코드로 구현하는 방법
// Node.js 에서 비동기 동작을 구현하는 세가지 방식


// Callback, Promise, Async - Await

// callback 방식
{
  db.getUsers((err, users) => {
    console.log(users);
  })
}


// Promise 방식
{
  db.getUsersPromise()
    .then((users) => {
      return promise1(users);
    })
    .then(r1 => promise2(r1)) // 인자가 하나인 경우 괄호 생략 가능
    .catch(err)
}


// Async/Await 방식
{
  async function doSomething() => {
    const r1 = await promise1();
    const r2 = await promise2(r1);
    const r3 = await promise3(r1, r2);
    
    return r3;
  }
}


// try...catch
{
  async function doSomething(msg) {
    try {
      const r = await promise1();
      console.log(r);
    } catch(e) {
      console.error(e);
    }
  }
}

// Promise.all
// promise1과 promise2는 각각 1초, 2초가 소요되는 비동기 함수
{
  async function sync() {
    const r1 = await promise1;
    const r2 = await promise2;
    console.log(r1, r2); // 3초 소요
  }

  async function sync() {
    const [r1, r2] = Promise.all([
      promise1(),
      promise2(),
    ]);
    console.log(r1, r2); // 2초 소요
  }
}
// promise1과 promise2를 동시에 실행시키고 등록된 함수가 마무리되면 결과값을 한꺼번에 반환


// async/await가 가장 지향되는 방식
// 하지만 특정 상황에 따라 사용되는 방식이 다름으로 모두 숙지


// * 이벤트 루프


// 이벤트 루프는 Node.js만의 특징은 아님
// JavaScript의 일반적인 동작 방식으로, 브라우저에도 있음
// 브라우저와 Node.js의 이벤트 루프는 기본적인 동작방식에 큰 차이가 없음
// 이벤트루프의 기본적인 동작 원리를 이해하는것이 중요


// 이벤트루프는 비동기 동작의 실행 타이밍을 이해하는 것이 중요
// setTimeout은 콜스택이 비어있을 때 실행됨
// Promise는 상위함수가 종료되기 전에 실행됨