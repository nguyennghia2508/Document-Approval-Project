import TitleBody from "../../components/TitleBody";
import TablePagination from "../../components/TablePagination";
import "./style.scss"
import { useState, useEffect } from "react";
import documentApprovalApi from "../../api/documentApprovalApi";
const DocumentApproval = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const limit = 10
  // Hàm để tạo ngẫu nhiên một phần tử mới dựa trên cấu trúc của phần tử đầu tiên

  useEffect(() => {
    const getAllDocument = async () => {
        try {
            const data = await documentApprovalApi.getListDocument(currentPage)
            setList(data)
        } catch (err) {
            console.log(err)
        }
    }
    getAllDocument();
    window.scrollTo(0, 0);
  }, []);


  const columns = [
    {
      title: 'Request Code',
      align: 'left',
      width: '13%',
      render: (text, record, index) => {
        return text.DocumentApprovalId
      },
    },
    {
      title: 'Categories',
      align: 'center',
      render: (text) => {
        return text.categories;
      },
    },
    {
      title: 'Document Type',
      align: 'center',
      render: (text) => {
        return text.documentType;
      },
    },
    {
      title: 'Subject',
      align: 'center',
      render: (text) => {
        return text.subject;
      },
    },
    {
      title: 'Created date',
      align: 'center',
      render: (text) => {
        return text.createDate;
      },
    },
    {
      title: 'Department',
      align: 'center',
      render: (text) => {
        return text.department;
      },
    },
    {
      title: 'Section',
      align: 'center',
      render: (text) => {
        return text.section;
      },
    },
    {
      title: 'Unit',
      align: 'center',
      render: (text) => {
        return text.unit;
      },
    },
    {
      title: 'Created by',
      align: 'center',
      render: (text) => {
        return text.createBy;
      },
    },
    {
      title: 'Processing by',
      align: 'center',
      render: (text) => {
        return text.Processing;
      },
    },
  ];

  const handleTablePageChange = async (page) => {
    // Do something with the page number and additional data
    if (page !== undefined) {
      const data = await documentApprovalApi.getListDocument(page)
      setList(data)
      setCurrentPage(page);
    }
  };

  // console.log(getPageData(currentPage,10))
  return (
    <>
      <TitleBody label="eDocument Approval" isForm={false} />
      <TablePagination
        list={list?.listDcapproval}
        totalItems={list?.totalItems}
        className='documentApproval'
        columns={columns}
        onChange={handleTablePageChange}
        no={currentPage}
        pageSize={limit}
        useText={true}
      />
    </>
  );
};

export default DocumentApproval;
