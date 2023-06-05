const express = require ('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Z0mt1Nk_guyckD',
        database: 'employee_db'
    },
    console.log(`connected to the employee_db database`)
);

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices:[
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update Employee Role'
        ]
    }
]

//TODO: FUNCTIONS TO CALL DEPENDING ON THE CHOICES


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});