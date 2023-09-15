# Ecommerce-API
This full E-Commerce API build using Express and Mongo. Here it contains all the required functionalities of a full-fledged E-commerce API which includes CRUD operations for products, categories, sizes, coupons, orders and uploading images.

## Features
- Authentication and authorization using JSON Web Tokens(JWT). protection of routes and authorizing specific users to access specific endpoints.
- Payments handled using razorpay.
- Implemented rate limiting.
- Implemented Api limit of 1000 requests.
- Sanitized the incoming JSON request to handle from threats.
- Specific admin access.

## Setup
```
$ git clone https://github.com/Hibathulla/ecommerce-api.git
$ cd ecommerce-api
$ yarn install
```
## Run the service
```
$ yarn server
```
### Environment Varibales
Here are the environment variables needed to run the application
- Razorpay key and secret
- JWT secret and expire
- Running port
- Mongodb uri
- Mongodb password
