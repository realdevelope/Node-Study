import React, { useState } from 'react'
//eslint-disable-next-line
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'; 

function LoginPage(props) {
    const dispatch = useDispatch();

    //eslint-disable-next-line
    const [Email, setEmail] = useState("")
    //eslint-disable-next-line
    const [Password, setPassword] = useState("")
    

    const onEmailHandler = (event) => {     //입력이 가능하게
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();     //이게 없으면 누를때마라 리프레쉬 되기떄문에 다른작업을 못해서 막음


        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)