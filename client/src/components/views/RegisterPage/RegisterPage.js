import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
// eslint-disable-next-line
import Axios from 'axios';
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {
    const dispatch = useDispatch();

    //State
    // eslint-disable-next-line
    const [Email, setEmail] = useState("")
    //eslint-disable-next-line
    const [Password, setPassword] = useState("")
    //eslint-disable-next-line
    const [Name, setName] = useState("")
    //eslint-disable-next-line
    const [ConfirmPassword, setConfirmPassword] = useState("")


    //핸들러
    const onEmailHandler = (event) => {     //입력이 가능하게
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }


    //이게 없으면 누를때마라 리프레쉬 되기떄문에 다른작업을 못해서 막음
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    회원 가입
                </button>
                
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)