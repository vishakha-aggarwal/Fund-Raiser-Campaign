import React from "react";
import Image from "next/image";
import logo from "../logo.png";
import { Link } from "../routes";
import { MdHome, MdAddToPhotos } from "react-icons/md";

function Header() {
  return (
    <div className="headerCont">
      <span className="logoImg">
        {/* <Image
          src={logo}
          alt="logo"
          width="40px"
          height="40px"
          style={{ border: "1px solid grey", borderRadius: "50%" }}
        /> */}
      </span>
      <div className="context"> FundQuest </div>

      <div className="navBar">
        <Link to="/">
          <div className="icons">
            <MdHome />
          </div>
        </Link>
        <Link to="/campaigns/new">
          <div className="icons">
            <MdAddToPhotos />
          </div>
        </Link>

        <Link to="/">
          <div className="options">
            <button className="headerBtn">Home</button>
          </div>
        </Link>
        <Link to="/campaigns/new">
          <div className="options">
            <button className="headerBtn">Create Campaign</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
