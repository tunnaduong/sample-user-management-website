import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.fetch();
  }

  fetch = () => {
    fetch("https://tunnaduong.com/test_api/getuser.php?access_token=abc123", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          users: response.users_info,
        });
        this.displayTable();
      });
  };

  displayTable = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("user-table").style.display = "table";
  };

  change = () => {
    document.getElementById("check-all").checked =
      !document.getElementById("check-all").checked;
    var checkbox = document.getElementById("check-all");
    let checkboxes = document.querySelectorAll(".multicheck");
    checkboxes.forEach(function (ele) {
      ele.checked = !!checkbox.checked;
    });
  };

  selectAll = () => {
    var checkbox = document.getElementById("check-all");
    let checkboxes = document.querySelectorAll(".multicheck");
    checkboxes.forEach(function (ele) {
      ele.checked = !!checkbox.checked;
    });
  };

  render() {
    return (
      <>
        <div id="overlay">
          <div className="inner-overlay">
            <CircularProgress color="inherit" style={{ marginBottom: 10 }} />
            Đang tải...
          </div>
        </div>
        <div className="users-panel">
          <table id="user-table" style={{ display: "none" }}>
            <thead>
              <tr>
                <th width="140" style={{ fontWeight: "normal" }}></th>
                <th>ID</th>
                <th>Tên</th>
                <th>Tên đăng nhập</th>
                <th>Mật khẩu</th>
                <th>Vai trò</th>
              </tr>
            </thead>
            {this.state.users.map((user) => (
              <>
                <tr>
                  <td>
                    <input type="checkbox" className="multicheck" />
                    <a>
                      <i class="fas fa-pencil-alt"></i>&nbsp;Sửa
                    </a>
                    &nbsp;&nbsp;
                    <a>
                      <i class="fas fa-trash-alt"></i>&nbsp;Xóa
                    </a>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role == 1 ? "Admin" : "User"}</td>
                </tr>
              </>
            ))}
          </table>
        </div>
        <div className="select-panel">
          <div className="left-side">
            <img src="./arrow.png" />
            <input onClick={this.selectAll} type="checkbox" id="check-all" />
            <span onClick={this.change}>Chọn tất cả</span>
            <a>
              <i class="fas fa-pencil-alt"></i>&nbsp;Sửa
            </a>
            <a>
              <i class="fas fa-trash-alt"></i>&nbsp;Xóa
            </a>
          </div>
          <button>
            <i class="fas fa-plus"></i>
            <span></span>
          </button>
        </div>
      </>
    );
  }
}
