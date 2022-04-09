import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com";


const GetApiData =  ({ url }) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);  
    useEffect(() => {
      const fetchData = async() => {
        await axios
          .get(url)
          .then((res) => setResponse(res.data))
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      };
      fetchData();
    }, [url]);
    if (response !== null) {
      return { response, error, loading };
  }
    return 'somthing';
};
export default GetApiData

