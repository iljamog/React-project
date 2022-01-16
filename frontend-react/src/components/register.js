import './register.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const navigate = useNavigate()


    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleRepeatPasswordChange(e) {
        setRepeatPassword(e.target.value);
    }
    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }
    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    const createUser = async (user) => {
        const data = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        }

        if (!firstname || !lastname) {
            setError('Please enter your email');
        } else if (!email) {
            setError('Please enter your email');
        } else if (!password) {
            setError('Please enter your password');
        } else if (!password !== repeatPassword) {
            setError('The passwords dont match, please try again');
        } else {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const returnData = await response.json()

            if (response.ok) {
                setError('')
                console.log("Success! User registered!")
                navigate('/home');
            } else {
                let errors = ''
                if (returnData.error) {
                    errors = returnData.error
                } else {
                    for (let i = 0; i < returnData.msg.length; i++) {
                        errors += returnData.msg[i].param[0].toUpperCase() + returnData.msg[i].param.slice(1) + ' ' + returnData.msg[i].msg + '\n'
                    }
                }
                setError(errors)
            }
        }
        if (error) {
            console.log(error);
        }
    }
    return (
        <body>
            <div className="register-form-body">
                <div className="main-register-form">
                    <div className="register-form">
                        <label className="register-label">Register</label>
                        <input className="register-input" placeholder="First name" onChange={handleFirstNameChange} required />
                        <input className="register-input" placeholder="Last name" onChange={handleLastNameChange} required />
                        <input className="register-input" placeholder="E-mail" onChange={handleEmailChange} name="email" type="email" required />
                        <input className="register-input" placeholder="Password" onChange={handlePasswordChange} type="password" required />
                        <input className="register-input" placeholder="Repeat password" onChange={handleRepeatPasswordChange} type="password" required />
                        <button className="register-button" type="primary" onClick={createUser}>Submit</button>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default Register