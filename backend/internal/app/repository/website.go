package repository

import (
	"context"
	"database/sql"
	"errors"
	"github.com/Masterminds/squirrel"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

func (r *Repository) CreateWebsite(ctx context.Context, alias string, adminId int) (*model.Website, error) {
	query := `
	INSERT INTO websites (alias, admin_id) VALUES ($1, $2)
	RETURNING id, alias, admin_id, active`

	website := &model.Website{}
	err := r.conn.GetContext(ctx, website, query, alias, adminId)
	if isSQLError(err, model.UniqueConstraintViolationCode) {
		return nil, model.ErrAliasTaken
	}
	if err != nil {
		return nil, err
	}

	return website, nil
}

func (r *Repository) AdminHaveWebsite(ctx context.Context, adminId int) (bool, error) {
	query := `SELECT COUNT(*) FROM websites WHERE admin_id=$1`

	var count int

	err := r.conn.GetContext(ctx, &count, query, adminId)
	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *Repository) GetWebsiteByAlias(ctx context.Context, alias string) (*model.Website, error) {
	query := `SELECT id, admin_id, alias, active FROM websites WHERE alias = $1`

	website := &model.Website{}
	err := r.conn.GetContext(ctx, website, query, alias)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, model.ErrNotFound
	}
	if err != nil {
		return nil, err
	}

	return website, nil
}

func (r *Repository) GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error) {
	query := `SELECT id, admin_id, alias, active FROM websites WHERE admin_id = $1 LIMIT 1`

	website := &model.Website{}
	err := r.conn.GetContext(ctx, website, query, adminId)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, model.ErrNotFound
	}
	if err != nil {
		return nil, err
	}

	return website, nil
}

func (r *Repository) GetSectionsByWebsiteAlias(ctx context.Context, websiteAlias string) ([]*model.Section, error) {
	querySelectSections := `
	SELECT id, website_alias, style_id, text, image_id
	FROM sections WHERE website_alias = $1 ORDER BY id`

	var sections []*model.Section
	err := r.conn.SelectContext(ctx, &sections, querySelectSections, websiteAlias)
	if err != nil {
		return nil, err
	}

	return sections, nil
}

func (r *Repository) CreateSections(ctx context.Context, websiteAlias string, sections []*model.Section) error {
	tx, err := r.conn.Beginx()
	if err != nil {
		return err
	}
	defer func() {
		_ = tx.Rollback()
	}()

	// Удаление прошлого стиля
	queryDeleteOldSections := `DELETE FROM sections WHERE website_alias = $1`
	_, err = tx.ExecContext(ctx, queryDeleteOldSections, websiteAlias)
	if err != nil {
		return err
	}

	// Ливаем, если нет секций
	if len(sections) == 0 {
		if err = tx.Commit(); err != nil {
			return err
		}
		return nil
	}

	sqCreateSections := squirrel.
		Insert("sections").
		Columns("website_alias, style_id, text, image_id")
	for _, s := range sections {
		sqCreateSections = sqCreateSections.Values(s.WebsiteAlias, s.StyleId, s.Text, s.ImageId)
	}
	queryCreateSections, argsCreateSections, err := sqCreateSections.PlaceholderFormat(squirrel.Dollar).ToSql()
	if err != nil {
		return err
	}

	// Создание новаго стиля
	_, err = tx.ExecContext(ctx, queryCreateSections, argsCreateSections...)
	if err != nil {
		return err
	}

	if err = tx.Commit(); err != nil {
		return err
	}

	return nil
}

func (r *Repository) DeleteWebsiteByAdmin(ctx context.Context, adminId int) error {
	query := `DELETE FROM websites WHERE admin_id = $1`

	res, err := r.conn.ExecContext(ctx, query, adminId)
	if err != nil {
		return err
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return model.ErrNotFound
	}

	return nil
}
