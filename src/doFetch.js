const basePath = process.env.NODE_ENV === "production"
  ? 'https://thepizzatask-be.herokuapp.com' 
  : 'http://localhost:5000';
export default (path, method = 'GET') => {
  return fetch(basePath + '/api' + path, { 
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};
