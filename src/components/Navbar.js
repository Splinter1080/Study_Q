import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Menu, Input } from "semantic-ui-react";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const [jwt, setJwt] = useState(null);
  const [name, setName] = useState("");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    setJwt(localStorage.getItem("jwt"));
    if (localStorage.getItem("jwt")) setName(localStorage.getItem("name"));
  }, [jwt]);

  const logout = () => {
    setJwt(null);
    localStorage.removeItem("jwt");
  };

  return (
    <Segment color="teal">
      <Menu secondary stackable>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="join group"
          active={activeItem === "join group"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="create group"
          active={activeItem === "create group"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          {/* <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item> */}
          {!jwt && (
            <>
              {" "}
              <Link to="/login">
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={handleItemClick}
                />
              </Link>{" "}
              <Link to="/register">
                <Menu.Item
                  name="sign up"
                  active={activeItem === "sign up"}
                  onClick={handleItemClick}
                />
              </Link>
            </>
          )}

          {jwt && (
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={logout}
            />
          )}
        </Menu.Menu>
      </Menu>
    </Segment>
  );
}
