import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Employees } from './pages/Employees';
import { Employee } from './pages/Employee';

import './App.css';

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Empleados</Link>
          </li>
          <li>
            <Link to="/crear">Crear empleado</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact={true} path="/">
          <Employees />
        </Route>
        <Route exact={true} path="/crear">
          <Employee edit={false} />
        </Route>
        <Route exact={true} path="/editar/:employeeId">
          <Employee edit={true} />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
