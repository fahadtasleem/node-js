var Person = function(f,l){
    this.f = f;
    this.l = l;
}

Person.prototype.getF = function(){
    return this.f;
}

Person.prototype.getL = function(){
    return this.l;
}

var Man = function(f,l,age){
    Person.call(this,f,l);
    this.age = age;
}

//Man.prototype = Object.create(Person.prototype);
Man.prototype = Object.create(Person.prototype);

Man.prototype.getAge = function(){
    return this.age;
}

var p1=new Person('f','t');
console.log(p1.getF());
console.log(p1.getL());

Person.prototype.toS = function(){
    console.log('yeahh')
}

var m1=new Man('f','t',34);
console.log(m1.getF());
console.log(m1.getL());
console.log(m1.getAge());
m1.toS();
console.log(Person.prototype)
console.log(Man.prototype)
