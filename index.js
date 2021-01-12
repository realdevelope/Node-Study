const express = require('express')  //익스프레스 모듈 가져오기
const app = express()   //펑션으로 익스프레스앱을 만듬
const port = 5000   //마음대로 가능 5000으로 임의로 설정 디폴드값은 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kkakssang:abcd1234@boilerplate.sxxwd.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))  //에러 안뜨게 작성, 잘연결됬을때 출력, 에러 출력
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안뇽하숑')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})