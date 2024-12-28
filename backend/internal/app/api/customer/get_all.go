package customer

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
)

// GetAll godoc
// @Summary Get all customers in website TO ADMIN
// @Security ApiKeyAuth
// @Tags customer
// @Accept   json
// @Produce  json
// @Success      200   {object}   []model.CustomerDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      404   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /customer/get-all [get]
func (i *Customer) GetAll(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[GetAllCustomers] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	website, err := i.srv.GetWebsiteByAdminId(ctx, adminId)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[GetAllCustomers] admin have not website", "admin_id", adminId)
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, model.NewErrResp("admin have not website"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[GetAllCustomers] failed to check website", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to check website"))
		return
	}

	customers, err := i.srv.GetCustomersByWebsite(ctx, website.Alias)
	if err != nil {
		logger.Error(ctx, "[GetAllCustomers] failed to get customers", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to get customers"))
		return
	}

	logger.Info(ctx, "[GetAllCustomers] customers given", "alias", website.Alias)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromCustomersToDTO(customers))
}
