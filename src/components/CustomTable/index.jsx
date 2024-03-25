import { Table, Pagination } from 'antd';
import './style.scss';

const CustomTable = ({
  list = [],
  listHavePages,
  onChange,
  no,
  reload,
  type,
  totalItems = 0,
  totalPages = 0,
  arrData = null,
  emptyText = null,
  columns = null,
  className = null,
  pageSize = 5,
  scroll = null,
  useText = false,
}) => {
  
  // const showTotal = () => {
  // const start = (no - 1) * pageSize + 1;
  // const end = Math.min(no * pageSize, totalItems);
  // return `Hiển thị ${start} - ${end} trong ${totalItems} dữ liệu`;
  // };

  return (
    <>
      <div className='list_request list_request_scroll'>
        <div className={`table_container ${className ? className : ''}`}>
          <Table
            columns={columns}
            dataSource={list}
            locale={{ emptyText }}
            pagination={false}
            scroll={scroll}
            // bordered
            className={`table_content ${className ? className : ''}`}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
