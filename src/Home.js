import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/vi";
import Admin from "./Admin";
import User from "./User";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: "",
      username: "",
      name: "",
      role: "",
    };
    this.getData();
  }

  getData = async () => {
    const loggedIn = await AsyncStorage.getItem("loggedIn");
    const username = await AsyncStorage.getItem("username");
    const name = await AsyncStorage.getItem("name");
    const role = await AsyncStorage.getItem("role");
    this.setState({
      loggedIn: loggedIn,
      username: username,
      name: name,
      role: role,
    });
    if (loggedIn !== "true") {
      window.location.href = "/login";
    }
    document.getElementById("time").innerHTML = moment().format(
      "H:mm:ss - Do MMMM[,] YYYY"
    );
    setInterval(() => {
      document.getElementById("time").innerHTML = moment().format(
        "H:mm:ss - Do MMMM[,] YYYY"
      );
    }, 900);
  };

  render() {
    return (
      <>
        <div className="rot">
          <div className="navbar">
            <div className="img">
              <a href=".">
                <img src="./logo192.png" width={40} />
              </a>
            </div>
            <div className="space"></div>
            <a href="/logout">
              <i class="fas fa-sign-out-alt"></i>&nbsp;Đăng xuất
            </a>
          </div>
          <div className="main">
            <div className="welcome-panel">
              <h3>Chào mừng, {this.state.name}</h3>
              <span>Bây giờ là: </span>
              <span id="time"></span>
            </div>
            {this.state.role === "1" ? (
              <Admin accessToken={"abc123"} />
            ) : (
              <User />
            )}
          </div>
        </div>
        <div id="bg">
          <img src="./white-bg.jpeg" />
        </div>
      </>
    );
  }
}
