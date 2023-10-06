import { useEffect, useState } from "react";
import "./Users.css";

const Users = () => {
  const [formData, setFormData] = useState({
    username: "User",
    email: "",
    usertype: "Admin",
  });

  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
  };
  const removeUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const filterUsers = (name) => {
    let filter;
    if (name === "showAdmins") {
      filter = users.filter((user) => {
        return user.usertype === "Admin";
      });
    }
    if (name === "showUsers") {
      filter = users.filter((user) => {
        return user.usertype === "User";
      });
    }
    if (name === "showAll") {
      filter = users;
    }
    setFilteredUsers(filter);

    console.log(filter);
    // console.log(`Clicked ${name}`);
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
  // console.log(users);

  return (
    <div className="usersList">
      {/* <h2>{formData.username}</h2>
      <h2>{formData.email}</h2>
      <h2>{formData.usertype}</h2> */}
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User Name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User Email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <button>Save</button>
      </form>

      <div className="list">
        {filteredUsers.map((user) => {
          return (
            <div
              className="userItem"
              key={user.id}
              onClick={() => removeUser(user.id)}
            >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>
      <div className="filterButtons">
        <button name="showUsers" onClick={(e) => filterUsers(e.target.name)}>
          Show Users
        </button>
        <button name="showAdmins" onClick={(e) => filterUsers(e.target.name)}>
          Show Admins
        </button>
        <button name="showAll" onClick={(e) => filterUsers(e.target.name)}>
          Show All
        </button>
      </div>
    </div>
  );
};

export default Users;
