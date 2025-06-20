import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #3182ce;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CombinedFields = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #3d3c42;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  color: #3d3c42;
  outline: none;
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #3d3c42;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  color: #3d3c42;
  outline: none;
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
`;

const UpdateUserModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    user_type: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        user_type: user.user_type || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    // const mutation = useMutation({
    //   mutationFn: updateBot,
    //   onSuccess: () => {
    //     toast.success("User updated successfully!");
    //   },
    //   onError: () => toast.error("Failed to Update User!"),
    // });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Update user:', formData);
    // Call your API here
    onClose();
  };

  const defaultUserType = user?.user_type;

  const userTypeOptions = [
    defaultUserType, // Ensure the current user_type shows up
    'Account-Admin',
  ].filter((type, index, arr) => arr.indexOf(type) === index); // Remove duplicates

  return (
    <Overlay isOpen={isOpen}>
      <Modal>
        <Title>Update User</Title>
        <Form onSubmit={handleSubmit}>
            <CombinedFields>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          </CombinedFields>
          <CombinedFields>
          <Input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <Select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
          >
            {userTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          </CombinedFields>

          <Actions>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
            <SubmitButton type="submit">Update</SubmitButton>
          </Actions>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default UpdateUserModal;
