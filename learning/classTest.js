class A {
    //a = 2;
    constructor(b){
        let p = b;
        this.b = b;
        var a = b*2;
    }
    get a(){
        return this.b;
    }
}

let a1 = new A(2);
let a2 = new A(3);
console.log(a1.a+' '+a2.b);
console.log(a1.b+' '+a2.b);