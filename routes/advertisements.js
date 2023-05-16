const express = require('express');
const router = express.Router();
const advertisementController = require("../controllers/advertisements.controller")

// поиск активного объявления для определенного нуждающегося
router.get('/get_own_item/:authorID', advertisementController.getOwnItem);

// поиск все возможных активных объявлений
router.get('/get_active/:market', [advertisementController.findOldAdverts, advertisementController.getActiveController]);

// поиск объявления для отдающего
router.get("/get_item_by_id/:advertID", advertisementController.getItemById)

// успешное создание объявления
router.post("/create", advertisementController.create)

// нуждающийся просто удаляет свое объявление
router.delete("/done/:advertID", advertisementController.done)

// поиск активных объявлений определенного магазина
router.get("/get_active_by_market", advertisementController.getActiveByMarket)

// нуждающийся получает информацию о том, что отдающий купил для него продукты
router.put("/getting_product", advertisementController.gettingProduct)

// нуждающийся отменяет получение продуктов и указывает объявление завершенным
router.put("/cancel_getting_product", advertisementController.cancelGettingProduct)

// нуждающийся забирает в магазине продукты
router.put("/finish_getting_product", advertisementController.finishGettingProduct)

// поиск истории благотворительных покупок отдающего
router.get("/find_setter_advertisements/:userID", advertisementController.findSetterAdvertisements)


module.exports = router;
