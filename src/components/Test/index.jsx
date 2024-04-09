// import React from 'react';
// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
// import moment from 'moment';


// const Test = () => {
//     const handleDownload = () => {
//         const dataArray = [
//             ['name', 'Age'],
//             ['john', 28],
//             ['asdasd', 52]
//         ];

//         const wb = XLSX.utils.book_new();
//         const ws = XLSX.utils.aoa_to_sheet(dataArray);
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//         // Sử dụng XLSX.write để tạo buffer
//         const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//         // Tạo blob từ dữ liệu buffer
//         const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });


//         // const today = new Date();
//         const date = moment().format('DD/MM/YYYY')
//         // Tạo tên file với ngày hiện tại
//         const fileName = `DOC_REPORT_${date}.xlsx`;
//         // Lưu blob dưới dạng file Excel
//         FileSaver.saveAs(blob, fileName);
//     };

//     return (
//         <button onClick={handleDownload}>Export to Excel</button>
//     );
// };

// export default Test;
