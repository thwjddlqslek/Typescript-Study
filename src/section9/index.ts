/* 분산적인 조건부 타입 */

type StringNumberSwitch<T> = [T] extends [number] ? string : number;
// 대괄호는 분산 방지!

let a : StringNumberSwitch<number>;
let b : StringNumberSwitch<string>;
let c : StringNumberSwitch<number | string>;
// StringNumberSwitch<number>
// StringNumberSwitch<string>

let d : StringNumberSwitch<boolean | number | string>;
// 1단계
// StringNumberSwitch<boolean> |
// Exclude<number> |
// Exclude<string>

// 2단계
// number |
// string |
// number

// 결과
// number | string



/* 실용적인 예제 */

type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<number | string | boolean, string>;

// 1단계
// Exclude<number, string> |
// Exclude<string, string> |
// Exclude<boolean, string>

// 2단계
// number |
// never |
// boolean

// 결과
// number | boolean

type Extract<T, U> = T extends U ? T : never;

type B = Extract<number | string | boolean, string>;

// 1단계
// Extract<number, string> |
// Extract<string, string> |
// Extract<boolean, string>

// 2단계
// never |
// string |
// never

// 결과
// string

/* infer
- inference -> 추론하다.
- 참으로 만드는 타입을 추론 */

type Func1 = () => string;
type Func2 = () => number;

type ReturnType<T> = T extends () => infer R ? R : never;

type A1 = ReturnType<Func1>;
type B1 = ReturnType<Func2>;
type C1 = ReturnType<number>; //추론 불가

/* 예제 */

type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type PromiseA = PromiseUnpack<Promise<number>>;
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string