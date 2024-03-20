import CustomTable from "../../components/CustomTable"
import "./style.scss"
import { useState, useEffect } from "react";
const DocumentApproval = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([])

  // Hàm để tạo ngẫu nhiên một phần tử mới dựa trên cấu trúc của phần tử đầu tiên
  const generateRandomElement = () => {
    const categories = 'Random Category';
    const documentType = 'BBB';
    const subject = 'Random Subject';
    const createDate = '27/03/2022';
    const department = 'Random Department';
    const section = 'Random Section';
    const unit = 'Random Unit';
    const createBy = 'Random Creator';
    const Processing = 'Random Processor';

    return {
      categories,
      documentType,
      subject,
      createDate,
      department,
      section,
      unit,
      createBy,
      Processing
    };
  }

  const numberOfNewElements = 21;

  const limit = 10;

  const data = [
    {
      key: '1',
      categories: 'John Brown',
      documentType: 'AAA',
      subject: 'New York No. 1 Lake Park',
      createDate: '25/03/2022',
      department: 'AADSAD',
      section: 'DDSD',
      unit: "DSADd",
      createBy: "Nguyen",
      Processing: "Nguyen"
    }
  ];
  for (let i = 2; i <= numberOfNewElements; i++) {
    const newElement = generateRandomElement();
    newElement.key = String(i); // Assigning keys from 1 to 22
    data.push(newElement);
  }
  const columns = [
    {
      title: 'Request Code',
      align: "center",
      render: (text, record, index) => {
        return (
          <span>
            {(currentPage - 1) * limit + (index + 1)}
          </span>
        )
      }
    },
    {
      title: 'Categories',
      align: 'center',
      render: (text) => {
        return text.categories;
      }
    },
    {
      title: 'Document Type',
      align: 'center',
      render: (text) => {
        return text.documentType;
      }
    },
    {
      title: 'Subject',
      align: 'center',
      render: (text) => {
        return text.subject;
      }
    },
    {
      title: 'Created date',
      align: 'center',
      render: (text) => {
        return text.createDate;
      }
    },
    {
      title: 'Department',
      align: 'center',
      render: (text) => {
        return text.department;
      }
    },
    {
      title: 'Section',
      align: 'center',
      render: (text) => {
        return text.section;
      }
    },
    {
      title: 'Unit',
      align: 'center',
      render: (text) => {
        return text.unit;
      }
    },
    {
      title: 'Created by',
      align: 'center',
      render: (text) => {
        return text.createBy;
      }
    },
    {
      title: 'Processing by',
      align: 'center',
      render: (text) => {
        return text.Processing;
      }
    },
  ];

  const handleTablePageChange = (page, additionalData) => {
    // Do something with the page number and additional data
    if (page != undefined) {
      // dispatch(getDiscountsThunk({ no: page, limit: limit }));
      setCurrentPage(page);
    }
  };

  const getPageData = (pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  useEffect(() => {
    setList(getPageData(currentPage, 10))
    window.scrollTo(0, 0);
  }, []);

  // console.log(getPageData(currentPage,10))
  return (
    <div className="list_request list_request_scroll">
      <CustomTable
        list={getPageData(currentPage, 10)}
        totalItems={data.length}
        className="documentApproval"
        onChange={handleTablePageChange}
        no={currentPage}
        columns={columns}
        pageSize={limit}
        scroll={{ y: '500px' }}
        useText={true}
      >

      </CustomTable>
    </div>
  )
}

export default DocumentApproval
