/* 함수 타입 정의 */

// 함수를 설명하는 가장 좋은 방법
// 어떤 매개변수를 받고, 어떤 결과값을 반환하는지 이야기
// 어떤 [타입의] 매개변수를 받고, 어떤 [타입의] 결과값을 반환하는지 이야기 
function func(a:number, b:number){
    return a+b;
}

/* 화살표 함수의 타입을 정의하는 방법 */

const add = (a:number, b:number) => a+b;

/* 함수의 매개변수 */
// 선택적 매개변수는 필수 매개변수 뒤에 와야 함!
function introduce(name="김소정", age: number, tall?: number){
    console.log(`name: ${name}`)
    if (typeof tall === "number"){
        console.log(`tall: ${tall + 10}`);
    }
}

introduce("김소정", 24, 160);

function getSum(...rest : [number, number, number]){
    let sum = 0;
    rest.forEach((it) => (sum += it));
    return sum;
}

getSum(1, 2, 3)
// getSum(1, 2, 3, 4, 5) -> 개수가 정해져 있기 때문에 에러.

/* 함수 타입 표현식과 호출 시그니처
- 함수의 타입을 별도로 정의하는 방법 */

type Operation = (a: number, b: number) => number;

const add1: Operation = (a, b) => a+b; 
const sub: Operation = (a, b) => a-b;
const multiply: Operation = (a, b) => a*b;
const divide: Operation = (a, b) => a/b;

/* 호출 시그니처 (콜 시그니처) */

type Operation2 = { //객체 형식으로 작성
    (a: number, b: number): number;
    //아래까지 추가하면 '하이브리드 타입'
    name : string;
}

const add2: Operation = (a, b) => a+b; 
const sub2: Operation = (a, b) => a-b;
const multiply2: Operation = (a, b) => a*b;
const divide2: Operation = (a, b) => a/b;

add2(1, 2);
add2.name; //하이브리드 타입으로 하면 객체 타입으로 호출 가능


/* 함수 타입의 호환성
- 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는
- 1. 반환값의 타입이 호환되는가?
- 2. 매개변수의 타입이 호환되는가?
*/

// 기준 1. 반환값이 호환되는가?

type A = () => number;
type B = () => 10;

let a:A = () => 10;
let b:B = () => 10;

// 업캐스팅 가능O
// 넘버 리터럴 타입인 b가 넘버 타입은 a를 가질 수 있음.
a=b;
// 다운캐스팅 가능X
// 넘버 타입인 a가 넘버 리터릴 타입인 b를 가질 수 없음.
// b=a; 

// 기준 2. 매개변수의 타입이 호환되는가?

// 2-1. 매개변수의 개수가 같을 때
type C = (value : number) => void; 
type D = (value : 10) => void;

let c:C =(value) => {};
let d:D =(value) => {};

// 업캐스팅 가능X
// 넘버 리터럴 타입인 b가 넘버 타입은 a를 가질 수 없음.
//c=d;
// 다운캐스팅 가능X
// 넘버 타입인 a가 넘버 리터릴 타입인 b를 가질 수 없음.
d=c;

type Animal = {
    name : string;
};

type Dog = {
    name : string;
    color : string;
};

let animalFunc = (animal:Animal) => {
    console.log(animal.name);
}

let dogFunc = (dog:Dog) => {
    console.log(dog.name);
    console.log(dog.color);
}


// animalFunc = dogFunc;
// animalFunc가 슈퍼타입, dogFunc가 서브타입 -> 업캐스팅X

let testFunc = (animal:Animal) => {
    // console.log(animal.color);
    // animal 안에 color 속성 없기 때문에 업캐스팅 안됨.
}

dogFunc = animalFunc;

let testFunc2 = (dog:Dog) => {
    console.log(dog.color);
    // dog 안에 모든 프로퍼티 다 있기 때문에 가능.
}

// 2-2. 매개변수의 개수가 다를 때 (둘 타입이 같아야함.)
type Func1 = (a: number, b: number) => void; 
type Func2 = (a: number) => void;

let func1:Func1 = (a,b) => {};
let func2:Func2 = (a) => {};

func1 = func2; // 매개변수의 개수가 더 적은 func2가 매개변수의 개수가 더 많은 func1 할당받음.
//func2 = func1; 

/* 함수 오버로딩
- 하나의 함수를 매개변수의 개수나 타입에 따라 여러가지 버전으로 정의하는 방법 
-> 하나의 함수 func
-> 모든 매개변수의 타입 number
-> Ver.1 매개변수가 1개 : 이 매개변수에 20을 곱한 값 출력
-> Ver.2 매개변수가 3개 : 이 매개변수들을 다 더한 값을 출력*/

// 버전들 -> 오버로드 시그니처
function funcc(a: number): void;
function funcc(a: number, b: number, c:number): void;

// 실제 구현부 -> 구현 시그니처
function funcc(a: number, b?:number, c?:number) {
    if (typeof b === 'number' && typeof c === 'number'){
        console.log(a+b+c);
    } else{
        console.log(a*20);
    }
}

// 오버로드 시그니처에 맞게 실행
funcc(1);
funcc(1, 2, 3);


/* 사용자 정의 타입 가드 */

type Dog1 = {
    name : string;
    isBark : boolean;
};

type Cat1 = {
    name : string;
    isScratch : boolean;
};

type Animal1 = Dog1 | Cat1;

// Dog 타입인지 판단하는 함수 새로 작성

function isDog1 (animal: Animal) : animal is Dog1 {
    // isBark 프로퍼티가 있다면 animal을 Dog1 타입으로 좁혀라.
    return (animal as Dog1).isBark !== undefined;
}

function isCat1 (animal: Animal) : animal is Cat1 {
    // isBark 프로퍼티가 있다면 animal을 Dog1 타입으로 좁혀라.
    return (animal as Cat1).isScratch !== undefined;
}

function warning(animal: Animal) {
    if(isDog1(animal)) {
        animal;
    } else if(isCat1(animal)) {
        animal;
    }
}