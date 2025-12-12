package services

import (
	"context"
	"errors"
	"time"

	"github.com/ghufrankhan7860/typing-test-featured/dtos"
	"github.com/ghufrankhan7860/typing-test-featured/repositories"
	helper "github.com/ghufrankhan7860/typing-test-featured/utils"
	jwttoken "github.com/ghufrankhan7860/typing-test-featured/utils/jwt"
)

type AuthService interface {
	VerifyLogin(ctx context.Context, req *dtos.LoginRequest) (*dtos.AuthResponse, error)
	Signup(ctx context.Context, req *dtos.SignupRequest) (*dtos.AuthResponse, error)
}

type authService struct{
	repo repositories.AuthRepository
}

func NewAuthService(repo repositories.AuthRepository) AuthService {
	return &authService{
		repo : repo,
	}
}

func (s *authService) VerifyLogin(ctx context.Context, req *dtos.LoginRequest) (*dtos.AuthResponse, error) {
	// Get user data from database
	userID, hashedPassword, err := s.repo.VerifyLogin(ctx, req.Email)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}
	
	// Verify password against stored hash
	if !helper.VerifyPassword(req.Password, hashedPassword) {
		return nil, errors.New("invalid email or password")
	}
	
	// Generate JWT token with actual user ID from database
	token, err := jwttoken.CreateToken(userID, req.Email, "user", 24*time.Hour)
	if err != nil {
		return nil, err
	}
	
	response := &dtos.AuthResponse{
		UserID:      uint(userID),
		AccessToken: token,
		Email:       req.Email,
	}
	
	return response, nil
}
func (s *authService) Signup(ctx context.Context, req *dtos.SignupRequest) (*dtos.AuthResponse, error) {
	// Hash the password before storing
	hashedPassword := helper.HashPassword(req.Password)
	
	// Save user with hashed password and get user ID
	userID, err := s.repo.Signup(ctx, req, hashedPassword)
	if err != nil {
		return nil, err
	}
	
	// Generate JWT token for automatic login after signup
	token, err := jwttoken.CreateToken(userID, req.Email, "user", 24*time.Hour)
	if err != nil {
		return nil, err
	}
	
	response := &dtos.AuthResponse{
		UserID:      uint(userID),
		AccessToken: token,
		Email:       req.Email,
	}
	
	return response, nil
}
