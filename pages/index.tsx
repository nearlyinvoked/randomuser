import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Moment from "react-moment";

import { Data } from "./api/users";
import IconSort from "../components/IconSort";
import IconSearch from "../components/IconSearch";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

const Home: NextPage = () => {
  const [users, setUsers] = useState<Data[]>([]);

  const [filterData, setFilterData] = useState<Data[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  const [currentPage, setcurrentPage] = useState<number>(1);

  const [select, setSelect] = useState("");

  const [search, setSearch] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  // Filter by Search, Gender
  const handleSearch = () => {
    setFilter(true);
    let filterUsername = users.filter((item) =>
      item.login.username.toLowerCase().includes(search.toLowerCase())
    );
    let filterName = users.filter((item) => {
      let name = item.name.first + " " + item.name.last;
      name.toLowerCase().includes(search.toLowerCase());
    });
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

  // Pagination
  const handleGetPages = async (page: number) => {
    setloading(true);
    setFilter(false);
    setcurrentPage(page);
    const response = await axios.get(`/api/users/pages/${page}`);
    setUsers(response.data.results);
    setloading(false);
  };

  // Sort Column
  const sortUsername = () => {
    setUsers((prevState) => [
      ...prevState.sort((a: Data, b: Data) =>
        a.login.username.localeCompare(b.login.username)
      ),
    ]);
  };

  const sortName = () => {
    setUsers((prevState) => [
      ...prevState.sort((a: Data, b: Data) =>
        a.name.first.localeCompare(b.name.first)
      ),
    ]);
  };

  const sortEmail = () => {
    setUsers((prevState) => [
      ...prevState.sort((a: Data, b: Data) => a.email.localeCompare(b.email)),
    ]);
  };

  const sortGender = () => {
    setUsers((prevState) => [
      ...prevState.sort((a: Data, b: Data) => a.gender.localeCompare(b.gender)),
    ]);
  };

  // Reset Filter
  const handleResetFilter = () => {
    setFilter(false);
    setSearch("");
  };

  useEffect(() => {
    setloading(true);
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data.results);
      setloading(false);
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

        {loading ? (
          <div className="loading flex justify-center items-center mt-10">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <table className="table-fixed" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="bg-gray-300">
                    Username{" "}
                    <button type="button" onClick={() => sortUsername()}>
                      <IconSort />
                    </button>
                  </th>
                  <th className="bg-gray-300">
                    Name{" "}
                    <button type="button" onClick={() => sortName()}>
                      <IconSort />
                    </button>
                  </th>
                  <th className="bg-gray-300">
                    Email{" "}
                    <button type="button" onClick={() => sortEmail()}>
                      <IconSort />
                    </button>
                  </th>
                  <th className="bg-gray-300">
                    Gender{" "}
                    <button type="button" onClick={() => sortGender()}>
                      <IconSort />
                    </button>
                  </th>
                  <th className="bg-gray-300">Date</th>
                </tr>
              </thead>
              {filter ? (
                <tbody>
                  {filterData.map((item) => (
                    <tr key={item.login.username}>
                      <td className="text-center">{item.login.username}</td>
                      <td className="text-center">
                        {item.name.first + " " + item.name.last}
                      </td>
                      <td className="text-center">{item.email}</td>
                      <td className="text-center">{item.gender}</td>
                      <td className="text-center">
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
                      <td className="text-center">{item.login.username}</td>
                      <td className="text-center">
                        {item.name.first + " " + item.name.last}
                      </td>
                      <td className="text-center">{item.email}</td>
                      <td className="text-center">{item.gender}</td>
                      <td className="text-center">
                        <Moment format="DD/MM/YYYY HH:mm">
                          {item.registered.date}
                        </Moment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <Pagination
              currentPage={currentPage}
              handleGetPages={handleGetPages}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
