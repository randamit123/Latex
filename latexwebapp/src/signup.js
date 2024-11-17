import React from "react";
import { Navbar } from "./Navbar";
import Link from 'next/link';
import { InfoBox } from "./profileInfoBox";
import "./App.css";

export default function webPage() {
  return (
    <div>
      <div>
        <Link></Link>
        <Navbar className="nav-bar" />
      </div>
      <div className="item-box">
        <InfoBox />
      </div>
    </div>
  );
}
