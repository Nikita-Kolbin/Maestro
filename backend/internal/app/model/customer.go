package model

type CustomerAliasEmailPasswordRequest struct {
	Alias    string `json:"alias"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CustomerTokenResponse struct {
	Token string `json:"token"`
}

type Customer struct {
	Id                   int    `db:"id"`
	WebsiteAlias         string `db:"website_alias"`
	Email                string `db:"email"`
	FirstName            string `db:"first_name"`
	LastName             string `db:"last_name"`
	FatherName           string `db:"father_name"`
	Phone                string `db:"phone"`
	Telegram             string `db:"telegram"`
	DeliveryType         string `db:"delivery_type"`
	PaymentType          string `db:"payment_type"`
	TelegramNotification bool   `db:"telegram_notification"`
	EmailNotification    bool   `db:"email_notification"`
}

type CustomerDTO struct {
	Id                   int    `json:"id"`
	WebsiteAlias         string `json:"website_alias"`
	Email                string `json:"email"`
	FirstName            string `json:"first_name"`
	LastName             string `json:"last_name"`
	FatherName           string `json:"father_name"`
	Phone                string `json:"phone"`
	Telegram             string `json:"telegram"`
	DeliveryType         string `json:"delivery_type"`
	PaymentType          string `json:"payment_type"`
	TelegramNotification bool   `json:"telegram_notification"`
	EmailNotification    bool   `json:"email_notification"`
}

type UpdateCustomerProfileRequest struct {
	FirstName            string `json:"first_name"`
	LastName             string `json:"last_name"`
	FatherName           string `json:"father_name"`
	Phone                string `json:"phone"`
	Telegram             string `json:"telegram"`
	DeliveryType         string `json:"delivery_type"`
	PaymentType          string `json:"payment_type"`
	TelegramNotification bool   `json:"telegram_notification"`
	EmailNotification    bool   `json:"email_notification"`
}

func FromCustomerToDTO(customer *Customer) *CustomerDTO {
	return &CustomerDTO{
		Id:                   customer.Id,
		WebsiteAlias:         customer.WebsiteAlias,
		Email:                customer.Email,
		FirstName:            customer.FirstName,
		LastName:             customer.LastName,
		FatherName:           customer.FatherName,
		Phone:                customer.Phone,
		Telegram:             customer.Telegram,
		DeliveryType:         customer.DeliveryType,
		PaymentType:          customer.PaymentType,
		TelegramNotification: customer.TelegramNotification,
		EmailNotification:    customer.EmailNotification,
	}
}

func FromCustomersToDTO(customers []*Customer) []*CustomerDTO {
	resp := make([]*CustomerDTO, 0, len(customers))
	for _, customer := range customers {
		resp = append(resp, FromCustomerToDTO(customer))
	}
	return resp
}

func FromUpdateProfileRequestToCustomer(req *UpdateCustomerProfileRequest) *Customer {
	return &Customer{
		FirstName:            req.FirstName,
		LastName:             req.LastName,
		FatherName:           req.FatherName,
		Phone:                req.Phone,
		Telegram:             req.Telegram,
		DeliveryType:         req.DeliveryType,
		PaymentType:          req.PaymentType,
		EmailNotification:    req.EmailNotification,
		TelegramNotification: req.TelegramNotification,
	}
}
