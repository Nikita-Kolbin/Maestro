package repository

import (
	"context"
	"database/sql"
	"errors"
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

func (r *Repository) GetAdminByEmailPassword(ctx context.Context, email, passwordHash string) (*model.Admin, error) {
	query := `
	SELECT id, email, first_name, last_name, father_name, city, 
       telegram, image_id, email_notification, telegram_notification
	FROM admins WHERE email=$1 AND password_hash=$2`

	admin := &model.Admin{}

	err := r.conn.GetContext(ctx, admin, query, email, passwordHash)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, model.ErrWrongEmailOrPassword
	}
	if err != nil {
		return nil, err
	}

	return admin, nil
}

func (r *Repository) GetAdminById(ctx context.Context, id int) (*model.Admin, error) {
	query := `
	SELECT id, email, first_name, last_name, father_name, city, 
       telegram, image_id, email_notification, telegram_notification
	FROM admins WHERE id = $1`

	admin := &model.Admin{}

	err := r.conn.GetContext(ctx, admin, query, id)

	if err != nil {
		return nil, err
	}

	return admin, nil
}

func (r *Repository) UpdateAdminProfile(ctx context.Context, a *model.Admin) (*model.Admin, error) {
	query := `
	UPDATE admins 
	SET first_name=$1, 
	    last_name=$2, 
	    father_name=$3,
	    city=$4,
	    image_id=$5,
	    telegram=$6,
	    email_notification=$7,
	    telegram_notification=$8
	WHERE id=$9
	RETURNING id, email, first_name, last_name, father_name, city, 
       telegram, image_id, email_notification, telegram_notification`

	admin := &model.Admin{}

	err := r.conn.GetContext(
		ctx, admin, query,
		a.FirstName, a.LastName, a.FatherName,
		a.City, a.ImageId, a.Telegram,
		a.EmailNotification, a.TelegramNotification, a.Id,
	)
	if err != nil {
		return nil, err
	}

	return admin, nil
}
