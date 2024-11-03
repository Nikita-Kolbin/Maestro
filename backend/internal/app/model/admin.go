package model

type AdminEmailPasswordRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AdminTokenResponse struct {
	Token string `json:"token"`
}
