import React from 'react';
import './style.scss';
import { Image } from 'antd';

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
                                                <label>asdasd</label>
                                                <Image style={{ width: "100px" }} src={value.IsApprove ? '/approved.png' : undefined} />
                                            </div>
                                            <span>{value.ApprovalPersonName}</span>
                                        </td>
                                    </tr>
                                </>
                                :
                                <>
                                    <tr>
                                        <th>Signer {value.Index}</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='personApproved-body'>
                                                <label>asdasd</label>
                                                <Image style={{ width: "100px" }} src={value.IsSign ? '/approved.png' : undefined} />
                                            </div>
                                            <span>{value.ApprovalPersonName}</span>
                                        </td>
                                    </tr>
                                </>
                            }

                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </div>
    );
};

export default PersonApproved;
