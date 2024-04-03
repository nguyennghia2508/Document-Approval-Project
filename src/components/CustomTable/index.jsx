import { Table, Pagination } from 'antd';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const CustomTable = ({
  list = [],
  emptyText = null,
  columns = null,
  className = null,
  scroll = null,
  href,
}) => {
  const navigate = useNavigate()
  // const showTotal = () => {
  // const start = (no - 1) * pageSize + 1;
  // const end = Math.min(no * pageSize, totalItems);
  // return `Hiển thị ${start} - ${end} trong ${totalItems} dữ liệu`;
  // };

  const handleRowClick = (record, index) => {
    navigate(`${href}/view/${record.Id}`)
  };

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
            rowClassName={(record) =>
              record.isProcessing ? 'row-is-processing' : ''
            }
            className={`table_content ${className ? className : ''}`}
            onRow={(record, index) => ({
              onDoubleClick: () => handleRowClick(record, index),
            })}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
