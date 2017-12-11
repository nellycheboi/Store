using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Models;
using Microsoft.EntityFrameworkCore.Query;
using Store.Controllers;

namespace Store.Controllers
{
    [Produces("application/json")]
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        private readonly StoreDbContext _context;

        public OrdersController(StoreDbContext context)
        {
            _context = context;
        }

       /// <summary>
       /// GET: api/orders
       /// Uses eager loading to append associated user to the order.
       /// AsNoTracking has been appended to improve perfomance. It is also safe because no entities are updated in this context
       /// </summary>
       /// <returns></returns>
        [HttpGet]
        public  IActionResult GetOrders()
        {
            var orders = _context.Orders
                .Include(c => c.User)
                .AsNoTracking()
                .ToList();

            return Ok(orders);
        }


        /// <summary>
        /// GET: api/orders/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ErrorMessages.Invalid);
            }

            var order = await _context.Orders
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder([FromRoute] string id, [FromBody] Order order)
        {
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
        /// The client is responsible for setting the unique id, tracking id
        /// We need to make sure that they provided a unique id.
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
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
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.TrackingId == id);
        }
    }
}