import React, { useState } from 'react';
import { Input } from 'antd';

const Test = () => {
    const [comment, setComment] = useState('');

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        // Code to submit comment
        console.log('Submitted comment:', comment);
        // Reset comment input
        setComment('');
    };

    return (
        <div>
            <Input.TextArea
                value={comment}
                onChange={handleInputChange}
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Write a comment..."
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Test;
