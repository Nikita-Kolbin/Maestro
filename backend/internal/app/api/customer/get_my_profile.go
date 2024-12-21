package customer

import (
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
)

// GetCustomerProfile godoc
// @Summary Get my profile to customer
// @Security ApiKeyAuth
// @Tags customer
// @Accept   json
// @Produce  json
// @Success      200   {object}   model.CustomerDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /customer/get-my-profile [get]
func (i *Customer) GetCustomerProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsCustomer(ctx) {
		logger.Error(ctx, "[GetCustomerProfile] user is not customer")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	customerId := middleware.GetUserId(ctx)

	customer, err := i.srv.GetCustomerById(ctx, customerId)
	if err != nil {
		logger.Error(ctx, "[GetCustomerProfile] failed get profile", "customer_id", customerId, "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed get profile"))
		return
	}

	logger.Info(ctx, "[GetCustomerProfile] customer profile given", "customer_id", customerId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromCustomerToDTO(customer))
}
