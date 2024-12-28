package repository

import (
	"context"
	"database/sql"
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

func (r *Repository) CreateCustomer(ctx context.Context, alias, email, passwordHash string) (int, error) {
	query := `
	INSERT INTO customers 
    (website_alias, email, password_hash) VALUES ($1, $2, $3)
    RETURNING id`

	tx, err := r.conn.Beginx()
	if err != nil {
		return 0, err
	}
	defer func() { _ = tx.Rollback() }()

	var id int
	err = tx.GetContext(ctx, &id, query, alias, email, passwordHash)
	if isSQLError(err, model.UniqueConstraintViolationCode) {
		return 0, model.ErrEmailRegistered
	}
	if err != nil {
		return 0, err
	}

	if err = r.CreateCartTX(ctx, tx, id); err != nil {
		return 0, err
	}

	if err = tx.Commit(); err != nil {
		logger.Error(ctx, "can't commit transaction")
		return 0, nil
	}

	return id, nil
}

func (r *Repository) GetCustomerByEmailPassword(
	ctx context.Context,
	alias, email, passwordHash string,
) (*model.Customer, error) {
	query := `
	SELECT id, email, website_alias, first_name, last_name, father_name, phone, 
    telegram, delivery_type, payment_type, email_notification, telegram_notification
	FROM customers WHERE website_alias = $1 AND email=$2 AND password_hash=$3`

	customer := &model.Customer{}

	err := r.conn.GetContext(ctx, customer, query, alias, email, passwordHash)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, model.ErrWrongEmailOrPassword
	}
	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (r *Repository) GetCustomerById(ctx context.Context, id int) (*model.Customer, error) {
	query := `
	SELECT id, email, website_alias, first_name, last_name, father_name, phone, 
    telegram, delivery_type, payment_type, email_notification, telegram_notification
	FROM customers WHERE id = $1`

	customer := &model.Customer{}

	err := r.conn.GetContext(ctx, customer, query, id)

	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (r *Repository) GetCustomersByWebsite(ctx context.Context, alias string) ([]*model.Customer, error) {
	query := `
	SELECT id, email, website_alias, first_name, last_name, father_name, phone, 
    telegram, delivery_type, payment_type, email_notification, telegram_notification
	FROM customers WHERE website_alias = $1`

	customers := make([]*model.Customer, 0)

	err := r.conn.SelectContext(ctx, &customers, query, alias)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, model.ErrWrongEmailOrPassword
	}
	if err != nil {
		return nil, err
	}

	return customers, nil
}

func (r *Repository) UpdateCustomerProfile(ctx context.Context, c *model.Customer) (*model.Customer, error) {
	query := `
	UPDATE customers 
	SET first_name=$1, 
	    last_name=$2, 
	    father_name=$3,
	    phone=$4,
	    telegram=$5,
	    delivery_type=$6,
	    payment_type=$7,
	    email_notification=$8,
	    telegram_notification=$9
	WHERE id=$10
	RETURNING id, email, website_alias, first_name, last_name, father_name, phone, 
    telegram, delivery_type, payment_type, email_notification, telegram_notification`

	customer := &model.Customer{}

	err := r.conn.GetContext(
		ctx, customer, query,
		c.FirstName, c.LastName, c.FatherName,
		c.Phone, c.Telegram, c.DeliveryType, c.PaymentType,
		c.EmailNotification, c.TelegramNotification, c.Id,
	)

	if err != nil {
		return nil, err
	}

	return customer, nil
}
