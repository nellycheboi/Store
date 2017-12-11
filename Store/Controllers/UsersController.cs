using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Models;

namespace Store.Controllers
{
    // <summary>
    /// [Produces("application/json")] declares that the controller action supports a content type of application/json
    /// Route attributes indicates the controller will handle requests make paths starting with api/users
    /// </summary>
    [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly StoreDbContext _context;

        /// <summary>
        /// The constructor injects the database context into the controller using Dependency injection.
        /// The data context, StoreDbContext in namespace Store.Data, is used in each of the crud methods of the controller.
        /// The StoreDbContext was inject into the container at application startup. See StartUp in Store namespace
        /// </summary>
        /// <param name="context"></param>
        public UsersController(StoreDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// GET: api/users
        /// [HttpGet]indicates action should only handle GET Requests
        /// Microsoft.AspNetCore.Mvc serializes the collection of users to json. 
        /// </summary>
        /// <returns>A list of users serialized as json</returns>
        ///  <response code="200">From passing the list to Microsoft.AspNetCore.Mvc.Ok that appends status 200 to the return </response>
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        /// <summary>
        /// GET: api/users/id
        /// [HttpGet]indicates action should only handle GET Requests
        /// [FromRoute] forces the action to only read from the parameter from the route
        /// Microsoft.AspNetCore.Mvc serializes the user instance to json. 
        /// Queries the database for the user with the suppied trackingId.
        /// </summary>
        /// <returns>An user instance serialized as json</returns>
        /// <response code="200">If the user was found</response>
        /// <response code="404">If the user was not found</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = await _context.Users.SingleOrDefaultAsync(m => m.ID == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>
        /// PUT: api/Users/{id}
        /// [HttpPut] indicates action should only handle PUT Requests
        /// [FromRoute] forces the action to only read  the parameter from the route
        /// [FromBody] forces the action to read data from the request body
        /// Accepts new data items form the post requests body. Checks for its validity before updating it associated entry in the dabatabase
        /// </summary>
        /// <param name="user"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="204">If the user was successfully updated</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            if (id != user.ID)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

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

            return NoContent();
        }

        /// <summary>
        /// POST: api/Users
        /// [HttpPost] indicates action should only handle POST Requests
        /// [FromBody] forces the action to read data from the request body
        /// Accepts new data items form the post requests body. Checks for its validity before persisting it in the database
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <response code="201">If the user was successfully created</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }


        /// <summary>
        /// DELETE: api/Users/{id}
        /// [HttpDelete] indicates action should only handle Delete Requests
        /// [FromRoute] force the action to only read  the parameter from the route
        /// Checks for the model validity before deleting the entry with the asscosiated id  in the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">If the user was successfully deleted</response>
        /// <response code="400">If the Model state is not valid</response>
        /// <response code="404">If the user was not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.ID == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
        /// <summary>
        /// Accepting an id. Checks if user with the given id exists in the database
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Boolean: wether or not the user exists</returns>
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}