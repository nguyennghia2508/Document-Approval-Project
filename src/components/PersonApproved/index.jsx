import React from 'react';
import './style.scss';
import { Image } from 'antd';

const PersonApproved = ({ options }) => {
    return (
        <div className='personApproved'>
            <table>
                <tbody>
                    {options && options.length > 0 && options.map((value, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <th>Approver {value.Index}</th>
                            </tr>
                            <tr>
                                <td>
                                    <div className='personApproved-body'>
                                        <label>asdasd</label>
                                        <Image style={{ width: "100px" }} src={value.IsApproved ? '/approved.png' : undefined} />
                                    </div>
                                    <span>{value.ApprovalPersonName}</span>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonApproved;
