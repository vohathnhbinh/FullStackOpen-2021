import React from "react";

const Notification = ({ message, msgType }) => {
  if (message === null) return null;

  const notifyStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (msgType === "success") notifyStyle.color = "green";
  else if (msgType === "error") notifyStyle.color = "red";

  return <div style={notifyStyle}>{message}</div>;
};

export default Notification;
