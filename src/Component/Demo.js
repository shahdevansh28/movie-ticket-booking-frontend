import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Demo() {
  const [details, setDetail] = useState([]);
  //const [cookie, setCookie] = useCookies(['user']);

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${Cookies.get("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    axios
      .get("https://localhost:44397/api/get-all-booking")
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  return (
    <>
      <h1>Hello There</h1>
    </>
  );
}
