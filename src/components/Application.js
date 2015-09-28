var Application = React.createClass({
  propTypes: {
    location: React.PropTypes.object.isRequired,
  },

  render: function() {
    var config = APPLICATION_CONFIG[this.props.location.name] || {component: NotFoundView};
    var self = this;
    var props = {actions: config.actions, params: this.props.location.options};
    (config.state || []).forEach(function(key) {
      props[key] = self.props[key];
    })
    return React.createElement(config.component, props);
  },
});
