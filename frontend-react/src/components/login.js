import { Form, Input, Button } from 'antd';
import { useState} from "react"
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')

    const LogIn = async (e) => {
        setEmail(e.email)
        setPassword(e.password)

        const userData = {
            email: e.email,
            password: e.password
          }
      
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
          })
          
          const returnData = await res.json()
      
          if(returnData.token) {
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
              setError(errors)
          }    
    }

    return (
        <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 6 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={LogIn}
        >
            <Form.Item label="E-mail" name="email" required><Input/></Form.Item>

            <Form.Item label="Password" name="password" required><Input.Password/></Form.Item>

            <Form.Item wrapperCol={{ offset: 9, span: 5 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

export default Login