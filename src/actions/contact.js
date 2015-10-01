function _addValidationToContact(contact) {
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"]
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"]
  }
}


function updateNewContact(contact) {
  setState({ newContactForm: contact });
}


function submitNewContact() {
  var contact = Object.assign({}, state.newContactForm, {key: (state.contacts.length + 1) + '', errors: {}});
  
  _addValidationToContact(contact);

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContactForm: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContactForm: contact }
  )
}


function updateContactForm(contact) {
  var update = {};
  update[contact.key] = contact;
  var contactForms = Object.assign(state.contactForms, update);

  setState({ contactForms: contactForms });
}


function submitContactForm() {
  var key = state.location[1];
  var contactForm = state.contactForms[key];

  if (!contactForm) {
    startNavigating('/contacts');
  }
  else {
    var contact = Object.assign({}, contactForm, {errors: {}});

    _addValidationToContact(contact);

    var contactForms = Object.assign({}, state.contactForms);
    var update = { contactForms: contactForms };
    
    if (Object.keys(contact.errors).length === 0) {
      delete contactForms[key];
      update.contacts = state.contacts.slice(0).map(function(x) {
        return x.key == key ? contact : x
      });

      startNavigating('/contacts');
    }
    else {
      contactForms[key] = contact;
    }

    setState(update);
  }  
}
