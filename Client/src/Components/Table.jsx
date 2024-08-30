import { useState, useMemo, useEffect } from "react";
import "../Styles/table.css";

// eslint-disable-next-line react/prop-types
function Table({ allUserData }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusData, setStatusData] = useState();
  const handleSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const changeStatus = (data) => {
    setStatusData(data);
  };
  const statusChange = (username) => {
    // eslint-disable-next-line react/prop-types
    const existingUser = allUserData.find((user) => user.username == username);
    existingUser.userStatus === "active" ? "inactive" : "active";
  };

  useEffect(() => {
    if (statusData) {
      // eslint-disable-next-line react/prop-types
      const data = allUserData.find(
        (user) => user.username == statusData.username
      )
      if (data.userStatus == "active") {
        data.userStatus = "inactive";
      } else {
        data.userStatus = "active";
      }
    }
  }, [statusData,allUserData]);

  const sortData = (data, order) => {
    return [...data].sort((a, b) => {
      const nameA = a.username.toUpperCase();
      const nameB = b.username.toUpperCase();
      if (order === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  };

  const sortedData = useMemo(
    () => sortData(allUserData, sortOrder),
    [allUserData, sortOrder]
  );

  const filteredData = useMemo(() => {
    let filtered = sortedData;
    console.log("filterd",filtered);
    
    if(statusData){
      console.log("test1");
      
      const data = filtered.find(
        (user) => user.username == statusData.username
      )
      if (data.userStatus == "active") {
        console.log("change1");
        
        data.userStatus = "inactive";
      } else {
        console.log("change two");
        
        data.userStatus = "active";
      }
    }

    if (statusFilter) {
      filtered = filtered.filter((user) => user.userStatus === statusFilter);
    }

    if (searchInput) {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchInput) ||
          user.email.toLowerCase().includes(searchInput)
      );
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((user) => {
        const signupDate = new Date(user.signupDate.split("T")[0]);
        return signupDate >= start && signupDate <= end;
      });
    }

    return filtered;
  }, [sortedData, statusFilter, startDate, endDate, searchInput,statusData]);

  return (
    <div className="table-container">
      <div className="filters-container">
        <div className="input-search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${
              statusFilter === "active" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
          <button
            className={`toggle-button ${
              statusFilter === "inactive" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("inactive")}
          >
            Inactive
          </button>
          <button
            className={`toggle-button ${statusFilter === "" ? "active" : ""}`}
            onClick={() => setStatusFilter("")}
          >
            All
          </button>
        </div>
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${sortOrder === "asc" ? "active" : ""}`}
            onClick={() => setSortOrder("asc")}
          >
            Sort A-Z
          </button>
          <button
            className={`toggle-button ${sortOrder === "desc" ? "active" : ""}`}
            onClick={() => setSortOrder("desc")}
          >
            Sort Z-A
          </button>
        </div>
        <div className="date-filters">
          <label htmlFor="start-date">From:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="end-date">To:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <table className="table" id="table-data">
        <thead>
          <tr className="table-header">
            <th className="table-row-image"></th>
            <th className="table-row-username">Username</th>
            <th className="table-row-email">Email</th>
            <th className="table-row-status">Status</th>
            <th className="table-row-recent-login">Recent Login</th>
            <th>Signup Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <tr className="table-body" key={index}>
                <td>
                  <img
                    src={data.profileImage}
                    alt=""
                    className="profile_image"
                  />
                </td>
                <td className="username">{data.username}</td>
                <td>{data.email}</td>
                <td>
                  <button
                    className={
                      data.userStatus === "active" ? "isactive" : "isInactive"
                    }
                    onClick={() => {
                      changeStatus(data), statusChange(data.username);
                    }}
                  >
                    {data.userStatus}
                  </button>
                </td>
                <td>{data.recentLogin.split("T")[0]}</td>
                <td>{data.signupDate.split("T")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
