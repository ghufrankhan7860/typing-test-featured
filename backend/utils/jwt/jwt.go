package jwttoken

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

// CustomClaims extends jwt.RegisteredClaims with application fields
type CustomClaims struct {
	UserID int64  `json:"user_id"`
	Email  string `json:"email"`
	// any other application-specific fields:
	Role string `json:"role,omitempty"`
	jwt.RegisteredClaims
}

// Get secret from env (example)
func jwtSecret() []byte {
	// Use a secure secret from environment or secret manager
	secret := viper.GetString("JWT_SECRET")
	if secret == "" {
		secret = "hellotypo-secret"
	}
	return []byte(secret)
}

// CreateToken signs a JWT containing user info and returns the token string.
func CreateToken(userID int64, email string, role string, ttl time.Duration) (string, error) {
	now := time.Now().UTC()

	claims := CustomClaims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "hellotypo",      // optional
			Subject:   fmt.Sprintf("%d", userID),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(ttl)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString(jwtSecret())
	if err != nil {
		return "", fmt.Errorf("error creating token: %w", err)
	}
	return signed, nil
}

// ParseAndValidateToken parses tokenString, validates it and returns claims.
func ParseAndValidateToken(tokenString string) (*CustomClaims, error) {
	claims := &CustomClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (any, error) {
		// Ensure the signing method is what we expect
		if t.Method.Alg() != jwt.SigningMethodHS256.Alg() {
			return nil, fmt.Errorf("unexpected signing method: %s", t.Header["alg"])
		}
		return jwtSecret(), nil
	})
	if err != nil {
		// jwt.ParseWithClaims returns detailed errors (validations may fail)
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("token is invalid")
	}

	return claims, nil
}