import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Moment from "react-moment";

import { Data } from "./api/users";

const Home: NextPage = () => {
  const [users, setUsers] = useState<Data[]>([]);

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
            <input id="search" type="text" />
          </div>
          <div className="lg:basis-1/12 md:basis-1/4 ml-1">
            <p>Gender</p>
            <select name="gender" id="gender" className="select-gender">
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="lg:basis-1/12 md:basis-1/4 self-end ml-1">
            <button className="btn-filter text-md">Reset Filter</button>
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
        </table>
      </main>
    </div>
  );
};

export default Home;
