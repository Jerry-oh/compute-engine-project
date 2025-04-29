import React, { useEffect, useState } from "react";
import { Row, Col } from "react-flexbox-grid";
import "./about.scss";
// Components
import TeamBox from "./teamBox";
import Title from "../ui-components/title/title";
// Assets
import Hadron from "../../assets/about/Hadron.jpg";
import Rizkinta from "../../assets/about/Rizkinta.jpg";
import KevinTandella from "../../assets/about/Kevin-Tandella.jpg";
import JerryWijaya from "../../assets/about/Jerry-Wijaya.jpg";
import Jerry from "../../assets/about/Jerry.jpg";

const About = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/v1/users");
        const result = await response.json();
        setUsers(result.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);
  const avatarMap = {
    1: Jerry,
    2: Hadron,
    3: JerryWijaya,
    4: KevinTandella,
    5: Rizkinta,
  };

  return (
    <div id="about">
      <div className="wrapper">
        <Title title="ABOUT US." />
        <p className="font12">Berikut adalah profile dari tim Cloud-Project.</p>
        <Row>
          {users.map((user) => (
            <Col key={user.id} md={12} lg={4}>
              <TeamBox
                avatar={avatarMap[user.id]}
                name={user.name}
                job={user.job}
                description={user.description}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default About;
