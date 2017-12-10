using Microsoft.AspNetCore.Mvc;

namespace StoreDataLayer.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}