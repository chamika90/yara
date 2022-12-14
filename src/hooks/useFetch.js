import {useEffect, useState} from 'react';

const useFetch = (url) => {
  const [isLoading, setLoadingStatus] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchData =(url) =>{
    fetch(url)
    .then(response => response.json())
    .then(result => {
      console.log("result ----->",result);

      setData(result);
      setLoadingStatus(false);
    })
    .catch(err => {
      console.log("error ----->",err);

      setError(err);
      setLoadingStatus(false);
    });
  }

//   useEffect(() => {
//     console.log("url ----->",url);

    
//   }, []);

  return {isLoading, data, error, fetchData};
};

export default useFetch;
