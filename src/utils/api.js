import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});
