const express = require("express");
import {
    addMember,
    editMember,
    getMember,
    listMembers,
    putMember,
    removeMember
} from "../controllers/member.controller";

const router = express.Router();

router.get("/", listMembers);
router.get("/:id", getMember);
router.post("/", addMember);
router.put("/:id", putMember);
router.delete("/:id", removeMember);

export default router;
