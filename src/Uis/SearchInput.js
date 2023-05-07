const SearchInput = (props) => {
  const handleSearch = (e) => props.onSearch(e.target.value);
  return (
    <>
      <input
        type="text"
        className="text-box"
        placeholder="Search By Name, Email and Role"
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchInput;
