// components/StytchLogin.js
import React from "react";
import { Stytch } from "@stytch/stytch-react";

const stytchConfig = {
  loginOrSignupView: {
    products: ["oauth", "emailMagicLinks"],
    oauthOptions: {
      providers: [
        {
          type: "google",
          one_tap: true,
          position: "embedded",
        },
      ],
      loginRedirectURL: "http://localhost:3000/api/authenticate?type=oauth",
      signupRedirectURL: "http://localhost:3000/api/authenticate?type=oauth",
    },
    emailMagicLinksOptions: {
      loginRedirectURL: "http://localhost:3000/api/authenticate",
      loginExpirationMinutes: 30,
      signupRedirectURL: "http://localhost:3000/api/authenticate",
      signupExpirationMinutes: 30,
      createUserAsPending: true,
    },
  },
  style: {
    fontFamily: '"Helvetica New", Helvetica, sans-serif',
    width: "321px",
    primaryColor: "#0577CA",
  },
};

const StytchLogin = ({ publicToken }) => {
  return (
    <Stytch
      publicToken={publicToken}
      loginOrSignupView={stytchConfig.loginOrSignupView}
      style={stytchConfig.style}
    />
  );
};

export default StytchLogin;
