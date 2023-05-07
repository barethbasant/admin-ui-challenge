import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Table from "./Uis/Table";
import PaginationButtons from "./Uis/PaginationButtons";
import axios from "axios";

function App() {
  let userData = [];
  const [users, setUsers] = useState([...userData]);
  const [searchStr, setSearchStr] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const backendUrl = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

  const searchHandler = (input) => {
    let inputText = input.toUpperCase();
    let newArr = [];
    if (inputText.length > 0) {
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].name.toUpperCase().indexOf(inputText) > -1 ||
          userData[i].email.toUpperCase().indexOf(inputText) > -1 ||
          userData[i].role.toUpperCase().indexOf(inputText) > -1
        ) {
          newArr.push(userData[i]);
        }
      }
    } else {
      newArr = [...userData];
    }
    setUsers((prevState) => [...newArr]);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchHandler(searchStr);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchStr]);

  const handleSelectAll = (event, userList) => {
    if (event.target.checked) {
      setSelectedRows(userList);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectOne = (event, user) => {
    // console.log(event);
    if (event.target.checked) {
      setSelectedRows((prevUser) => [...prevUser, user]);
    } else {
      setSelectedRows((selectedUsers) =>
        selectedUsers.includes(user)
          ? selectedUsers.filter((r) => r !== user)
          : [...selectedUsers, user]
      );
    }
  };

  const deleteHandler = () => {
    setUsers((users) => users.filter((user) => !selectedRows.includes(user)));
    setSelectedRows([]);
  };

  const deleteOneHandler = (user) => {
    setUsers((selectedUsers) =>
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );

    setSelectedRows((selectedUsers) =>
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  const getUsers = () => {
    axios
      .get(backendUrl)
      .then((response) => {
        userData = [...response.data];
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, [searchStr]);

  return (
    <div className="card">
      <Table
        users={users}
        onSearch={(input) => setSearchStr(input)}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        selectedRows={selectedRows}
        onDelete={deleteHandler}
        onDeleleOne={deleteOneHandler}
      />
    </div>
  );
}

export default App;
