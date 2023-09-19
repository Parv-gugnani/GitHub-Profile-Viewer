import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState("");

  const handleChange = (e) {
    setUsername(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await fetch(``)
    }
  }

}
