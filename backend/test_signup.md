# Test Signup Flow

## API Endpoint

```
POST http://localhost:8080/api/v1/auth/signup
Content-Type: application/json
```

## Request Body

```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}
```

## Expected Response (201 Created)

```json
{
    "user_id": 1,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "test@example.com"
}
```

## Test with curl

```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Test Login After Signup

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Error Cases

### Missing Required Fields (400 Bad Request)

```json
{
    "username": "",
    "email": "test@example.com",
    "password": "123"
}
```

### Duplicate Email (400 Bad Request)

```json
{
    "error": "duplicate key value violates unique constraint"
}
```

### Invalid Email Format (400 Bad Request)

```json
{
    "username": "testuser",
    "email": "invalid-email",
    "password": "password123"
}
```
