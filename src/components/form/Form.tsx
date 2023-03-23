import {
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputLabel,
  FormControl,
  Dialog,
} from "@mui/material";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addDishAsync } from "../../store/orderSlice";
import "./form.scss";
import { Errors, Product } from "../../models/model";

export default function Form() {
  const { list, status } = useAppSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  let stateOutput: string = "";
  switch (status) {
    case "idle":
      stateOutput = `Response: ${JSON.stringify(list, null, 2)}`;
      break;
    case "pendingAddItem":
      stateOutput = `Be patient please`;
      break;
    case "rejected":
      stateOutput = `Failed to add product`;
      break;
    default:
      break;
  }

  const dispatch = useAppDispatch();

  const initialState = useMemo(
    () => ({
      name: "",
      preparation_time: "HH:MM:SS",
      type: "",
      no_of_slices: undefined,
      diameter: undefined,
      spiciness_scale: 1 || undefined,
      slices_of_bread: undefined,
      id: Date.now(),
    }),
    []
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState(initialState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({} as Errors);
  const [validated, setValidated] = useState(false);
  const validate = (formData: Product) => {
    let formErrors: Errors = {};
    if (!formData.name) {
      formErrors.name = "Name required";
    }
    if (formData.name.length < 3) {
      formErrors.name = "Name must be longer than 3";
    }

    if (
      /^(00|0?[1-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(
        formData.preparation_time
      ) === false
    ) {
      formErrors.preparation_time = " Time must match HH:MM:SS pattern";
    }
    if (!formData.preparation_time) {
      formErrors.preparation_time = "Preparation time required";
    }
    if (formData.type === "") {
      formErrors.type = "Choose a type";
    }
    if (formData.type === "pizza" && !formData.no_of_slices) {
      formErrors.no_of_slices = "Number of slices required";
    }
    if (
      formData.type === "pizza" &&
      formData.no_of_slices &&
      formData.no_of_slices < 1
    ) {
      formErrors.no_of_slices = "Number of slices must be bigger than 0";
    }

    if (
      formData.type === "pizza" &&
      formData.no_of_slices &&
      /^\d+$/.test(formData.no_of_slices.toString()) === false
    ) {
      formErrors.no_of_slices = "Number of slices must be a valid integer";
    }
    if (formData.type === "pizza" && !formData.diameter) {
      formErrors.diameter = "Diameter of pizza required";
    }
    if (
      formData.type === "pizza" &&
      formData.diameter &&
      formData.diameter <= 0
    ) {
      formErrors.diameter = "Diameter must be bigger than 0";
    }

    if (
      formData.type === "pizza" &&
      formData.diameter &&
      /^\d{0,2}(\.\d{1,2})?$/.test(formData.diameter.toString()) === false
    ) {
      formErrors.diameter = "Diameter must have maximum of two decimals";
    }
    if (formData.type === "sandwich" && !formData.slices_of_bread) {
      formErrors.slices_of_bread = "Number of slices of bread required";
    }

    if (formData.type === "sandwich" && formData.slices_of_bread) {
    }
    if (
      formData.type === "sandwich" &&
      formData.slices_of_bread &&
      formData.slices_of_bread <= 0
    ) {
      formErrors.slices_of_bread = "Number of slices must be bigger than 0";
    }
    if (
      formData.type === "sandwich" &&
      formData.slices_of_bread &&
      /^\d+$/.test(formData.slices_of_bread.toString()) === false
    ) {
      formErrors.slices_of_bread = "Number of slices must be a valid integer";
    }

    if (formData.type === "pizza") {
      delete formData.slices_of_bread;
      delete formData.spiciness_scale;
    }
    if (formData.type === "sandwich") {
      delete formData.diameter;
      delete formData.spiciness_scale;
      delete formData.no_of_slices;
    }
    if (formData.type === "soup") {
      delete formData.slices_of_bread;
      delete formData.diameter;
      delete formData.no_of_slices;
    }

    if (JSON.stringify(formErrors).length === 2) {
      setValidated(true);
    }
    console.log(formErrors);
    return formErrors;
  };

  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(validate(formData));
  };

  useEffect(() => {
    if (validated === true) {
      dispatch(addDishAsync(formData));
      setFormData(initialState);
      setValidated(false);
      handleClickOpen();
    }
  }, [dispatch, formData, validated, initialState]);

  let indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="form-box">
        <Dialog open={open} onClose={handleClose}>
          <pre>{stateOutput}</pre>
        </Dialog>
        <h1>HexOcean Form</h1>
        <form>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
            required
            sx={{ mt: 4, mb: 1 }}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <div className="time-box">
            {" "}
            <p>Preparation time (HH:MM:SS)</p>{" "}
            <input
              className="timefield"
              type="time"
              name="preparation_time"
              step="2"
              value={formData.preparation_time}
              onChange={handleChange}
            />
          </div>
          <span className="error-message">{errors.preparation_time}</span>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Type of dish</InputLabel>
            <Select
              name="type"
              fullWidth
              value={formData?.type}
              required
              label="Type of dish"
              onChange={handleChange}
              sx={{ color: "black" }}
            >
              <MenuItem value={"pizza"}>Pizza</MenuItem>
              <MenuItem value={"soup"}>Soup</MenuItem>
              <MenuItem value={"sandwich"}>Sandwich</MenuItem>
            </Select>
          </FormControl>
          <span className="error-message">{errors.type}</span>

          {formData.type === "pizza" && (
            <>
              <TextField
                fullWidth
                label="Number of slices"
                name="no_of_slices"
                value={formData.no_of_slices || ""}
                onChange={handleChange}
                required
                type="number"
                inputProps={{
                  step: "1",
                  lang: "en-US",
                  min: 0,
                }}
                sx={{ mt: 4, mb: 1 }}
              />
              <span className="error-message">{errors.no_of_slices}</span>

              <TextField
                fullWidth
                label="Diameter (cm)"
                type="number"
                name="diameter"
                value={formData.diameter || ""}
                onChange={handleChange}
                required
                sx={{ mt: 2, mb: 1 }}
                inputProps={{
                  step: "0.10",
                  lang: "en-US",
                  min: 0,
                }}
              />
              <span className="error-message">{errors.diameter}</span>
            </>
          )}
          {formData.type === "soup" && (
            <div className="flex-box">
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>Choose the spicesiness of soup</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="spiciness_scale"
                  onChange={handleChange}
                  value={formData.spiciness_scale || 1}
                >
                  {indexes.map((i) => (
                    <FormControlLabel
                      key={i}
                      value={i}
                      control={<Radio />}
                      label={i}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <span className="error-message">{errors.name}</span>
            </div>
          )}
          {formData.type === "sandwich" && (
            <>
              {" "}
              <TextField
                fullWidth
                label="Slices of bread"
                name="slices_of_bread"
                onChange={handleChange}
                value={formData.slices_of_bread || ""}
                required
                sx={{ mt: 4 }}
                type="number"
                inputProps={{
                  step: "1",
                  lang: "en-US",
                  min: 0,
                }}
              />
              <span className="error-message">{errors.slices_of_bread}</span>
            </>
          )}
          <LoadingButton
            loading={status.includes("pending")}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 1, p: 1.5, color: "white", fontSize: "18px" }}
            onClick={(e) => {
              submitData(e);
            }}
            color="secondary"
          >
            Submit
          </LoadingButton>
        </form>
      </div>
    </>
  );
}
