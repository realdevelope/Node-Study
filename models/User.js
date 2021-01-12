const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //스페이스를 없애줌
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{          //관리자=1, 사용자=0 
        type: Number,
        default: 0
    },
    image:{
        type: String
    },

    token:{
        type:String
    },

    tokenExp:{      //토큰을 사용할 수 있는 기간
        type: Number
    }
})

userSchema.pre('save', function (next) {
    let user = this; //스키마를 가르킴

    if (user.isModified('password')) {
        //비밀번호를 암호화시킴
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                next();

                user.password = hash
            })
        })
    }
    else{
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports ={User}
