import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../../apis/AuthForm/signUp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Loader } from "./LoginAgencyForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "../../../assets/images/Logo.png";
import Select from "react-select";
import countryList from "react-select-country-list";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
  min-height: 100vh;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    max-width: 400px;
  }

  @media (max-width: 500px) {
    img {
      max-width: 90%;
    }
  }
`;

const SignupBox = styled.div`
  text-align: center;
  max-width: 700px;
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

const FormGroupMulti = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
  height: 180px;
`;

const FormGroupDiff = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
`;

const CombinedFields = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
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
    color: #3182ce;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  align-self: start;
  text-align: left;

  input {
    margin-right: 8px;
  }

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
  margin-top: 20px;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
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

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: 5px 2px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  agencyName: Yup.string().required("Agency name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6).required("Password is required"),
  country: Yup.string().required("Country is required"),
  teamSize: Yup.string().required("Team size is required"),
  purpose: Yup.array().min(1, "Select at least one purpose"),
  chatbotUsed: Yup.string().required("Required"),
  preferredPlatform: Yup.array().min(1, "Select at least one platform"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignupAgencyForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      full_name: values.fullName,
      agency_name: values.agencyName,
      email: values.email,
      phone_number: values.phone,
      website: values.website || "",
      country: values.country,
      team_size: values.teamSize,
      purpose: values.purpose,
      chatbot_used: values.chatbotUsed,
      preferred_platform: values.preferredPlatform,
      password: values.password,
      referral_name: values.referralName || "",
      terms_accepted: values.termsAccepted,
    };

    try {
      const res = await signupUser(payload);
      toast.success(res.message || "Signup successful!");
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
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>

        <Formik
          initialValues={{
            fullName: "",
            agencyName: "",
            email: "",
            phone: "",
            website: "",
            country: "",
            teamSize: "",
            purpose: [],
            chatbotUsed: "",
            preferredPlatform: [],
            password: "",
            referralName: "",
            termsAccepted: false,
          }}
          // validationSchema={validationSchema}
          // onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <StyledForm>
              <CombinedFields>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Field
                    as={Input}
                    name="fullName"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="fullName" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Agency Name *</Label>
                  <Field
                    as={Input}
                    name="agencyName"
                    placeholder="Your business/agency name"
                  />
                  <ErrorMessage name="agencyName" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your work email"
                  />
                  <ErrorMessage name="email" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Field name="phone">
                    {({ field, form }) => (
                      <PhoneInput
                        country={"us"}
                        value={field.value}
                        onChange={(value) => form.setFieldValue("phone", value)}
                        inputStyle={{
                          width: "100%",
                          height: "44px",
                          padding: "12px 12px 12px 50px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          fontSize: "16px",
                        }}
                        buttonStyle={{
                          border: "none",
                          background: "transparent",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Country *</Label>
                  <Field name="country">
                    {({ form, field }) => {
                      const options = countryList().getData();
                      return (
                        <Select
                          options={options}
                          name="country"
                          value={options.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            form.setFieldValue("country", option.value)
                          }
                          placeholder="Select your country"
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: "100%",
                              height: "44px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }),
                          }}
                          isSearchable
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="country" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label>Team Size *</Label>
                  <Field name="teamSize">
                    {({ form, field }) => {
                      const options = [
                        { value: "Just me", label: "Just me" },
                        { value: "2–5 members", label: "2–5 members" },
                        { value: "6–10", label: "6–10" },
                        { value: "10+", label: "10+" },
                      ];
                      return (
                        <Select
                          options={options}
                          name="teamSize"
                          value={options.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            form.setFieldValue("teamSize", option.value)
                          }
                          placeholder="Select team size"
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: "100%",
                              height: "44px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }),
                          }}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="teamSize" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Website / Social Profile</Label>
                  <Field
                    as={Input}
                    name="website"
                    placeholder="Link to your website or social page"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Have you used a chatbot tool before? *</Label>
                  <Field name="chatbotUsed">
                    {({ form, field }) => {
                      const options = [
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ];
                      return (
                        <Select
                          options={options}
                          name="chatbotUsed"
                          value={options.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            form.setFieldValue("chatbotUsed", option.value)
                          }
                          placeholder="Select option"
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: "100%",
                              height: "44px",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }),
                          }}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="chatbotUsed" component={ErrorText} />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroup>
                  <Label>Create a Password *</Label>
                  <PasswordWrapper>
                    <Field
                      as={PasswordInput}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                    />
                    <EyeButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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

                <FormGroup>
                  <Label>Referral Name</Label>
                  <Field
                    as={Input}
                    name="referralName"
                    placeholder="Optional"
                  />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroupMulti>
                  <Label>What do you need SellWithBot for? *</Label>
                  <CheckboxGroup>
                    {[
                      "Sell my digital products",
                      "Automate DMs & lead gen",
                      "Close deals on autopilot",
                      "Run client campaigns",
                      "Resell as white-label",
                    ].map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          value={item}
                          checked={values.purpose.includes(item)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              setFieldValue("purpose", [
                                ...values.purpose,
                                item,
                              ]);
                            } else {
                              setFieldValue(
                                "purpose",
                                values.purpose.filter((v) => v !== item)
                              );
                            }
                          }}
                        />{" "}
                        {item}
                      </label>
                    ))}
                  </CheckboxGroup>
                  <ErrorMessage name="purpose" component={ErrorText} />
                </FormGroupMulti>

                <FormGroupMulti>
                  <Label>Preferred Platform for Integration *</Label>
                  <CheckboxGroup>
                    {[
                      "Instagram",
                      "WhatsApp",
                      "Facebook",
                      "Website",
                      "Others",
                    ].map((platform) => (
                      <label key={platform}>
                        <input
                          type="checkbox"
                          value={platform}
                          checked={values.preferredPlatform.includes(platform)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              setFieldValue("preferredPlatform", [
                                ...values.preferredPlatform,
                                platform,
                              ]);
                            } else {
                              setFieldValue(
                                "preferredPlatform",
                                values.preferredPlatform.filter(
                                  (v) => v !== platform
                                )
                              );
                            }
                          }}
                        />{" "}
                        {platform}
                      </label>
                    ))}
                  </CheckboxGroup>
                  <ErrorMessage
                    name="preferredPlatform"
                    component={ErrorText}
                  />
                </FormGroupMulti>
              </CombinedFields>

              <FormGroupDiff>
                <CheckboxContainer>
                  <Field type="checkbox" name="termsAccepted" />
                  <span>
                    I agree to the <Link to="/">terms & privacy policy</Link>.
                  </span>
                </CheckboxContainer>
                <ErrorMessage name="termsAccepted" component={ErrorText} />
              </FormGroupDiff>

              <Button>
                Create My Agency Account
              </Button>

              {/* <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Create My Agency Account"}
              </Button> */}
            </StyledForm>
          )}
        </Formik>

        <LinkText>
          Already have an account? <Link to="/agency">Sign in</Link>
        </LinkText>
      </SignupBox>
    </Container>
  );
};

export default SignupAgencyForm;
