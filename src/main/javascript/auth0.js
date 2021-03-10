import auth0 from "auth0-js";
import params from "./auth0-params.json";

const Auth0 = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    // audience: `https://${params.domain}/userinfo`,
    // audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    // scope: params.scope,
    responseType: "token id_token",
  });

  export default Auth0;