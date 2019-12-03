const connection = require('./connection');
const inquirer = require("inquirer")

class DB {
	constructor(connection) {
		this.connection = connection;
	}
	createEmployee(employee) {
		return this.connection.query('INSERT INTO employee SET ?', employee);
	}
	createRole(role) {
		return this.connection.query('INSERT INTO role SET ?', role);
	}
	createDepartment(department) {
		return this.connection.query('INSERT INTO department SET ?', department);
	}
	findAllEmployees() {
		return this.connection.query(
			"SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
		);
	}

	findAllRole() {
		return this.connection.query(
			' SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department on role.department_id = department.id'
		);
	}
	findAllDepartment() {
		return this.connection.query(
			' SELECT department.id, department.name, SUM (role.salary) FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name'
		);
	}
	deleteEmployee(employeeId) {
		return this.connection.query('DELETE FORM  employee WHERE id = ?', employeeId);
	}
	deleteRole(roleId) {
		return this.connection.query('DELETE FORM  role  WHERE id = ?', roleId);
	}
	deleteDepartment(departmentId) {
		return this.connection.query('DELETE FORM  department WHERE id = ?', departmentId);
	}
}

module.exports = new DB(connection);





function startApp() {
   inquirer
      .prompt({
         name: “choice”,
         type: “list”,
         message: “Welcome to our employee database! What would you like to do?“,
         choices: [
               “View all employees”,
               “View all departments”,
               “View all roles”,
               “Add an employee”,
               “Add department”,
               “Add a role”,
               “EXIT”
         ]
      }).then(function (answer) {
         switch (answer.action) {
            case “View all employees”:
               viewEmployees();
               break;
            case “View all departments”:
               viewDepartments();
               break;
            case “View all roles”:
               viewRoles();
               break;
            case “Add an employee”:
               addEmployee();
               break;
            case “Add department”:
               addDepartment();
               break;
            case “Add a role”:
               addRole();
               break;
            case “EXIT”:
               endApp();
               break;
            default:
               break;
         }
      })
}
function viewEmployees() {
   var query = “SELECT * FROM employees”;
   connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ” employees found!“);
      console.table(’All Employees:’, res);
      startApp();
   })
}
function viewDepartments() {
   var query = “SELECT * FROM department”;
   connection.query(query, function(err, res) {
      if(err)throw err;
      console.table(’All Departments:’, res);
      startApp();
   })
}
function viewRoles() {
   var query = “SELECT * FROM role”;
   connection.query(query, function(err, res){
      if (err) throw err;
      console.table(’All roles:’, res);
      startApp();
   })
}
function addEmployee() {
   connection.query(“SELECT * FROM role”, function (err, res) {
      if (err) throw err;
      inquirer
         .prompt([
            {
               name: “first_name”,
               type: “input”,
               message: “Employee’s fist name: “,
            },
            {
               name: “last_name”,
               type: “input”,
               message: “Employee’s last name: ”
            },
            {
               name: “choice”,
               type: “rawlist”,
               choices: function() {
                  var roleArray = [];
                  for (let i = 0; i < res.length; i++) {
                     roleArray.push(res[i].title);
                  }
                  return roleArray;
               },
               message: “What is this employee’s role? ”
            },
            ]). then(function (answer) {
            })
   })
}
function addDepartment() {
}
function addRole() {
}
function endApp() {
}