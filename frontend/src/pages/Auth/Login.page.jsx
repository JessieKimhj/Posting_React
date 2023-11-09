import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Input,
} from '@mantine/core';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  
  //If the user logged in alreaday, user cannot see the login page
  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={onLogin}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "20px",
            padding: "50px",
          }}
        >
          <Title>This is the login page</Title>
          <Input label = "email"
            placeholder="email"
            name="email"
            type="email"
            required
            style={{ minWidth: "320px", height: "26px" }}
          />
          <Input label = "password"
            placeholder="password"
            name="password"
            type="password"
            required
            style={{ minWidth: "320px", height: "26px" }}
          />
          <Button type="submit">login</Button>
          {authLoading ? <h2>Loading...</h2> : null}
        </div>
      </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
