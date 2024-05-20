import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import './style.scss'
import { Controller, useForm } from 'react-hook-form';
import InputSelection from '../InputSelection';
import { Value } from 'sass';
import MultiSeLection from '../MultiSelection';
import MultiSelection from '../MultiSelection';
import { values } from 'pdf-lib';

const { TextArea } = Input;

const ModalApproval = ({
  isOpen,
  isSubmit,
  isClose,
  isForward,
  isShare,
  listUser,
  name,
  status,
}) => {

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    mode: "onsubmit",

  });
  const [approvalText, setApprovalText] = useState("");
  const [personForward, setPersonForward] = useState("")
  const [personShare, setPersonShare] = useState([])


  useEffect(() => {
    if (status) {
      setValue("status", status)
    }
  }, [status])

  useEffect(() => {
    if (isClose) {
      setApprovalText("")
      setPersonForward("")
      setPersonShare([])
    }
  }, [isClose])

  const getTitle = () => {
    if (status === 2) {
      return "Approve";
    } else if (status === 3) {
      return "Sign";
    } else if (status === 4) {
      return "Reject";
    } else if (status === 5) {
      return "Forward";
    } else if (status === 6) {
      return "Share To";
    }
  };

  const handleChange = (e, field) => {
    field.onChange(e.target.value);
    setApprovalText(e.target.value);
  };

  const onSubmit = (data) => {
    isSubmit(data)
    setApprovalText("")
    reset({ status: status })
  };
  const handleForward = (value) => {
    setPersonForward(value)
  }
  const handleShare = (value) => {
    setPersonShare(value);
  }

  const handleDisable = (approvalText, personForward, personShare) => {
    if (isShare && personShare.length > 0) {
      return false
    }
    else if (approvalText.length > 0 && personForward) {
      return false
    }
    else if (approvalText.length > 0 && !isForward && !isShare) {
      return false
    }
    else {
      return true
    }
  }

  return (
    <div className='modal'>
      <Modal
        title={getTitle()}
        centered
        visible={isOpen}
        onOk={handleSubmit} // Gọi hàm handleSubmit khi nhấn nút OK
        onCancel={isClose}
        destroyOnClose={true}
        footer={[
          <Button key="submit" onClick={handleSubmit(onSubmit)} className='modalSubmit'
            disabled={handleDisable(approvalText, personForward, personShare)}
          >
            {getTitle()}
          </Button>,

          <Button key="cancel" onClick={isClose} className='modalCancel'>Cancel</Button>,
        ]}
      >
        <form>
          {isForward &&
            <InputSelection
              name="selectUser"
              control={control}
              options={listUser}
              onChange={handleForward}

            />
          }{
            isShare &&
            <MultiSeLection
              name="selectUser"
              control={control}
              options={listUser}
              setValue={setValue}
              onChange={handleShare}
            />
          }
          {!isShare &&
            <Controller
              name={name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  rows={4}
                  placeholder="Enter text"
                  value={approvalText}
                  onChange={(e) => handleChange(e, field)}
                />
              )}
            />
          }
        </form>
      </Modal >
    </div >
  )
}

export default ModalApproval;
