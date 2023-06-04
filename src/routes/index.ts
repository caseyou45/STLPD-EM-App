import { Router } from "express";

import getWithoutGrouping from "../controller/index";

const router = Router();

router.get("/", getWithoutGrouping);

export default router;
