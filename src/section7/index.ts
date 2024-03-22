/* 제네릭 
- 일반적인, 포괄적인 
- 함수를 호출할 때마다 결정 */

import { resolve } from "path";

function func<T>(value : T) : T {
    return value;
}

let num = func(10);

// type을 좁혀야 사용 가능!
if (typeof num === 'number'){
    num.toFixed();
}

let bool = func(true);
let str = func('string');
let arr = func<[number, number, string]>([1, 2, "cat"]); 

/* 타입 변수 응용하기 */

// 첫번째 사례

function swap<T, U>(a:T, b:U){
    return [b, a];
}

const [a, b] = swap("1", 2);

// 두번째 사레

function returnFirstValue<T>(data: [T, ...unknown[]]){
    return data[0];
}

let numArr = returnFirstValue([0, 1, 2]);
let strArr = returnFirstValue([1, 'a', 'b']);

// 세번째 사례

interface InterfaceA {
    length : number;
}

interface InterfaceB extends InterfaceA {}

function getLength<T extends {length : number}>(data: T){
    return data.length;
}

let var1 = getLength([1, 2, 3]);
let var2 = getLength("string");
let var3 = getLength({length : 10});
// let var4 = getLength(10);

/* map 메서드 */

const arr1 = [1, 2, 3];
const newArr = arr1.map((it) => it*2);

function map<T, U>(arr: T[], callback: (item: T) => U){
    let result = [];
    for (let i  = 0; i < arr.length; i++){
        result.push(callback(arr[i]));
    }
    return result;
}

map(arr1, (it) => it * 2);
map(["hi", "hello"], (it) => parseInt(it));

/* forEach */

const arr2 = [1, 2, 3];
arr2.forEach((it) => console.log(it));

function forEach<T>(arr: T[], callback: (item: T) => void){
    for (let i  = 0; i < arr.length; i++){
        callback(arr[i]);
    }
}

forEach(arr2, (it) =>{
    console.log(it.toFixed());
})

forEach(['123', '456'], (it) =>{
    it;
})

/* 제네릭 인터페이스
= 타입 파라미터
= 제네릭 타입 변수
= 제네릭 타입 파라미터 */

interface KeyPair<K, V>{
    key: K,
    value: V,
}

/* 제네릭 인터페이스 사용할 때 : 반드시 타입으로 정의할 때 타입변수에 할당할 타입 기입!! */
let keyPair: KeyPair<string, number> = {
    key: "key",
    value: 0,
}

let keyPair2: KeyPair<boolean, string[]> = {
    key: true,
    value: ["1"],
}

/* 인덱스 시그니처 */

interface NumberMap {
    [key: string] : number;
}

let numberMap1 : NumberMap = {
    key: -123,
    key2: 123,
}

interface Map<V> {
    [key: string] : V;
}

let stringMap: Map<string> = {
    key: "value",
}

let booleanMap : Map<boolean> = {
    key: true,
}

/* 제네릭 타입 별청 */

type Map2<V> = {
    [key: string] : V;
}

let stringMap2 : Map2<string> = {
    key: "hello",
}

/* 제네릭 인터페이스의 활용 예시
-> 유저 관리 프로그램
-> 유저 구분 : 학생 유저/ 개발자 유저 */

// 서로소 유니온 타입
interface Student {
    type: "student";
    school: string;
}

interface Developer {
    type: "developer";
    skill: string;
}

interface User<T> {
    name : string;
    profile: T;
}

function goToSchool(user: User<Student>){
    const school = user.profile.school;
    console.log(`${school}로 등교 완료~`);
}

// 해당 부분 다시 이해 -> goToSchool(studentUser);

const developerUser: User<Developer> = {
    name: "소정",
    profile : {
        type: "developer",
        skill: "TypeScript",
    }
}

const studentUser: User<Student> = {
    name: "홍길동",
    profile : {
        type: "student",
        school: "한입학교",
    }
}

/* 제네릭 클랙스 */

class List<T> {
    constructor(private list : T[]) {}

    push(data: T){
        this.list.push(data);
    }
    pop(){
        return this.list.pop();
    }
    print(){
        console.log(this.list);
    }
}

const numberList = new List([1, 2, 3]);
numberList.pop();
numberList.push(4);
numberList.print();

const stringList = new List(["a", "b"]);
stringList.push("4");


/* 프로미스 */

const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        reject("~ 때문에 실패!");
    }, 3000);
});

promise.then((response) => {
    console.log(response * 10);
})

promise.catch((err) => {
    if (typeof err === "string"){
        console.log(err);
    }
})

/* 프로미스를 반환하는 함수의 타입을 정의 */

interface Post {
    id: number,
    title: string,
    content: string,
}

function fetchPost() : Promise<Post> /* 제일 추천 방식! */ {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                title: "게시물 제목",
                content: "게시글 내용",
            });
        }, 3000);
    });
}

const postRequest = fetchPost();

postRequest.then((post) => {
    post.id
})