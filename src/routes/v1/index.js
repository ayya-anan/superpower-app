const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const xRoute = require('./x.route');
const templateRoute = require('./template.route');
const auditRoute = require('./audit.route');
const individualRoute = require('./contacts/individual.route');
const organizationRoute = require('./contacts/organization.route');
const config = require('../../config/config');
const DealRoute = require('./leads/deal.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/contacts/individual',
    route: individualRoute,
  },
  {
    path: '/contacts/organization',
    route: organizationRoute,
  },
  {
    path: '/leads/deal',
    route: DealRoute,
  },
  {
    path: '/x',
    route: xRoute,
  },
  {
    path: '/template',
    route: templateRoute,
  },
  {
    path: '/audit',
    route: auditRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
