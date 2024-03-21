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
  const handleChangePage = (page) => {
    // setCurrent(page);
    if (onChange) {
      onChange(page);
    }
  };
  // const showTotal = () => {
  // const start = (no - 1) * pageSize + 1;
  // const end = Math.min(no * pageSize, totalItems);
  // return `Hiển thị ${start} - ${end} trong ${totalItems} dữ liệu`;
  // };

  const itemRender = (_, type, originalElement) => {
    if (!useText) return originalElement;

    if (type === 'prev') {
      return (
        <a href='#/' onClick={(e) => e.preventDefault()}>
          Previous
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a href='#/' onClick={(e) => e.preventDefault()}>
          Next
        </a>
      );
    }
    return originalElement;
  };

  return (
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
      {list.length > 0 ? (
        <div className={`table_pagination ${className ? className : ''}`}>
          <Pagination
            itemRender={itemRender}
            current={no}
            onChange={handleChangePage}
            total={totalItems} // Provide the totalItems prop here
            pageSize={pageSize} // Specify the number of items per page
            showSizeChanger={false} // Hide the pageSize changer
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomTable;
