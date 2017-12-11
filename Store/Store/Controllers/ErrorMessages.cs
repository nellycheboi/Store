namespace Store.Controllers
{
    /// <summary>
    /// A static class containaing properties static string properties detailing useful error messages.
    /// String enum requires a bit more configuration. 
    /// TODO: Replace it with enum implementation
    /// </summary>
    public static class ErrorMessages
    {
        public static string NotFound = "The entry was not found. Perphaps it was modified by another user.";

        public static string OrderDuplicatedId = "The tracking number you provided alreay exists. Provide a unique one. If the prior is nolonger needed, first delete it the try readding the order.";

        public static string OrderNeedsUser = "Every order needs to be associated with a user. Please select a associated order.";

        public static string EntryChanged = "Another user is updated the entry at the same time. Please reload the page and try again in a few moments.";

        public static string EntryDeleted = "This entry was deleted by another user after you had loaded this page. Please readd the order if needed.";

        public static string Invalid = "The entity you provided has one or more invalid attributes. Please sanitize the entry before resubmitting it";
    }
}
