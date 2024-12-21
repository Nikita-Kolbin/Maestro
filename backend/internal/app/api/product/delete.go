package product

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
	"strconv"
)

// DeleteProduct godoc
// @Summary Update product
// @Security ApiKeyAuth
// @Tags product
// @Accept   json
// @Produce  json
// @Param id query string true "product id to delete"
// @Success      200   {object}   SuccessResp
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      404   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /product/delete [delete]
func (i *Product) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	const productIdParam = "id"

	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[DeleteProduct] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	strId := r.URL.Query().Get(productIdParam)
	productId, err := strconv.Atoi(strId)
	if err != nil {
		logger.Error(ctx, "[DeleteProduct] invalid product id")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("invalid product id"))
		return
	}

	product, err := i.srv.GetProductById(ctx, productId)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[UpdateProduct] product not found")
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, model.NewErrResp("product not found"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[UpdateProduct] failed to check product", "id", productId, "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to check product"))
		return
	}

	website, err := i.srv.GetWebsiteByAlias(ctx, product.WebsiteAlias)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[UpdateProduct] website not found", "alias", product.WebsiteAlias)
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, model.NewErrResp("website not found"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[UpdateProduct] failed to check admin", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to check admin"))
		return
	}
	if website.AdminId != adminId {
		logger.Error(ctx, "[UpdateProduct] admin is not owner")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	err = i.srv.DeleteProduct(ctx, productId)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[DeleteProduct] product not found")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("product not found"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[DeleteProduct] failed to delete product", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to delete product"))
		return
	}

	logger.Info(ctx, "[DeleteProduct] product deleted", "id", productId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, SuccessResp{Success: true})
}

type SuccessResp struct {
	Success bool `json:"success"`
}
