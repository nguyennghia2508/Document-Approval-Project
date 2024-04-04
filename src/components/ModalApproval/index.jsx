import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import './style.scss'
import { Controller } from 'react-hook-form';

const { TextArea } = Input;

const ModalApproval = ({
  isOpen,
  isSubmit,
  isClose,
  control,
  name
}) => {
  const [approvalText, setApprovalText] = useState("");

  const handleChange = (e, field) => {
    field.onChange(e.target.value);
    setApprovalText(e.target.value);
  };

  const handleSubmit = () => {
    isSubmit(approvalText);
  };

  return (
    <div className='modal'>
      <Modal
        title="Approval1 Modal"
        centered
        visible={isOpen}
        onOk={handleSubmit} // Gọi hàm handleSubmit khi nhấn nút OK
        onCancel={isClose}
        footer={[
          <Button key="submit" onClick={handleSubmit} className='modalSubmit'>Approval</Button>,
          <Button key="cancel" onClick={isClose} className='modalCancel'>Cancel</Button>,
        ]}
      >
        <form>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                {...field}
                rows={4}
                placeholder="Enter approval text"
                onChange={(e) => handleChange(e, field)}
              />
            )}
          />
        </form>
      </Modal>
    </div>
  )
}

export default ModalApproval;
