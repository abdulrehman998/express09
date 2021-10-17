import './App.css';
import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import axios from "axios";


function onSubmitFunction(values) {
  console.log("values: ", values)

  const obj = {
    name: values.name,
    email: values.email,
    password: values.password
}
console.log(obj)

axios.post(`http://localhost:5000/api/v1/profile`, obj)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
}

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(10, 'No more then 10')
    .required('Password is required'),
  name: yup
    .string('Enter your Name')
    .required('Name is required'),
});


function App() {

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: onSubmitFunction
  });


  return (
    <div style={{ padding: "1rem" }}>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Name"
            variant="outlined"

            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}

            error={formik.touched.website && Boolean(formik.errors.name)}
            helperText={formik.touched.website && formik.errors.name}
          />

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Email"
            variant="outlined"

            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}

            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            color="primary"
            id="filled-basic"
            label="Password"
            variant="outlined"
            type="password"

            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}

            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">Button</Button>
        </Stack>

      </form>
    </div>
  );
}

export default App;