import './login.css';
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')

  function handleEmailChange(e){
    setEmail(e.target.value);
  }
  function handlePasswordChange(e){
    setPassword(e.target.value);
  }
  const LogIn = async (e) => {
    const userData = {
      email: email,
      password: password
    }
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })

    const returnData = await res.json()

    if (returnData.token) {
      console.log("Successfully logged in")
    } else {
      let errors = ''
      if (returnData.error) {
        errors = returnData.error
      } else {
        for (let i = 0; i < returnData.msg.length; i++) {
          errors += returnData.msg[i].param[0].toUpperCase() + returnData.msg[i].param.slice(1) + ' ' + returnData.msg[i].msg + '\n'
        }
      }
      setError(errors);
      console.log(error);
    }
  }

  return (
    <div class="form-body">
      <div class="mainform">
        <div class="loginform">
          <label class="loginlabel">Login</label>
          <input class="input" label="E-mail" placeholder="E-mail" onChange={handleEmailChange} type="email" required />
          <input class="input" label="Password" placeholder="Password" onChange={handlePasswordChange} type="password" required />
          <button class="button" type="primary" onClick={LogIn}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login