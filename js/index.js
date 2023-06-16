const mysql = require('mysql2');
const inquirer = require('inquirer');
let departmentChoices = [];
let roleChoices = [];
let managerChoices = [];
let employeeChoices = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Z0mt1Nk_guyckD',
        database: 'office_db'
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
            'Update An Employee Role',
            'Exit'
        ]
    }
]

function departmentRender(){
    departmentChoices = [];
    db.query('SELECT * FROM department;', (err, results) => {
        for (let i = 0; i < results.length; i++) {
            departmentChoices.push({name:results[i].department_name, value:results[i].id}); 
        }
        return departmentChoices;
    })
}

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

function addRole(){
    departmentRender();
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
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Please enter the department of the Role',
            choices: departmentChoices,
        },
    ]).then((answer)=>{
        const roleTitle = answer.roleTitle;
        const roleSalary = answer.roleSalary;
        const roleDepartment = answer.roleDepartment;
    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${roleTitle}", ${roleSalary}, "${roleDepartment}");`, (err, results) => {
        if (err) {
            console.log(err);
        }else{
            console.log(`${roleTitle} was added succesfully`);
            userChoice();
        }
    })
})
}

function managerRender(){
    managerChoices = [];
    db.query(`SELECT * FROM employee WHERE manager_id IS NULL;`, (err, results) => {
        for (let i = 0; i < results.length; i++) {
            managerChoices.push({name:`${results[i].first_name} ${results[i].last_name}`, value:results[i].id}); 
        } 
        return managerChoices;
    })
}

function roleRender(){
    roleChoices = [];
    db.query('SELECT * FROM roles;', (err, results) => {
        for (let i = 0; i < results.length; i++) {
            roleChoices.push({name: results[i].title, value:results[i].id}); 
        } 
        return roleChoices;
    })
}


function addEmployee(){
    managerRender();
    roleRender();
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
        },
        {
            type: 'list',
            name: 'newER',
            message: 'Please select the role of the new Employee',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'newEM',
            message: 'Please select the manager of the new Employee',
            choices: managerChoices
        },
    ]).then((answer)=>{
        const newFN = answer.newFN;
        const newLN = answer.newLN;
        const newER = answer.newER;
        const newEM = answer.newEM;
    db.query(`INSERT INTO office_db.employee(first_name, last_name, role_id, manager_id) VALUES ("${newFN}", "${newLN}", ${newER}, ${newEM});`, (err, results) => {
        if (err) {
            console.log(err);
        }else{
            console.log(`new Employee was added succesfully`);
            userChoice();
        }
    })
})
}

function employeeRender(){
    employeeChoices = [];
    db.query('SELECT * FROM employee;', (err, results) => {
        for (let i = 0; i < results.length; i++) {
            employeeChoices.push({name:`${results[i].first_name} ${results[i].last_name}`, value:results[i].id}); 
        } 
        return employeeChoices;
    })
}

function updateEmployee(){
    employeeRender();
    roleRender();
    console.log('hiii');
    inquirer.prompt([
        {
            type: 'list',
            name: 'updtEmployee',
            message: 'Please select an employee to update',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'updtRole',
            message: 'Please select the new role for the employee',
            choices: roleChoices 
        },
    ]).then((answer) => {
        const updatedEmployee = answer.updtEmployee;
        const updatedRole = answer.updtRole;
        db.query(`UPDATE employee SET role_id = ${updatedRole} WHERE id = ${updatedEmployee};`, (err, results) => {
            if(err){
                console.log(err);
            }else{
                console.log('employee updated succesfully');
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
            db.query('SELECT first_name, last_name, title, salary, manager_id FROM employee JOIN roles ON roles.id = employee.role_id;', function (err, results) {
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
            addEmployee();
            break;

        case 'Update An Employee Role':
            updateEmployee();
            break;

        case 'Exit':
            process.exit();
    
        default: 'Exit'
            break;
    }
    })
}

module.exports = userChoice;