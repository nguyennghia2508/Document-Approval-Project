import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Input, Space, Spin } from 'antd';
import authUtils from "../../utils/authUtils"

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
import departmentApi from '../../api/departmentApi';
import { setListDepartment } from '../../redux/features/departmenttSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [errors, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) {

      } else {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

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
        Email: email,
        Password: password,
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
    console.log(user)
    try {
      const response = await authApi.login(user);
      if (response.state === "true") {
        localStorage.setItem('token', response.token)

        const departments = await departmentApi.getAllDepartment()
        dispatch(setListDepartment(departments.departmentHierarchy))

        navigate("/")
        toast.success(response.msg)
      }
      else {
        navigate("/login")
        toast.error(response.msg)
      }
    } catch (error) {
      console.log(error);
      handleError(error);
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
