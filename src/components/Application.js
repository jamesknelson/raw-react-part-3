var Application = React.createClass({
  displayName: 'Application',

  propTypes: {
    route: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  },

  render: function() {
    var self = this;
    var props = {actions: this.props.route.actions, params: this.props.params};
    (this.props.route.state || []).forEach(function(key) {
      props[key] = self.props[key];
    })
    return React.createElement(this.props.route.component, props);
  },
});
