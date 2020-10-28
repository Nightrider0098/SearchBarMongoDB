var snowflake = require('snowflake-sdk');
snowflake.configure( {ocspFailOpen: false} );
var connection = snowflake.createConnection({
    account: 'xy12345.ap-south-1.aws',
    username: 'NIGHTRIDER0098',
    password: 'MITohnasan@12345'
});

connection.connect(
    function (err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err+JSON.stringify(conn));
        }
        else {
            console.log('Successfully connected to Snowflake.');
            // Optional: store the connection ID.
            connection_ID = conn.getId();
        }
    }
);