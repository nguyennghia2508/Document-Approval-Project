import styled from 'styled-components';

export const Container = styled.div`
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

export const InnerContainer = styled.div`
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

export const LeftContainer = styled.div`
  display: block;
  width: 50%;
  height: 100%;
`;

export const InnerLeftContainer = styled.div`
  display: inline-block;
  padding: 0.5rem;
`;

export const Image = styled.img`
  max-width: 400px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
`;

export const RightContainer = styled.div`
  width: 50%;
  padding: 0px 4rem;
  margin: 1rem;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
`;

export const Span = styled.span`
  align-items: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity));
  border-radius: 8px;
  padding: 16px;
`;

export const ErrorMessage = styled.div`
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    max-width: 250px;
    width: 100%:
    font-size: 12px;
    line-height: 16px;
`;
