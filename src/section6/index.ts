/* 타입스크립트의 클래스 */

const employee = {
    name : "thwjd",
    age : 24,
    position: "developer",
    work() {
        console.log("일하는중");
    }
};

// 에러 해결 -> tsconfig.json 파일에 "noImplicitAny" : false 추가
class Employee {
    //필드
    private name : string;
    protected age : number;
    position : string;

    //생성자
    constructor(name : string, age: number, position: string){
        this.name = name;
        this.age = age;
        this.position = position;
    }

    //메서드
    work() {
        console.log(`${this.name}님 일하는중`);
    }
}

class ExecutiveOfficer extends Employee {
    // 필드
    officeNumber:number;

    // 생성자
    constructor(name: string, age: number, position: string, officeNumber: number){
        super(name, age, position);
        this.officeNumber = officeNumber;
    }

    func() {
        // this.name; private는 파생 클래스에서도 접근 불가
        this.age; //protected는 외부 접근 불가 but 파생 클래스에서는 접근 가능
    }
}

const employeeB = new Employee("소정", 24, "개발자");
console.log(employeeB);

/* const employeeC : Employee = {
    name : '',
    age : 0,
    position: '',
    work() {},
} */

/* 접근 제어자
- access modifier
=> public / private / protected */

employee.name="홍길동";
//employee.age="홍길동";

/* 인터페이스와 클래스 
- 인터페이스는 무조건! public 필드만 정의 가능! */

interface CharacterInterface {
    name : string;
    moveSpeed : number;
    move() : void;
}

class Character implements CharacterInterface {
    // Character 클래스가 CharacterInterface 라는 설계도를 구현하는 것
    constructor(
        public name: string,
        public moveSpeed: number,
        private extra : string, // private 필요하다면 따로 정의!
    ) {}
    move() {
        console.log(`${this.moveSpeed} 속도로 이동한당!`);
    }
}