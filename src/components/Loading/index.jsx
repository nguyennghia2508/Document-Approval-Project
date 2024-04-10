import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <Spin size="large" style={styles.spin} />
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen với độ trong suốt 50%
        zIndex: 9999, // Đảm bảo hiển thị trên tất cả các element khác
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Chiều cao của toàn bộ viewport
    },
    spin: {
        animation: 'spin 1s linear infinite', // Animation: spin trong 1 giây
    },
};

export default Loading;
