import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import styles from "@/styles/App.module.css";

export default function Footer() {
  return (
    <MDBFooter bgColor="dark" className={`${styles.footer} mt-4 text-center text-light`}>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-light" href="">
          Next News App
        </a>
        &nbsp;|&nbsp; Made with 🤍 Rohitha
      </div>
    </MDBFooter>
  );
}
