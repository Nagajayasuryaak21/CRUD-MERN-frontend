import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Card = (props) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    e.preventDefault();
    navigate("/Update/" + props.student._id);
  };
  const handleDelete = async (e) => {
    const conf = window.confirm(
      "Are you sure do you want to delete " + props.student.name + " record ?"
    );
    if (conf) {
      const url = props.api+"delete";
      const { data: res } = await axios.post(url, { _id : props.student._id });
      alert(res.message);
      window.location.reload();
    }
  };
  return (
    <div className="card">
      <div>
        <h1>{props.student.name}</h1>
        <div className="para">
          <span>Reg.No:</span>
          {props.student.number}
        </div>
        <div className="para">
          <span>Email:</span>
          {props.student.email}
        </div>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
const List = (props) => {
  return (
    <div className="list">
      {props.list.map((student, index) => {
        return <Card key={index} student={student} api={props.api}/>;
      })}
    </div>
  );
};

const Home = (props) => {
  const navigate = useNavigate();
  const [arr, setArray] = useState([]);

  useEffect(() => {
    fetch(props.api + "read/get/all", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((newData) => {
        //setFlight(newData);
        setArray(newData);

        console.log(newData);
        //setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNext = (e) => {
    navigate("Create");
  };

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div onClick={handleNext} className="btn">
          {" "}
          ADD STUDENT
        </div>
        <div style={{ color: "#FF0000" }}>
          <hr className="custom" />
        </div>
        <List list={arr} api = {props.api} />
      </div>
    </div>
  );
};

export default Home;
