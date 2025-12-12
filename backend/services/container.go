package services

import (
	"sync"

	"github.com/ghufrankhan7860/typing-test-featured/repositories"
)

type ServiceContainer struct {
	authService AuthService
	authOnce sync.Once

	repoContainer *repositories.RepositoryContainer
}

func NewServiceContainer(repo *repositories.RepositoryContainer) *ServiceContainer{
	return &ServiceContainer{
		repoContainer:repo,
	}
}
// makes sure that authService is initialized only once
func (s *ServiceContainer) GetAuthService() AuthService {
	s.authOnce.Do(func() {
		s.authService = NewAuthService(s.repoContainer.AuthRepo)
	})
	return s.authService
}