import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Logout from "./Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="*"
          element={
            <main
              style={{
                padding: "1rem",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 500,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              <p>
                Không có gì ở đây cả!
                <br />
                Trang bạn đang tìm kiếm không có sẵn...
              </p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
