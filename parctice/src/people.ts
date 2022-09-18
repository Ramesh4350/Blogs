class Person {
    constructor(private firstName: string, private lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    describe(): string {
        return `This is ${this.firstName} ${this.lastName}`;
    }
}

abstract class Employee extends Person {
    private static headCount: number = 0;
    constructor(firstName: string, lastName: string, private jobTitle: string) {
        super(firstName, lastName);
        this.jobTitle = jobTitle;
        Employee.headCount++
    }
    abstract getSalary(): number
    describe(): string {
        return `${super.describe()}I am ${this.jobTitle}`;
    }
    /**
     * name
     */
    public static getHeadCount() {
        return Employee.headCount
    }
    compensationStatement(): string {
        return `${this.getFullName()} makes ${this.getSalary()} in a month`;
    }
}


class FulltimeEmployee extends Employee {
    constructor(firstName: string, lastname: string, jobTitle: string, private salary: number) {
        super(firstName, lastname, jobTitle);
        this.salary = salary;
    }
    getSalary(): number {
        return this.salary;
    }
}

class ContractEmployee extends Employee {
    constructor(firstName:string,lastName:string,jobTitle:string,private rate:number, private hour:number) {
        super(firstName,lastName,jobTitle);
        this.hour=hour;
        this.rate=rate;
    }
    getSalary(): number {
    return this.rate * this.hour;
    }
}
let f1 = new FulltimeEmployee("Jon","Doe","Web developer",20000);
console.log(`I am ${f1.getFullName()} and ${f1.describe()} and my salary is ${f1.getSalary()}`);
let ce = new ContractEmployee("Jon","Doe","Web Developer",3000,6);
console.log(ce.compensationStatement());
