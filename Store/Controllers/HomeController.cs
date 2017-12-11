using Microsoft.AspNetCore.Mvc;

namespace Store.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// Loads the index page.
        /// Uses the view in the Views most of which imports and page setup.
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }

    }
}