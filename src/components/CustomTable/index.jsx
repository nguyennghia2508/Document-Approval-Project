import { Table, Pagination } from 'antd';
import './style.scss';

const CustomTable = ({
  list = [],
  emptyText = null,
  columns = null,
  className = null,
  scroll = null,
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
