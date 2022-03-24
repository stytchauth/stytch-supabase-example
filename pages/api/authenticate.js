// pages/api/authenticate.js
import { authenticateTokenStartSession } from "../../utils/stytchLogic";

export default async function handler(req, res) {
  return authenticateTokenStartSession(req, res);
}
