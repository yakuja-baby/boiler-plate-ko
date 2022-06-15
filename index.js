const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www-form-urlencoded  <-이렇게 된 데이터를 아래에서 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true})); //bodyparser가 클라이언트에서 오는 정보를 서버에서 분석할 수 있게함

//application/json 으로 된 json데이터를 아래에서 분석해서 가져옴
app.use(bodyParser.json()); 

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('dkdjkkk'))

app.post('/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })  //if 에러가 있을 시에 json형태로 에러 전달. (성공여부: 실패, 에러메시지내용)
    return res.status(200).json({ //성공 시 메시지 json형태로 전달
      success: true
    })
  }) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
