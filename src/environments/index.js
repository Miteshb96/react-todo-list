const environments = {
  development: {
    URL: "http://localhost:3001"
  }
};

export default environments[process.env.REACT_APP_ENV] ||
  environments[Object.keys(environments)[0]];
