/* 인덱스드 엑세스 타입
- 객체, 배열, 튜플 타입으로부터 특정 프로퍼티나 특정 요소의 타입만 추출 */

/* interface는 객체 타입 정의에만 특화 */
type PostList = {
    title: string;
    content: string;
    author: {
        id: number;
        name: string;
        age: number;
    };
}[];

// const key = "author" -> 에러뜸.

function printAuthorInfo(author: PostList[number]["author"]){ // 문자열은 값이 아닌 타입!
    console.log(`${author.name} - ${author.id}`);
}

// const num = 0; -> 에러뜸.
const post : PostList[number] = { // 값이 아니라 타입!
    //number를 넣어주면, 배열 타입으로부터 하나의 요소 타입만 가져온다.
    title: "게시물 제목",
    content: "게시물 내용",
    author: {
        id: 1,
        name: "ksj",
        age: 24,
    }
}

printAuthorInfo(post.author);

type Tup = [number, string, boolean];

type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];
type TupNum = Tup[number]; // 모든 타입의 최적의 공통 타입 추출

/* keyof 연산자 */

/* interface Person {
    name : string;
    age: number;
} */
type Person = typeof person; 

function getPropertyKey(person: Person, key: keyof Person){
    return person[key];
}

const person = {
    name: '김소정',
    age : 24,
}

getPropertyKey(person, "name"); // 김소정

typeof person === 'object';

/* 맵드 타입 */

interface User {
    id: number;
    name: string;
    age: number;
}

type PartialUser = {
    [key in "id" | "name" | "age"]?: User[key];
    // key : value
}

type BooleanUser = {
    //keyof : 오른쪽에 있는 객체 타입으로부터 프로퍼티의 키들을 유니언 타입으로 반환해주는 연산자.
    [key in keyof User] : boolean;
}

type ReadonlyUser = {
    readonly [key in keyof User] : User[key];
}

// 한 명의 유저 정보를 불러오는 기능
function fetchUser(): User {
    // ... 기능
    return {
        id : 1,
        name : '김소정',
        age: 24,
    }
}

// 한 명의 유저 정보를 수정하는 기능
function updateUser(user:PartialUser){
    // ... 수정하는 기능
}

updateUser({
    id : 1,
    name: "김소정",
    age: 22,
});

/* 템플릿 리터럴 타입 */

type Color = 'red' | 'black' | 'green';
type Animal = 'dog' | 'cat' | 'chicken';
type ColoredAnimal = `${Color}-${Animal}`;