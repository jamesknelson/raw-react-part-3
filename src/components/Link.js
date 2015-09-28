var Link = React.createClass({
  propTypes: {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement(
        'a',
        {
          className: 'Link ' + (this.props.className || ''),
          href: '#'+ROUTER.makeURI(this.props.location.name, this.props.location.options),
        },
        this.props.children
      )
    )
  },
});
