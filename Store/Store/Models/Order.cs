using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreDataLayer.Models
{
    public class Order
    {
        [Key]
        [Column("tracking_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string TrackingId { get; set; }

        [ForeignKey("user_id")]
        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        // Address information. Refactoring notes: Should belong in a different table

        [Column("address_name")]
        [Required]
        public string AddressName { get; set; }

        [Column("street_address")]
        [Required]
        public string StreetAddress { get; set; }

        [Column("city")]
        [Required]
        public string City { get; set; }

        [Column("state")]
        [Required]
        public string State { get; set; }

        [Column("zip_code")]
        [Required]
        [DisplayName("Zip Code")]
        public string ZipCode { get; set; }

        public string RowNumber { get; set; }
        
        /// <summary>
        /// Navigation Property. User entity holds the information of the associated User.
        /// Every Order has an associated User. 
        /// It's foreign key has been marked as required
        /// </summary>
        public User User { get; set; }
    }
}
