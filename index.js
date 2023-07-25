const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000

const USERS = [
  {
    id: 1,
    name: 'neha',
    email: 'neha@gmail.com',
    mobile: 2390798362
  },
  {
    id: 2,
    name: 'riya',
    email: 'riya@gmail.com',
    mobile: 2390798362
  },
  {
    id: 3,
    name: 'nima',
    email: 'nima@gmail.com',
    mobile: 2390798362
  },
  {
    id: 4,
    name: 'ravi',
    email: 'ravi@gmail.com',
    mobile: 2390798362
  }

];
app.get('/users', (req, res) => {
  res.json(USERS);

})
app.post('/users', (req, res) => {
  const user = { 
    id: USERS[USERS.length - 1].id + 1,
    ...req.body,
  };
  USERS.push(user);

  res.send(user);
})
app.get('/users/:id',(req,res)=>{
  const user= USERS.find((user)=>user.id==req.params.id)
  res.json(user);
})
app.patch('/users/:id',(req,res)=>{
  const index = USERS.findIndex(user => user.id==req.params.id);
  USERS[index] = {
    ...USERS[index],
    ...req.body
  }
  res.json(USERS[index]); 
})
//delete
app.delete( '/users/:id',(req,res)=>{
  const index = USERS.findIndex(user => user.id==req.params.id);
  USERS.splice(index,1);
  res.send(true);
})
//search
app.get('/users/search/:q',(req,res)=>{
  res.json(USERS.filter((user) =>
    user.name.includes(req.params.q)||
    user.email.includes(req.params.q)||
    user.mobile.toString().includes(req.params.q)//
  ));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})