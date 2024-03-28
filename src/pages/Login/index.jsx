import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Input, Space, Spin } from 'antd';

import image from '../../assets/images/LoginImage.avif';
import {
  Container,
  Form,
  Image,
  InnerContainer,
  InnerLeftContainer,
  LeftContainer,
  RightContainer,
  Title,
  ErrorContainer,
  ErrorMessage,
  Span,
} from './login-style';
import { WarningOutlined } from '@ant-design/icons';
import authApi from '../../api/authApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [errors, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);



  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = () => {

    if (!email) {
      toast.error("Nhập Email đêyy")
      return
    }
    if (!password) {
      toast.error("Nhập password đêyy")
      return
    }

    else {

      let user = {
        email: email,
        password: password,
      };
      login(user);

    }

  };

  const handleError = (error) => {
    let errors = {
      email: error.Email || '',
      password: error.Password || '',
      error: '',

    }
      ;

    if (error.Email === undefined && error.Password === undefined) {
      errors.error = error;
    }

    setError(errors);
  };

  const login = async (user) => {

    try {
      const response = await authApi.login(user);
      if (response.state === "true") {
        navigate("/")
        toast.success(response.msg)
      }
      else {
        navigate("/login")
        toast.error(response.msg)
      }
    } catch (error) {
      console.log(error.response.data);
      handleError(error.response.data);
    }

  };

  // const toHomepage = () => {
  //   let path = `/`;
  //   navigate(path, { replace: true });
  // };

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <InnerLeftContainer>
            <Image src={image}></Image>
          </InnerLeftContainer>
        </LeftContainer>
        <RightContainer>
          <Title>LOGIN</Title>
          <Form>
            <Input
              id='email'
              placeholder='Email'
              onChange={(e) => {
                handleInputChange(e);
              }}

            />
            <Space
              direction='horizontal'
              style={{ width: '100%', display: 'inline-block' }}
            >
              <Input.Password
                id='password'
                placeholder='Password'
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </Space>

            {Object.keys(errors).length > 0 ? (
              <ErrorContainer>
                <Span>
                  <WarningOutlined
                    size={20}
                    style={{
                      marginRight: '8px',
                      verticalAlign: 'text-bottom',
                      color: 'red',
                    }}
                  />
                </Span>
                <ErrorMessage>
                  {errors.email ? <p>{errors.email[0]}</p> : <></>}
                  {errors.password ? <p>{errors.password[0]}</p> : <></>}
                  {errors.error ? <p>{errors.error}</p> : <></>}
                </ErrorMessage>
              </ErrorContainer>
            ) : (
              <></>
            )}

            <Button type='primary' block onClick={handleSubmit}>
              <Spin />
              LOGIN
            </Button>
          </Form>
        </RightContainer>
      </InnerContainer>

    </Container>

  );
};

export default Login;
