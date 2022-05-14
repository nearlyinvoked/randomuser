import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Moment from "react-moment";

import { Data } from "./api/users";
import IconSort from "../components/IconSort";
import IconSearch from "../components/IconSearch";

const Home: NextPage = () => {
  const [users, setUsers] = useState<Data[]>([]);

  const [filterData, setFilterData] = useState<Data[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  const [select, setSelect] = useState("");

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

  const handleFilterGender = async (gender: string) => {
    setSelect(gender);
    setFilter(true);
    let filterGender = users.filter((item) => item.gender == gender);
    setFilterData(filterGender);
  };

  const handleResetFilter = () => {
    setFilter(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      // const data = response.data.results.sort((a: Data, b: Data) =>
      //   a.name.first.localeCompare(b.name.first)
      // );
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
                <IconSearch />
              </button>
            </div>
          </div>
          <div className="lg:basis-1/12 md:basis-1/4 ml-5">
            <p>Gender</p>
            <select
              name="gender"
              id="gender"
              className="select-gender"
              value={select}
              onChange={(e) => handleFilterGender(e.target.value)}
            >
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
              <th className="bg-gray-300">
                Username{" "}
                <button>
                  <IconSort />
                </button>
              </th>
              <th className="bg-gray-300">
                Name{" "}
                <button>
                  <IconSort />
                </button>
              </th>
              <th className="bg-gray-300">
                Email{" "}
                <button>
                  <IconSort />
                </button>
              </th>
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
