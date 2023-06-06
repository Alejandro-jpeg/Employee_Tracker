INSERT INTO department(department_name)
VALUES  ("planning"),
        ("sales"),
        ("programmers");


INSERT INTO roles(title, salary, department_id)
VALUES  ("Senior Oracle", 125000, 1),
        ("Junior Oracle", 75000, 1),
        ("Thaumaturge", 300000, 1),
        ("snake oil sales-person", 60000, 2),
        ("thieving scoundril", 55000, 2),
        ("Senior Developer", 302, 3),
        ("Junior Developer", 150, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Lizzzy", "Raidi", 3, null),
        ("Joan", "Archidi", 1, 1),
        ("Elsa", "Holmes", 2, 1),
        ("Daniel", "Ramirez", 4, 6),
        ("Sebastian", "Nava", 4, 6),
        ("Maria", "Sanchez", 5, null),
        ("Laura", "Medicci", 6, null),
        ("Carlos", "Justamantino", 7, 7);

