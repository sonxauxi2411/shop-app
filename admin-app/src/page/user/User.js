import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UserAPI from "../../api/userApi";

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UserAPI.getAllData();
      setUsers(response);
    };
    fetchUsers();
  }, []);
  //   console.log(users);

  return (
    <div>
      <h1>user</h1>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="d-flex ">
                        <button className="btn btn-success mx-2">Update</button>
                        <button className="btn btn-danger ">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default User;
