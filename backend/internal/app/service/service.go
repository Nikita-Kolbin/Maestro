package service

import "context"

type repository interface {
	CreateAdmin(ctx context.Context, email, password string) (int, error)
}

type Service struct {
	jwtSecret string
	repo      repository
}

func New(repo repository, jwtSecret string) *Service {
	return &Service{
		repo: repo,
	}
}
