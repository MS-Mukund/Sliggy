import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("Email"));
  }, []);

  return <div style={{ textAlign: "center" }}>Welcome - {name}</div>;
};

export default Home;
