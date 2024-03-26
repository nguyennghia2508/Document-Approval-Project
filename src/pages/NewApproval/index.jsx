// import React from 'react'
import InputText from '../../components/InputText'
import InputSelection from '../../components/InputSelection'
import InputSearch from '../../components/InputSearch'
import React, { useState } from 'react';
import './style.scss'
import FileUpload from '../../components/FileUpload';
import { Divider } from 'antd';
import ButtonSelect from '../../components/ButtonSelect';
import TitleBody from '../../components/TitleBody';




const New = () => {
    const [username, setUsername] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const [selectedOption, setSelectedOption] = useState('option1');
    const handleSelectionChange = (value) => {
        setSelectedOption(value);
    };
    const selectionOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];





    return (
        <>
            <TitleBody label="eDocument Approval" isForm={true} isApproval={false} />
            <div className='newapproval-container'>
                <div className="new-title"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                <div className='input'>
                    <div className='input-top'>
                        <div className='input-element'>
                            <InputText label="Applicant" value={username} onChange={handleUsernameChange} required disabled={true} />
                        </div>
                        <div className='input-element'>
                            <InputSelection label="Department" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                        </div>
                        <div className='input-element'>
                            <InputSelection label="Section" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                        </div>
                        <div className='input-element'>
                            <InputSelection label="Section" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                        </div>

                    </div>
                    <div className='input-bot'>
                        <div className='input-element'>
                            <InputSelection label="Categories" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                        </div>
                        <div className='input-element'>
                            <InputSelection label="Document Type" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                        </div>
                        <div className='input-element'>
                            <InputSearch label="Related Proposal (if any)" />
                        </div>
                        <div className='input-element'>
                            <InputText label="Date" value={username} onChange={handleUsernameChange} required disabled={true} />
                        </div>

                    </div>
                </div>
                <div className='document'>
                    <div className='subject'>
                        <InputText label="Subject" value={username} onChange={handleUsernameChange} required placeho />
                    </div>
                    <div className='content'>
                        <InputText label="Content summary" value={username} onChange={handleUsernameChange} required />
                    </div>
                    <div className='approve-sign'>
                        <FileUpload label="Documents to be approved/signed" type="primary" />
                    </div>
                    <div className='reference'>
                        <FileUpload label="Documents for reference" type="primary" />

                    </div>

                </div>
                <Divider style={{
                    backgroundColor: 'GREY',
                    height: '3px',
                    margin: '20px 0',
                    border: 'none'
                }} />

            </div>


            <div className='signapproval-container'>
                <label className='label' style={{ fontWeight: "bold", }}>Aprover</label>

                <div className='approval-email' style={{ paddingBottom: "20px" }}>
                    <ButtonSelect label1="ASD" label2="2132" />
                </div>
                <label className='label' style={{ fontWeight: "bold", }}>Aprover</label>

                <div className='sign-email'>
                    <ButtonSelect label1="ASD" label2="2132" />
                </div>
            </div>
        </>



    );
};



export default New