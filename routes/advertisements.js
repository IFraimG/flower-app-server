const express = require('express');
const router = express.Router();
const advertisementController = require("../controllers/advertisements.controller")
let passport = require("../configs/passportS.js")

// поиск активного объявления для определенного нуждающегося
router.get('/get_own_item/:authorID', passport.authenticate('jwt', { session: false }), advertisementController.getOwnItem);

// поиск все возможных активных объявлений
router.get('/get_active/:market', passport.authenticate('jwt', { session: false }), [advertisementController.findOldAdverts, advertisementController.getActiveController]);

// поиск объявления для отдающего
router.get("/get_item_by_id/:advertID", passport.authenticate('jwt', { session: false }), advertisementController.getItemById)

// успешное создание объявления
router.post("/create", passport.authenticate('jwt', { session: false }),advertisementController.create)

// нуждающийся просто удаляет свое объявление
router.delete("/done/:advertID", passport.authenticate('jwt', { session: false }), advertisementController.done)

// поиск активных объявлений определенного магазина
router.get("/get_active_by_market", passport.authenticate('jwt', { session: false }), advertisementController.getActiveByMarket)

// нуждающийся получает информацию о том, что отдающий купил для него продукты
router.put("/getting_product", passport.authenticate('jwt', { session: false }), advertisementController.gettingProduct)

// нуждающийся отменяет получение продуктов и указывает объявление завершенным
router.put("/cancel_getting_product", passport.authenticate('jwt', { session: false }), advertisementController.cancelGettingProduct)

// нуждающийся забирает в магазине продукты
router.put("/finish_getting_product", passport.authenticate('jwt', { session: false }), advertisementController.finishGettingProduct)

// поиск истории благотворительных покупок отдающего
router.get("/find_giver_advertisements/:userID", passport.authenticate('jwt', { session: false }), advertisementController.findSetterAdvertisements)


module.exports = router;
