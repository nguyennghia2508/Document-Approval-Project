import React from 'react'
import './style.scss'
import { Image } from 'antd';

const PersonApproved = () => {
    return (
        <div className='personApproved'>
            <table>
                <tr>
                    <th>Approver 1</th>
                </tr>
                <tr>
                    <td>
                        <div className='personApproved-body'>
                            <label>asdasd</label>
                            <Image style={{ width: "100px" }} src='/approved.png'></Image>
                        </div>
                        <span>Nguyễn Minh Nhân</span>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default PersonApproved