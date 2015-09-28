var ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    contactForms: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  },

  render: function() {
    var key = this.props.params.id;
    var contactForm =
      this.props.contactForms[key] ||
      this.props.contacts.filter(function(contact) { return contact.key == key })[0];

    return (
      !contactForm
        ? React.createElement(NotFoundView)
        : React.createElement('div', {className: 'ContactView'},
            React.createElement('h1', {className: 'ContactView-title'}, "Edit Contact"),
            React.createElement(
              ContactForm,
              Object.assign(
                this.props.actions,
                {value: contactForm}
              )
            )
          )
    )
  },
});
