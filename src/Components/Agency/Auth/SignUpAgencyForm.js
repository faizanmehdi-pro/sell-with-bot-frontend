import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Loader } from "./LoginAgencyForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "../../../assets/images/Logo.png";
import Select from "react-select";
import countryList from "react-select-country-list";
import { SignUpAgencyUser } from "../../../apis/Agency/Auth/signUpAgency";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
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
  max-width: 800px;
  width: 100%;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px 30px;
  
  @media (max-width: 990px) {
    max-width: 90%;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 20px 18px;
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
  position: relative;
  height: 100px;
`;

const FormGroupMulti = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
  height: 180px;
  margin-top: 5px;
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
  margin-top: 5px;
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  agencyName: Yup.string().required("Agency name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string().required("Phone number is required"),
  teamSize: Yup.string().required("Team size is required"),
  chatbotUsed: Yup.string().required("Required"),
  purpose: Yup.array().min(1, "Select at least one purpose"),
  preferredPlatform: Yup.array().min(1, "Select at least one platform"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const useCaseOptions = [
  { value: "sell_digital_products", label: "Sell my digital products" },
  { value: "automate_dms_lead_gen", label: "Automate DMs & lead gen" },
  { value: "close_deals", label: "Close deals on autopilot" },
  { value: "run_client_campaigns", label: "Run client campaigns" },
  { value: "resell_white_label", label: "Resell as white-label" },
];

const platformOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "website", label: "Website" },
  { value: "others", label: "Others" },
];

const SignupAgencyForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      agency_name: values.agencyName,
      email: values.email,
      password: values.password,
      country: values.country,
      phone_number: values.phone,
      team_size: values.teamSize,
      used_chatbot_before: values.chatbotUsed,
      website_or_social: values.website || "",
      referral_code: values.referralName || "",
      use_cases: values.purpose,
      preferred_platforms: values.preferredPlatform,
      terms_accepted: values.termsAccepted,
    };

    try {
      const res = await SignUpAgencyUser(payload);
      toast.success(res.message || "Please verify your email with the OTP sent.!");
      navigate("/verify-otp-agency", {
        state: { email: values.email, otp: res?.OTP },
      });
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
            firstName: "",
            lastName: "",
            agencyName: "",
            email: "",
            password: "",
            country: "",
            phone: "",
            teamSize: "",
            chatbotUsed: "",
            website: "",
            referralName: "",
            purpose: [],
            preferredPlatform: [],
            termsAccepted: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <StyledForm>
              <CombinedFields>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Field
                    as={Input}
                    name="firstName"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage name="firstName" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name *</Label>
                  <Field
                    as={Input}
                    name="lastName"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage name="lastName" component={ErrorText} />
                </FormGroup>
              </CombinedFields>
              <CombinedFields>
                <FormGroup>
                  <Label>Agency Name *</Label>
                  <Field
                    as={Input}
                    name="agencyName"
                    placeholder="Your business/agency name"
                  />
                  <ErrorMessage name="agencyName" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <Label>Referral Name</Label>
                  <Field
                    as={Input}
                    name="referralName"
                    placeholder="Enter referral name"
                  />
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
                  <Label>Create a Password *</Label>
                  <PasswordWrapper>
                    <Field
                      as={PasswordInput}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
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
                  <Label>Team Size *</Label>
                  <Field name="teamSize">
                    {({ form, field }) => {
                      const options = [
                        { value: "just_me", label: "Just me" },
                        { value: "2_5", label: "2–5 members" },
                        { value: "6_10", label: "6–10" },
                        { value: "10_plus", label: "10+" },
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
                  <Label>Website / Social Profile</Label>
                  <Field
                    as={Input}
                    name="website"
                    placeholder="Link to your website or social page"
                  />
                </FormGroup>
              </CombinedFields>

              <CombinedFields>
                <FormGroupMulti>
                  <Label>What do you need SellWithBot for? *</Label>
                  <CheckboxGroup>
                    {useCaseOptions.map(({ value, label }) => (
                      <label key={value}>
                        <input
                          type="checkbox"
                          value={value}
                          checked={values.purpose.includes(value)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              setFieldValue("purpose", [
                                ...values.purpose,
                                value,
                              ]);
                            } else {
                              setFieldValue(
                                "purpose",
                                values.purpose.filter((v) => v !== value)
                              );
                            }
                          }}
                        />{" "}
                        {label}
                      </label>
                    ))}
                  </CheckboxGroup>
                  <ErrorMessage name="purpose" component={ErrorText} />
                </FormGroupMulti>

                <FormGroupMulti>
                  <Label>Preferred Platform for Integration *</Label>
                  <CheckboxGroup>
                    {platformOptions.map(({ value, label }) => (
                      <label key={value}>
                        <input
                          type="checkbox"
                          value={value}
                          checked={values.preferredPlatform.includes(value)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              setFieldValue("preferredPlatform", [
                                ...values.preferredPlatform,
                                value,
                              ]);
                            } else {
                              setFieldValue(
                                "preferredPlatform",
                                values.preferredPlatform.filter(
                                  (v) => v !== value
                                )
                              );
                            }
                          }}
                        />{" "}
                        {label}
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

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Create My Agency Account"}
              </Button>
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
