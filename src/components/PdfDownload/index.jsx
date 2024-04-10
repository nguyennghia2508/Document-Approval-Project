import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Link } from "react-router-dom";
import { FileTextOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment/moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs

const PdfDownload = ({ 
  dataDocument,
  listApprover,
  listSigner,
  approveFile,
  referenceFile,
  comment
}) => {

  const urlBE = "https://localhost:44389"

  function getPdfMakeFont() {
    return {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        },
        Carliman: {
            normal: 'Carliman.ttf',
            bold: 'Carliman.ttf',
            italics: 'Carliman.ttf',
            bolditalics: 'Carliman.ttf'
        },
        Calmina: {
            normal: 'Calmina.ttf',
            bold: 'Calmina.ttf',
            italics: 'Calmina.ttf',
            bolditalics: 'Calmina.ttf'
        },
        Arthegos: {
            normal: 'Arthegos.ttf',
            bold: 'Arthegos.ttf',
            italics: 'Arthegos.ttf',
            bolditalics: 'Arthegos.ttf'
        },
        BetterLand: {
            normal: 'BetterLand.ttf',
            bold: 'BetterLand.ttf',
            italics: 'BetterLand.ttf',
            bolditalics: 'BetterLand.ttf'
        }
    };
  }

  const contentForm = {
    stack: [
      {
        columns: [
          {
            width: '25%',
            text: 'Applicant',
          },
          {
            width: '25%',
            text: 'Department',
          },
          {
            width: '25%',
            text: 'Section',
          },
          {
            width: '25%',
            text: 'Unit',
          },
        ],
        style: 'mainContentTitle'
      },
      {
        columns: [
          {
            width: '25%',
            text: dataDocument?.ApplicantName,
          },
          {
            width: '25%',
            text: dataDocument?.DepartmentName,
          },
          {
            width: '25%',
            text: dataDocument?.SectionName,
          },
          {
            width: '25%',
            text: dataDocument?.UnitName && dataDocument.UnitName,
          },
        ],
        style: 'mainContent'
      },
      {
        columns: [
          {
            width: '25%',
            text: 'Categories',
          },
          {
            width: '50%',
            text: 'Document Type',
          },
          {
            width: '25%',
            text: 'Date',
          },
        ],
        style: 'mainContentTitle'
      },
      {
        columns: [
          {
            width: '25%',
            text: dataDocument?.CategoryName,
          },
          {
            width: '50%',
            text: dataDocument?.DocumentTypeName,
          },
          {
            width: '25%',
            text: dataDocument?.CreateDate && moment(dataDocument.CreateDate).format("DD/MM/YYYY"),
          },
        ],
        style: 'mainContent'
      },
      {
        columns: [
          {
            width: '100%',
            text: 'Subject',
          },
        ],
        style: 'mainContentTitle'
      },
      {
        columns: [
          {
            width: '100%',
            text: dataDocument?.Subject,
          },
        ],
        style: 'mainContent'
      },
      {
        columns: [
          {
            width: '100%',
            text: 'Content summary',
          },
        ],
        style: 'mainContentTitle'
      },
      {
        columns: [
          {
            width: '100%',
            text: dataDocument?.ContentSum,
          },
        ],
        style: 'mainContent'
      },
    ]
  }

  const contentFromApproveFile = approveFile?.map(function(item,index) {
    const fileNameText = {
      text: item.FileName, // Tên tệp
      link: `${urlBE}/${item.FilePath}`, // Đường dẫn đến tệp
      decoration: 'underline', // Hiển thị dưới gạch chân cho liên kết
      color: 'blue', // Màu sắc của liên kết
    };
    return [
      {
        canvas: [
          { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: index === 0 ? 1.2 : 0.3 },
        ],
      },
      {
        columns: [
          {
            width: '25%',
            text: moment(item.CreateDate).format("DD/MM/YYYY hh:mm:ss"),
          },
          {
            width: '50%',
            ...fileNameText
          },
        ],
        style: 'mainContentLine',
      },
    ];
  });

  const contentFromReferenceFile = referenceFile?.map(function(item,index) {
    const fileNameText = {
      text: item.FileName, // Tên tệp
      link: `${urlBE}/${item.FilePath}`, // Đường dẫn đến tệp
      decoration: 'underline', // Hiển thị dưới gạch chân cho liên kết
      color: 'blue', // Màu sắc của liên kết
    };
    return [
      {
        canvas: [
          { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: index === 0 ? 1.2 : 0.3 },
        ],
      },
      {
        columns: [
          {
            width: '25%',
            text: moment(item.CreateDate).format("DD/MM/YYYY hh:mm:ss"),
          },
          {
            width: '50%',
            ...fileNameText
          },
        ],
        style: 'mainContentLine',
      },
    ];
  });

  const contentApprover = listApprover?.slice().reverse().map(function(item,index) {
    if(item.IsApprove)
    {
      return [
        {
          canvas: [
            { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: index === 0 ? 1.2 : 0.3 },
          ],
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Title",
                  style: 'mainContentPersonTitle',
                },
              ],
            },
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Email",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.ApprovalPersonEmail,
                  bold: false,
                  style: 'mainContentPerson',
                },
              ],
            }
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Status",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.IsApprove && `APPROVED at ${moment(item.ExecutionDate).format('ddd, DD MMM YYYY HH:mm:ss ZZ')}`,
                  bold: false,
                  style: 'mainContentPerson',
                },
              ],
            }
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Name",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.ApprovalPersonName,
                  decoration: 'underline',
                  style: 'mainContentPersonLast',
                },
              ],
            }
          ]
        },
      ];
    }
  });

  const contentSigner = listSigner?.slice().reverse().map(function(item,index) {
    if(item.IsSign)
    {
      return [
        {
          canvas: [
            { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: index === 0 ? 1.2 : 0.3 },
          ],
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Title",
                  style: 'mainContentPersonTitle',
                },
              ],
            },
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Email",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.ApprovalPersonEmail,
                  bold: false,
                  style: 'mainContentPerson',
                },
              ],
            }
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Status",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.IsSign && `APPROVED at ${moment(item.ExecutionDate).format('ddd, DD MMM YYYY HH:mm:ss ZZ')}`,
                  bold: false,
                  style: 'mainContentPerson',
                },
              ],
            }
          ]
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '22%',
                  text: "Name",
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '78%',
                  text: item.ApprovalPersonName,
                  decoration: 'underline',
                  style: 'mainContentPersonLast',
                },
              ],
            }
          ]
        },
      ];
    }
  });

  const contentComment =   comment?.map(function(item,index) {

    const children = item.children.map((child,index) =>{
      return [
        {
          canvas: [
            { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: 0.3 },
          ],
        },
        {
          stack:[
            {
              columns: [
                {
                  width: '25%',
                  text: moment(item.comment.CreateDate).format('DD/MM/YYYY hh:mm:ss'),
                  style: 'mainContentPersonTitle',
                },
                {
                  width: '55%',
                  text: child.CommentContent,
                  bold:true,
                  fontSize: 10,
                  color: '#8b8b8b',
                  margin: [-5.5, 8, 0, 0],
                },
                {
                  width: '25%',
                  text: item.comment.ApprovalPersonName,
                  bold:true,
                  fontSize: 10,
                  color: '#8b8b8b',
                  margin: [-32.5, 8, 0, 0],
                },
              ],
              margin:[20,0,0,0]
            },
          ]
        },
      ]; 
    })

    return [
      {
        canvas: [
          { type: 'line', x1: 10, y1: 10, x2: 755, y2: 10, lineWidth: index === 0 ? 1.2 : 0.3 },
        ],
      },
      {
        stack: [
          {
            columns: [
              {
                width: '25%',
                text: moment(item.comment.CreateDate).format('DD/MM/YYYY hh:mm:ss'),
                style: 'mainContentPersonTitle',
              },
              {
                width: '50%',
                stack: [
                  item.comment.IsFirst
                    ? [
                        {
                          text: [
                            { text: `${item.comment.CommentContent} `, bold: false },
                            { text: dataDocument.RequestCode, bold: true }
                          ]
                        }
                      ]
                    : item.comment.CommentStatus === 1
                    ? [
                        {
                          stack: [
                            {
                              text: [
                                { text: `Request `, bold: false },
                                { text: `${dataDocument.RequestCode} `, },
                                { text: `has been approved`, bold: false },
                              ]
                            },
                            { text: `(Note: ${item.comment.CommentContent})`, bold: false }
                          ]
                        }
                      ]
                    : item.comment.CommentStatus === 2
                    ? [
                        {
                          stack: [
                            {
                              text: [
                                { text: `Request `, bold: false },
                                { text: `${dataDocument.RequestCode} `, },
                                { text: `has been signed`, bold: false },
                              ]
                            },
                            { text: `(Note: ${item.comment.CommentContent})`, bold: false }
                          ]
                        }
                      ]
                    : item.comment.CommentStatus === 3
                    ? [
                        {
                          stack: [
                            {
                              text: [
                                { text: `Request `, bold: false },
                                { text: `${dataDocument.RequestCode} `, },
                                { text: `has been rejected`, bold: false },
                              ]
                            },
                            { text: `(Reason: ${item.comment.CommentContent})`, bold: false }
                          ]
                        }
                      ]
                    :
                    { text: `${item.comment.CommentContent} `, bold: false },
                  ],
                  style: 'mainContentComment',
                },
              {
                width: '25%',
                text: item.comment.ApprovalPersonName,
                bold: true,
                style: 'mainContentComment',
              },
            ],
          }
        ]
      },
      ...children.flat()
    ];
  });
  
  const docDefinition = {
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    header: function(currentPage, pageCount) {
      if (currentPage === 1) {
        return {
          columns: [
            {
              text: `Request code: ${dataDocument?.RequestCode}`,
              alignment: 'left',
              fontSize: 13,
              margin: [5, 5], // [left, top]
            },
          ],
        };
      }
      return null;
    },
    content: [
      { text: `SUMMARY FOR DOCUMENT APPROVAL`, style: 'title' },
      ...contentForm.stack,
      {
        columns: [
          {
            width: '100%',
            text: 'Documents to be approved/signed',
          },
        ],
        style: 'mainContentLineFirst'
      },
      ...contentFromApproveFile.flat(),
      {
        columns: [
          {
            width: '100%',
            text: 'Documents for reference',
          },
        ],
        style: 'mainContentLineFirst'
      },
      ...contentFromReferenceFile.flat(),
      {
        columns: [
          {
            width: '100%',
            text: 'Approvers',
          },
        ],
        style: 'mainContentLineFirst'
      },
      ...contentApprover,
      {
        columns: [
          {
            width: '100%',
            text: 'Document Signers',
          },
        ],
        style: 'mainContentLineFirst'
      },
      ...contentSigner,
      {
        columns: [
          {
            width: '100%',
            text: 'Discussion log',
          },
        ],
        style: 'mainContentLineFirst'
      },
      ...contentComment.flat(),
    ],
    styles: {
      header: {
        fontSize: 16,
        alignment: 'justify',
        margin: [0, 10, 0, 20],
      },
      title:{
        textTransform:"uppercase",
        bold:true,
        alignment: 'center',
        fontSize: 20,
        // margin:[0,0,0,0]
      },
      mainContentTitle: {
        alignment: 'justify',
        bold:true,
        margin: [10, 17, 0, 0],
      },
      mainContentLineFirst: {
        alignment: 'justify',
        fontSize: 13,
        bold:true,
        margin: [10, 20, 0, 0],
      },
      mainContent: {
        alignment: 'justify',
        fontSize: 11,
        color: '#8b8b8b',
        margin: [10, 3, 0, 0],
      },
      mainContentLine: {
        alignment: 'justify',
        margin: [10, 8, 0, 0],
      },
      mainContentPersonTitle: {
        alignment: 'justify',
        bold:true,
        fontSize: 10,
        margin: [10, 8, 0, 0],
      },
      mainContentPerson: {
        alignment: 'justify',
        bold:true,
        fontSize: 10,
        color: '#8b8b8b',
        margin: [10, 8, 0, 0],
      },
      mainContentPersonLast: {
        alignment: 'justify',
        bold:false,
        fontSize: 10,
        color: '#8b8b8b',
        margin: [10, 8, 0, 30],
      },
      mainContentComment: {
        alignment: 'justify',
        bold:true,
        fontSize: 10,
        color: '#8b8b8b',
        margin: [10, 8, 0, 0],
      },
    },
  };

  const downloadPDF = () =>{
    var pdfMaker = pdfMake
    pdfMaker.fonts = getPdfMakeFont();
    const pdfGenerator = pdfMaker.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.location.href = url
    })
  }

  return (
      <>
      <Link onClick={downloadPDF}><FileTextOutlined /> Download file</Link>
        {/* {!dataDocument?.IsReject && <Link onClick={downloadPDF}><FileTextOutlined /> Download file</Link>} */}
      </>
  );
};

export default PdfDownload;
