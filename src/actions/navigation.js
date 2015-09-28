function navigatedToURI(newURI) {
  var location = ROUTER.lookupURI(newURI);
  var canonicalURI = location.name && ROUTER.makeURI(location.name, location.options);

  if (canonicalURI && canonicalURI != newURI) {
    navigateToLocation(location.name, location.options);
  }
  else {
    setState({location: location});
  }
}

function navigateToLocation(name, options) {
  var URI = ROUTER.makeURI(name, options);

  window.location.replace(
    window.location.pathname +
    window.location.search +
    '#' +
    URI
  );
}
