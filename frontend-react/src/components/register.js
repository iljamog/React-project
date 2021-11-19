import {Form, Input, Button, Typography} from 'antd';
import {useState} from "react"

function Register() {
    const [error, setError] = useState('');

    const createUser = async (user) => {
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        if (!user.firstName || !user.lastName) {
            setError('Please enter your full name');
        } else if (!user.email) {
            setError('Please enter your email');
        } else if (!user.password) {
            setError('Please enter your password');
        } else if (!user.password !== user.repeatPassword) {
            setError('The passwords dont match, please try again');
        } else {
            const response = await fetch('http://localhost:8081/api/auth/signup', {
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
        }
    }
    const { Text } = Typography;
    return (
        <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 6}}
            initialValues={{remember: true}}
            autoComplete="off"
            onFinish={createUser}
        >
            <Form.Item label="First name" name="firstName" required><Input/></Form.Item>
            <Form.Item label="Last name" name="lastName"><Input/></Form.Item>
            <Form.Item label="E-mail" name="email" required><Input/></Form.Item>
            <Form.Item label="Password" name="password" required><Input.Password/></Form.Item>
            <Form.Item label="Repeat password" name="repeatPassword" required><Input.Password/></Form.Item>
            { error && <Text type="danger" strong="true">{ error }</Text> }
            <Form.Item wrapperCol={{offset: 9, span: 5}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}


export default Register