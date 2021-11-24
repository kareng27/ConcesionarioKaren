const mysql =require('mysql')
module.exports=()=>
mysql.createConnection({
    host:'bdphvbrutlqrisdcpwwh-mysql.services.clever-cloud.com',
    user:'ueoqooeqejxkb3dc',
    password: '2FhVpPxOKmhFa2FPZvOx',
    database:'bdphvbrutlqrisdcpwwh'
})