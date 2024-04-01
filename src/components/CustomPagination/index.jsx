import { Pagination } from 'antd';
import './style.scss';

const CustomPagination = ({
  list = [],
  onChange,
  no,
  totalItems = 0,
  totalPages = 0,
  className = null,
  pageSize = 5,
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
    <>
      {list.length > 0 ? (
        <div className={`table_pagination ${className ? className : ''}`}>
          <Pagination
            itemRender={itemRender}
            current={no}
            onChange={handleChangePage}
            total={totalItems}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomPagination;
