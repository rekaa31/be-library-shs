const express = require('express');
const router = express.Router();
const MEMBER_ROUTER = require('./member');
const AUTH_MIDDLEWARE = require('../../../middlewares/auth.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentJson = require('../../../docs/api-docs-v1.json');

// ROUTE USING MIDDLEWARE
router.use('/member', AUTH_MIDDLEWARE, MEMBER_ROUTER);

// ROuter for Swagger UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentJson));

module.exports = router;