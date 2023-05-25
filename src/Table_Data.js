
import "./App.css";
import React from "react";
import { Button, Modal, Space, Table, Input,Form } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function Table_Data() {
  const [IsEditing, setIsEditing] = useState(false);
  const [editingdata, setEditData] = useState();
  const [AddData, setAddData] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [dataSource,setDataSource]=useState([
    {
      id: 1,
      name: "Nikita Kalel",
      number: 9657199027,
      gender: "Female",
      age: 23,
    },
    { id: 2, name: "amit shinde", number: 9657199057, gender: "male", age: 29 },
    {
      id: 3,
      name: "Nikita shinde ",
      number: 9657199027,
      gender: "Female",
      age: 23,
    },
    {
      id: 4,
      name: "Pratik Kale",
      number: 9657199027,
      gender: "male",
      age: 23,
    },
    {
      id: 5,
      name: "Nikita Kalel",
      number: 9657199027,
      gender: "Female",
      age: 23,
    },
    {
      id: 6,
      name: "Nikita Kalel",
      number: 9657199027,
      gender: "Female",
      age: 23,
    },
    {
      id: 7,
      name: "Nikita Kalel",
      number: 9657199027,
      gender: "Female",
      age: 23,
    },
  ]);
   const columns=[
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record,index) => (
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                onEditData(record,index);
              }}
            >
              <EditOutlined />
              Edit
            </Button>

            <Button
              danger
              onClick={() => {
                onDeleteData(record,index);
              }}
            >
              <DeleteOutlined />
              Delete
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const onDeleteData = (record,index) => {
    console.log(record);
    console.log(index);
    console.log(dataSource);
    setDataSource([...dataSource.slice(0,index),...dataSource.slice(index+1)])
    localStorage.setItem("id", JSON.stringify([...dataSource.slice(0,index),...dataSource.slice(index+1)]));
  };
  const onEditData = (record,index) => {
    console.log(record);
    setIsEditing(true);
    setEditData({ ...record });
  };
  const onAddData = () => {
    setAddData(true);

    const onEditData = (record) => {
      setIsEditing(false);
      setIsEditing({ ...record });
    };
  };
  
  const resetData = () => {
    setIsEditing(false);
    setEditData();
    setAddData(false);
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: dataSource ? dataSource.length + 1 : 0,
      name,
      number,
      gender,
      age,
    };
    setDataSource([...dataSource, data]);
    localStorage.setItem("id", JSON.stringify([...dataSource, data]));

    console.log(JSON.parse(localStorage.getItem("id")) );
  };


  useEffect(()=>{
    // localStorage.setItem("id",JSON.stringify(dataSource));
    setDataSource(JSON.parse(localStorage.getItem("id")))

  },[localStorage.getItem("id")])

  return (
    <div className="App">
      {/* // create two props */}
      <Button
        type="primary"
        style={{ margin: "50px 5px 5px 5px" }}
        onClick={onAddData}
      >
        ADD NEW DATA
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={{ margin: "80px 20px 20px 60px", width: "100rem" }}
        rowKey={(record) => record?.id}
      />
      <Modal
        title="Add Data"
        open={AddData}
        onText="save"
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((data) => {
              if (data.id === AddData.id) {
                return AddData;
              } else {
                return data;
              }
            });
          });
          resetData();
        }}
        onCancel={() => {
          resetData();
        }}
      >
        <Form >
          <label> Enter Name :</label> <br></br>
          <Input
            type="text"
            value={name}
            placeholder="Enter Name here"
            onChange={handleNameChange}
          />{" "}
          <br></br>
          <label> Enter Number :</label>
          <br></br>
          <Input
            type="text"
            value={number}
            placeholder="Enter Number here"
            onChange={handleNumberChange}
          />{" "}
          <br></br>
          <label> Enter Gender:</label>
          <br></br>
          <select onChange={handleGenderChange} allowClear>
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <br></br>
          <label> Enter Age :</label>
          <br></br>
          <Input
            type="number"
            value={age}
            placeholder="Enter Age here"
            onChange={handleAgeChange}
          />{" "}
          <br></br> <br></br>
          <button onClick={handleSubmit} type="submit">ADD DATA</button>
        </Form>
      </Modal>

      <Modal
        title="Edit Data"
        open={IsEditing}
        onText="save"
        onCancel={() => {
          resetData();
        }}
        onOk={(record,index) => {
          console.log(editingdata)
          console.log(index)

          setDataSource((pre) => {
            return pre.map((student) => {
              if (student.id === editingdata.id) {
                return editingdata;
              } else {
                return student;
              }
            });
          });
          resetData();
        }}
      >
        <Input
          value={editingdata?.name}
          onChange={(e) => {
            setEditData((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingdata?.number}
          onChange={(e) => {
            setEditData((pre) => {
              return { ...pre, number: e.target.value };
            });
          }}
        />
        <Input
          value={editingdata?.gender}
          onChange={(e) => {
            setEditData((pre) => {
              return { ...pre, gender: e.target.value };
            });
          }}
        />
        <Input
          value={editingdata?.age}
          onChange={(e) => {
            setEditData((pre) => {
              return { ...pre, age: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
export default Table_Data;
