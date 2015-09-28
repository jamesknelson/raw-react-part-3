var CONTACT_TEMPLATE = {
  name: "",
  email: "",
  description: "",
  errors: null,
};

var ROUTER = unirouter(
  // Routes
  { 
    listContacts: 'GET /contacts',
    editContact: 'GET /contacts/:id',
  }, 
  // Aliases
  {
    'GET /': 'listContacts',
  }
);

var APPLICATION_CONFIG = {
  listContacts: {
    component: ContactsView,
    actions: {
      update: updateNewContact,
      submit: submitNewContact,
    },
    state: ['contacts', 'newContactForm'],
  },

  editContact: {
    component: ContactView,
    actions: {
      update: updateContactForm,
      submit: submitContactForm,
    },
    state: ['contacts', 'contactForms'],
  },
};


// Initial state
var state = {
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

  ReactDOM.render(
    React.createElement(Application, state),
    document.getElementById('react-app')
  );
}

// Handle receiving a new hash
function handleNewHash() {
  navigatedToURI(window.location.hash.substr(1));
}

// Handle browser navigation events
window.addEventListener('hashchange', handleNewHash, false);

// Set the initial route and render the app
handleNewHash()
