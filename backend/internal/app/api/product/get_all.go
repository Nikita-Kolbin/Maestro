package product

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
)

// GetAll godoc
// @Summary Get all products in website TO ADMIN
// @Security ApiKeyAuth
// @Tags product
// @Accept   json
// @Produce  json
// @Success      200   {object}   model.ProductDTOList
// @Failure      400   {object}   model.ErrorResponse
// @Failure      404   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /product/get-all [get]
func (i *Product) GetAll(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[GetAllProducts] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	website, err := i.srv.GetWebsiteByAdminId(ctx, adminId)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[GetAllProducts] admin have not website")
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, model.NewErrResp("admin have not website"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[GetAllProducts] failed to check website", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to check website"))
		return
	}

	products, err := i.srv.GetAllProductsByAlias(ctx, website.Alias)
	if err != nil {
		logger.Error(ctx, "[GetAllProducts] failed to get products", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to get products"))
		return
	}

	logger.Info(ctx, "[GetAllProducts] products given", "alias", website.Alias)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromProductListToDTO(products))
}
