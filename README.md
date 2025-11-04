# API Documentation

## Endpoint

```http
https://back-end-services.starlabs.web.id/api
```

## Registration

this API request used for User Registration

```http
POST /api/users/registration
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `firstName` | `string` | **Required**. user first name (min 2 character, max 20 character, only alphabets) |
| `lastNme` | `string` | **Required**. user last name (min 2 character, max 20 character, only alphabets) |
| `dateOfBirth` | `Date` | **Required**. user date of birth |
| `streetAddress` | `string` | **Required**. user address (min 5 character, max 40 character, only numbers & alphabets are allowed) |
| `city` | `string` | **Required**. user city (min 2 character, max 20 character, only alphabets) |
| `province` | `string` | **Required**. user province |
| `telephoneNumber` | `string` | **Required**. user telephone number with valid indonesian phone number |
| `emailAddress` | `string` | **Required**. user email address |
| `password` | `string` | **Required**. user password |

response example

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

this API request used for User Login

```http
POST /api/users/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `emailAddress` | `int` | **Required**. user registered email address |
| `password` | `string` | **Required**. user registered password |

response example

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

this API request used to get for wallet API

```http
POST /api/users/token
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. user id |
| `emailAddress` | `string` | **Required**. user registered email address |

response example

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIxNzcwMzU1fQ.AGnVtXP3WmOVmTMOQ0skfeVxcZKT-ONTEgnKgkKBopc"
}
```

## Check Wallet Balance

this API request used to check user wallet balance

```http
Header : x-access-token : token
POST /api/wallet/balance
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. user id |

response example

```javascript
{
    "accountNumber": 96897164,
    "balance": 0
}
```

## Wallet Top Up

this API request used to top up user wallet

```http
Header : x-access-token : token
POST /api/wallet/topup
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. user id |
| `amount` | `double` | **Required**. top up amount |

response example

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
this API request used to make payment

```http
Header : x-access-token : token
POST /api/wallet/payment
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `int` | **Required**. user id |
| `merchantId` | `int` | **Required**. merchant id |
| `amount` | `double` | **Required**. payment amount |

response example

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
