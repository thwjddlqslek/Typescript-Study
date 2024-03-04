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