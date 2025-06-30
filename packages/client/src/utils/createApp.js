function createApp() {
  let menuLinks = [];
  let hooks = [];
  let middlewares = [];

  return {
    getMenuLinks: () => menuLinks,
    addMenuLink: (props) => menuLinks.push(props),
    getHooks: () => hooks,
    addHook: (name, Component) => hooks.push({ name, Component }),
    getMiddlewares: () => middlewares,
    addMiddleware: (props) => middlewares.push(props),
  };
}

export default createApp;
