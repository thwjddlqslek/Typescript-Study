// Unknown 타입

function unknownTest() {
    //업캐스팅 가능
    let a: unknown = 1;
    let b: unknown = "hello";
    let c: unknown = true;
    let d: unknown = null;

    let unknownVar: unknown;

    //다운캐스팅 불가능
    //let num: number = unknownVar; 
}

//Never 타입 : 공집합

function neverTest() {
    function neverFunc() : never{
        while(true){}
    }
    //업캐스팅이기에 가능
    let num : number = neverFunc();
    let str : string = neverFunc();

    //다운캐스팅이기에 불가능 -> never에 어떤값도x
    //let never1: never = 1;
}

//Void 타입

function voidTest() {
    function voidFunc(): void {
        console.log("hi");
    }
    let voidVar: void = undefined;
}

//Any 타입 : 치트키

function anyTest() {
    let unknownVar: unknown;
    let anyVar : any;
    let neverVar : never;

    anyVar = unknownVar;
    //유일하게 안되는 경우
    //neverVar = anyVar;
}

/* 
- 객체 타입 간의 호환성
-> 어떤 객체타입을 다른 객체타입으로 취급해도 괜찮은가?
-> typescript는 property를 기준으로 타입 정의하는 구조적 타입 시스템
-> 조건이 더 작은 타입이 슈퍼타입*/

type Food = {
    name : string;
    price : number;
}

type KoreanFood = {
    name : string;
    price : number;
    taste : number;
}

let food : Food = {
    name : "중식",
    price : 30000,
}

let kimbab : KoreanFood = {
    name : '김밥',
    price : 5000,
    taste : 7,
}

food = kimbab;
// kimbab = food; (X) 

/* 초과 프로퍼티 검사
-> 딱 정해진 프로퍼티만 정의해라. */

let 떡볶이1 : Food = {
    name : "한식",
    price : 10000,
    //taste : 9,
}
let 떡볶이2 : Food = kimbab;

/* 대수 타입
-> 여러 개의 타입을 합성해서 새롭게 만들어낸 타입
-> 합집합 타입과 교집합 타입 존재 */

/* 1. 합집합 - Union 타입 */
let a : string | number | boolean | undefined | null;
a = 1;
a = "hi";
a = true; 

let arr : (number | string | boolean)[] = [1, "hi", true];


type Dog = {
    name : string;
    color : string;
}

type Person = {
    name : string;
    language : string;
}

type Union1 = Dog | Person;

let union1 : Union1 = {
    name : "김소정",
    color : "흰색",
    //language : "프랑스어",
}

/* 2. 교집합 - Intersection 타입 */

let variable : number & string;
/* 불가능이기에게 never 타입으로 만들어짐. */

type Intersection = Dog & Person;

let intersection1 : Intersection = {
    name : "",
    color : "",
    language : "",
    /* 하나라도 빼먹으면 오류 */
}

/* 타입 추론 */
// 타입을 정의하지 않아도 자동으로 알아서 타입을 추론함.
// 타입 추론을 잘하면 굳이 작성하지 않아도 타입 정의해줌.

let ab = 10;
let abc = "hello";
let abcd = {
    id : 1,
    name: "소정",
    profile : {
        nickname : "소찡",
    },
    urls: ["https://winterlood.com"],
};

let {id, name, profile} = abcd;

let [one, two, three] = [1, "two", true];

function func(message="hi"){
    return "hi";
}

/* any 타입의 진화 */
let d;
// let d : any; 와는 다름.
d = 10; 
d.toFixed();
//d.toUpperCase();

d = "hello";
d.toUpperCase();

//리터럴 타입으로 고정
const num = 10;
const str = "hello";

let arr1 = [1, "string"];
//타입 넓히기 추천

/* 타입 단언 */

type People = {
    name : string;
    age : number;
}

let people = {} as People;
people.name = "소정";
people.age = 24;

let angle = {
    name : "천사",
    age : 14,
    region : "seoul",
} as People;

/* 타입 단언 규칙
- 값 as 단언 <- 단언식
- A as B
- A가 B의 슈퍼타입이거나
- A가 B의 서브타입이어야 함. */

let num1 = 10 as never;
let num2 = 10 as unknown;
let num3 = 10 as unknown as string; //다중 단언 권장x

/* const 단언 */
let num4 = 10 as const;

let cat = {
    name : '야옹이',
    color : 'yellow',
} as const;

// 객체 as const로 하면 자동 read only로 변경. 아래와 같이 수정 불가.
//cat.name='여옹이';

/* Non Null 단언 */

type Post = {
    title : string;
    author? : string;
}

let post : Post = {
    title: "게시글1",
    author: "김소정",
}

// null과 undefined이 아니라는 의미
const len: number = post.author!.length;

/* 타입 좁히기 */

/* 타입 가드 : typeof, instanceof */

type PersonA = {
    name : string;
    age : number;
}

function func1(value: number | string | Date | null | PersonA) {
    if (typeof value === "number"){
        console.log(value.toFixed());
    } else if (typeof value ==="string"){
        console.log(value.toUpperCase());
    } else if (value instanceof Date){
        console.log(value.getTime());
    } else if (value && "age" in value){
        //PersonA는 형식만 참조, 여기서는 값으로 사용.
        console.log(`${value.name}은 ${value.age}살입니다.`);
    }
}

/* 서로소 유니온 타입 
-> 교집합이 없는 타입들 즉 서로소 관계에 있는 타입들을 모아 만든 유니온 타입 */

// 비동기 작업의 결과를 처리하는 객체 실습

type LoadingTask = {
    state: 'LOADING';
}

type FailedTask = {
    state: 'FAILED';
    error: {
        message: string;
    },
}

type SuccessTask = {
    state: 'SUCCESS';
    response: {
        data: string;
    },
}
type AsyncTask = LoadingTask | FailedTask | SuccessTask;

function processResult(task: AsyncTask){
    switch(task.state){
        case 'LOADING': {
            console.log("로딩중");
            break;
        }
        case 'FAILED':{
            console.log(`에러 발생 : ${task.error.message}`);
            break;
        }
        case 'SUCCESS':{
            console.log(`성공 응답 : ${task.response.data}`);
            break;
        }
    }
}

const loading = {
    state: 'LOADING',
}

const failed = {
    state: 'FAILED',
    error: {
        message: '오류 발생 원인은 ~',
    },
};

const success = {
    state: 'SUCCESS',
    response: {
        data: '데이터~',
    }
}




