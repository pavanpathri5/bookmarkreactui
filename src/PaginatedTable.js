import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';
import './table.css'; // Import the CSS file
import CreateForm from './CreateForm';


class PaginatedTable extends Component {
  state = {
    data: [],          // Store fetched data
    currentPage: 0,    // Current page number
    itemsPerPage: 5, // Number of items to display per page
    pageCount: 0
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { currentPage, itemsPerPage } = this.state;

    // Replace 'your_api_endpoint' with your actual API endpoint
    axios.get(`http://localhost:8050/api/v1/getallbookmarks?page=${currentPage}&pageSize=${itemsPerPage}`)
      .then((response) => {
        console.warn(JSON.parse(response.data.length));
        this.setState({
          data: response.data,
          pageCount: Math.ceil(13/itemsPerPage)//Math.ceil(JSON.parse(response.data.length) / itemsPerPage), //  need data count
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  handlePageClick = (selectedPage) => {
    console.log(`selectedPage--- ${JSON.stringify(selectedPage.selected - 1 )}`)
    this.setState(
      { currentPage: selectedPage.selected},
      () => this.fetchData()
    );
  };

  render() {
    // Pagination logic (skip in this example)
    const { data, currentPage, itemsPerPage, pageCount } = this.state;

    return (
      <>
      <CreateForm/>
      <div className="table-container">
        <table>
          <thead>
            <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Description</th>
            <th>Link / Details</th>
            <th>User</th>
            <th>tagName</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td><a href={item.link} >{item.link}</a></td>
                <td>{item.user.email}</td>
                <td>{item.tag.name}</td>
                {/* Add more table cells based on your data structure */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
          />
        </div>
      </div>
      </>
    );
  }
}

export default PaginatedTable;
