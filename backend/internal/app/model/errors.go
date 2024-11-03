package model

import "errors"

// repository
var (
	ErrEmailRegistered     = errors.New("email is already registered")
	ErrAliasTaken          = errors.New("alias is already taken")
	ErrEmptyOrder          = errors.New("order is empty")
	ErrInvalidEmail        = errors.New("email is invalid")
	ErrInvalidImagesIs     = errors.New("invalid images id")
	ErrAdminHaveWebsite    = errors.New("admin already have website")
	ErrInvalidActive       = errors.New("invalid active status")
	ErrInvalidNotification = errors.New("invalid notification status")
)
