import CustomPagination from '../CustomPagination';
import CustomTable from '../CustomTable';
import './style.scss';

const TablePagination = ({
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

  return (
    <>
      <CustomTable
        list={list}
        totalItems={totalItems}
        className={className}
        columns={columns}
      />

      <CustomPagination
        list={list}
        onChange={onChange}
        no={no}
        totalItems={totalItems}
        pageSize={pageSize}
        useText={useText}
      />
    </>
  );
};

export default TablePagination;
