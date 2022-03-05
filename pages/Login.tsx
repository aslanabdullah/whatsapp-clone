import styled from "styled-components";
import Head from "next/head";
import Button from '@mui/material/Button';
import { auth, signInWithPopup, providerGoogle, GoogleAuthProvider} from "../firebase"

function Login() {

  const signIn = async function (): Promise<void>  {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      //const credential = GoogleAuthProvider.credentialFromError(error);
    }    
  }

  return (
    <>     
      <Container>
        <Head>
          <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"/>
          <Button onClick={signIn} variant="outlined">Sign in With Google</Button>
        </LoginContainer>
      </Container>
    </>
  );
}

export default Login

const Container  = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer  = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo  = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;


