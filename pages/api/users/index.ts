// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, AxiosResponseHeaders } from "axios";

export type Data = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;

  login: {
    username: string;
  };
  registered: {
    date: string;
    age: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response: any = await axios.get<Data[]>(
      "https://randomuser.me/api/?results=100"
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
}
