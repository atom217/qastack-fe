import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  COMPONENT_LIST_ERROR,
} from "../../../constants/actionTypes";
import {
  addComponent,
  getAllComponents,
} from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(2),
    },
  },
  textarea: {
    resize: "both",
  },
  inputGroup: {
    marginBottom: theme.spacing(2),
  },
  bottomDrawer: {
    position: "sticky",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    backgroundColor: "rgb(255, 255, 255)",
    // zIndex: 1202,
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",
  backgroundColor: "rgb(255, 255, 255)",
  zIndex: 2,
}));
export default function TestSteps(props) {
  const classes = useStyles();
  const { register, handleSubmit, control, fields, remove, append, param } =
    props;
  console.log("param", param);
  const {
    componentState: { component },
    setOpenToast,
    componentDispatch,
  } = useGlobalContext();
  const history = useHistory();

  const [form, setForm] = useState({});
  const [inputStepFields, setInputStepFields] = useState([
    { stepDescription: "", expectedResult: "" },
    { stepDescription: "", expectedResult: "" },
  ]);

  const [fieldErrors, setFieldErrors] = useState({});
  const {
    data: components,
    error: componentError,
    isLoading: isComponentLoading,
    isError: isComponentsError,
  } = useQuery(["component", param, 30], getAllComponents, {
    onError: (error) => {
      setOpenToast(true);
      componentDispatch({
        type: COMPONENT_LIST_ERROR,
        payload: error.message,
      });
    },
  });

  const handleAddStep = () => {
    append({
      stepDescription: "",
      expectedResult: "",
    });
  };
  const handleRemoveStep = (id) => {
    const values = [...inputStepFields];
    values.splice(id, 1);
    setInputStepFields(values);
  };

  const queryClient = useQueryClient();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Container>
        {/* <form
          className={classes.root}
          autoComplete="off"
          style={{ height: "100%" }}
        > */}
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          {/* <Grid item xs={12}>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid> */}

          <Grid item xs={9}>
            <Grid style={{ height: "100vh" }}>
              {/* <YourCard /> */}
              <TestDetails
                control={control}
                handleAddStep={handleAddStep}
                fields={fields}
                remove={remove}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomeAttributes control={control} components={components} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const YourCard = () => {
  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ height: "100%" }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Customer Profile
        </Typography>
        <Typography variant="h5" component="h2">
          Sarah Doria
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Position
        </Typography>
        <Typography variant="body2" component="p">
          Company
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const CustomeAttributes = (props) => {
  const { control, handleAddStep, remove, fields, components } = props;

  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        height: "100%",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <CardContent>
        <Grid item>
          <Controller
            name="Priority"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="Type"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem value="accessiblity">Accessiblity</MenuItem>
                    <MenuItem value="smoke">Smoke</MenuItem>
                    <MenuItem value="performance">Performance</MenuItem>
                    <MenuItem value="functional">Functional</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Controller
            name="componentId"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Component
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Select Component"
                    onChange={onChange}
                  >
                    {components?.map((item, index) => (
                      <MenuItem
                        key={item.component_id}
                        value={item.component_id}
                      >
                        {item.component_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

const TestDetails = (props) => {
  const { control, handleAddStep, remove, fields } = props;
  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        height: "100%",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <CardContent sx={{ marginTop: "2px" }}>
        <Grid item style={{ minWidth: "250px" }}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="title"
                label="Enter title"
                placeholder="Testcase title"
                multiline
                size="small"
                variant="outlined"
                // inputProps={{ className: classes.textarea }}
                onChange={onChange}
                value={value}
                style={{ width: "450px" }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="description"
                size="small"
                style={{ width: "450px" }}
                label="Enter description"
                placeholder="Testcase Description"
                multiline
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item container alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">Test steps</Typography>
          </Grid>
          <Grid item sx={{ marginLeft: 35 }}>
            <Tooltip title="Add steps" arrow disableInteractive>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddStep}
                sx={{ m: 1 }}
              >
                Add
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {fields.map((item, index) => (
          <>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              className={classes.inputGroup}
              key={item.id}
            >
              <Grid item xs={2}>
                <Typography variant="subtitle2">
                  {`Step${index + 1}`}
                </Typography>
              </Grid>
              <Grid item style={{ minWidth: "250px" }} xs={4}>
                <Controller
                  name={`Steps[${index}].stepDescription`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Step description"
                      multiline
                      size="small"
                      variant="outlined"
                      // inputProps={{ className: classes.textarea }}
                      onChange={onChange}
                      // defaultValue={item.stepDescription}
                      //   style={{ width: "350px" }}
                      value={value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name={`Steps[${index}].expectedResult`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      //   style={{ width: "150px" }}
                      label="Expected result"
                      multiline
                      variant="outlined"
                      onChange={onChange}
                      // defaultValue={item.expectedResult}
                      value={value}
                      // inputProps={{ className: classes.textarea }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Add steps" arrow disableInteractive>
                  <AddIcon onClick={handleAddStep} />
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                {index !== 0 && (
                  <Tooltip title="Remove steps" arrow disableInteractive>
                    <DeleteIcon onClick={() => remove(index)} />
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
