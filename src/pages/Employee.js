import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Button } from "@material-ui/core";

import { EmployeeService } from "../services/EmployeeService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'table',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center'
  },
  root: {
    minWidth: '300px',
    display: 'inline-grid',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function Employee(props) {
  let { employeeId } = useParams(0);
  const { edit } = props;
  const employee_name = useRef();
  const employee_salary = useRef();
  const employee_age = useRef();
  const [form, setForm] = useState(
    {
      id: 0,
      name: '',
      salary: '',
      age: ''
    }
  );
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function getAllEmployees() {
      const employeeService = new EmployeeService();

      return await employeeService
        .getById(employeeId)
        .then((p) => p.json())
        .then((response) => {
          const { status, data } = response;

          if (status === 'success') {
            employee_name.current.value = data.employee_name;
            employee_salary.current.value = data.employee_salary;
            employee_age.current.value = data.employee_age;
          }
        });
    }

    if (edit) {
      getAllEmployees();
    }
  }, [edit, employeeId]);

  let title = 'Crear Empleado';

  if (edit) {
    title = `Empleado #${employeeId}`;
  }

  const handleChange = (name, e) => {
    form[name] = e.target.value;

    setForm(form);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeService = new EmployeeService();

    if (edit) {
      await employeeService
        .update(employeeId, form)
        .then(p => p.json)
        .then(response => {
          const { status } = response;

          if (status === 'success') {
            setOpen(true);
          }
        });
    } else {
      await employeeService
        .create(form)
        .then(p => p.json())
        .then(response => {
          const { status } = response;

          if (status === 'success') {
            setOpen(true);
          }
        });
    }
  }

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <div>
        <h3 className={classes.title}>{title}</h3>
      </div>
      <div className={classes.container}>
        <form id="employee" name="employee" className={classes.root} onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Input type="text"
              id="name"
              name="name"
              aria-describedby="name-helper"
              ref={employee_name}
              onChange={(e) => handleChange('name', e)} />
            <FormHelperText id="name-helper">Nombre del empleado.</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="salary">Salario</InputLabel>
            <Input type="number"
              id="salary"
              name="salary"
              aria-describedby="salary-helper"
              ref={employee_salary}
              onChange={(e) => handleChange('salary', e)} />
            <FormHelperText id="salary-helper">Salario del empleado.</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="age">Edad</InputLabel>
            <Input type="number"
              id="age"
              name="age"
              aria-describedby="age-helper"
              ref={employee_age}
              onChange={(e) => handleChange('age', e)} />
            <FormHelperText id="age-helper">Edad del empleado.</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"El empleado fue creado con exito!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>Nombre: {form.name}</div>
            <div>Salario: {form.salary}</div>
            <div>Edad: {form.age}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
