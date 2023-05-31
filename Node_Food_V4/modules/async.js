const array = [];
for (let i = 0; i < 100_000; i++) {
  const rnd = Math.floor(Math.random() * 100) + 1;
  array[i] = rnd;
}

console.log(array);

let sum = 0;
array.forEach((item) => {
  sum += item;
});
// cf)
// forEach 는 비동기 함수이므로 console.log 가 먼저 출력될 수 있다.
// 따라서 array 의 전체 합계임을 보장하지 못한다(호출 순서 보장 X).
console.log("합계:", sum);

sum = 0;
for (let i = 0; i < array.length; i++) {
  sum += array[i];
}
console.log("합계:", sum);

sum = 0;
for (let item of array) {
  sum += item;
}
console.log("합계:", sum);

/**
 * 비동기 실행
 * 일반적인 JS 코드(함수들)이 실행되는 방식
 */

// JS 이외의 동기식 프로그래밍에서는
// 다음의 코드가 순서대로 진행이 되고
// 정상적으로 변수들이 전달이 잘 될 것이다.

const 주문 = 커피주문받기();
const 커피 = 커피제조(주문);
const 커피컵 = 커피받기(커피);
const 결과 = 커피마시기(커피컵);

// JS 에서는 비동기적으로 실행되는 함수들이 매우 많다.
// 비동기함수에서 앞에서 실해오딘 결과를 다음 코드에서 사용하려고 할 때
// 다음과 같은 Callback 코드가 만들어진다.
// 이러한 현상을 Callback Hell 이라고 한다.
let result = 0;
{
  커피주문받기(),
    (주문) => {
      커피제조(주문),
        (커피) => {
          커피받기(커피),
            (커피컵) => {
              커피마시기(커피컵),
                (결과) => {
                  result = 결과;
                };
            };
        };
    };
}

{
  async () => {
    const 주문 = await 커피주문();
    const 커피 = await 커피제조(주문);
    const 포장 = await 커피받기(커피);
    const 결과 = await 커피마시기(포장);
    console.log("커피 다 마셨다", 결과);
  };
}
