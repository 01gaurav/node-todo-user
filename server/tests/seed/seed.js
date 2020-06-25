const {ObjectID} = require('mongodb')
const {Todo} = require('./../../models/todo'); 
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const useroneId = new ObjectID();
const usertwoId = new ObjectID();

const users=[{
    _id:useroneId,
    email:'one@gmail.com',
    password:'useronepass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:useroneId,access:'auth'},process.env.JWT_SECRET).toString()
    }]
},{
    _id:usertwoId,
    email:'two@gmail.com',
    password:'usertwopass',
    tokens:[{
      access:'auth',
      token:jwt.sign({_id:usertwoId,access:'auth'},process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator : useroneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator : usertwoId
  }];

  const populatetodos=(done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  };

  const populateUsers = (done)=>{
      User.remove({}).then(()=>{
          var userOne = new User(users[0]).save();
          var userTwo = new User(users[1]).save();

          return Promise.all([userOne,userTwo]);
      }).then(()=>done());
  };

module.exports = {todos,populatetodos,users,populateUsers}; 