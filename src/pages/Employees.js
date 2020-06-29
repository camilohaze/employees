import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Button } from "@material-ui/core";

import { EmployeeService } from "../services/EmployeeService";

export function Employees() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    employee_name: "",
    employee_salary: "",
    employee_age: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getAllEmployees() {
      const employeeService = new EmployeeService();

      await employeeService
        .getAll()
        .then((p) => p.json())
        .then((response) => {
          const { status, data } = response;

          if (status === "success") {
            setEmployees(data);
          }
        });
    }

    getAllEmployees();
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDeleteEmployee = (e, item) => {
    setEmployee(item);
    setOpen(!open);
  };

  return (
    <>
      <div>
        <h3>Empleados</h3>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="Empleados">
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Salario</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.employee_name}</TableCell>
                <TableCell>{item.employee_salary}</TableCell>
                <TableCell>{item.employee_age}</TableCell>
                <TableCell>
                  <Link to={`/editar/${item.id}`}>Editar</Link>
                  <span> | </span>
                  <React.StrictMode>
                    <a href="javascript:;" onClick={(e) => handleDeleteEmployee(e, item)}>
                      Eliminar
                    </a>
                  </React.StrictMode>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar el empleado?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>Nombre: {employee.employee_name}</div>
            <div>Salario: {employee.employee_salary}</div>
            <div>Edad: {employee.employee_age}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
