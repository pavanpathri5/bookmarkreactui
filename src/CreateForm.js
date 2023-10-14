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
        email: '',
        tagName:''
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
    console.log(this.state.formData.name  );

    const formData1 = {
      // Extract form data from the component's state or input fields
      name: this.state.formData.name,
      description: this.state.formData.description,
      link : this.state.formData.link,
      user : { 
        email : this.state.formData.email
      },
      tag : {
        name : this.state.formData.tagName
      }
    };


    axios.post('http://localhost:8050/api/v1/createbookmark', formData1)
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
        <button onClick={this.openModal}>Open Form</button>
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
                id="email"
                name="email"
                value={formData.email}
                onChange={this.handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="email">TagName:</label>
              <input
                type="text"
                id="tagName"
                name="tagName"
                value={formData.tagName}
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
