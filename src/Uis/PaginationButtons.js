const PaginationButtons = (props) => {
  const pagenationCountButton = [];

  const handlePageNo = (i) => {
    props.onPageNoChange(i);
  };

  for (let i = 1; i <= props.btnCount; i++) {
    let className = props.currentPage === i ? "active" : null;
    let isDisable = props.currentPage === i ? true : false;

    pagenationCountButton.push(
      <button
        key={i}
        className={className}
        onClick={() => handlePageNo(i)}
        disabled={isDisable}
      >
        {" "}
        {i}{" "}
      </button>
    );
  }

  return (
    <>
      <button
        disabled={props.currentPage === 1 ? true : false}
        onClick={() => handlePageNo(props.currentPage - 1)}
      >
        {" "}
        {"<"}
      </button>
      <button
        disabled={props.currentPage === 1 ? true : false}
        onClick={() => handlePageNo(1)}
      >
        {" "}
        {"<<"}
      </button>
      {pagenationCountButton}
      <button
        disabled={props.currentPage === props.btnCount ? true : false}
        onClick={() => handlePageNo(props.btnCount)}
      >
        {" "}
        {">>"}
      </button>
      <button
        disabled={props.currentPage === props.btnCount ? true : false}
        onClick={() => handlePageNo(props.currentPage + 1)}
      >
        {" "}
        {">"}
      </button>
    </>
  );
};

export default PaginationButtons;
