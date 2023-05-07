import PaginationButtons from "./PaginationButtons";

const TabletoolBar = (props) => {
  return (
    <>
      <button
        onClick={() => props.onDelete()}
        disabled={props.selectedRows.length === 0}
      >
        Delete Selected
      </button>
      <PaginationButtons
        btnCount={props.pageCount}
        currentPage={props.currentPage}
        onPageNoChange={(pageNo) => props.onPageNoChange(pageNo)}
      />
    </>
  );
};

export default TabletoolBar;
