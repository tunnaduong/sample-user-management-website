import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "none",
    };
    this.getData();
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  fetch = () => {
    var Data = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
    };

    fetch("https://tunnaduong.com/test_api/login.php/", {
      method: "POST",
      body: JSON.stringify(Data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (this.usernameRef.current.value === responseJson[0].Username) {
          this.saveData(
            responseJson[0].Username,
            responseJson[0].Name,
            responseJson[0].Role
          );
          console.log(responseJson[0].Username);
          console.log(responseJson[0].Name);
          console.log(responseJson[0].Role);
        } else {
          document.getElementById("error").innerHTML =
            "Kết nối đến máy chủ thất bại!";
          this.setState({ error: "block" });
        }
        if (responseJson[0].Message === "No account found!") {
          document.getElementById("error").innerHTML =
            "Không tìm thấy tài khoản!";
          this.setState({ error: "block" });
        } else if (responseJson[0].Message === "Wrong password!") {
          document.getElementById("error").innerHTML = "Mật khẩu sai!";
          this.setState({ error: "block" });
        } else if (
          responseJson[0].Message === "Please enter the information completely!"
        ) {
          document.getElementById("error").innerHTML =
            "Vui lòng điền đầy đủ thông tin vào các trường!";
          this.setState({ error: "block" });
        }
      })
      .catch(() => {
        // Only network error comes here
        document.getElementById("error").innerHTML =
          "Không thể kết nối đến máy chủ!";
        this.setState({ error: "block" });
      });
  };

  saveData = async (username, name, role) => {
    await AsyncStorage.setItem("loggedIn", true);
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("role", role);
    window.location.href = "/";
  };

  getData = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username !== null) {
      this.setState({ username: username });
    }
    const loggedIn = await AsyncStorage.getItem("loggedIn");
    if (loggedIn == "true") {
      window.location.href = "/";
    }
  };

  detectEnter = (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("loginBtn").click();
    }
  };

  render() {
    return (
      <>
        <div className="outer">
          <div className="popup">
            <div className="inner-popup">
              <h3>Đăng nhập</h3>
              <input
                type="text"
                autocapitalize="off"
                value={this.state.username}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
                onKeyUp={this.detectEnter}
                ref={this.usernameRef}
                className="inputs"
                placeholder="Tên đăng nhập"
              />
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                onKeyUp={this.detectEnter}
                ref={this.passwordRef}
                className="inputs"
                placeholder="Mật khẩu"
              />
              <span
                style={{
                  display: this.state.error,
                  marginBottom: 20,
                  color: "red",
                }}
                id="error"
              ></span>
              <button id="loginBtn" onClick={() => this.fetch()}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
