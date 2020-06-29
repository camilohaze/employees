export class EmployeeService {
  api = 'http://dummy.restapiexample.com/api/v1';

  async getAll() {
    return await fetch(`${this.api}/employees`, {
      mode: 'cors',
      method: 'GET',
      dataType: 'json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getById(id) {
    return await fetch(`${this.api}/employee/${id}`, {
      mode: 'cors',
      method: 'GET',
      dataType: 'json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async create(employee) {
    return await fetch(`${this.api}/create`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(employee)
    });
  }

  async update(id, employee) {
    return await fetch(`${this.api}/update/${id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(employee)
    });
  }

  async delete(id) {
    return await fetch(`${this.api}/delete/${id}`, {
      mode: 'cors',
      method: 'DELETE'
    });
  }
}
