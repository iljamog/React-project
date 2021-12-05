import './register.css'
import {useState} from "react"

function Register() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");


    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleRepeatPasswordChange(e){
        setRepeatPassword(e.target.value);
    }
    function handleFirstNameChange(e){
        setFirstName(e.target.value);
    }
    function handleLastNameChange(e){
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
        }if(error){
            console.log(error);
        }
    }
    return (
        <div class="form-body">
          <div class="mainregisterform">
            <div class="registerform">
              <label class="registerlabel">Register</label>
              <input class="registerinput" placeholder="First name" onChange={handleFirstNameChange} required />
              <input class="registerinput" placeholder="Last name" onChange={handleLastNameChange} required />
              <input class="registerinput" placeholder="E-mail" onChange={handleEmailChange} name="email" type="email" required />
              <input class="registerinput" placeholder="Password" onChange={handlePasswordChange} type="password" required />
              <input class="registerinput" placeholder="Repeat password" onChange={handleRepeatPasswordChange} type="password" required />
              <button class="registerbutton" type="primary" onClick={createUser}>Submit</button>
            </div>
          </div>
        </div>
    )
}
export default Register