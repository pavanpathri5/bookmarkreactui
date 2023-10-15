import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';
import './table.css'; // Import the CSS file
import SearchBar from './SearchBar'


class PaginatedTable extends Component {
  state = {
    data: [],          // Store fetched data
    currentPage: 0,    // Current page number
    itemsPerPage: 10, // Number of items to display per page
    pageCount: 0,
    filteredData: [], // Store the data to display after filtering
    searchQuery: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { currentPage, itemsPerPage, searchQuery } = this.state;

    axios.get(`http://localhost:8050/api/v1/searchbookmarks?page=${currentPage}&pageSize=${itemsPerPage}&searchterm=${searchQuery}`)
      .then((response) => {
        this.setState({
          data: response.data.content,
          pageCount: JSON.parse(response.data.totalPages),
          filteredData : response.data.content
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  handlePageClick = (selectedPage) => {
    this.setState(
      { currentPage: selectedPage.selected},
      () => this.fetchData()
    );
  };

  handleSearch = (searchText) => {

    this.setState({searchQuery : searchText});
    const filteredResults = this.state.data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    this.setState(
      { data: filteredResults },
      () => this.fetchData()
      );
  }

  render() {
    // Pagination logic (skip in this example)
    const { data, currentPage, itemsPerPage, pageCount } = this.state;

    return (
      <>
      <div className="table-container">
      <SearchBar onSearch={this.handleSearch} />
        <table>
          <thead>
            <tr>
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
