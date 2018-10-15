# Fast Food Fast

Fast food fast is a fast food delivery application

Site is published at https://api-version3.herokuapp.com/

# How it Works
- User can signin/signout from the app. 
- User can an order for food.
- User can get a history list of orders.
- Admin can get all user orders
- Admin can get a specific order.
- Admin can uppdate the status of an order. 
- Admin and user can get the menu.
- Add food option to the menu.


# Installation and Setup

Clone the repository below

```
git clone -b api-v2 https://github.com/salma-nyagaka/FastFoodFast.git
```

# Endpoints Available

| Method | Endpoint                        | Description                           | 
| ------ | ------------------------------- | ------------------------------------- | 
| POST   | /api/v2/auth/signup             | User sign up                          |
| POST   | /api/v2/auth/login              | User login                            | 
| POST   | /api/v2/users/orders/<{id}>     | User places an order                  | 
| GET   | /api/v2/users/orders             | User gets the order history           | 
| GET   | /api/v2/orders                   | Admin gets all the orders             | 
| GET   | /api/v2/orders                   | Admin gets all the orders             | 
| GET   | /api/v2/orders/<{id}>             | Admin gets specific order            | 
| PUT   | /api/v2/orders/<{id}>            | Admin updates order status            | 
| GET   | /api/v2/menu                     | Admin gets the available menu         | 
| GET   | /api/v2/menu                     | Admin adds a meal option to the menu  | 




