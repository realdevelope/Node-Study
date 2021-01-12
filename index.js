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

app.post('/login', (req, res) => { //로그인 라우터
    //요청된 이메일을 데이터베이스에서 있는지 찾음
    User.findOne({
        email: req.body.email
    }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSucces: false,
                message: "제공된 이메일에 해당되는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!ismatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })

            //비밀번호 까지 맞다면 토큰을 생성
            user.generateToken((err, user) => {

            })
        })
    })
})


userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainpassword 1234567     암호화된 비밀번호 "$2b$10$r7VKMZ1LMrgbtCL3/RVlH..Kbq7nGMipwFaBTKT4wPCW7A6aDC4Ja"
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})