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
} from '@mantine/core';
import classes from './Login.page.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

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
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text> */}
      <form onSubmit={onLogin}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mail.com" name="email" type="email" required />
          <PasswordInput label="Password" placeholder="Your password" name="password" type="password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="sunmit" fullWidth mt="xl">
            Sign in
          </Button>
          {authLoading ? <h2>Loading…</h2> : null}
        </Paper>
      </form>
    </Container>
  );
};

export default LoginPage;
