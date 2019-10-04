var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3')
var http = require('http');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
 


/* Creating Database */
let db = new sqlite3.Database("./a3", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
       
        // /* code to create table(s)  */

        var sql1 = db.run("CREATE TABLE IF NOT EXISTS students (studentid VARCHAR(20), studentname VARCHAR(20) , programgroup VARCHAR(20))");
       
        var sql2 = db.run("CREATE TABLE IF NOT EXISTS classes (classid VARCHAR(20), classname VARCHAR(255) , room VARCHAR(25),datesession VARCHAR(20))");
       
        var sql3 = db.run("CREATE TABLE IF NOT EXISTS enrollment (enrollmentid VARCHAR(20), studentid VARCHAR(20) , classid VARCHAR(25))");

       var studentData = [{"studentId":"1","studentName":"Jestin","programGroup":"CPCT"},
       {"studentId":"2","studentName":"Cherin","programGroup":"CPCT"},
       {"studentId":"3","studentName":"Bincy","programGroup":"CPCT"},
       {"studentId":"4","studentName":"Keerthy","programGroup":"CPCT"},
       {"studentId":"5","studentName":"Susan","programGroup":"CSAT"},
       {"studentId":"6","studentName":"Diana","programGroup":"CSAT"}];

       db.serialize(function() {
       studentData.forEach(function(studentData) {
        /* inserting data*/
        db.run(`INSERT INTO students(studentid,studentname,programgroup) VALUES(?,?,?)`, [studentData.studentId,studentData.studentName,studentData.programGroup], function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        });  
    });
  });
          var classSection = [{"classId":"C104","classNmae":"JAVA","room":"B230","dateSession":"THU AM"},
          {"classId":"C105","classNmae":"C++","room":"B230","dateSession":"FRI AM"},
          {"classId":"C106","classNmae":"C#","room":"B230","dateSession":"THU PM"},
          {"classId":"C107","classNmae":"WEB TECHNOLOGY","room":"B230","dateSession":"MON AM"},
          {"classId":"C108","classNmae":"NETWORKING","room":"B123","dateSession":"TUE AM"},
          {"classId":"C109","classNmae":"CYBER SECURITY","room":"B123","dateSession":"THU PM"},
          {"classId":"C110","classNmae":"DATBASE DEVELOPMENT","room":"B230","dateSession":"MON PM"}];
       
          db.serialize(function() {
            classSection.forEach(function(classSection) {
          db.run(`INSERT INTO classes(classid,classname,room,datesession) VALUES(?,?,?,?)`, [classSection.classId,classSection.classNmae,classSection.room,classSection.dateSession], function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          }); 
        });
      }); 

      var enroll =[{"enrollmentId":"1","studentId":"1","classId":"C104"},
      {"enrollmentId":"2","studentId":"2","classId":"C104"},
      {"enrollmentId":"3","studentId":"3","classId":"C104"},
      {"enrollmentId":"4","studentId":"1","classId":"C105"},
      {"enrollmentId":"5","studentId":"2","classId":"C105"},
      {"enrollmentId":"6","studentId":"3","classId":"C105"},
      {"enrollmentId":"7","studentId":"4","classId":"C106"},
      {"enrollmentId":"8","studentId":"5","classId":"C109"},
      {"enrollmentId":"9","studentId":"6","classId":"C110"},
      {"enrollmentId":"10","studentId":"5","classId":"C110"},
      {"enrollmentId":"11","studentId":"6","classId":"C109"}];
      db.serialize(function() {
        enroll.forEach(function(enroll) {
          db.run(`INSERT INTO enrollment(enrollmentid,studentid,classid) VALUES(?,?,?)`, [enroll.enrollmentId,enroll.studentId,enroll.classId], function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          });  
        });
      });
      
      db.serialize(function() {
       
      var data = [];
      db.all("SELECT s.studentid,s.studentname,c.classid,c.classname,c.room,c.datesession FROM students AS s INNER JOIN enrollment as e on e.studentid=s.studentid INNER JOIN classes as c on c.classid = e.classid", function(err,rows){
        if(err) return console.log(err.message); ;
       
        console.log("================STUDENT SCHEDULE DETAILS============");
        
        console.log("STUDENT ID: STUDENT NAME : CLASSID: CLASS NAME : ROOM : DATE SESSION  ============");
        rows.forEach(function (row) { 
        console.log(  row.studentid + " ; " + row.studentname + " ; " + row.classid + " ; " + row.classname + " ; " + row.room + " ; " + row.datesession );
    }); 
     
       
}); 
});       
    } 
})

