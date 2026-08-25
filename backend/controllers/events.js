import { Op } from "sequelize";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { Event } from "../db.js";

export const findUpcomingEvents = asyncWrapper(async (req, res, next) => {
  const upcomingEvents = await Event.findAll({
    where: {
      date: {
        [Op.gt]: new Date(),
      },
    },
    order: [["date", "ASC"]],
  });

  res.json(upcomingEvents);
});

export const searchEvents = asyncWrapper(async (req, res, next) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json([]);
  }

  const results = await Event.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q.trim()}%` } },
        { description: { [Op.like]: `%${q.trim()}%` } },
        { location: { [Op.like]: `%${q.trim()}%` } },
      ],
    },
    limit: 20,
    order: [["date", "ASC"]],
  });

  res.json(results);
});
