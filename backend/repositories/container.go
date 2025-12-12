package repositories

import "github.com/jackc/pgx/v5"

type RepositoryContainer struct {
	AuthRepo AuthRepository
}

func NewRepositoryContainer(db *pgx.Conn) *RepositoryContainer {
	return &RepositoryContainer{
		AuthRepo : NewAuthRepository(db),
	}
}