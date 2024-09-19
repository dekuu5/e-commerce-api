Entities for the eCommerce System
1. User Entity:
Description: Represents a user of the platform, including both customers and admins.
Attributes:
- id (Int): Primary key.
- email (String): Unique email for each user.
- password (String): Hashed password for authentication.
- name (String): User's full name.
- role (Enum): User's role, which could be USER or ADMIN.
- createdAt (DateTime): The date when the user was created.
- updatedAt (DateTime): The date when the user's profile was last updated.
2. Product Entity:
Description: Represents a product that is available for sale on the platform.
Attributes:
- id (Int): Primary key.
- name (String): Name of the product.
- description (String): Detailed description of the product.
- price (Float): Price of the product.
- stock (Int): Number of units available in inventory.
- categoryId (Int): Foreign key referencing the category the product belongs to.
- createdAt (DateTime): The date when the product was created.
- updatedAt (DateTime): The date when the product was last updated.
3. Category Entity:
Description: Represents a category of products.
Attributes:
- id (Int): Primary key.
- name (String): Name of the category.
- products (Relation): List of products that belong to this category.
4. Order Entity:
Description: Represents a customer order.
Attributes:
- id (Int): Primary key.
- userId (Int): Foreign key referencing the user who placed the order.
- total (Float): Total price of the order.
- status (Enum): Status of the order (PENDING, COMPLETED, CANCELLED).
- createdAt (DateTime): The date when the order was placed.
- updatedAt (DateTime): The date when the order was last updated.
5. OrderProduct Entity:
Description: Represents a many-to-many relationship between orders and products.
Attributes:
- id (Int): Primary key.
- orderId (Int): Foreign key referencing the order.
- productId (Int): Foreign key referencing the product.
- quantity (Int): Quantity of the product in the order.
6. Cart Entity:
Description: Represents a user's shopping cart.
Attributes:
- id (Int): Primary key.
- userId (Int): Foreign key referencing the user who owns the cart.
- createdAt (DateTime): The date when the cart was created.
- updatedAt (DateTime): The date when the cart was last updated.
7. CartProduct Entity:
Description: Represents a many-to-many relationship between carts and products.
Attributes:
- id (Int): Primary key.
- cartId (Int): Foreign key referencing the cart.
- productId (Int): Foreign key referencing the product.
- quantity (Int): Quantity of the product in the cart.
8. Review Entity:
Description: Represents a review left by a user for a product.
Attributes:
- id (Int): Primary key.
- userId (Int): Foreign key referencing the user who wrote the review.
- productId (Int): Foreign key referencing the product being reviewed.
- rating (Int): Rating given to the product (e.g., 1 to 5).
- comment (String): Textual review/comment provided by the user.
- createdAt (DateTime): The date when the review was posted.
- updatedAt (DateTime): The date when the review was last updated.
9. Payment Entity:
Description: Represents a payment transaction for an order.
Attributes:
- id (Int): Primary key.
- orderId (Int): Foreign key referencing the order associated with the payment.
- paymentMethod (String): The method used for payment (e.g., credit card, PayPal).
- amount (Float): Amount paid.
- status (Enum): Status of the payment (PENDING, SUCCESS, FAILED).
- transactionId (String): Unique identifier for the payment transaction.
- createdAt (DateTime): The date when the payment was created.
- updatedAt (DateTime): The date when the payment was last updated.
10. ShippingAddress Entity:
Description: Represents the shipping address associated with an order.
Attributes:
- id (Int): Primary key.
- userId (Int): Foreign key referencing the user.
- orderId (Int): Foreign key referencing the order.
- addressLine1 (String): First line of the address.
- addressLine2 (String): Second line of the address (optional).
- city (String): City of the address.
- postalCode (String): Postal code of the address.
- country (String): Country of the address.
- createdAt (DateTime): The date when the address was created.
- updatedAt (DateTime): The date when the address was last updated.
11. Wishlist Entity:
Description: Represents a user's wishlist of products.
Attributes:
- id (Int): Primary key.
- userId (Int): Foreign key referencing the user.
- products (Relation): List of products that the user has added to their wishlist.
- createdAt (DateTime): The date when the wishlist was created.
- updatedAt (DateTime): The date when the wishlist was last updated.
Key Endpoints for Each Entity
User Endpoints:
- POST /auth/register
- POST /auth/login
- GET /users/me
- PUT /users/me
- DELETE /users/me
- GET /users (Admin)
- GET /users/:id (Admin)
- PUT /users/:id (Admin)
- DELETE /users/:id (Admin)
Product Endpoints:
- GET /products
- GET /products/:id
- POST /products (Admin)
- PUT /products/:id (Admin)
- DELETE /products/:id (Admin)
Category Endpoints:
- GET /categories
- POST /categories (Admin)
- PUT /categories/:id (Admin)
- DELETE /categories/:id (Admin)
Order Endpoints:
- POST /orders
- GET /orders
- GET /orders/:id
- PUT /orders/:id/cancel
- GET /orders/admin (Admin)
- PUT /orders/:id/status (Admin)
Cart Endpoints:
- GET /cart
- POST /cart
- PUT /cart/:id
- DELETE /cart/:id
Review Endpoints:
- POST /reviews
- GET /reviews/product/:productId
- DELETE /reviews/:id (Admin/User who posted the review)
Payment Endpoints:
- POST /payments
- GET /payments/:orderId
ShippingAddress Endpoints:
- POST /shipping
- PUT /shipping/:id
- GET /shipping/:id
Wishlist Endpoints:
- GET /wishlist
- POST /wishlist
- DELETE /wishlist/:productId