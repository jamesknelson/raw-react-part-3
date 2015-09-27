function navigate(to) {
  var path = window.location.hash.substr(1);
  var route = to.route;

  switch (route.name) {
  case 'editContact':
    var key = to.params.id;
    if (!(state.contacts.filter(function(contact) { return contact.key === key })[0])) {
      route = ROUTER.get('404');
    }
    break;
  }
  
  // Update the window's hash if it doesn't match the new route
  if (path != route.path && route.name != "404") {
    var canonicalPath = ROUTER.path(route.name, to.params);

    window.location.replace(
      window.location.pathname +
      window.location.search +
      '#/' +
      canonicalPath
    );
  }
    
  setState({route: route, params: to.params || {}});
}
