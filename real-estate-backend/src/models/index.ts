import { User } from "./User";
import { Property } from "./Property";
import { Booking } from "./Booking";
import { Inquiry } from "./Inquiry";
import { Review } from "./Review";

// Define Associations

// User -> Property (1:N)
User.hasMany(Property, { foreignKey: "owner_id", as: "properties" });
Property.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

// User -> Booking (1:N)
User.hasMany(Booking, { foreignKey: "user_id", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Property -> Booking (1:N)
Property.hasMany(Booking, { foreignKey: "property_id", as: "bookings" });
Booking.belongsTo(Property, { foreignKey: "property_id", as: "property" });

// User -> Inquiry (1:N)
User.hasMany(Inquiry, { foreignKey: "user_id", as: "inquiries" });
Inquiry.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Property -> Inquiry (1:N)
Property.hasMany(Inquiry, { foreignKey: "property_id", as: "inquiries" });
Inquiry.belongsTo(Property, { foreignKey: "property_id", as: "property" });

// User -> Review (1:N)
User.hasMany(Review, { foreignKey: "user_id", as: "reviews" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Property -> Review (1:N)
Property.hasMany(Review, { foreignKey: "property_id", as: "reviews" });
Review.belongsTo(Property, { foreignKey: "property_id", as: "property" });

export { User, Property, Booking, Inquiry, Review };
