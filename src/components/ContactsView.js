var ContactsView = React.createClass({
  propTypes: {
    onChangeContact: React.PropTypes.func.isRequired,
    onSubmitContact: React.PropTypes.func.isRequired,

    contacts: React.PropTypes.array.isRequired,
    newContactForm: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'ContactsView'},
        React.createElement('h1', {className: 'ContactsView-title'}, "Contacts"),
        React.createElement('ul', {className: 'ContactsView-list'},
          this.props.contacts.map(function(contact) {
            return React.createElement(ContactItem, Object.assign(contact, {id: contact.key}))
          })),
        React.createElement(ContactForm, {
          value: this.props.newContactForm,
          onChange: this.props.onChangeContact,
          onSubmit: this.props.onSubmitContact,
        })
      )
    )
  },
});
