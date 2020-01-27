import React from 'react';
import { Button, Table, Modal, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

const Company = props => (
  <tr>
    <td>{props.company.companyName}</td>
    <td>{props.company.taxOffice}</td>
    <td>{props.company.taxNumber}</td>
    <td>{props.company.date}</td>
    <td>
      <Button
        variant="danger"
        onClick={() => props.onDelete(props.company._id)}
        style={{ marginRight: '20px' }}
      >
        Sil
      </Button>
      <Button
        variant="primary"
        onClick={() => props.handleEdit(props.company._id)}
      >
        Edit
      </Button>
    </td>
  </tr>
);

class Companies extends React.Component {
  state = {
    companies: [],
    companyName: '',
    taxOffice: '',
    taxNumber: '',
    companyId: '',
    show: false,
    searchTerm: ''
  };

  handleEdit = id => {
    this.setState({
      show: true
    });
    const company = {
      companyName: this.state.companyName,
      taxOffice: this.state.taxOffice,
      taxNumber: this.state.taxNumber
    };

    axios
      .post('http://localhost:5000/companies/edit/' + id, company)
      .then(res => console.log(res));
  };

  onChange_1 = e => {
    this.setState({
      companyName: e.target.value
    });
  };
  onChange_2 = e => {
    this.setState({
      taxOffice: e.target.value
    });
  };
  onChange_3 = e => {
    this.setState({
      taxNumber: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const company = {
      companyName: this.state.companyName,
      taxOffice: this.state.taxOffice,
      taxNumber: this.state.taxNumber
    };

    console.log(company);

    axios.post('http://localhost:5000/companies/add', company).then(res => {
      console.log(res.data);
      window.location.reload();
    });

    this.setState({
      companyName: '',
      taxOffice: '',
      taxNumber: ''
    });
  };

  CompanyModal = () => {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });

    return (
      <>
        <Button variant="success" type="submit" onClick={handleShow}>
          + Firma Ekle
        </Button>

        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Firma Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Label>Firma Adı:</Form.Label>
              <Form.Control
                placeholder="* Firma Adını Giriniz"
                onChange={this.onChange_1}
                value={this.state.companyName}
              />
              <Form.Text className="text-muted">* Girmek zorunludur.</Form.Text>
              <br />
              <Form.Label>Vergi Dairesi:</Form.Label>
              <Form.Control
                placeholder="Vergi Dairesini Giriniz"
                onChange={this.onChange_2}
                value={this.state.taxOffice}
              />
              <br />
              <Form.Label>Vergi Numarası:</Form.Label>
              <Form.Control
                placeholder="Vergi Numarasını Giriniz"
                onChange={this.onChange_3}
                value={this.state.taxNumber}
              />
              <br />
              <Button variant="primary" type="submit" onClick={handleClose}>
                Kaydet
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Kapat
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then(response => {
        this.setState({ companies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDelete = id => {
    axios.delete('http://localhost:5000/companies/' + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      companies: this.state.companies.filter(el => el._id !== id)
    });
  };

  companyList() {
    if (!this.state.searchTerm) {
      return this.state.companies.map(currentcompany => {
        return (
          <Company
            company={currentcompany}
            onDelete={this.onDelete}
            handleEdit={this.handleEdit}
            key={currentcompany._id}
          />
        );
      });
    } else {
      return this.state.companies
        .filter(company => {
          return company.companyName
            .toLowerCase()
            .includes(this.state.searchTerm);
        })
        .map(matchingCompany => {
          return (
            <Company
              company={matchingCompany}
              onDelete={this.onDelete}
              handleEdit={this.handleEdit}
              key={matchingCompany._id}
            />
          );
        });
    }
  }

  onSearchCompanyName = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <h2>Firmalar</h2>
        <hr />
        <this.CompanyModal />
        <hr />
        <Form>
          <FormControl
            placeholder="Firma Ara"
            onChange={this.onSearchCompanyName}
            value={this.state.searchTerm}
          ></FormControl>
        </Form>
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Firma Adı</th>
              <th>Vergi Dairesi</th>
              <th>Vergi Numarası</th>
              <th>Eklenme Tarihi</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>{this.companyList()}</tbody>
        </Table>
      </div>
    );
  }
}

export default Companies;
