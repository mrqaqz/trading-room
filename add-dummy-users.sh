curl -X POST -i -H "Content-type: application/json" -c cookies.txt -X POST http://localhost:8080/users/sign-up -d '
    {
    "username": "admin@example.com",
    "password": "Password1",
    "name": "Example name",
    "surname": "example surname",
    "phoneNumber": "1234567890",
    "address": "some address",
    "company": "some company",
    "userRole": "SYS_ADMIN",
    "confirmed": true,
    "confirmationRequest": null
}
    '

curl -X POST -i -H "Content-type: application/json" -c cookies.txt -X POST http://localhost:8080/users/sign-up -d '
    {
    "username": "seller@example.com",
    "password": "Password1",
    "name": "Example name",
    "surname": "example surname",
    "phoneNumber": "1234567890",
    "address": "some address",
    "company": "some company",
    "userRole": "SELLER",
    "confirmed": true,
    "confirmationRequest": null
}
    '
    
curl -X POST -i -H "Content-type: application/json" -c cookies.txt -X POST http://localhost:8080/users/sign-up -d '
    {
    "username": "buyer@example.com",
    "password": "Password1",
    "name": "Example name",
    "surname": "example surname",
    "phoneNumber": "1234567890",
    "address": "some address",
    "company": "some company",
    "userRole": "BUYER",
    "confirmed": true,
    "confirmationRequest": null
}
    '