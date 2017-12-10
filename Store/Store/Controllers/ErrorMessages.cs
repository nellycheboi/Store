namespace Store.Controllers
{
    public static class ErrorMessages
    {
       public static string NotFound = "The entry was not found. Perphaps it was modified by another user.";
       public static string OrderDuplicatedId = "The tracking number you provided alreay exists. Provide a unique one. If the prior is nolonger needed, first delete it the try readding the order.";
       public static string OrderNeedsUser = "Every order needs to be associated with a user. Please select a associated order.";
       public static string OrderChanged = "Another user is accessing the entry at the same time. Please try again in a few moments.";
      public  static string Invalid = "The entity you provided has one or more invalid attributes. Please sanitize the entry before resubmitting it";
    }
}
