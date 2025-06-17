import React, { useRef } from "react";
import styled from "styled-components";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { verifyOtpCode } from "../../apis/AuthForm/verifyOtpCode";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9faff;
`;

const OtpBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #3182CE;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OtpInputs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

const OtpInput = styled.input`
  width: 45px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #3182CE;

  &:focus {
    border-color: #3182CE;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
  text-align: left;
  width: 100%;
`;

// Validation Schema
const validationSchema = Yup.object({
    otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
        .length(6, "OTP must be 6 digits"),
});


const VerifyOTP = () => {
    const location = useLocation();
    const email = location.state?.email;

    const navigate = useNavigate();
    const inputsRef = useRef([]);

    const mutation = useMutation({
        mutationFn: ({ email, otp }) => verifyOtpCode({ email, otp }),
        onSuccess: () => {
            toast.success("Your Account Registered Successfully!");
            navigate("/");
        },
        onError: (error) => {
            const message = error.message?.toLowerCase();
            if (message === "invalid email or otp") {
                toast.error("Invalid OTP");
            } else {
                toast.error(message || "Verification failed or Network Issue");
            }
        },
    });

    return (
        <Container>
            <OtpBox>
                <Heading>Verify OTP</Heading>
                <Formik
                    initialValues={{ otp: Array(6).fill("") }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const joinedOtp = values.otp.join("");
                        mutation.mutate({ email, otp: joinedOtp });
                    }}
                >
                    {({ values, errors, touched, setFieldValue, handleBlur }) => (
                        <StyledForm>
                            <FieldArray name="otp">
                                {() => (
                                    <>
                                        <OtpInputs>
                                            {values.otp.map((_, index) => (
                                                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <OtpInput
                                                        type="text"
                                                        maxLength={1}
                                                        value={values.otp[index]}
                                                        ref={(el) => (inputsRef.current[index] = el)}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (/^\d?$/.test(val)) {
                                                                setFieldValue(`otp[${index}]`, val);
                                                                if (val && index < 5) {
                                                                    inputsRef.current[index + 1]?.focus();
                                                                }
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Backspace" && !values.otp[index] && index > 0) {
                                                                inputsRef.current[index - 1]?.focus();
                                                            }
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                    {touched.otp?.[index] && errors.otp?.[index] && (
                                                        <ErrorText>{errors.otp[index]}</ErrorText>
                                                    )}
                                                </div>
                                            ))}
                                        </OtpInputs>
                                        {typeof errors.otp === "string" && (
                                            <ErrorText style={{ textAlign: "center", marginTop: "-10px" }}>{errors.otp}</ErrorText>
                                        )}
                                    </>
                                )}
                            </FieldArray>

                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? <Loader /> : "Verify"}
                            </Button>
                        </StyledForm>
                    )}
                </Formik>

            </OtpBox>
        </Container>
    );
};

export default VerifyOTP;