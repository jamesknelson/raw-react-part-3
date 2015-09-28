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
      onChange: updateNewContact,
      onSubmit: submitNewContact,
    },
    state: ['contacts', 'newContactForm'],
  },

  editContact: {
    component: ContactView,
    actions: {
      onChange: updateContactForm,
      onSubmit: submitContactForm,
    },
    state: ['contacts', 'contactForms'],
  },
};
