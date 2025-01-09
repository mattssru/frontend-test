import React, { useState } from "react";
import { Form, Button, Schema, Message, useToaster } from "rsuite";
import { Link, useNavigate } from "react-router-dom";

const model = Schema.Model({
  username: Schema.Types.StringType().isRequired("Please enter your username."),
  password: Schema.Types.StringType().isRequired("Please enter your password."),
});

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formValue, setFormValue] = useState<{
    username: string;
    password: string;
  }>({
    username: "admin",
    password: "1234",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toaster = useToaster();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const mockUsername = "admin";
    const mockPassword = "1234";
    if (
      formValue.username === mockUsername &&
      formValue.password === mockPassword
    ) {
      onLogin(formValue.username, formValue.password);
      setErrorMessage(null);
      toaster.push(
        <Message showIcon type="success" closable>
          Login successful!
        </Message>,
        { placement: "topCenter" }
      );
      navigate("/admin", { replace: true });
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl mb-10">ระบบลงทะเบียนเข้าร่วมงาน</h1>
      <div className="flex flex-col md:flex-row-reverse shadow-xl md:max-w-5xl w-full">
        <div className="flex items-center justify-center bg-violet-600 py-14 px-12 md:w-1/2">
          <div className="text-center w-full">
            <h2 className="text-white text-3xl mb-4">Welcome to Event</h2>
            <p className="text-white text-md mb-4">
              For users, registration is required to join the event.
            </p>
            <Link
              to="/user"
              className="inline-flex items-center justify-center text-white font-semibold border border-white h-12 px-4 rounded-full hover:bg-white hover:text-black"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="bg-white py-14 px-12 rounded md:w-1/2">
          <h1 className="text-2xl font-semibold mb-5">Sign in for Admin</h1>
          <div className="bg-violet-50 border-l-4 border-violet-400 px-3 py-3.5 rounded mb-5">
            <p className="text-sm text-violet-700">
              Use username: <strong>admin</strong> / password:{" "}
              <strong>1234</strong>
            </p>
          </div>
          <Form
            model={model}
            formValue={formValue}
            onChange={(value) => setFormValue(value as typeof formValue)}
            onSubmit={handleSubmit}
            fluid
          >
            <Form.Group>
              <Form.ControlLabel className="font-semibold">
                USERNAME
              </Form.ControlLabel>
              <Form.Control
                name="username"
                placeholder="Enter your username"
                className="h-12 !bg-neutral-100 !rounded-full !outline-none !shadow-none"
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel className="font-semibold">
                PASSWORD
              </Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 !bg-neutral-100 !rounded-full !outline-none !shadow-none"
              />
            </Form.Group>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <div className="flex justify-center">
              <Button
                appearance="primary"
                type="submit"
                className="!text-md !font-semibold !rounded-full h-12 w-full !bg-violet-600"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
