import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Link } from "react-router-dom";
import { FileTextOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";

pdfMake.vfs = pdfFonts.pdfMake.vfs

const PdfDownload = ({ 
  dataDocument,
  listApprover,
  listSigner,
  approveFile,
  referenceFile,
}) => {

  const docDefinition = {
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        {
          text: `Request code: ${dataDocument.RequestCode}`,
          alignment: 'left',
          fontSize: 13,
          margin: [5, 5], // [left, top]
        },
      ],
    },
    content: [
      { text: `SUMMARY FOR DOCUMENT APPROVAL`, style: 'title' },
      'No styling here, this is a standard paragraph',
      'No styling here, this is a standard paragraph',
      { text: 'Another text', style: 'anotherStyle' },
      { text: 'Multiple styles applied', style: ['anotherStyle'] },
    ],
    styles: {
      header: {
        fontSize: 16,
        alignment: 'left',
        margin: [0, 10, 0, 20], // [left, top, right, bottom] margin
      },
      title:{
        textTransform:"uppercase",
        bold:true,
        alignment: 'center',
        fontSize: 20,
        margin:[0,0,0,20]
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
    },
  };

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    })
    // pdfGenerator.download(`${dataDocument.RequestCode}`)
  }

  return (
      <>
        <Link onClick={createPdf}><FileTextOutlined /> Download file</Link>
      </>
  );
};

export default PdfDownload;
