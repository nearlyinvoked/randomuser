import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Moment from "react-moment";

import { Data } from "./api/users";

const Home: NextPage = () => {
  const [users, setUsers] = useState<Data[]>([]);

  const [filterData, setFilterData] = useState<Data[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    setFilter(true);
    let filterUsername = users.filter((item) =>
      item.login.username.toLowerCase().includes(search.toLowerCase())
    );
    let filterName = users.filter((item) =>
      item.name.first.toLowerCase().includes(search.toLowerCase())
    );
    let filterEmail = users.filter((item) =>
      item.email.toLowerCase().includes(search.toLowerCase())
    );

    let filterData = filterUsername.concat(filterName).concat(filterEmail);

    setFilterData(filterData);
  };

  const handleResetFilter = () => {
    setFilter(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data.results);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <Head>
        <title>Random User App</title>
        <meta name="description" content="Generate Random user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container text-lg">
        <h1 className="text-2xl">Random User Table</h1>
        <form className="flex my-5" action="">
          <div className="lg:basis-3/12 md:basis-1/4">
            <p>Search</p>
            <div className="flex">
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="btn-search ml-1"
                onClick={() => handleSearch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:basis-1/12 md:basis-1/4 ml-5">
            <p>Gender</p>
            <select name="gender" id="gender" className="select-gender">
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="lg:basis-1/12 md:basis-1/4 self-end ml-5">
            <button
              type="button"
              className="btn-filter text-md"
              onClick={() => handleResetFilter()}
            >
              Reset Filter
            </button>
          </div>
        </form>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="bg-gray-300">Username</th>
              <th className="bg-gray-300">Name</th>
              <th className="bg-gray-300">Email</th>
              <th className="bg-gray-300">Gender</th>
              <th className="bg-gray-300">Date</th>
            </tr>
          </thead>
          {filter ? (
            <tbody>
              {filterData.map((item) => (
                <tr key={item.login.username}>
                  <td>{item.login.username}</td>
                  <td>{item.name.first + " " + item.name.last}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Moment format="DD/MM/YYYY HH:mm">
                      {item.registered.date}
                    </Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {users.map((item) => (
                <tr key={item.login.username}>
                  <td>{item.login.username}</td>
                  <td>{item.name.first + " " + item.name.last}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Moment format="DD/MM/YYYY HH:mm">
                      {item.registered.date}
                    </Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </main>
    </div>
  );
};

export default Home;
