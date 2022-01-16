import React from "react";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.fetch();
  }

  fetch = () => {
    fetch("http://tunnaduong.com/test_api/getuser.php?access_token=abc123", {
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
      });
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
        <div className="users-panel">
          <table>
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
          <img src="./arrow.png" />
          <input onClick={this.selectAll} type="checkbox" id="check-all" />
          <span onClick={this.change}>Chọn tất cả</span>
          <a>
            <i class="fas fa-pencil-alt"></i>&nbsp;Sửa
          </a>
          <a>
            <i class="fas fa-trash-alt"></i>&nbsp;Xóa
          </a>
          <button>
            <i class="fas fa-plus"></i> Thêm người dùng
          </button>
        </div>
      </>
    );
  }
}
