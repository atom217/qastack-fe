import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import { Form } from "../useForm";
import { useMutation, useQueryClient } from "react-query";
import { addProject } from "../../context/actions/api";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function ProjectForm() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState({});
  const {
    projectState,
    handleCloseRightDrawer,
    handleProjectFormInput,
    projectDispatch,
  } = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(addProject);

  // console.log(projectState.project.name);
  const handleProjectFormSubmit = async (e) => {
    e.preventDefault();
    if (projectState.project.name) {
      projectDispatch({
        type: "ADD_PROJECT",
        payload: projectState.project,
      });
      await mutateAsync(projectState.project);
      queryClient.invalidateQueries("project");
    }

    handleCloseRightDrawer();
    projectDispatch({
      type: "RESET_PROJECT_FORM",
    });
    console.log(projectState);
  };

  return (
    <Form>
      <Divider />
      <Grid
        container
        direction="column"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item style={{ minWidth: "250px" }}>
          <Controls.Input
            name="name"
            label="Project"
            value={projectState.project.name || ""}
            onChange={(e) => handleProjectFormInput(e)}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomDrawer}>
        <Controls.Button
          color="inherit"
          type="cancel"
          text="Cancel"
          style={{ marginRight: "10px" }}
          onClick={handleCloseRightDrawer}
        />
        <Controls.Button text="Submit" onClick={handleProjectFormSubmit} />
      </Grid>
    </Form>
  );
}
