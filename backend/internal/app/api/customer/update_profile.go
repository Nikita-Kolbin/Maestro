package customer

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"io"
	"net/http"
)

// UpdateCustomerProfile godoc
// @Summary Update customer profile
// @Security ApiKeyAuth
// @Tags customer
// @Accept   json
// @Produce  json
// @Param input body model.UpdateCustomerProfileRequest true "customer new profile info"
// @Success      200   {object}   model.CustomerDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /customer/update-profile [patch]
func (i *Customer) UpdateCustomerProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsCustomer(ctx) {
		logger.Error(ctx, "[UpdateCustomerProfile] user is not customer")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	customerId := middleware.GetUserId(ctx)

	var req model.UpdateCustomerProfileRequest

	err := render.DecodeJSON(r.Body, &req)
	if errors.Is(err, io.EOF) {
		logger.Error(ctx, "[UpdateCustomerProfile] request body is empty")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("empty request"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[UpdateCustomerProfile] failed to decode request body", "err", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("failed to decode request"))
		return
	}

	customer := model.FromUpdateProfileRequestToCustomer(&req)
	customer.Id = customerId

	customer, err = i.srv.UpdateCustomerProfile(ctx, customer)
	if err != nil {
		logger.Error(ctx, "[UpdateCustomerProfile] failed update profile", "customer_id", customerId, "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed update profile"))
		return
	}

	logger.Info(ctx, "[UpdateCustomerProfile] customer profile updated", "customer_id", customerId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromCustomerToDTO(customer))
}
