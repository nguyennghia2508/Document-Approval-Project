import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background: #42e6f5;
`;

const InnerContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 56rem;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  background: #fff;
`;

const LeftContainer = styled.div`
display: block
  width: 50%;
  height: 100%;
`;

const InnerLeftContainer = styled.div`
  display: inline-block;
  padding: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

const Email = styled.div``;

const Password = styled.div``;

const Input = styled.input`
  display: block;
  width: 100%;
`;

const LoginButton = styled.button`
  border-radius: 0.5rem;
  border: 1px solid black
  color: white;
`;

const Login = () => {
  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <InnerLeftContainer>
            <Image src='https://images.unsplash.com/photo-1609692814859-9ebe00526a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'></Image>
          </InnerLeftContainer>
        </LeftContainer>
        <RightContainer>
          <Title>LOGIN</Title>
          <Form>
            <Email>
              <label>Email</label>
              <Input></Input>
            </Email>
            <Password>
              <label>Password</label>
              <Input></Input>
            </Password>
            <LoginButton>LOGIN</LoginButton>
          </Form>
        </RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default Login;
