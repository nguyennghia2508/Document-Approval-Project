// import React from 'react';
// import { Button } from 'antd';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

const Test = () => {
    // const exportToExcel = () => {
    //     // Dữ liệu cần xuất ra Excel
    //     const data = [
    //         // Dữ liệu của bảng
    //         ['Header 1', 'Header 2', 'Header 3'],
    //         ['Data 1', 'Data 2', 'Data 3'],
    //         // Thêm các dòng dữ liệu khác nếu cần
    //     ];

    //     // Tạo workbook mới
    //     const workbook = XLSX.utils.book_new();
    //     // Tạo worksheet mới với tên là Sheet1
    //     const worksheet = XLSX.utils.aoa_to_sheet(data);
    //     // Thêm worksheet vào workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     // Chuyển workbook thành file Excel
    //     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     // Tạo blob từ dữ liệu Excel
    //     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    //     // Tạo tên file Excel
    //     const fileName = 'data.xlsx';
    //     // Tải xuống file Excel
    //     saveAs(blob, fileName);
    // };

    // return (
    //     <div>
    //         <h1>Test Component</h1>
    //         <Button onClick={exportToExcel}>Xuất ra Excel</Button>
    //     </div>
    // );
};

export default Test;