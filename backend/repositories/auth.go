package repositories

import (
	"context"

	"github.com/ghufrankhan7860/typing-test-featured/dtos"
	"github.com/jackc/pgx/v5"
)

type AuthRepository interface {
	VerifyLogin(ctx context.Context, email string) (int64, string, error) // Return userID and hashed password
	Signup(ctx context.Context, req *dtos.SignupRequest, hashedPassword string) (int64, error) // Return userID
}

type authRepository struct{
	db *pgx.Conn
}

func NewAuthRepository(db *pgx.Conn) AuthRepository {
	return &authRepository{
		db: db,
	}
}

func (a *authRepository) VerifyLogin(ctx context.Context, email string) (int64, string, error){
	var userID int64
	var hashedPassword string
	query := "SELECT id, password FROM users WHERE email = $1"
	err := a.db.QueryRow(ctx, query, email).Scan(&userID, &hashedPassword)
	if err != nil {
		return 0, "", err
	}
	return userID, hashedPassword, nil
}		

func (a *authRepository) Signup(ctx context.Context, req *dtos.SignupRequest, hashedPassword string) (int64, error){
	// Insert with hashed password and return user ID
	var userID int64
	query := "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id"
	err := a.db.QueryRow(ctx, query, req.Username, req.Email, hashedPassword).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil
}