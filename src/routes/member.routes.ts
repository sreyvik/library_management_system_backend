const express = require("express");
import {
    addMember,
    editMember,
    getMember,
    listMembers,
    putMember,
    removeMember
} from "../controllers/member.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", listMembers);
router.get("/:id", getMember);
router.post("/", authMiddleware, addMember);
router.put("/:id", authMiddleware, editMember);
router.delete("/:id", authMiddleware, removeMember);

export default router;

