const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const jwtOptions = {
  secretOrKey: `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['RS256'], // Ensure the algorithm matches Keycloak's configuration
};

const jwtVerify = (payload, done) => {
  try {
    // Verify the token type
    if (payload.typ !== 'Bearer') {
      throw new Error('Invalid token type');
    }

    const user = {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      name: payload.name,
      role: payload.realm_access.roles, // Assuming roles are stored here
      // Add other necessary fields from the payload
    };

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Configure the JWT strategy
const setupJwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  setupJwtStrategy,
};
