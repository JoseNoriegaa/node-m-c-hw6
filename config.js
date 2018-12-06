/**
 * Server config file
 */
// Container for the configuration of each env, dev env or prod env.
const node_envs = {};

// dev env
node_envs.dev = {
  port: 3000,
  name: 'dev',
};

// prod env
node_envs.prod = {
  port: 5000,
  name: 'prod',
};

// export config
const config = typeof process.env.NODE_ENV === 'string' ?
node_envs[process.env.NODE_ENV] : node_envs['dev']; 

module.exports = config || node_envs['dev'];
