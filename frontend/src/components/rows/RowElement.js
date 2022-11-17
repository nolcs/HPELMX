import React, { useState, useEffect } from "react";

const RowElement = (props) => {
  return (
    Object.values(props.value).map((val) => <td>{val}</td>)
    
  );
};

export default RowElement;
