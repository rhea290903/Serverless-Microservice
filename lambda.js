const { Client } = require('pg');
const dbConfig={

  user:'postgres',
  host: 'employee.cmbav2rvlbtx.ap-south-1.rds.amazonaws.com',
  database: 'Employee',
  password: 'Rs290903',
  port: 5432,

};


exports.handler = async (event) => {
     
      const client = new Client(dbConfig);
  
      try {
          
          await client.connect();
  
 
          const mockEmployee = {
              id: 1,
              name: 'Rhea Sheth',
              salary: 100000,
              designation: 'CEO'
          };
  
         
          return {
              statusCode: 200,
              body: JSON.stringify(mockEmployee),
          };
      } catch (err) {
          
          console.error('Error accessing database:', err);
          return {
              statusCode: 500,
              body: JSON.stringify({ message: 'Internal server error' }),
          };
      } finally {
          
          await client.end();
      }
};