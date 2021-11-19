import { Form, Input, Button } from 'antd';
import { useState} from "react"
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const LogIn = async (e) => {
        setEmail(e.email)
        setPassword(e.password)
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