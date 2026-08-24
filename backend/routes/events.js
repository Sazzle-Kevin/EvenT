import express from "express";
import { findUpcomingEvents } from "../controllers/events.js";

const router = express.Router();

// Only /upcoming is event-specific; all other /events routes (/, /:id, POST, PUT, DELETE)
// fall through to the generic /:model dynamicModel route in index.js.
router.get("/upcoming", findUpcomingEvents);

export default router;
