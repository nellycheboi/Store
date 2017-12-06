using StoreDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreDataLayer.Data
{
    public class DbIntializer
    {
        public static void Initialize(StoreDbContext context)
        {
            if (context.Users.Any())
            {
                return;
            }
            User[] users = new User[]
            {
                new User
                {
                    FirstName = "Beard",
                    LastName = "Baby",
                },
                new User
                {
                    FirstName = "Tall Baby",
                    LastName = "Monster",
                },
                new User
                {
                    FirstName = "Boar",
                    LastName = "Baby",
                },
                new User
                {
                    FirstName = "Scary",
                    LastName = "Hairy Baby",
                },
                new User
                {
                    FirstName = "Trebuchet",
                    LastName = "Baby",
                },
                new User
                {
                    FirstName = "Spider",
                    LastName = "Baby",
                },
                new User
                {
                    FirstName = "Fake",
                    LastName = "Baby",
                },
            };

            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

            Order[] orders = new Order[]
              {
                new Order
                {
                    TrackingId = "123",
                    UserId = 1,
                    AddressName = "Home",
                    StreetAddress = "1212 N Corner Street",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "1234",
                    UserId = 1,
                    AddressName = "Home",
                    StreetAddress = "1212 N Corner Street",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "12345",
                    UserId = 1,
                    AddressName = "Home",
                    StreetAddress = "1212 N Corner Street",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "234",
                    UserId = 2,
                    AddressName = "Home",
                    StreetAddress = "1212 N Mobius Corner",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "2345",
                    UserId = 2,
                    AddressName = "Home",
                    StreetAddress = "1212 N Mobius Corner",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "345",
                    UserId = 3,
                    AddressName = "Home",
                    StreetAddress = "1212 N Linked Corner",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "456",
                    UserId = 4,
                    AddressName = "Home",
                    StreetAddress = "1212 N Around The Corner",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                },
                new Order
                {
                    TrackingId = "567",
                    UserId = 5,
                    AddressName = "Home",
                    StreetAddress = "1212 N Straight Corner",
                    City = "Big City",
                    ZipCode = "98765",
                    State = "Big Country"
                }
              };

            foreach (Order order in orders)
            {
                context.Orders.Add(order);
            }
            context.SaveChanges();
        }
    }
}

