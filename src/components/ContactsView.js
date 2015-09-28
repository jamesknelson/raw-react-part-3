var ContactsView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContactForm: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'ContactsView'},
        React.createElement('h1', {className: 'ContactsView-title'}, "Contacts"),
        React.createElement('ul', {className: 'ContactsView-list'},
          this.props.contacts.map(function(contact) {
            return React.createElement(ContactItem, Object.assign(contact, {id: contact.key}))
          })),
        React.createElement(ContactForm, {actions: this.props.actions, value: this.props.newContactForm})
      )
    )
  },
});
