package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/lib/pq"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

func (r *Repository) CreateProduct(ctx context.Context, product *model.Product) (*model.Product, error) {
	query := `
	INSERT INTO products
    (website_alias, name, description, price, image_ids, active, tags, count) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, website_alias, name, description, price, image_ids, active, tags, count`

	row := r.conn.QueryRowContext(
		ctx, query,
		product.WebsiteAlias,
		product.Name,
		product.Description,
		product.Price,
		pq.Array(product.ImageIds),
		product.Active,
		pq.Array(product.Tags),
		product.Count,
	)

	created := &model.Product{}

	if err := row.Scan(
		&created.Id,
		&created.WebsiteAlias,
		&created.Name,
		&created.Description,
		&created.Price,
		pq.Array(&created.ImageIds),
		&created.Active,
		pq.Array(&created.Tags),
		&created.Count,
	); err != nil {
		return nil, err
	}

	return created, nil
}

func (r *Repository) UpdateProduct(ctx context.Context, product *model.Product) (*model.Product, error) {
	query := `
	UPDATE products 
	SET name = $1,
	    description = $2,
	    price = $3,
	    image_ids = $4,
	    active = $5, 
	    tags = $6,
		count = $7
	WHERE id = $8
    RETURNING id, website_alias, name, description, price, image_ids, active, tags, count`

	row := r.conn.QueryRowContext(
		ctx, query,
		product.Name,
		product.Description,
		product.Price,
		pq.Array(product.ImageIds),
		product.Active,
		pq.Array(product.Tags),
		product.Count,
		product.Id,
	)

	updated := &model.Product{}

	if err := row.Scan(
		&updated.Id,
		&updated.WebsiteAlias,
		&updated.Name,
		&updated.Description,
		&updated.Price,
		pq.Array(&updated.ImageIds),
		&updated.Active,
		pq.Array(&updated.Tags),
		&updated.Count,
	); err != nil {
		return nil, err
	}

	return updated, nil
}

func (r *Repository) GetProductById(ctx context.Context, id int) (*model.Product, error) {
	query := `
	SELECT id, website_alias, name, description, price, image_ids, active, tags, count
	FROM products WHERE id = $1`

	row := r.conn.QueryRowContext(ctx, query, id)

	product := &model.Product{}
	if err := row.Scan(
		&product.Id,
		&product.WebsiteAlias,
		&product.Name,
		&product.Description,
		&product.Price,
		pq.Array(&product.ImageIds),
		&product.Active,
		pq.Array(&product.Tags),
		&product.Count,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, model.ErrNotFound
		}
		return nil, err
	}

	return product, nil
}

func (r *Repository) DeleteProduct(ctx context.Context, id int) error {
	query := `DELETE FROM products WHERE id = $1`

	res, err := r.conn.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return model.ErrNotFound
	}

	return nil
}

func (r *Repository) GetActiveProductsByAlias(ctx context.Context, alias string) (model.ProductList, error) {
	query := `
	SELECT id, website_alias, name, description, price, image_ids, active, tags, count
	FROM products WHERE website_alias = $1 AND active
	ORDER BY id`

	rows, err := r.conn.QueryContext(ctx, query, alias)
	if err != nil {
		return nil, err
	}
	defer func() {
		_ = rows.Close()
	}()

	products := make(model.ProductList, 0)
	for rows.Next() {
		product := &model.Product{}
		if err = rows.Scan(&product.Id, &product.WebsiteAlias, &product.Name, &product.Description, &product.Price,
			pq.Array(&product.ImageIds), &product.Active, pq.Array(&product.Tags), &product.Count); err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, rows.Err()
}

func (r *Repository) GetAllProductsByAlias(ctx context.Context, alias string) (model.ProductList, error) {
	query := `
	SELECT id, website_alias, name, description, price, image_ids, active, tags, count
	FROM products WHERE website_alias = $1
	ORDER BY id`

	rows, err := r.conn.QueryContext(ctx, query, alias)
	if err != nil {
		return nil, err
	}
	defer func() {
		_ = rows.Close()
	}()

	products := make(model.ProductList, 0)
	for rows.Next() {
		product := &model.Product{}
		if err = rows.Scan(&product.Id, &product.WebsiteAlias, &product.Name, &product.Description, &product.Price,
			pq.Array(&product.ImageIds), &product.Active, pq.Array(&product.Tags), &product.Count); err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, rows.Err()
}
