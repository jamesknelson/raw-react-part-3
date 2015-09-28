var Application = React.createClass({
  propTypes: {
    location: React.PropTypes.array.isRequired,
  },

  render: function() {
    switch (this.props.location[0]) {
      case 'contacts':
        if (this.props.location[1]) {
          var actions = {onChange: updateContactForm, onSubmit: submitContactForm};
          return React.createElement(
            ContactView,
            Object.assign({actions: actions, id: this.props.location[1]}, state)
          );
        }
        else {
          var actions = {onChange: updateNewContact, onSubmit: submitNewContact};
          return React.createElement(
            ContactsView,
            Object.assign({actions: actions}, state)
          );
        }
        break;
      default:
        return React.createElement(NotFoundView);
    }
  },
});
