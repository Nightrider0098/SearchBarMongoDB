var Redshift = require('node-redshift');

var client = {
  user: "nightrider",
  database: "collagedatabase",
  password: "MITohnasan12345",
  port: 5439,
  host: "redshift-cluster-1.cxl0zqrobf5f.us-east-1.redshift.amazonaws.com",
};

var redshiftClient = new Redshift(client);

redshiftClient.query('show tables', { raw: true }, (err, data) => {
  console.log(err, data)
})
// redshiftClient.connect(function (err) {
//   if (err) throw err;
//   else {
//     redshiftClient.query('SELECT * FROM "studentrecords;"', function (err, data) {
//       if (err) throw err;
//       else {
//         console.log(data);
//         redshiftClient.close();
//       }
//     });
//   }
// });

module.exports = redshiftClient;