import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Moment from "react-moment";

import { Data } from "./api/users";
import IconSort from "../components/IconSort";
import IconSearch from "../components/IconSearch";
import Pagination from "../components/Pagination";

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
            <svg
              role="status"
              className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
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
