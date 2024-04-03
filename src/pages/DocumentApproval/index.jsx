import TitleBody from "../../components/TitleBody";
import TablePagination from "../../components/TablePagination";
import "./style.scss"
import { useState, useEffect } from "react";
import documentApprovalApi from "../../api/documentApprovalApi";
import { useDispatch, useSelector } from "react-redux";
import { setTabview,resetTabview } from "../../redux/features/tabviewSlice";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const DocumentApproval = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const limit = 10
  // Hàm để tạo ngẫu nhiên một phần tử mới dựa trên cấu trúc của phần tử đầu tiên
  const user = useSelector((state) => state.user.value)
  const tabView = useSelector((state) => state.tabview.value)

  useEffect(() => {
    const getAllDocument = async () => {
      try {
        if (!tabView.filter) {
          const data = await documentApprovalApi.getListDocument({ userId: user.Id, tabName: tabView.tabName, page: currentPage })
          setList(data)
        }
        else
        {
          const data = await documentApprovalApi.getListDocument({ userId: user.Id, tabName: tabView.tabName, page: currentPage ,
          dataFilter:tabView.filterList})
          setList(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getAllDocument();
    window.scrollTo(0, 0);
  }, [tabView, currentPage]);

  // useEffect(() =>{
  //   dispatch(resetTabview())
  // },[navigate])
  
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
        return text.RequestCode
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
      const data = await documentApprovalApi.getListDocument({ userId: user.Id, tabName: tabView.tabName, page: currentPage })
      setList(data)
      setCurrentPage(page);
    }
  };

  const handleSubmitFromTitleBody = async (data) => {
    const dataFilter = {
      applicant: data.applicant,
      attorney: data.attorney,
      authorizer: data.authorizer,
      createEnd: data.createEnd && moment(data.createEnd).format('YYYY-MM-DDTHH:mm:ss'),
      createStart: data.createEnd && moment(data.createStart).format('YYYY-MM-DDTHH:mm:ss'),
      department: data.department,
      documentType: data.documentType,
      periodEnd: data.periodEnd,
      periodStart: data.periodStart,
      processingby: data.processingby,
      proposal: data.proposal,
      requestcode: data.requestcode,
      section: data.section,
      status: data.status,
      subject: data.subject,
      to: data.to,
      unit: data.unit
    }

    dispatch(setTabview({
      tabIndex: tabView.tabIndex,
      tabName: tabView.tabName,
      filter: true,
      switchTab:false,
      filterList: dataFilter
    }))

    const res = await documentApprovalApi.getListDocument({
      userId: user.Id,
      tabName: tabView.tabName,
      page: currentPage,
      dataFilter: dataFilter
    });

    setList(res)

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
        href={location.pathname}
      />
    </>
  );
};

export default DocumentApproval;
