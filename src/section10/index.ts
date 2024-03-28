/* Partial<T>
- 부분적인, 일부분의
- 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티 바꿔주는 타입 */

interface Post {
    title : string;
    tags : string[];
    content : string;
    thumbnailURL? : string;
}

type Partial<T> = {
    [key in keyof T]? : T[key];
};
/* 변수 T에 들어오는 객체 타입의 키들을 이 파셜 타입이 모두 갖게 된다. */

const draft :Partial<Post> = {
    title : "제목 나중에..",
    content : "내용 있다가..",
};

/* Required<T>
- 필수의, 필수적인
- 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입 */

type Required<T> = {
    [key in keyof T]-?: T[key];
}

const withThumbnailPost : Required<Post> = {
    title : "한입 타스 후기",
    tags : ["ts"],
    content : "",
    thumbnailURL: "https://...",
};

/* Readonly<T>
- 읽기전용 수정불가
- 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 만들어주는 타입 */

type Readonly<T> = {
    readonly [key in keyof T] : T[key];
}

const readonlyPost : Readonly<Post> = {
    title : "보호된 게시글입니다.",
    tags : [],
    content : "",
};

//readonlyPost.content = "수정"

/* Pick<T, K>
- 뽑다, 고르다
- 객체 타입으로부터 특정 프로퍼티만 딱 골라내는 그런 타입*/

type Pick<T, K extends keyof T> = {
    // K extends 'title' | 'tags' | 'content' | 'thumbnailURL'
    // 'title' | 'content' extends 'title' | 'tags' | 'content' | 'thumbnailURL'
    [key in K] : T[key];
}

const legacyPost : Pick<Post, "title" | "content"> = {
    title : "예전 글",
    content : "옛날 내용",
}

/* Omit<T, K>
- 생략하다, 빼다
- 객체 타입으로부터 특정 프로퍼티를 제거하는 타입 */

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// T = Post, K = 'title'
// Pick<Post, Exclude<keyof Post, 'title'>>
// Pick<Post, Exclude<'title' | 'content' | 'tags' | 'thumbnailURL', 'title'>>
// Pick<Post, 'content'| 'tags' | 'thumbnailURL'>

const noTitlePost : Omit<Post, 'title'> = {
    content : "",
    tags : [],
    thumbnailURL: "",
}

/* Record<K, V>
- 제한적인 객체 타입 정의할 때 사용
- 실무에서 자주 쓰이는 타입 */

type Record<K extends keyof any, V> = {
    [key in K] : V
}
/* type ThumbnailLegacy = {
    large: {
        url: string;
    };
    medium: {
        url: string;
    };
    small: {
        url: string;
    };
    watch: {
        url: string;
    }
}
 */
type Thumbnail = Record<"large" | "medium" | "small" | "watch", {url : string; size: number;}>;

/* Exclude<T, U>
- 제외하다, 추방하다.
- T에서 U를 제거하는 타입 */

type Exclude<T, U> = T extends U ? never : T;
// 1단계
// Exclude<string, boolean> |
// Exclude<boolean, boolean>

// 2단계
// string
// never(공집합이므로 유니온하면 사라짐)

// 3단계
// string

type A = Exclude<string | boolean, boolean>;

/* Extract<T, U>
- T에서 U를 추출하는 타입 */

type Extract<T, U> = T extends U ? T : never;

type B = Extract<string | boolean, boolean>;

/* ReturnType<T>
- 함수의 반환값 타입을 추출하는 타입 */

type ReturnType<T extends (...args : any) => any> = T extends (...args : any) => infer R ? R : never;

function funcA() {
    return "hello";
}

function funcB() {
    return 10;
}

type ReturnA = ReturnType<typeof funcA>;

type ReturnB = ReturnType<typeof funcB>;

