import TitleBody from "../../components/TitleBody";
import TablePagination from "../../components/TablePagination";
import "./style.scss"
import { useState, useEffect, Children } from "react";
import documentApprovalApi from "../../api/documentApprovalApi";
import { useDispatch, useSelector } from "react-redux";
import { setTabview, resetTabview } from "../../redux/features/tabviewSlice";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { loadIcon } from "@iconify/react/dist/iconify.js";
import { hubConnection } from "signalr-no-jquery";

const connection = hubConnection("https://localhost:44389/signalr")
const hubProxy = connection.createHubProxy('SignalRHub')

const DocumentApproval = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  const limit = 10
  const user = useSelector((state) => state.user.value)
  const tabView = useSelector((state) => state.tabview.value)
  const [dataDocument, setDataDocument] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllDocument = async () => {
      try {
        if (!tabView.filter) {
          const data = await documentApprovalApi.getListDocument({ userId: user?.Id, tabName: tabView.tabName, page: currentPage })
          setList(data)
          if (data.state === "true") {
            // connection.start()
            //   .done(() => {
            //     try {
            //       console.log("sending message");
            //       hubProxy.invoke("SendMessage", "Admin", "Hello");
            //     } catch (e) {
            //       console.log("Errors sending message", e);
            //     }
            //   })
            const timeout = setTimeout(() => {
              setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timeout);
          } else {
            const timeout = setTimeout(() => {
              setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timeout);
          }
        }
        else {
          const data = await documentApprovalApi.getListDocument({
            userId: user?.Id, tabName: tabView.tabName, page: currentPage,
            dataFilter: tabView.filterList
          })
          setList(data)
          console.log(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getAllDocument();
    window.scrollTo(0, 0);
  }, [tabView, currentPage, user]);

  useEffect(() => {
    setCurrentPage(1)
    window.scrollTo(0, 0);
  }, [tabView]);




  useEffect(() => {
    const getAllDocumentApproval = async () => {
      try {
        if (!tabView.filter) {
          const dataAllDocumentApproval = await documentApprovalApi.getAllListDocument({
            userId: user?.Id,
            tabName: tabView.tabName
          })
          setDataDocument(dataAllDocumentApproval.listDcapproval)

        }
        else {
          const dataAllDocumentApproval = await documentApprovalApi.getAllListDocument({
            userId: user?.Id, tabName: tabView.tabName,
            dataFilter: tabView.filterList
          })
          setDataDocument(dataAllDocumentApproval.listDcapproval)

        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllDocumentApproval();
  }, [tabView, user])

  const dataArray = [ // Chú ý dùng mảng ngoài cùng
    ['CONTRACT APPROVAL REQUEST REPORT'],
    [`From ${moment().format('DD/MM/YYYY')} to ${moment().format('DD/MM/YYYY')}`],
    [],
    [],
    ['Ord', 'RquestCode', 'Category', 'DocumentType', 'Subject', 'To', 'Authorizer', 'Attorney', 'Authorization Period From', 'Authorization Period To', 'CreateDate', 'Applicant', 'Department', 'SectionName', 'Unit', 'Status'],
    ...dataDocument?.map((item, index) => [
      index + 1,
      item.RequestCode,
      item.categories,
      item.documentType,
      item.subject,
      '',
      '',
      '',
      '',
      '',
      moment(item.CreateDate).format('DD/MM/YYYY'),
      item.createBy,
      item.department,
      item.section,
      item.unit,
      (item.Status === 1 ? "Approving" : (item.Status === 2 ? "Approved" : (item.Status === 3 ? "Reject" : (item.Status === 4 ? "Signed" : (item.Status === 0 ? "Draft" : null))))),
    ])
  ];

  // console.log("adsad", dataArray)




  const columns = [

    {
      title: 'Request Code',
      align: 'left',
      // width: '13%',
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
    },
    {
      title: 'Created date',
      align: 'center',
      render: (text) => {
        return {

          props: {
            className: "documentApproval-createDateCss",
          },
          children:
            <div className="documentApproval-createDateCss-child" style={{
              backgroundColor: (text.Status === 1 ? " #2F85EF" : (text.Status === 2 ? "#4BA747" : (text.Status === 3 ? "#FF3030" : (text.status === 4 ? " #ecd13e" : " #f5ad5f")))),
            }
            } > <div style={{
              borderLeft: "0px solid transparent",
              borderRight: "10px solid transparent",
              borderRightColor: "white",
              borderTop: "10px solid ",
              borderTopColor: (text.Status === 1 ? " #2F85EF" : (text.Status === 2 ? "#4BA747" : (text.Status === 3 ? "#FF3030" : (text.status === 4 ? " #ecd13e" : " #f5ad5f")))),
              borderBottom: "10px solid ",
              borderBottomColor: (text.Status === 1 ? " #2F85EF" : (text.Status === 2 ? "#4BA747" : (text.Status === 3 ? "#FF3030" : (text.status === 4 ? " #ecd13e" : " #f5ad5f")))),
              right: "0",
              position: "absolute"
            }}></div> {text.createDate}</div >
        };
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
      switchTab: false,
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

  return (
    <>
      {isLoading ? <Loading /> :
        <>
          <TitleBody dataArray={dataArray} label="eDocument Approval" isNoForm={true} onSubmitFromTitleBody={handleSubmitFromTitleBody} />
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
      }
    </>
  );
};

export default DocumentApproval;
