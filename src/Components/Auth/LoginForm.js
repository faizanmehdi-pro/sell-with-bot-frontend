import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../Components/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/AuthForm/login";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import logo from "../../assets/images/Logo.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9faff;
  padding: 20px;
`;

const LoginBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;

  img {
    margin-bottom: 10px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => (props.error ? "#ff4d4f" : "#ccc")};
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => (props.error ? "#ff4d4f" : "#3182CE")};
    outline: none;
    box-shadow: ${(props) =>
      props.error
        ? "0 0 5px rgba(255, 77, 79, 0.5)"
        : "0 0 5px rgba(0, 123, 255, 0.5)"};
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: #ff4d4f;
  margin-top: 5px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #777;

  &:hover {
    color: #3182ce;
  }
`;

const LinkText = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 10px;

  a {
    color: #3182ce;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => (props.disabled ? "#ccc" : "#3182CE")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  }
`;

export const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const GoogleLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const response = await axios.post(
        "http://54.197.41.35/api/auth/google-login/",
        {
          id_token: idToken,
        }
      );

      toast.success("Google login successfully!");
      navigate("/dashboard");

      login(response?.data?.token);
      sessionStorage.setItem("user-ID", response?.data?.user_id);
      sessionStorage.setItem("userName", response?.data?.full_name);
      sessionStorage.setItem("firstName", response?.data?.first_name);
      sessionStorage.setItem("lastName", response?.data?.last_name);
      sessionStorage.setItem("online", response?.data?.online);
      sessionStorage.setItem("botNumber", response?.data?.bot_number);
      queryClient.removeQueries({ queryKey: ["botDetails"] });
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Google login failed");
    }
  };

  const handleError = () => {
    toast.error("Google login was unsuccessful. Try again.");
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.token);
      navigate("/dashboard");
      toast.success("User Login Successfully!");
      sessionStorage.setItem("user-ID", data?.user_id);
      sessionStorage.setItem("userName", data?.full_name);
      sessionStorage.setItem("firstName", data?.first_name);
      sessionStorage.setItem("lastName", data?.last_name);
      sessionStorage.setItem("online", data?.online);
      sessionStorage.setItem("botNumber", data?.bot_number);
      queryClient.removeQueries({ queryKey: ["botDetails"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Container>
      <LoginBox>
        <img src={logo} alt="logo" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  as={Field}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <PasswordWrapper>
                  <PasswordInput
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                  />
                  <EyeButton
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </EyeButton>
                </PasswordWrapper>
                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? <Loader /> : "Sign In"}
              </Button>
            </StyledForm>
          )}
        </Formik>

        <LinkText>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </LinkText>
        <LinkText>OR</LinkText>
        <GoogleLoginWrapper>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </GoogleLoginWrapper>
      </LoginBox>
    </Container>
  );
};

export default Login;
