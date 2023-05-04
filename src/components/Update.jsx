import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Update = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(props.api + "read/get/one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((response) => response.json())
        .then((newData) => {
          console.log(newData);
          setName(newData.name);
          setNumber(newData.number);
          setEmail(newData.email);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Something went wrong");
      navigate("/");
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = props.api + "update";
    const sample = {
      _id: id,
      name: name,
      email: email,
      number: number,
    };
    const { data: res } = await axios.post(url, { ...sample });
    alert(res.message);
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} className="form">
        <h1>Create New Student</h1>
        <label htmlFor="name">Student Name</label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="name">Student Reg.No</label>
        <input
          type="text"
          name="number"
          required
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <label htmlFor="name">Student Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Update;
