(function(root) {
  function assert(condition, format) {
    if (!condition) {
      var args = [].slice.call(arguments, 2);
      var argIndex = 0;
      throw new Error(
        'Unirouter Assertion Failed: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }
  }

  function validatePath(path) {
    assert(
      !/\/{2,}/.test(path),
      "Path `%s` has no adjacent `/` characters: `%s`", path
    )
    assert(
      path[0] != '/' && path[0] != ':',
      "Path `%s` does not start with the `%s` character", path, path[0]
    )
    assert(
      !/\/$/.test(path),
      "Path `%s` does not end with the `/` character", path
    )
    assert(
      path.indexOf('#' !== -1),
      "Path `%s` does not contain the `#` character", path
    )
  }

  function pathParts(path) {
    return path == '' ? [] : path.toLowerCase().split('/')
  }

  function makeRoute(name, method, def) {
    var i
    var route = {name: name, method: method}

    for (i in def) {
      if (def.hasOwnProperty(i)) {
        route[i] = def[i]
      }
    }

    return route
  }


  function LookupTree() {
    this.tree = {}
  }

  function lookupTreeReducer(tree, part) {
    return tree && (tree[part] || tree[':'])
  }

  LookupTree.prototype.find = function(parts) {
    return (parts.reduce(lookupTreeReducer, this.tree) || {})['']
  }

  LookupTree.prototype.add = function(parts, route) {
    var i, branch
    var branches = parts.map(function(part) { return part[0] == ':' ? ':' : part })
    var currentTree = this.tree

    for (i = 0; i < branches.length; i++) {
      branch = branches[i]  
      if (!currentTree[branch]) {
        currentTree[branch] = {}
      }
      currentTree = currentTree[branch]
    }

    assert(
      !currentTree[branch],
      "Path `%s` does not conflict with other paths", parts.join('/')
    )

    currentTree[''] = route
  }


  function createRouter(routeDefs, redirects) {
    var path, parts, name, routeDef;
    var routes = {};
    var routesParams = {};
    var lookupTree = new LookupTree;
    var notFoundRoute = makeRoute('404', null, routeDefs['404'] || {})

    assert(
      !notFoundRoute.path,
      "The '404' route must not have a `path` property"
    )
    assert(
      !notFoundRoute.method,
      "The '404' route must not have a `method` property"
    )

    delete routeDefs['404']

    // By default, there are no redirects
    redirects = redirects || {};

    // Copy routes into navigation table
    for (name in routeDefs) {
      if (routeDefs.hasOwnProperty(name)) {
        routeDef = routeDefs[name]
        if (typeof routeDef == 'string') {
          routeDef = {path: path}
        }
        method = routeDef.method || 'GET'
        path = routeDef.path

        assert(
          typeof routeDef == 'object',
          "Route '%s' is defined by a string or an object", name
        )
        assert(
          typeof path == 'string',
          "Route '%s has a non-string path.", name
        )
        assert(
          !routeDef.name,
          "Route '%s' does not contain the reserved property `name`.", name
        )
        assert(
          /^[A-Z]+$/.test(method),
          "Route '%s''s `method` is specified in UPPERCASE.", name
        )

        validatePath(path)

        parts = pathParts(path)

        routesParams[name] = parts
          .map(function(part, i) { return part[0] == ':' && [part.substr(1), i] })
          .filter(function(x) { return x })

        routes[name] = makeRoute(name, method, routeDef)

        lookupTree.add(parts.concat(method), name)
      }
    }

    // Copy redirects into navigation table
    for (path in redirects) {
      if (redirects.hasOwnProperty(path)) {
        name = redirects[path]

        assert(
          routes[name],
          "Redirect from '%s' to non-existent route '%s'.", path, name
        )

        validatePath(path);

        lookupTree.add(pathParts(path).concat('GET'), name);
      }
    }


    return {
      get: function(name) {
        return name == '404' ? notFoundRoute : routes[name];
      },


      lookup: function(uri, method) {
        method = method ? method.toUpperCase() : 'GET'

        var i, x

        var split = uri
          // Strip leading and trailing '/' (at end or before query string)
          .replace(/^\/|\/($|\?)/g, '')
          // Strip fragment identifiers
          .replace(/#.*$/, '')
          .split('?', 2)

        var parts = pathParts(split[0]).map(decodeURIComponent).concat(method)
        var name = lookupTree.find(parts)
        var route = name && routes[name]
        var params = {}
        var routeParams, queryParts

        if (!route) {
          return {route: notFoundRoute, params: params}
        }
        else {
          routeParams = routesParams[name]
          queryParts = split[1] ? split[1].split('&') : []
        
          for (i = 0; i != queryParts.length; i++) {
            x = queryParts[i].split('=')
            params[x[0]] = decodeURIComponent(x[1])
          }

          // Named parameters overwrite query parameters
          for (i = 0; i != routeParams.length; i++) {
            x = routeParams[i]
            params[x[0]] = parts[x[1]]
          }

          return {route: route, params: params}
        }
      },


      path: function(name, params) {
        params = params || {}

        var routeParams = routesParams[name] || []
        var routeParamNames = routeParams.map(function(x) { return x[0]; })
        var route = routes[name]
        var query = []
        var inject = []
        var key

        assert(route, "Route `%s` exists", name)

        for (key in params) {
          if (params.hasOwnProperty(key)) {
            if (routeParamNames.indexOf(key) === -1) {
              assert(
                /^[a-zA-Z0-9-_]+$/.test(key),
                "Non-route parameters must use only the following characters: A-Z, a-z, 0-9, -, _"
              )

              query.push(key+'='+encodeURIComponent(params[key]))
            }
            else {
              inject.push(key)
            }
          }
        }

        assert(
          inject.sort().join() == routeParamNames.slice(0).sort().join(),
          "You must specify all route params when using `pathFor`."
        )

        var path =
          routeParamNames.reduce(function pathReducer(injected, key) {
            return injected.replace(':'+key, encodeURIComponent(params[key]))
          }, route.path)

        if (query.length) {
          path += '?' + query.join('&')
        }

        return path
      }
    };
  }


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createRouter
  }
  else {
    root.unirouter = createRouter
  }
})(this);
