#!/bin/bash

# Quick Test Script for Secure Auth API
# Usage: ./test-api.sh

BASE_URL="http://localhost:3000"

echo "=========================================="
echo "1. Testing Public Info Endpoint"
echo "=========================================="
curl -i -X GET "$BASE_URL/public/info"
echo -e "\n\n"

echo "=========================================="
echo "2. Testing Protected Profile WITHOUT Token (Expected: 401)"
echo "=========================================="
curl -i -X GET "$BASE_URL/protected/profile"
echo -e "\n\n"

echo "=========================================="
echo "3. Testing User Signup"
echo "=========================================="
curl -i -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"test_user_curl@example.com", "password":"password123"}'
echo -e "\n\n"

echo "=========================================="
echo "4. Testing User Login"
echo "=========================================="
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test_user_curl@example.com", "password":"password123"}')

echo "$LOGIN_RESPONSE"
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*' | grep -o '[^"]*$')
echo -e "\nExtracted Token: $TOKEN\n"

if [ -n "$TOKEN" ]; then
  echo "=========================================="
  echo "5. Testing Protected Profile WITH Token (Expected: 200)"
  echo "=========================================="
  curl -i -X GET "$BASE_URL/protected/profile" \
    -H "Authorization: Bearer $TOKEN"
  echo -e "\n\n"

  echo "=========================================="
  echo "6. Testing Protected Dashboard WITH Token (Expected: 200)"
  echo "=========================================="
  curl -i -X GET "$BASE_URL/protected/dashboard" \
    -H "Authorization: Bearer $TOKEN"
  echo -e "\n\n"

  echo "=========================================="
  echo "7. Testing User Logout WITH Token (Expected: 204)"
  echo "=========================================="
  curl -i -X POST "$BASE_URL/auth/logout" \
    -H "Authorization: Bearer $TOKEN"
  echo -e "\n\n"
fi
