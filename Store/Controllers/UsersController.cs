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
    [Route("api/Users")]
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
        /// Uses eager loading to append associated user to the order.
        /// AsNoTracking has been appended to improve perfomance. It is also safe because no entities are updated in this context
        ///  [HttpGet]indicates action should only handle GET Requests
        ///  Microsoft.AspNetCore.Mvc serializes the collection of users json. 
        /// </summary>
        /// <returns>A list of users serialized as json</returns>
        ///  <response code="200">From passing the list to Microsoft.AspNetCore.Mvc.Ok that appends status 200 to the return </response>
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        // 5
        /// <summary>
        /// GET: api/Users/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.ID == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>
        /// PUT: api/Users/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
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
        /// POST: api/Users
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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
        ///
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}