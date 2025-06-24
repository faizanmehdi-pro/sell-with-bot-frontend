import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDashboardUserByID } from "../../apis/Users/updateDashboardUserByID";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  margin: 15px;
  overflow: scroll;
  max-height: 98%;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #3182ce;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CombinedFields = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #3d3c42;
`;

const SubmitButton = styled(Button)`
  background: #3182ce;
  color: white;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const FormLoader = styled.div`
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

const UpdateUserModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone_number: value }));
  };

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateDashboardUserByID(id, data),
    onSuccess: () => {
      setLoading(false);
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["dashboard-users"]);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Invalid user ID");
      return;
    }

    const payload = { ...formData };
    if (!payload.password) delete payload.password;
    setLoading(true);

    mutation.mutate({ id: user.id, data: payload });
  };

  return (
    <Overlay isOpen={isOpen}>
      <Modal>
        <Title>Update User</Title>
        <StyledForm onSubmit={handleSubmit}>
          <CombinedFields>
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter Full Name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </FormGroup>
          </CombinedFields>

          <CombinedFields>
            <FormGroup>
              <Label>Phone</Label>
              <PhoneInput
                country={"us"}
                value={formData.phone_number}
                onChange={handlePhoneChange}
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
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <PasswordWrapper>
                <PasswordInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <EyeButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </EyeButton>
              </PasswordWrapper>
            </FormGroup>
          </CombinedFields>

          <Actions>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? <FormLoader /> : "Update"}
            </SubmitButton>
          </Actions>
        </StyledForm>
      </Modal>
    </Overlay>
  );
};

export default UpdateUserModal;
