const { Pool, Client } = require('pg')

const client = new Client({
    user: 'oexslycq',
    host: 'lallah.db.elephantsql.com',
    database: 'oexslycq',
    password: 'HNrw4uPj8eNVdk7nnJ9OavtxZLdSlU6K',
    port: 5432,
})
client.connect().then((err) => {
   if (err)
       console.log(err);
    else
       console.log("connected to postgresql server")
})

// client.query('select * from turtle_life_table', (err, res) => {
//     console.log(res.rows)
//     // console.log(err, res)
//     client.end()
// })


// client.connect().then((err)=>{
// if(err) return console.log(err);

//  const dbName =  'oexslycq';
//     var tName =  'turtle_life_table'
//     client.query(`SELECT 
//    table_name, 
//    column_name, 
//    data_type 
// FROM 
//    information_schema.columns
// WHERE 
//    table_name = '${tName}'`, (err, result) => {
  
// console.log(err,result)

// })     
// })

module.exports  = client