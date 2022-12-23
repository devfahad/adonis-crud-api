declare module '@ioc:Adonis/Core/Route' {
  interface RouteContract {
    bind(model): this
  }
}

declare module '@ioc:Adonis/Core/Route' {
  interface RouteResourceContract {
    bind(model): this
  }
}
