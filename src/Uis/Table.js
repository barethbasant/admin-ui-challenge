import TabletoolBar from "./TableToolBar";
import SearchInput from "./SearchInput";
import { useState } from "react";

const Table = (props) => {
  let [currentPage, setCurrentPage] = useState(1);
  let paginationLimit = 10;
  let pageCount = 0;
  let userList = [];
  let isCheckedAll = false;
  const setPaginationBtn = () => {
    pageCount = Math.ceil(props.users.length / paginationLimit);
  };

  const displayDatabasedOnPageNo = () => {
    const prevRange = (currentPage - 1) * paginationLimit;
    const currentRange = currentPage * paginationLimit;
    userList = props.users.slice(prevRange, currentRange);
  };

  const OnPageNumberSet = () => {
    setPaginationBtn();
    displayDatabasedOnPageNo();
  };

  OnPageNumberSet();

  const pageNoChangeHandler = (pageNo) => {
    // currentPage = pageNo;
    setCurrentPage(+pageNo);
    OnPageNumberSet();
  };

  const setCheckAll = () => {
    isCheckedAll = true;
    for (let i = 0; i < userList.length; i++) {
      if (!props.selectedRows.includes(userList[i])) {
        isCheckedAll = false;
        return;
      }
    }
  };
  setCheckAll();
  return (
    <>
      <SearchInput onSearch={(input) => props.onSearch(input)} />
      <table>
        <thead>
          <tr>
            <th>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => props.onSelectAll(e, userList)}
                checked={isCheckedAll}
              />{" "}
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((el) => (
            <tr
              key={el.id}
              className={props.selectedRows.includes(el) ? "selected" : null}
            >
              <td>
                {" "}
                <input
                  type="checkbox"
                  onChange={(e) => {
                    props.onSelectOne(e, el);
                  }}
                  checked={props.selectedRows.includes(el)}
                />{" "}
              </td>
              <td> {el.name} </td>
              <td> {el.email} </td>
              <td> {el.role} </td>
              <td>
                {" "}
                <button>E</button>{" "}
                <button onClick={() => props.onDeleleOne(el)}>X</button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TabletoolBar
        pageCount={pageCount}
        currentPage={currentPage}
        onPageNoChange={(pageNo) => pageNoChangeHandler(pageNo)}
        onDelete={() => props.onDelete()}
        selectedRows={props.selectedRows}
      />
    </>
  );
};

export default Table;
