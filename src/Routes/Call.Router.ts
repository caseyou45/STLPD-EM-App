import { Router } from "express";

import CallController from "../Controller/Call.Controller";

const router = Router();

// router.get("/all", CallController.getAll);
router.get("/", CallController.getByDate);

export default router;
