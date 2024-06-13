import mysql from "mysql";
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'comment-reply'
  });
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  export default connection;