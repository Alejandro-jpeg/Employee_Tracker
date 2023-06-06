const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Z0mt1Nk_guyckD',
        database: 'employee_db'
    },
    console.log(`connected to the office_db database`)
);

const question = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices:[
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update Employee Role',
            'Exit'
        ]
    }
]

function addDepartment(){
inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the name of the new Department'
        }
    ]).then((answer)=>{
        const departmentName = answer.newDepartment;
    db.query(`INSERT INTO department(department_name) VALUES ("${departmentName}");`, (err, results) => {
        if (err) {
            console.log(err);
        }else{
            console.log(`${departmentName} was added succesfully`);
            userChoice();
        }
    })
})
}
//title, salary, department //TODO: ADD DEPARTMENT AND CHOOSE DEPENDING ON THE EXISTING ONES
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Please enter the name of the new Role'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the salary of the Role'
        }
        /* {
            type: 'list',
            name: 'roleDepartment',
            message: 'Please enter the department of the Role',
        } */
    ]).then((answer)=>{
        const roleTitle = answer.roleTitle;
        const roleSalary = answer.roleSalary;
        const roleDepartment = answer.roleDepartment;
    db.query(`INSERT INTO roles(title, salary) VALUES ("${roleTitle}, ${roleSalary}");`, (err, results) => {
        if (err) {
            console.log(err);
        }else{
            console.log(`${roleTitle} was added succesfully`);
            userChoice();
        }
    })
})
}
//first name, last name, role, and manager TODO: SELECT THE ROLE FROM EXISTING ONES AND THE MANAGER FIX ERROR
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFN',
            message: 'Please enter the first name of the new Employee'
        },
        {
            type: 'input',
            name: 'newLN',
            message: 'Please enter the last name of the new Employee'
        }
        /* {
            type: 'input',
            name: 'newER',
            message: 'Please select the role of the new Employee'
        },
        {
            type: 'input',
            name: 'newEM',
            message: 'Please select the manager of the new Employee'
        }, */
    ]).then((answer)=>{
        const newFN = answer.newFN;
        const newLN = answer.newLN;
        const newER = answer.newER;
        const newEM = answer.newEM;
    db.query(`INSERT INTO office_db.employee (first_name, last_name) VALUES ("${newFN}, ${newLN}");`, (err, results) => {
        if (err) {
            console.log(err);
        }else{
            console.log(`new Employee was added succesfully`);
            userChoice();
        }
    })
})
}

function userChoice(){
    inquirer.prompt(
        question
    ).then((answer)=>{
    const choice = answer.choice;
    switch (choice) {
        case 'View All Departments':
            db.query('SELECT department_name FROM department;', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'View All Roles':
            db.query('SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id;', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'View All Employees'://TODO: MANAGER NAME
            db.query('SELECT first_name, last_name, title, salary, manager_id FROM office_db.employee JOIN roles ON roles.id = office_db.employee.role_id;', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'Add A Department':
            addDepartment();
            break;

        case 'Add A Role':
            addRole();
            break;

        case 'Add An Employee':
            /* addEmployee(); */
            break;

        case 'Update An Employee Role':
            //Update Employee Role Function
            break;

        case 'Exit':
            process.exit();
    
        default: 'Exit'
            break;
    }
    })
}

module.exports = userChoice;