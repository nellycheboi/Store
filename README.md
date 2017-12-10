# Store

This [project](https://github.com/nellycheboi12/Store) uses ASP.Net Core 2.0
Features:
## Cross site request forgery(XRSF)

In ./startup.cs the app is configure provide a token in a cookie called XSRF-TOKEN [Read More](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery)
```
public void ConfigureServices(IServiceCollection services)
   {
       services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
       ....
   }
```

## Concurrent Editing

## Server Side Prerendering




## Design Architecture
  - ClientApp
    - app
        - components
          - app
          - home
          - message
          - navmenu
          - order
          - user
        - Models
          - message
          - messageType
          - order
          - user
        - services
          - message
          - order
          - user
        - app-routing
        - app.broswer.module.ts
        - app.server.module.ts
        - app.shared.module.ts
    - dist
  - Controllers
    - home
    - orders
    - users
  - Data
    - dbInitializer
    - dbContext
  - Migrations
  - Models
    - order
    - user
  -Views
    - home
      - index
    - shared
    - viewImports
    - viewStart
  - program
  - startup
  - webpack
  - package.json

## References
  - [Angular API](https://angular.io/api)
  - [Angular Tutorial](https://angular.io/tutorial)
  - [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/data/)
  - [ASP.NET Template](http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/)
  - [.NET Core 2.0](https://blogs.msdn.microsoft.com/webdev/2017/08/14/announcing-asp-net-core-2-0/)
  -[Filter](https://github.com/VadimDez/ngx-filter-pipe) [Pagination](https://ciphertrick.com/2017/08/01/search-sort-pagination-in-angular/)
