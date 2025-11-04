# API Documentation

## Endpoint

```http
https://back-end-services.starlabs.web.id/api
```

## Registration

This API request is used for user registration.

```http
POST /api/users/registration
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `firstName` | `string` | **Required**. User's first name (minimum 2 characters, maximum 20 characters, alphabetic characters only) |
| `lastName` | `string` | **Required**. User's last name (minimum 2 characters, maximum 20 characters, alphabetic characters only) |
| `dateOfBirth` | `Date` | **Required**. User's date of birth |
| `streetAddress` | `string` | **Required**. User's street address (minimum 5 characters, maximum 40 characters, only numbers and alphabetic characters are allowed) |
| `city` | `string` | **Required**. User's city (minimum 2 characters, maximum 20 characters, alphabetic characters only) |
| `province` | `string` | **Required**. User's province |
| `telephoneNumber` | `string` | **Required**. User's telephone number (must be a valid Indonesian phone number) |
| `emailAddress` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |

### Response Example

```javascript
{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "streetAddress": "",
    "city": "Badung",
    "province": "Bali",
    "telephoneNumber": "081234567890",
    "emailAddress": "johndoe@gmail.com",
    "registrationDate": "2020-01-22T08:34:42.225Z",
    "id": 14
}
```

## Login

This API request is used for user login.

```http
POST /api/users/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `emailAddress` | `string` | **Required**. User's registered email address |
| `password` | `string` | **Required**. User's registered password |

### Response Example

```javascript
{
    "id": 4,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "streetAddress": "",
    "city": "Badung",
    "province": "Bali",
    "telephoneNumber": "081234567890",
    "emailAddress": "johndoe@gmail.com",
    "registrationDate": "2020-05-23T11:45:55.000Z"
}
```

## Get Token

This API request is used to obtain an authentication token for wallet API access.

```http
GET /api/users/token?userId={userId}&emailAddress={emailAddress}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. User ID (query parameter) |
| `emailAddress` | `string` | **Required**. User's registered email address (query parameter) |

### Response Example

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIxNzcwMzU1fQ.AGnVtXP3WmOVmTMOQ0skfeVxcZKT-ONTEgnKgkKBopc"
}
```

## Check Wallet Balance

This API request is used to check the user's wallet balance.

```http
GET /api/wallet/balance?userId={userId}
Header: x-access-token: token
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. User ID (query parameter) |

### Response Example

```javascript
{
    "accountNumber": 96897164,
    "balance": 0
}
```

## Wallet Top Up

This API request is used to top up the user's wallet.

```http
POST /api/wallet/topup
Header: x-access-token: token
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. User ID |
| `amount` | `double` | **Required**. Top-up amount |

### Response Example

```javascript
{
    "wallet": {
        "accountNumber": 96897164,
        "balance": 20000
    },
    "transaction": {
        "userId": "4",
        "merchantId": 0,
        "amount": 20000,
        "type": 0
    }
}
```

## Wallet Payment

This API request is used to make a payment.

```http
POST /api/wallet/payment
Header: x-access-token: token
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. User ID |
| `merchantId` | `int` | **Required**. Merchant ID |
| `amount` | `double` | **Required**. Payment amount |

### Response Example

```javascript
{
    "wallet": {
        "accountNumber": 96897164,
        "balance": 10000
    },
    "transaction": {
        "userId": "4",
        "merchantId": 1,
        "amount": 10000,
        "type": 1
    }
}
```
