var Link = React.createClass({
  propTypes: {
    routeName: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement(
        'a',
        {
          className: 'Link ' + (this.props.className || ''),
          href: '#'+ROUTER.path(this.props.routeName, this.props.params),
        },
        this.props.children
      )
    )
  },
});
