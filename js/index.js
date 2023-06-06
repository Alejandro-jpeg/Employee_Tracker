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

function userChoice(){
    inquirer.prompt(
        question
    ).then((answer)=>{
        const choice = answer.choice;
    switch (choice) {
        case 'View All Departments':
            db.query('SELECT department_name FROM department', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'View All Roles':
            db.query('SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'View All Employees'://TODO: MANAGER NAME
            db.query('SELECT first_name, last_name, title, salary, manager_id FROM office_db.employee JOIN roles ON roles.id = office_db.employee.role_id', function (err, results) {
                console.table(results);
                userChoice();
              });
            break;

        case 'Add A Department':
            //View Roles Function
            break;

        case 'Add A Role':
            //View Roles Function
            break;

        case 'Add An Employee':
            //View Roles Function
            break;

        case 'Update An Employee Role':
            //View Roles Function
            break;

        case 'Exit':
            process.exit();
    
        default: 'Exit'
            break;
    }
    })
}

module.exports = userChoice;