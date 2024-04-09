import React from 'react';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';

const Excel = ({ dataArray }) => {
    const handleDownload = () => {
        // Tạo workbook mới
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');



        dataArray.forEach((row) => {
            worksheet.addRow(row);
        });

        // Thiết lập style in đậm cho ô A1
        worksheet.mergeCells('A1:P1');
        worksheet.mergeCells('A2:P2');
        worksheet.mergeCells('A3:P3');
        worksheet.mergeCells('A4:P4');



        const cellA1 = worksheet.getCell('A1');
        const cellA2 = worksheet.getCell('A2');

        //A-P
        for (let col = 'A'; col <= 'P'; col = String.fromCharCode(col.charCodeAt(0) + 1)) {
            const column = worksheet.getColumn(col);
            column.width = 27.86; // Thiết lập chiều rộng (đơn vị là ký tự, bạn có thể điều chỉnh theo nhu cầu)
            column.alignment = { horizontal: 'center', vertical: 'middle' }
            column.font = {
                name: 'Times New Roman'
            }
        }

        // A5 Bold
        for (let col = 1; col <= 16; col++) { // Cột A đến P tương ứng với 16 cột
            const cell = worksheet.getCell(`${String.fromCharCode(64 + col)}5`);
            cell.font = {
                bold: true,
                size: 13,
                name: 'Times New Roman'
            };

            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Căn giữa dữ liệu
        }



        cellA1.font = { bold: true, size: 36, name: 'Times New Roman' }; // Font in đậm và kích thước 20
        cellA1.alignment = { horizontal: 'center', vertical: 'middle' }; // Căn giữa
        cellA2.font = { bold: true, size: 14, name: 'Times New Roman' }; // Font in đậm và kích thước 20
        cellA2.alignment = { horizontal: 'center', vertical: 'middle' }; // Căn giữa

        worksheet.eachRow(row => {
            row.eachCell(cell => {
                cell.border = {};
            });
        });

        // Tạo tên file với ngày hiện tại
        const date = moment().format('YYYYMMDD_HHmmss');
        const fileName = `DOC_REPORT_${date}.xlsx`;

        // Lưu workbook dưới dạng file Excel
        workbook.xlsx.writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/octet-stream' });
                FileSaver.saveAs(blob, fileName);
            });
    };

    return (
        <Button onClick={handleDownload}>
            <VerticalAlignBottomOutlined style={{ transform: 'rotate(-90deg)' }} />
            Export to Excel
        </Button>
    );
};

export default Excel;
