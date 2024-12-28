package model

type AdminEmailPasswordRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AdminTokenResponse struct {
	Token string `json:"token"`
}

type Admin struct {
	Id                   int    `db:"id"`
	Email                string `db:"email"`
	FirstName            string `db:"first_name"`
	LastName             string `db:"last_name"`
	FatherName           string `db:"father_name"`
	City                 string `db:"city"`
	Telegram             string `db:"telegram"`
	ImageId              string `db:"image_id"`
	EmailNotification    bool   `db:"email_notification"`
	TelegramNotification bool   `db:"telegram_notification"`
}

type AdminDTO struct {
	Id                   int    `json:"id"`
	Email                string `json:"email"`
	FirstName            string `json:"first_name"`
	LastName             string `json:"last_name"`
	FatherName           string `json:"father_name"`
	City                 string `json:"city"`
	Telegram             string `json:"telegram"`
	ImageId              string `json:"image_id"`
	TelegramNotification bool   `json:"telegram_notification"`
	EmailNotification    bool   `json:"email_notification"`
}

type UpdateAdminProfileRequest struct {
	FirstName            string `json:"first_name"`
	LastName             string `json:"last_name"`
	FatherName           string `json:"father_name"`
	City                 string `json:"city"`
	Telegram             string `json:"telegram"`
	ImageId              string `json:"image_id"`
	TelegramNotification bool   `json:"telegram_notification"`
	EmailNotification    bool   `json:"email_notification"`
}

func FromAdminToDTO(customer *Admin) *AdminDTO {
	return &AdminDTO{
		Id:                   customer.Id,
		Email:                customer.Email,
		FirstName:            customer.FirstName,
		LastName:             customer.LastName,
		FatherName:           customer.FatherName,
		City:                 customer.City,
		Telegram:             customer.Telegram,
		ImageId:              customer.ImageId,
		TelegramNotification: customer.TelegramNotification,
		EmailNotification:    customer.EmailNotification,
	}
}

func FromUpdateProfileRequestToAdmin(req *UpdateAdminProfileRequest) *Admin {
	return &Admin{
		FirstName:            req.FirstName,
		LastName:             req.LastName,
		FatherName:           req.FatherName,
		City:                 req.City,
		ImageId:              req.ImageId,
		Telegram:             req.Telegram,
		EmailNotification:    req.EmailNotification,
		TelegramNotification: req.TelegramNotification,
	}
}
