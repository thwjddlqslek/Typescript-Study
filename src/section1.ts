// section 0 ~ 1 퀴즈 tsx src/section1.ts
import * as readline from 'readline';

// 문제 1.
// 다음 변수들에 대해 적절한 타입을 지정하세요.
let userId; //숫자 타입
let userName; //문자열 타입
let checkPayment; //불리언 타입

/* ----------------------------------------------------------------------------------- */

// 문제 2.
// 콘솔에 출력될 결과를 예상하세요.
function greet(name: string | undefined) {
    if (name) {
        console.log(`Hello, ${name}!`);
    } else {
        console.log("Hello, guest!");
    }
}

// greet("KSJ");
// greet(undefined);

/* ----------------------------------------------------------------------------------- */

// 문제 3.
// 변수 result의 타입을 결정하세요.
let x = 4;
let y = "44";
let result = x + y;

/* ----------------------------------------------------------------------------------- */

// 문제 4.
// 코드 출력값을 에상하세요.
type User = {
    id: number;
    name: string;
    email: string;
};

type UserUpdate = {
    name?: string;
    email?: string;
    phoneNumber?: string;
};

function updateUser(user: User, update: UserUpdate): User & UserUpdate {
    return { ...user, ...update };
}

const currentUser: User = {
    id: 1,
    name: "KSJ",
    email: "ksj@gmail.com"
};

const update: UserUpdate = {
    email: "ksj_update@gmail.com",
    phoneNumber: "01012344321"
};

/* ----------------------------------------------------------------------------------- */

// 퀴즈 정답 구역
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter command: ', (answer) => {
  // '1 answer' 입력을 확인합니다.
  if (answer === '1') {
    console.log('let userId: number;');
    console.log('let userName: string;');
    console.log('let checkPayment: boolean;');
  } 
  else if (answer === '2') {
    greet("KSJ");
    greet(undefined);
  }
  else if (answer === '3') {
    console.log(result, typeof(result));
  }
  else if (answer === '4') {
    console.log(updateUser(currentUser, update));
  }
  rl.close();
});
