package repository

import (
	"context"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

func (r *Repository) CreateAdmin(ctx context.Context, email, passwordHash string) (int, error) {
	query := `
	INSERT INTO admins 
    (email, password_hash) VALUES ($1, $2)
    RETURNING id`

	var id int
	err := r.conn.GetContext(ctx, &id, query, email, passwordHash)
	if isSQLError(err, model.UniqueConstraintViolationCode) {
		return 0, model.ErrEmailRegistered
	}
	if err != nil {
		return 0, err
	}

	return id, nil
}
