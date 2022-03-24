// utils/stytchLogic.js
import * as stytch from "stytch";
import { getCookie, setCookies, removeCookies } from "cookies-next";

export const SESSION_COOKIE = "stytch_cookie";

let client;
const loadStytch = () => {
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.STYTCH_PROJECT_ID,
      secret: process.env.STYTCH_SECRET,
      env:
        process.env.STYTCH_PROJECT_ENV === "live"
          ? stytch.envs.live
          : stytch.envs.test,
    });
  }

  return client;
};

export const getAuthenticatedUserFromSession = async (req, res) => {
  const sessionToken = getCookie(SESSION_COOKIE, { req, res });
  if (!sessionToken) {
    return null;
  }

  try {
    const stytchClient = loadStytch();
    const resp = await stytchClient.sessions.authenticate({
      session_token: sessionToken,
    });
    return resp.session.user_id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const revokeAndClearSession = async (req, res) => {
  const sessionToken = getCookie(SESSION_COOKIE, { req, res });

  if (sessionToken) {
    try {
      const stytchClient = loadStytch();
      await stytchClient.sessions.revoke({
        session_token: sessionToken,
      });
    } catch (error) {
      console.log(error);
    }
    removeCookies(SESSION_COOKIE, { req, res });
  }

  return res.redirect("/");
};

export const authenticateTokenStartSession = async (req, res) => {
  const { token, type } = req.query;
  let sessionToken;
  try {
    const stytchClient = loadStytch();
    if (type == "oauth") {
      const resp = await stytchClient.oauth.authenticate(token, {
        session_duration_minutes: 30,
        session_management_type: "stytch",
      });
      sessionToken = resp.session.stytch_session.session_token;
    } else {
      const resp = await stytchClient.magicLinks.authenticate(token, {
        session_duration_minutes: 30,
      });
      sessionToken = resp.session_token;
    }
  } catch (error) {
    console.log(error);
    const errorString = JSON.stringify(error);
    return res.status(400).json({ errorString });
  }

  setCookies(SESSION_COOKIE, sessionToken, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return res.redirect("/");
};
