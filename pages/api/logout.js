// pages/api/logout.js
import { revokeAndClearSession } from "../../utils/stytchLogic";

export default async function handler(req, res) {
  return revokeAndClearSession(req, res);
}
