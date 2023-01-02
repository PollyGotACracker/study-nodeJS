/**
 * 배열 선언 시
 * 실제 데이터가 저장된 기억장소 / 배열의 이름이 저장된 기억장소 2개가 만들어진다.
 * 이러한 배열을 다른 배열에 복사(할당, 저장)하면
 * 실제 데이터가 복사되는 게 아니고, 데이터가 저장된 주소만 복사된다.
 * 이때 복제된 배열의 데이터를 변경하면, 원본 배열의 데이터가 변경된다.
 * 이 현상을 배열의 "얕은 복사" 라고 한다.
 */
// 배열 선언
const arr1 = [1, 2, 3, 4, 5];
// arr2 를 arr1 으로 복사
const arr2 = arr1;
// 두 배열을 출력하기
console.log(arr1, arr2);
// [ 1, 2, 3, 4, 5 ] [ 1, 2, 3, 4, 5 ]
arr2[2] = 100;
console.log(arr1, arr2);
// [ 1, 2, 100, 4, 5 ] [ 1, 2, 100, 4, 5 ]

/**
 * JS 객체 선언 시
 * 실제 데이터가 저장된 기억장소 / 기억장소의 주소를 저장하는 곳 2가지가 생성된다.
 * 만약 JS 객체를 다른 변수로 복제를 하면
 * 실제 데이터가 아닌 주소만 복제된다.
 *
 * 복제된 두 객체는 같은 데이터를 바라보고 있기 때문에
 * 한 객체의 요소 데이터를 변경하면
 * 다른 객체의 요소도 변경된다.
 */
// JSON 객체를 만들고
const obj1 = { name: "홍길동", age: 22 };
// 객체를 다른 객체로 복제
const obj2 = obj1;
console.log(obj1, obj2);
// { name: '홍길동', age: 22 } { name: '홍길동', age: 22 }
obj2.age = 100;
console.log(obj1, obj2);
// { name: '홍길동', age: 100 } { name: '홍길동', age: 100 }

const makeArra = (array) => {
  for (let i = 0; i < 10; i++) {
    array[i] = 10;
  }
};
const myArray = [];
makeArra(myArray);
console.log(myArray);
// [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ]

/**
 * cf)
 * call by value (함수에서 값 복사)
 *      인자로 전달된 변수를 함수의 매개변수에 복사하여 원본 변수에 영향을 미치지 않음
 * call by reference (함수에서 주소값 복사)
 *      전자와 다르게 원본 변수의 값도 변하게 됨
 *      call by reference 는 포인터를 사용하는 C, C++ 만 가능
 */

// 만약 call by reference 가 적용된다면
// array 는 길이가 100인 array 가 될 것이다.
const makeArra2 = (array) => {
  array = Array(100);
};
const myArray2 = [];
makeArra2(myArray2);
console.log(myArray2);
// []
