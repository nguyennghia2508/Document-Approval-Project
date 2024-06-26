import React from 'react';
import './style.scss';
import { Image } from 'antd';
import moment from 'moment';

const PersonApproved = ({ options }) => {

    return (
        <div className='personApproved'>
            {options && options.length > 0 && options.map((value, index) => (
                <React.Fragment key={index}>
                    <table>
                        <tbody>
                            {value.PersonDuty === 1 ?
                                <>
                                    <tr>
                                        <th>Approver {value.Index}</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='personApproved-body'>
                                                <label>{value.ExecutionDate ? moment(value.ExecutionDate).format('DD/MM/YYYY HH:mm:ss') : ""}</label>
                                                {value.IsApprove ? (
                                                    <Image preview={false} style={{ width: "100px" }} src={'/approved.png'} />
                                                )
                                                    :
                                                    value.IsSign ? (
                                                        <Image preview={false} style={{ width: "100px" }} src={'/signed.png'} />
                                                    )
                                                        :
                                                        value.IsReject ? (
                                                            <Image preview={false} style={{ width: "100px" }} src={'/rejected.png'} />
                                                        )
                                                            : (
                                                                <Image preview={false} style={{ width: "100px" }} src='' />
                                                            )}
                                            </div>
                                            <span>{value.ApprovalPersonName}</span>
                                        </td>
                                    </tr>
                                </>
                                :
                                null
                            }
                            {value.PersonDuty === 2 ?
                                <>
                                    <tr>
                                        <th>Signer {value.Index}</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='personApproved-body'>
                                                <label>{value.ExecutionDate ? moment(value.ExecutionDate).format('DD/MM/YYYY HH:mm:ss') : ""}</label>
                                                {value.IsSign || value.IsReject ? (
                                                    <Image preview={false} style={{ width: "100px" }} src={
                                                        value.IsSign ? '/signed.png' : '/rejected.png'
                                                    } />
                                                ) : (
                                                    <Image preview={false} style={{ width: "100px" }} src='' />
                                                )}
                                            </div>
                                            <span>{value.ApprovalPersonName}</span>
                                        </td>
                                    </tr>
                                </>
                                :
                                null
                            }
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </div>
    );
};

export default PersonApproved;
