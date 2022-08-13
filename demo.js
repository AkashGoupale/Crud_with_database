const mysql=require("mysql")
const input=require("readline-sync")


const emp_conne = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"employee_information",
    password:"Akash@123"
})

show_table_names = function() {
    emp_conne.query(`desc employees`,(err,data) => {
        if (err) throw err;
        let store=""
        for (let i of data) {
            store= store + i.Field + "\t| " +"\t"
        }
        console.log("column names are :",store)
    })
    }
show_table_names()

setTimeout(() => {
    function option () {
        console.log(" 1.insert data \n 2.read data \n 3.update data \n 4.delete data")
        let choice= input.question("Enter your choice what you doing operation: ")
        if (choice==1) {data_insert()}
        else if (choice==2) {data_read()}
        else if (choice==3) {data_update()}
        else if (choice==4) {data_delete()}
        }
        option()
        
    function data_insert() {
        let e_name = input.question("Enter the employee name: ")
        let e_age = input.question("Enter the employee age: ")
        let e_salary = input.question("Enter the employee salary: ")
        let e_exp =input.question("Enter the employee work experience: ")
        emp_conne.query(`insert into employees (employee_name,employee_age,salary,experience) 
        values ("${e_name}","${e_age}","${e_salary}","${e_exp}")`,(err) => {
                    if (err) throw err;
                    console.log("Employee data insert successfuly......")
                })
            }

    function data_read() {
        let emp_id = input.questionInt("Enter the employee id: ")
        emp_conne.query(`select * from employees where id = ${emp_id}`, (err,data) => {
            if (err) throw err;
            else {
                if (data.length > 0) {
                    console.log(data)
                }
                else {
                    console.log("Id does not exist..")
                }
            }
            })
    }

    function data_update () {
        let emp_id=input.questionInt("Enter the employee id: ")
        let u_column=input.question("Enter colunm name which column you have to update: ")
        let d_type=input.question("Enter your column datatype which is number or string or time: ")
        if (d_type=="string" || "time") {
            let update_data=input.question(`Enter your new ${u_column} : `)
            emp_conne.query(`update employees set ${u_column}="${update_data}" where id=${emp_id}`,(err,data) => {
                if (err) throw err;
                else {
                    if (data.changedRows==0) {
                        console.log("Id does not exist..")
                    }
                    else{console.log("Data update successfully...")}
                }
            })
        }
        else if (d_type==="number") {
            let update_data=input.questionInt("Enter what you have to update")
            emp_conne.query(`update employees set ${u_column}="${update_data}" where id="${emp_id}"`,(err) => {
                if (err) throw err;
                else {
                    if (data.changedRows==0) {
                        console.log("Id does not exist..")
                    }
                    else{console.log("Data update successfully...")}
                }
                })
        }
    }

    function data_delete() {
        let emp_id=input.questionInt("Enter the employee id: ")
        emp_conne.query(`delete from employees where id=${emp_id}`,(err,data) => {
                if (err) throw err;
                else {
                    if (data.affectedRows==0) {
                        console.log("Id does not exist")
                    } else (console.log("Data Deleted successful..."))
                }
            })
    }
},100);