using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Models;
using System.Collections.Generic;

namespace Store.Controllers
{
    /// <summary>
    /// [Produces("application/json")] declares that the controller action supports a content type of application/json
    /// Route attributes indicates the controller will handle requests make paths starting with api/orders
    /// </summary>
    [Produces("application/json")]
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        private readonly StoreDbContext _context;

        /// <summary>
        /// The constructor injects the database context into the controller using Dependency injection.
        /// The data context, StoreDbContext in namespace Store.Data, is used in each of the crud methods of the controller.
        /// The StoreDbContext was inject into the container at application startup. See StartUp in Store namespace
        /// </summary>
        /// <param name="context"></param>
        public OrdersController(StoreDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/orders
        /// Uses eager loading to append associated user to the order.
        /// AsNoTracking has been appended to improve perfomance. It is also safe because no entities are updated in this context
        ///  [HttpGet]indicates action should only handle GET Requests
        ///  Microsoft.AspNetCore.Mvc serializes the collection of orders json. 
        /// </summary>
        /// <returns>A list of orders serialized as json</returns>
        ///  <response code="200">From passing the list to Microsoft.AspNetCore.Mvc.Ok that appends status 200 to the return </response>
        [HttpGet]
        public  IActionResult GetOrders()
        {
            List<Order> orders = _context.Orders
                .Include(c => c.User)
                .AsNoTracking()
                .ToList();
            return Ok(orders);
        }


        /// <summary>
        /// GET: api/orders/id
        /// [HttpGet]indicates action should only handle GET Requests
        /// [FromRoute] force the action to only read  the parameter from the route
        /// Microsoft.AspNetCore.Mvc serializes the order instance to json. 
        /// Queries the database for the user with the suppied trackingId.
        /// </summary>
        /// <returns>An order instance serialized as json</returns>
        /// <response code="200">If the order was found</response>
        /// <response code="404">If the order was not found</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            Order order = await _context.Orders
                .Include(c => c.User)
                .AsNoTracking()
                .SingleOrDefaultAsync(m => m.TrackingId == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        /// <summary>
        /// PUT: api/Orders/{id}
        /// [HttpPUT]indicates action should only handle PUT Requests
        /// [FromRoute] forces the action to only read  the parameter from the route
        /// [FromBody] forces the action to read data from the request body
        /// Accepts new data items form the post requests body. Checks for its validity before before updating the associated entry in the database.
        /// The client is responsible for setting the unique id, tracking id
        /// Catches DbUpdateException if inserting failed.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <response code="204">If the order was successfully updated</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder([FromRoute] string id, [FromBody] Order order)
        {
            // Do not make a new user from this post request
            order.User = null; 

            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            if (id != order.TrackingId)
            {
                return BadRequest($"{ErrorMessages.Invalid} ${id}");
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound(ErrorMessages.EntryDeleted);
                }
                else
                {
                    return BadRequest(ErrorMessages.EntryChanged);
                }
            }
            catch (DbUpdateException)
            {
                return BadRequest(ErrorMessages.OrderDuplicatedId);
            }

            return NoContent();
        }

        /// <summary>
        /// POST: api/Orders
        /// [HttpPost]indicates action should only handle POST Requests
        /// [FromBody] forces the action to read data from the request body
        /// Accepts new data items form the post requests body. Checks for its validity before persisting it in the database.
        /// The client is responsible for setting the unique id, tracking id
        /// Catches DbUpdateException if inserting failed.
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <response code="201">If the order was successfully created</response>
        /// <response code="400">If the Model state is not valid</response>
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
            // Do not make a new user from this post request
            order.User = null;
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }
            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest(ErrorMessages.OrderDuplicatedId);
            }

            return CreatedAtAction("GetOrder", new { id = order.TrackingId }, order);
        }

        /// <summary>
        /// DELETE: api/Orders/{id}
        /// [HttpDelete] indicates action should only handle Delete Requests
        /// [FromRoute] force the action to only read  the parameter from the route
        /// Checks for the model validity before deleting the entry with the asscoatiated tracking id in the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">If the order was successfully deleted</response>
        /// <response code="400">If the Model state is not valid</response>
        /// <response code="404">If the order was not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            var order = await _context.Orders.SingleOrDefaultAsync(m => m.TrackingId == id);
            if (order == null)
            {
                return NotFound(ErrorMessages.NotFound);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }
        /// <summary>
        /// Accepting a tracking id. Checks if order with the given tracking id exists in the database
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Boolean: wether or not the order exists</returns>
        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.TrackingId == id);
        }
    }
}