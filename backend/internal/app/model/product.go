package model

type Product struct {
	Id           int      `db:"id"`
	WebsiteAlias string   `db:"website_alias"`
	Name         string   `db:"name"`
	Description  string   `db:"description"`
	Price        int      `db:"price"`
	ImageIds     []string `db:"image_ids"`
	Active       bool     `db:"active"`
	Tags         []string `db:"tags"`
	Count        int      `db:"count"`
}

type ProductList []*Product

type ProductDTO struct {
	Id           int      `json:"id"`
	WebsiteAlias string   `json:"website_alias"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Price        int      `json:"price"`
	ImageIds     []string `json:"image_ids"`
	Active       bool     `json:"active"`
	Tags         []string `json:"tags"`
	Count        int      `json:"count"`
}

type ProductDTOList []*ProductDTO

type CreateProductRequest struct {
	WebsiteAlias string   `json:"website_alias"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Price        int      `json:"price"`
	ImageIds     []string `json:"image_ids"`
	Active       bool     `json:"active"`
	Tags         []string `json:"tags"`
	Count        int      `json:"count"`
}

type UpdateProductRequest struct {
	Id          int      `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Price       int      `json:"price"`
	ImageIds    []string `json:"image_ids"`
	Active      bool     `json:"active"`
	Tags        []string `json:"tags"`
	Count       int      `json:"count"`
}

func FromCreateRequestToProduct(req *CreateProductRequest) *Product {
	return &Product{
		WebsiteAlias: req.WebsiteAlias,
		Name:         req.Name,
		Description:  req.Description,
		Price:        req.Price,
		ImageIds:     req.ImageIds,
		Active:       req.Active,
		Tags:         req.Tags,
		Count:        req.Count,
	}
}

func FromUpdateRequestToProduct(req *UpdateProductRequest) *Product {
	return &Product{
		Id:          req.Id,
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		ImageIds:    req.ImageIds,
		Active:      req.Active,
		Tags:        req.Tags,
		Count:       req.Count,
	}
}

func FromProductToDTO(product *Product) *ProductDTO {
	return &ProductDTO{
		Id:           product.Id,
		WebsiteAlias: product.WebsiteAlias,
		Name:         product.Name,
		Description:  product.Description,
		Price:        product.Price,
		ImageIds:     product.ImageIds,
		Active:       product.Active,
		Tags:         product.Tags,
		Count:        product.Count,
	}
}

func FromProductListToDTO(list ProductList) ProductDTOList {
	res := make(ProductDTOList, len(list))
	for i, p := range list {
		res[i] = FromProductToDTO(p)
	}
	return res
}
