import { Router } from "express";

import index from "../controller/index";

const router = Router();

router.get("/", index);

export default router;
