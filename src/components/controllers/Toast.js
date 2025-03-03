import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
const Toast = (props) => {
  const { openToast, message, handleCloseToast } = props;
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openToast}
        onClose={handleCloseToast}
        message={message}
        autoHideDuration={1500}
        action={
          <IconButton onClick={handleCloseToast} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
};

export default Toast;
