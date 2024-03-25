import { Pagination } from 'antd';
import './style.scss';

const CustomPagination = ({
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
    console.log(type)
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
        <div className='pagination_view'>
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
        </div>
    </>
  );
};

export default CustomPagination;
