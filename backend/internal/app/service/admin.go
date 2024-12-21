package service

import (
	"context"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

func (s *Service) CreateAdmin(ctx context.Context, email, password string) (int, error) {
	if !validEmail(email) {
		return 0, model.ErrInvalidEmail
	}

	hash := generatePasswordHash(password)

	return s.repo.CreateAdmin(ctx, email, hash)
}

func (s *Service) GetAdminIdByEmailPassword(ctx context.Context, email, password string) (*model.Admin, error) {
	if !validEmail(email) {
		return nil, model.ErrInvalidEmail
	}

	hash := generatePasswordHash(password)

	return s.repo.GetAdminByEmailPassword(ctx, email, hash)
}

func (s *Service) GetAdminById(ctx context.Context, id int) (*model.Admin, error) {
	return s.repo.GetAdminById(ctx, id)
}

func (s *Service) UpdateAdminProfile(ctx context.Context, a *model.Admin) (*model.Admin, error) {
	return s.repo.UpdateAdminProfile(ctx, a)
}
