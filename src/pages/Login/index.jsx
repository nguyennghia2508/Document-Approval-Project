import styled from 'styled-components';
import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    225deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(131, 164, 179, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const InnerContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 56rem;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 16px;
  background: #fff;
`;

const LeftContainer = styled.div`
  display: block;
  width: 50%;
  height: 100%;
`;

const InnerLeftContainer = styled.div`
  display: inline-block;
  padding: 0.5rem;
`;

const Image = styled.img`
  max-width: 400px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
`;

const RightContainer = styled.div`
  width: 50%;
  padding: 0px 4rem;
  margin: 1rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
`;

const LoginButton = styled.button`
  border-radius: 0.5rem;
  border: 1px solid black;
  color: white;
  padding: 4px;
  background-image: linear-gradient(to top right, #ff0, #800080);
  background-color: #ff0;
`;

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <InnerLeftContainer>
            <Image src='https://plus.unsplash.com/premium_photo-1683751113164-ba68afd98f6e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></Image>
          </InnerLeftContainer>
        </LeftContainer>
        <RightContainer>
          <Title>LOGIN</Title>
          <Form>
            <Input placeholder='Email' />
            <Space
              direction='horizontal'
              style={{ width: '100%', display: 'inline-block' }}
            >
              <Input.Password
                placeholder='Password'
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </Space>

            <Button type='primary' block onClick={() => navigate('/')}>
              LOGIN
            </Button>
          </Form>
        </RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default Login;
