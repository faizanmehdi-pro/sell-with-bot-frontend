import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useQueryClient } from '@tanstack/react-query';


// Styled components (same as before)
const Container = styled.div`
  background: #fff;
  padding: 20px;
`;

const SignupBox = styled.div`
  text-align: center;
  width: 100%;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #4caf50;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: left;
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
  position: relative;
  height: 100px;
`;

const CombinedFields = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  outline: none;
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
  font-size: 20px;
  color: #777;

  &:hover {
    color: #3182CE;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  padding: 12px 20px;
  background: ${(props) => (props.disabled ? "#ccc" : "#3182ce")};
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

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: 5px 2px;
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;



// Yup validation schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: Yup.string().required("Phone is required"),
});

const CreateUser = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    // const payload = {
    //   first_name: values.fullName,
    //   last_name: values.lastName,
    //   email: values.email,
    //   password: values.password,
    //   phone_number: values.phone,
    //   industry: values.industry,
    //   software: values.software,
    //   industry_about: values.referralSource,
    //   terms_accepted: values.termsAccepted,
    // };

    // try {
    //   const response = await signupUser(payload);
    //   toast.success(response.message || "Please verify your email with the OTP sent.!");
    //   navigate("/verify-otp", { state: { email: values.email } });
    // } catch (err) {
    //   toast.error(err.message || "Something went wrong");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <Container>
      <SignupBox>
        {/* <Heading>Sell with Bot</Heading> */}
        {error && <SubText style={{ color: "red" }}>{error}</SubText>}

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <CombinedFields>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Field as={Input} type="text" name="fullName" placeholder="Enter Full Name" />
                  <ErrorMessage name="fullName" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Phone *</Label>
                  <Field name="phone">
                    {({ field, form }) => (
                      <PhoneInput
                        country={'us'} // Default country
                        value={field.value}
                        onChange={(value) => form.setFieldValue('phone', value)}
                        inputStyle={{
                          width: '100%',
                          height: '44px',
                          padding: '12px 12px 12px 50px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                          fontSize: '16px',
                        }}
                        buttonStyle={{
                          border: 'none',
                          background: 'transparent',
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Field as={Input} type="email" name="email" placeholder="Enter Email Address" />
                  <ErrorMessage name="email" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Password *</Label>
                  <PasswordWrapper>
                    <Field
                      as={PasswordInput}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                    />
                    <EyeButton type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </EyeButton>
                  </PasswordWrapper>
                  <ErrorMessage name="password" component={ErrorText} />
                </FormGroup>
              </CombinedFields>


              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Create User"}
              </Button>
            </StyledForm>
          )}
        </Formik>
      </SignupBox>
    </Container>
  );
};

export default CreateUser;
