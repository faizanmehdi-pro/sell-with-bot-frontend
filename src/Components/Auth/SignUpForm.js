import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../apis/AuthForm/signUp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Loader } from "./LoginForm";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Styled components (same as before)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
  min-height: 100vh;
`;

const SignupBox = styled.div`
  text-align: center;
  max-width: 700px;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
  margin-bottom: 20px;
  text-align: left;
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
    color: #007bff;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
  align-self: start;

  input {
    margin-right: 8px;
  }

  a {
    color: #007bff;
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
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const LinkText = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 10px;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: 5px 2px;
`;

// Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: Yup.string().required("Phone is required"),
  industry: Yup.string().required("Industry is required"),
  software: Yup.string().required("Software is required"),
  referralSource: Yup.string().required("Referral source is required"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      industry: values.industry,
      software: values.software,
      industry_about: values.referralSource,
      terms_accepted: values.termsAccepted,
    };

    try {
      const response = await signupUser(payload);
      toast.success(response.message || "Please verify your email with the OTP sent.!");
      navigate("/verify-otp", { state: { email: values.email } });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <SignupBox>
        <Heading>Sell with Bot</Heading>
        {error && <SubText style={{ color: "red" }}>{error}</SubText>}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            industry: "",
            software: "",
            referralSource: "",
            termsAccepted: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <CombinedFields>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Field as={Input} type="text" name="firstName" placeholder="Enter First Name" />
                  <ErrorMessage name="firstName" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Last Name *</Label>
                  <Field as={Input} type="text" name="lastName" placeholder="Enter Last Name" />
                  <ErrorMessage name="lastName" component={ErrorText} />
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

              <CombinedFields>
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

                <FormGroup>
                  <Label>Industry *</Label>
                  <Field as={Select} name="industry">
                    <option value="">Select Your Industry</option>
                    <option value="fitness">Fitness</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="mortgage">Mortgage</option>
                    <option value="coaching_consulting">Coaching & Consulting</option>
                    <option value="solar_renewable_energy">Solar & Renewable Energy</option>
                    <option value="ecommerce_retail">E-commerce & Retail</option>
                    <option value="healthcare_wellness">Healthcare & Wellness</option>
                    <option value="finance_insurance">Finance & Insurance</option>
                    <option value="marketing_advertising">Marketing & Advertising</option>
                    <option value="technology_software">Technology & Software</option>
                    <option value="education_online_courses">Education & Online Courses</option>
                    <option value="automotive">Automotive</option>
                    <option value="legal_services">Legal Services</option>
                    <option value="construction_home_services">Construction & Home Services</option>
                    <option value="hospitality_travel">Hospitality & Travel</option>
                    <option value="others">Other</option>
                  </Field>
                  <ErrorMessage name="industry" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Software *</Label>
                  <Field as={Select} name="software">
                    <option value="">Select CRM</option>
                    <option value="GoHighLevel">GoHighLevel</option>
                  </Field>
                  <ErrorMessage name="software" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>How Did You Hear About Us? *</Label>
                  <Field as={Select} name="referralSource">
                    <option value="">Select Option</option>
                    <option value="google_search">Google Search</option>
                    <option value="ads">Ads</option>
                    <option value="youtube">YouTube Video</option>
                    <option value="referral">Referral from a Friend</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter_x">Twitter/X</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook_instagram">Facebook/Instagram</option>
                    <option value="webinar">Webinar/Live Event</option>
                    <option value="other">Other (Please Specify)</option>
                  </Field>
                  <ErrorMessage name="referralSource" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CheckboxContainer>
                <Field type="checkbox" name="termsAccepted" />
                <span>
                  Yes, I agree to receive SMS updates and these{" "}
                  <Link to="/">Terms of Service</Link> and{" "}
                  <Link to="/">Privacy Policy</Link>.
                </span>
              </CheckboxContainer>
              <ErrorMessage name="termsAccepted" component={ErrorText} />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Create Free Account"}
              </Button>
            </StyledForm>
          )}
        </Formik>

        <LinkText>
          Already have an account? <Link to="/">Sign in</Link>
        </LinkText>
      </SignupBox>
    </Container>
  );
};

export default Signup;
