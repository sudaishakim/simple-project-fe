import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      {name === "password" ? (
        <>
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            size="small"
            name={name}
            onChange={handleChange}
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            endAdornment={
              name === "password" && (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </>
      ) : (
        <TextField
          size="small"
          name={name}
          onChange={handleChange}
          required
          fullWidth
          label={label}
          autoFocus={autoFocus}
          type={type}
        />
      )}
    </Grid>
  );
};

export default Input;
