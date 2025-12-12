package helper

import (
	"crypto/sha256"
	"encoding/hex"
)

func CreateHash256(password string) [32]byte {
	hash := sha256.Sum256([]byte(password))
	return hash
}

// HashPassword returns hex string of hashed password for database storage
func HashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}

// VerifyPassword compares plain password with stored hash
func VerifyPassword(password, hashedPassword string) bool {
	hash := HashPassword(password)
	return hash == hashedPassword
}
