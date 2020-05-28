const basePath = process.env.NODE_ENV === "production"
  ? 'https://thepizzatask-be.herokuapp.com' 
  : 'http://localhost:5000';
export default (path, method = 'GET', data = null) => {

  let config = { 
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if( data ){
    config.body = JSON.stringify(data);
  }
  return fetch(basePath + '/api' + path, config).then(response => response.json());
};