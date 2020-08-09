
let apiHost = process.env.REACT_APP_API_SERVER;
if (!apiHost) {
  const protocol = window.location.protocol;
  const slashes = protocol.concat('//');
  apiHost = slashes.concat(window.location.host);
}
const config = {
  apiHost: apiHost,
};

export default config;
