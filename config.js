/**
 * Server config file
 */
// Container for the configuration of each env, dev env or prod env.
const nodeEnvs = {};

// dev env
nodeEnvs.dev = {
  port: 3000,
  name: 'dev',
};

// prod env
nodeEnvs.prod = {
  port: 5000,
  name: 'prod',
};

// export config
const config = typeof process.env.NODE_ENV === 'string'
  ? nodeEnvs[process.env.NODE_ENV] : nodeEnvs.dev;

module.exports = config || nodeEnvs.dev;
