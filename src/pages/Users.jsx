import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { BsSearch, BsUpload, BsCalendar, BsPerson, BsChevronDown } from "react-icons/bs";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listenToUsers, addUser, deleteUser, updateUser } from "../config/firebaseConfig";


function UserTable() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", username: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Real-time fetch users
  useEffect(() => {
    const unsubscribe = listenToUsers(setUsers);
    return () => unsubscribe();
  }, []);

  // Export CSV
  const handleExport = () => {
    const headers = ["Full Name", "Email", "Username", "Joined Date", "Last Active"];
    const rows = users.map((u) => [u.name, u.email, u.username, u.joined, u.lastActive]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Add user
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.username) return;
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const added = { ...newUser, joined: today, lastActive: "just now" };
    try {
      await addUser(added);
      setNewUser({ name: "", email: "", username: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding user: ", err);
    }
  };

  // Edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Update
  const handleUpdateUser = async () => {
    if (!editingUser.name || !editingUser.email || !editingUser.username) return;
    try {
      await updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating user: ", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  };

  // Filter
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDate = selectedDate
      ? new Date(u.joined).toDateString() === selectedDate.toDateString()
      : true;

    return matchSearch && matchDate;
  });

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <div className="text-muted small mb-3">
        Manage all users in one place. Control access, assign roles, and monitor activity across your platform.
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
       
        <div className="d-flex gap-2 flex-wrap">
          <InputGroup className="custom-input search-input">
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Dropdown className="custom-input pill-shape">
            <Dropdown.Toggle
              variant="transparent"
              className="d-flex align-items-center justify-content-between w-100"
            >
              <BsPerson className="me-2" /> Username <BsChevronDown className="ms-2" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Ascending</Dropdown.Item>
              <Dropdown.Item>Descending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="custom-input d-flex align-items-center px-2 pill-shape date">
            <BsCalendar className="me-2" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              className="form-control border-0 shadow-none"
              dateFormat="MMMM d, yyyy"
            />
            <BsChevronDown className="ms-2" />
            {selectedDate && (
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2"
                onClick={() => setSelectedDate(null)}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

   
        <div className="d-flex gap-2">
          <Button className="pill-shape export-btn" onClick={handleExport}>
            <BsUpload className="me-1" /> Export
          </Button>
          <Button
            className="pill-shape add-btn new"
            onClick={() => {
              setShowModal(true);
              setEditingUser(null);
            }}
          >
            <AiOutlinePlus className="me-1"  /> Add User
          </Button>
        </div>
      </div>

      <Table hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Joined Date</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, idx) => (
            <tr key={u.id} style={{ backgroundColor: idx % 2 === 0 ? "#f8f9fa" : "#f0f8ff" }}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.joined}</td>
              <td>{u.lastActive}</td>
              <td>
                <Button
                  size="sm"
                  variant="link"
                  className="text-secondary me-2 p-0"
                  onClick={() => handleEdit(u)}
                >
                  <AiFillEdit />
                </Button>
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger p-0"
                  onClick={() => handleDelete(u.id)}
                >
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={editingUser ? editingUser.name : newUser.name}
                onChange={(e) =>
                  editingUser
                    ? setEditingUser({ ...editingUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={editingUser ? editingUser.email : newUser.email}
                onChange={(e) =>
                  editingUser
                    ? setEditingUser({ ...editingUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={editingUser ? editingUser.username : newUser.username}
                onChange={(e) =>
                  editingUser
                    ? setEditingUser({ ...editingUser, username: e.target.value })
                    : setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setEditingUser(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={editingUser ? handleUpdateUser : handleAddUser}>
            {editingUser ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserTable;
