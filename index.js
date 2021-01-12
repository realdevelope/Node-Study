const express = require('express')  //익스프레스 모듈 가져오기
const app = express();   //펑션으로 익스프레스앱을 만듬
const port = 5000;   //마음대로 가능 5000으로 임의로 설정 디폴드값은 3000

const bodyParser = require('body-parser');

const config = require('./config/key');

const {user, User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application.json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))  //에러 안뜨게 작성, 잘연결됬을때 출력, 에러 출력
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('안녕하세요~ 다들 새해복 많이 받으세요!!!')
})

app.post('/register', (req, res) =>{
    //회원가입할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 DB에 넣어줌
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })     //성공했을시
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})