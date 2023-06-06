const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Z0mt1Nk_guyckD',
        database: 'employee_db'
    },
    console.log(`connected to the employee_db database`)
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
            console.log('hiii');
            break;

        case 'View All Roles':
            //View Roles Function
            break;

        case 'View All Employees':
            //View Roles Function
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
            //View Roles Function
            break;
    
        default: 'Exit'
            break;
    }
    })
}


module.exports = userChoice;