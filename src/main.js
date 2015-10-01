// Constants
var CONTACT_TEMPLATE = {
  name: "",
  email: "",
  description: "",
  errors: null,
};

// Initial state
var state = {
  live: false,
  location: null,
  contacts: [
    {key: '1', name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: '2', name: "Jim", email: "jim@example.com"},
  ],
  contactForms: {},
  newContactForm: Object.assign({}, CONTACT_TEMPLATE),
};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  if (state.live) {
    ReactDOM.render(
      React.createElement(Application, state),
      document.getElementById('react-app')
    );
  }
}

// Handle receiving a new hash
function handleNewHash() {
  navigated(window.location.hash.substr(1));
}

// Handle browser navigation events
window.addEventListener('hashchange', handleNewHash, false);

// Set the initial route and render the app
handleNewHash()
