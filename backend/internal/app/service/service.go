package service

import (
	"context"
	"io"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type repository interface {
	CreateAdmin(ctx context.Context, email, password string) (int, error)
	GetAdminByEmailPassword(ctx context.Context, email, passwordHash string) (*model.Admin, error)
	GetAdminById(ctx context.Context, id int) (*model.Admin, error)
	UpdateAdminProfile(ctx context.Context, a *model.Admin) (*model.Admin, error)

	CreateWebsite(ctx context.Context, alias string, adminId int) (*model.Website, error)
	GetWebsiteByAlias(ctx context.Context, alias string) (*model.Website, error)
	GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error)
	AdminHaveWebsite(ctx context.Context, adminId int) (bool, error)
	CreateSections(ctx context.Context, websiteAlias string, sections []*model.Section) error
	GetSectionsByWebsiteAlias(ctx context.Context, websiteAlias string) ([]*model.Section, error)

	CreateCustomer(ctx context.Context, alias, email, passwordHash string) (int, error)
	GetCustomerByEmailPassword(ctx context.Context, alias, email, passwordHash string) (*model.Customer, error)
	GetCustomerById(ctx context.Context, id int) (*model.Customer, error)
	GetCustomersByWebsite(ctx context.Context, alias string) ([]*model.Customer, error)
	UpdateCustomerProfile(ctx context.Context, c *model.Customer) (*model.Customer, error)

	CreateProduct(ctx context.Context, product *model.Product) (*model.Product, error)
	GetProductById(ctx context.Context, id int) (*model.Product, error)
	UpdateProduct(ctx context.Context, product *model.Product) (*model.Product, error)
	GetActiveProductsByAlias(ctx context.Context, alias string) (model.ProductList, error)
	GetAllProductsByAlias(ctx context.Context, alias string) (model.ProductList, error)

	UpsertCartItem(ctx context.Context, cartId, productId, count int) error
	GetCart(ctx context.Context, id int) (*model.Cart, error)

	CreateOrder(ctx context.Context, customerId int, comment string) (int, error)
	GetOrderIdsByCustomerId(ctx context.Context, customerId int) ([]int, error)
	GetOrderById(ctx context.Context, orderId int) (*model.Order, error)
	GetOrderIdsByAlias(ctx context.Context, alias string) ([]int, error)
}

type objectStorage interface {
	PutObject(ctx context.Context, reader io.Reader, size int64, bucketName, contentType string) (_ string, err error)
	GetObject(ctx context.Context, objectId, bucketName string) (io.Reader, string, error)
}

type Service struct {
	jwtSecret string
	repo      repository
	storage   objectStorage
}

func New(repo repository, storage objectStorage, jwtSecret string) *Service {
	return &Service{
		jwtSecret: jwtSecret,
		repo:      repo,
		storage:   storage,
	}
}
