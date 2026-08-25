import express from "express";
import { findUpcomingEvents, searchEvents } from "../controllers/events.js";

const router = express.Router();

// Event-spezifische Routen MÜSSEN vor dem generischen /:model-Router kommen
router.get("/upcoming", findUpcomingEvents);
router.get("/search", searchEvents);

// Alle anderen /events-Routen (/, /:id, POST, PUT, DELETE)
// fallen durch den generellen /:model dynamicModel-Router in index.js.

export default router;