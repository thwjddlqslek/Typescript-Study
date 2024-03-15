/* 인터페이스 
- 타입에 이름을 지어주는 또 다른 문법
- 객체의 구조를 정의하는데 특화된 문법
- 상속, 합침 등의 특수한 기능 제공 */

interface Person {
    name : string;
    age : number;
    //호출 시그니처 이용: 여러 버전 이용을 위해, 오버로드 (함수 타입x) 
    sayHi() : void;
    sayHi(a : number, b: number) : void;
}
// interface : |(유니온 타입)과 &(인터섹션 타입) 불가능

type Type1 = Person | number;

/* (복습) 함수 타입 정의 방법
type Func = {
    () :void;
}
const func : Func = () => {}; */

const person : Person | Type1 = {
    name : '김소정',
    age : 11,
    sayHi : function () {
        console.log("HI");
    }
}

person.sayHi();
person.sayHi(1, 2);

/* 인터페이스의 확장 */

interface Animal {
    name: string;
    color: string;
}

interface Dog extends Animal{
    isBark: boolean;
}

const dog : Dog ={
    name : '',
    color: '',
    isBark: true,
}

interface Cat extends Animal{
    isScratch: boolean;
}

interface Chicken extends Animal{
    isFly: boolean;
}

interface DogCat extends Dog, Cat{
}


const dogCat : DogCat ={
    name : '',
    color : '',
    isBark: true,
    isScratch: true,
}

/* 선언 합침 
- 동일한 이름으로 인터페이스 2개 선언 가능
*/

interface Peron {
    name : string;
}

interface Peron {
    //name : number; // 충돌남. 서브타입도 안됨.
    age: number;
}
/* 모듈 보강 */

interface Lib {
    a : number;
    b : number;
}
interface Lib {
    c : number;
}

const lib : Lib = {
    a:1,
    b:2,
    c:3,
}