import TitleBody from "../../components/TitleBody";
import TablePagination from "../../components/TablePagination";
import "./style.scss"
import { useState, useEffect } from "react";
import documentApprovalApi from "../../api/documentApprovalApi";
import { useSelector } from "react-redux";
const DocumentApproval = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const limit = 10
  // Hàm để tạo ngẫu nhiên một phần tử mới dựa trên cấu trúc của phần tử đầu tiên
  const user = useSelector((state) => state.user.value)
  const tabView = useSelector((state) => state.tabview.value)

  // rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy
  const [searchedrCode, setSearchedrCode] = useState("")
  const [searcheddType, setSearcheddType] = useState("")
  const [searchedsubject, setSearchedsubject] = useState("")
  const [searchedrProposal, setSearchedrProposal] = useState("")
  const [searchedcreateStart, setSearchedcreateStart] = useState("")
  const [searchedcreateEnd, setSearchedcreateEnd] = useState("")
  const [searchedto, setSearchedto] = useState("")
  const [searchedauthor, setSearchedauthor] = useState("")
  const [searchedattoney, setSearchedattoney] = useState("")
  const [searchedperiodStart, setSearchedperiodStart] = useState("")
  const [searchedperiodEnd, setSearchedperiodEnd] = useState("")
  const [searchedapplicant, setSearchedapplicant] = useState("")
  const [searcheddepart, setSearcheddepart] = useState("")
  const [searchedsection, setSearchedsection] = useState("")
  const [searchedunit, setSearchedunit] = useState("")
  const [searchedstatus, setSearchedstatus] = useState("")
  const [searchedprocBy, setSearchedprocBy] = useState("")


  useEffect(() => {
    const getAllDocument = async () => {

      try {
        const data = await documentApprovalApi.getListDocument(user.Id, tabView.tabName, currentPage)
        setList(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllDocument();
    window.scrollTo(0, 0);
  }, [tabView, currentPage]);


  useEffect(() => {
    setCurrentPage(1)
    window.scrollTo(0, 0);
  }, [tabView]);

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
      filteredValue: [searcheddType],
      onFilter: (value, record) => {
        return record.documentType ? String(record.documentType).toLowerCase().includes(value.toLowerCase()) : '';
      }


    },
    {
      title: 'Subject',
      align: 'center',
      render: (text) => {
        return text.subject;
      },
      // filteredValue: [searchedSubject],
      // onFilter: (value, record) => {
      //   return record.subject ? record.subject.includes(value) : '';
      // }
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
      // filteredValue: [searcheddepart],
      // onFilter: (value, record) => {
      //   return record.department ? String(record.department).toLowerCase().includes(value.toLowerCase()) : '';
      // }


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
      const data = await documentApprovalApi.getListDocument(user.Id, tabView.tabName, currentPage)
      setList(data)
      setCurrentPage(page);
    }
  };

  const handleSubmitFromTitleBody = (rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy) => {
    // Xử lý dữ liệu từ TitleBody tại đây
    // setSearchedSubject(labelOfDocumentType);
    setSearchedrCode(rCode)
    setSearcheddType(dType)
    setSearchedsubject(subject)
    setSearchedrProposal(rProposal)
    setSearchedcreateStart(createStart)
    setSearchedcreateEnd(createEnd)
    setSearchedto(to)
    setSearchedauthor(author)
    setSearchedattoney(attoney)
    setSearchedperiodStart(periodStart)
    setSearchedperiodEnd(periodEnd)
    setSearchedapplicant(applicant)
    setSearcheddepart(depart)
    setSearchedsection(section)
    setSearchedunit(unit)
    setSearchedstatus(status)
    setSearchedprocBy(procBy)

  };

  // console.log(getPageData(currentPage,10))
  return (
    <>
      <TitleBody label="eDocument Approval" isForm={false} onSubmitFromTitleBody={handleSubmitFromTitleBody} />
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
