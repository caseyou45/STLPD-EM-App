import { Router } from "express";

import getCallsByQuery from "../controller/index";

const router = Router();

router.get("/", getCallsByQuery);

export default router;
