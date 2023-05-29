import { Router } from "express";

import getWithoutGrouping from "../controller/index";
import getGrouped from "../controller/group";

const router = Router();

router.get("/", getWithoutGrouping);
router.get("/group", getGrouped);

export default router;
