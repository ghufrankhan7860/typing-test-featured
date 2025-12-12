package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetProfileHandler - example protected route
func GetProfileHandler(ctx *gin.Context) {
	// Get user info from JWT middleware
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	userEmail, _ := ctx.Get("user_email")
	userRole, _ := ctx.Get("user_role")

	ctx.JSON(http.StatusOK, gin.H{
		"user_id": userID,
		"email":   userEmail,
		"role":    userRole,
		"message": "This is a protected route - you're authenticated!",
	})
}

// UpdateProfileHandler - example protected route
func UpdateProfileHandler(ctx *gin.Context) {
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Your profile update logic here
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"user_id": userID,
	})
}

// Example typing test handlers
func GetTypingTestsHandler(ctx *gin.Context) {
	userID, _ := ctx.Get("user_id")
	
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Your typing tests",
		"user_id": userID,
		"tests":   []string{"test1", "test2"}, // Replace with actual data
	})
}

func CreateTypingTestHandler(ctx *gin.Context) {
	userID, _ := ctx.Get("user_id")
	
	ctx.JSON(http.StatusCreated, gin.H{
		"message": "Typing test created",
		"user_id": userID,
	})
}

func GetTypingTestHandler(ctx *gin.Context) {
	testID := ctx.Param("id")
	userID, _ := ctx.Get("user_id")
	
	ctx.JSON(http.StatusOK, gin.H{
		"test_id": testID,
		"user_id": userID,
		"message": "Typing test details",
	})
}

func SubmitTypingTestHandler(ctx *gin.Context) {
	testID := ctx.Param("id")
	userID, _ := ctx.Get("user_id")
	
	ctx.JSON(http.StatusOK, gin.H{
		"test_id": testID,
		"user_id": userID,
		"message": "Test submitted successfully",
	})
}