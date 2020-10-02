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
        console.log("connected to server")
})

client.query('select * from turtle_life_table', (err, res) => {
    console.log(res.rows)
    // console.log(err, res)
    client.end()
})