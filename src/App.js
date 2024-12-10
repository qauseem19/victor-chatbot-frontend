import React from "react";
import Markup from "./jsx";

import "./css/style.css";
import { withResizeDetector } from "react-resize-detector";

const App = ({ width }) => {
  
  return (  
		<Markup />  
  );
};

export default withResizeDetector(App);
