# Store:

This [project](https://github.com/nellycheboi12/Store) uses ASP.Net Core 2.0

# Setup:
  ```
    git clone https://github.com/nellycheboi12/Store
    Update-Database //Powershell, PM Manager visual studio.

    // Incase of errors try the following from the directory containing webpack.config.vendor.js i.e __ROOT__/store
    // Make you npm is installed too.
    webpack -- config webpack.config.vendor.js

  ```
# Features:
Some of the features included in this applications are

## Cross site request forgery(XSRF)
[Angular users a convention to address XSRF ](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery#javascript-ajax-and-spas)
If a server sends an cookie with the name XSRF-TOKEN the angular http service will automatically add the value of this cookie to the header, with the name X-XSRF-TOKEN, when it sends the request back to the server. The server can then detect this header and validate it contents.

In ./startup.cs the ConfigureServices method configures the service to look for a header name X-XSRF-TOKEN
```
public void ConfigureServices(IServiceCollection services)
{
   services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
   ....
}
```

In the same file, the Configure methods configures the app to provide XSRF-TOKEN
```
public void Configure(IApplicationBuilder app, IAntiforgery antiforgery, IHostingEnvironment env)
{

  // Configure your app to provide a token in a cookie called XSRF-TOKEN
  app.Use(next => _context =>
  {
      string path = _context.Request.Path.Value;
      if (path.Contains("/api")
      {
          // We can send the request token as a JavaScript-readable cookie,
          // and Angular will use it by default.
          var tokens = antiforgery.GetAndStoreTokens(_context);
          _context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
              new CookieOptions() { HttpOnly = false });
      }

        return next(_context);
    });

}

```
## Optimistic Concurrency

Consider a scenario where client 0 loads a specific order to edit. Right before they submit updated edit client 1 loads the same order. Client 0 goes ahead and submit the order while client 1 still has the old values on the page. Optimistic concurrency, will let the conflict to happen and the deal with it accordingly. While there are many ways to deal with this scenario, i.e last wins. This application implements store wins, the data-store takes precedence over the values submitted by the user. It will warn client 1 that the entry has changed since they last pulled up and let them resubmit the merge the conflict before resubmitting the update you they use to.

To implement this, this application added a tracking property to both user and order tables
```
[Timestamp]
public byte[] RowNumber { get; set; }

```

The RowNumber is used as a tracking token. It is incremented every time the each time the row is updated. It is also included in the where clause of Update and Delete command's. If the row being updated no longer exist or has changed DbUpdateConcurrency expectation is thrown. The exception is the caught and the correct response to the client is return.

```
public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
{
...

   _context.Entry(user).State = EntityState.Modified;

   try
   {
       await _context.SaveChangesAsync();
   }
   catch (DbUpdateConcurrencyException)
   {
       if (!UserExists(id))
       {
           return NotFound(ErrorMessages.EntryDeleted);
       }
       else
       {
           return BadRequest(ErrorMessages.EntryChanged);
       }
   }

  ...
}
```
[Read More](https://docs.microsoft.com/en-us/aspnet/core/data/ef-rp/concurrency#handling-concurrency)

## Server Side Pre-rendering

Utilizes asp.net core 2.0 server side prerendering. Whose benefits include:

  - dramatic improvement to perceived performance. The user sees the UI sooner while in the background large bundle of JavaScript could be downloading, parsing and executing and the automatically takes over to make the application fully functional.
  - supports web crawlers that might not execute JavaScript.

[Read More](http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/)


## Design Architecture
  - ClientApp
    - app
        - components(each component contains html, css, typescript files)
          - app
          - home
          - message
          - navmenu
          - order
          - user
        - Models(typescript classes)
          - message       -- message logs to the cliet
          - messageType   -- static such as success, warning
          - order         -- order propetyfor easy mapping instead of json
          - user          -- user property for easy mapping instead of json
        - services
          - message     -- injected into order and user component to easy display the message to the user
          - order -- makes order related api calls to the server
          - user -- makes user related api calls to the server
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
    - dbInitializer -- populates the database with seed data
    - dbContext  -- set the dabatabase context
  - Migrations -- contains the schema changes related
  - Models(c# | back end models)
    - order -- describes the orders table
    - user -- describes the user table
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
  -[XRSF](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery)
  - [.NET Core 2.0](https://blogs.msdn.microsoft.com/webdev/2017/08/14/announcing-asp-net-core-2-0/)
  -[Filter](https://github.com/VadimDez/ngx-filter-pipe) [Pagination](https://ciphertrick.com/2017/08/01/search-sort-pagination-in-angular/)
