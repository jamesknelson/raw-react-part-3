var CONTACT_TEMPLATE = {
  name: "",
  email: "",
  description: "",
  errors: null,
};

var NAVIGATION_ROUTES = {
  listContacts: {
    path: 'contacts',
    component: ContactsView,
    actions: {
      update: updateNewContact,
      submit: submitNewContact,
    },
    state: ['contacts', 'newContactForm'],
  },

  editContact: {
    path: 'contacts/:id',
    component: ContactView,
    actions: {
      update: updateContactForm,
      submit: submitContactForm,
      navigate: navigate,
    },
    state: ['contacts', 'contactForms'],
  },

  '404': {
    component: NotFoundView,
  },
};

var NAVIGATION_REDIRECTS = {
  '': 'listContacts',
};

var ROUTER = unirouter(NAVIGATION_ROUTES, NAVIGATION_REDIRECTS);


// Initial state
var state = {
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
  navigate(ROUTER.lookup(window.location.hash.substr(1)));
}

// Handle browser navigation events
window.addEventListener('hashchange', handleNewHash, false);

// Set the initial route and render the app
handleNewHash()
