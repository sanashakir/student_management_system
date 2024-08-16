#! /usr/bin/env node
import inquirer from "inquirer";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }

    enrollCourse(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    payFees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
        console.log(`Remaining balance: $${this.balance}`);
    }

    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(name: string) {
        let newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`Student ${name} added successfully. Student ID: ${newStudent.id}`);
    }

    enrollStudent(studentID: number, course: string) {
        let student = this.findStudent(studentID);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in course successfully.`);
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    viewStudentBalance(studentID: number) {
        let student = this.findStudent(studentID);
        if (student) {
            student.viewBalance();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    payStudentFees(studentID: number, amount: number) {
        let student = this.findStudent(studentID);
        if (student) {
            student.payFees(amount);
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    showStudentStatus(studentID: number) {
        let student = this.findStudent(studentID);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    findStudent(studentID: number) {
        return this.students.find(std => std.id === studentID);
    }
}

async function main() {
  console.log("Welcome to the Student Management System");
    console.log("-".repeat(45));
    let studentManager = new StudentManager();

    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name"
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;

            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name"
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentID, courseInput.course);
                break;

            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter student ID"
                    }
                ]);
                studentManager.viewStudentBalance(balanceInput.studentID);
                break;

            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                studentManager.payStudentFees(feesInput.studentID, feesInput.amount);
                break;

            case "Show Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter student ID"
                    }
                ]);
                studentManager.showStudentStatus(statusInput.studentID);
                break;

            case "Exit":
                console.log("Exiting");
                process.exit();
        }
    }
}

main();
