import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './modal.css'; 

Modal.setAppElement('#root'); // Make sure to set the app root element

class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      formData: {
        name: '',
        description: '',
        link:'',
        user: '',
        tag:''
      },
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send data to an API
    console.log(this.state.formData);
    axios.post('http://localhost:8050/api/v1/createbookmark', this.state.formData)
      .then((response) => {
        // Handle a successful response from the API
        console.log('Data sent to the API:', response.data);
      })
      .catch((error) => {
        // Handle an error response from the API
        console.error('Error sending data to the API:', error);
      });
    this.closeModal();
  };

  render() {
    const { isModalOpen, formData } = this.state;

    return (
      <div>
        <button onClick={this.openModal}>Create</button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Form Modal"
          className="ReactModal__Content" // Apply the modal content class
          overlayClassName="ReactModal__Overlay" // Apply the overlay class
        >
          <h2 className="modal-title">Form Popup</h2>
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email">Link:</label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="user"
                name="user"
                value={formData.user}
                onChange={this.handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="email">TagName:</label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default CreateForm;
