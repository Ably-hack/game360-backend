/**
 * @swagger
 * tags:
 *   name: League
 * /v1/livescore/get_leagues:
 *   get:
 *     security: 
 *       - bearerAuth: []
 *     tags: [League]
 *     description: Retrieve information about a specific league.
 *     responses:
 *       200:
 *         description: Successful response
 * 
 * /v1/livescore/teams/{league_id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: league_id
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags: [League]
 *     summary: Get League Team Information
 *     description: Retrieve information about a specific league team.
 *     responses:
 *       200:
 *         description: Successful response
 * 
 * /v1/livescore/team/{team_id}:
 *   get:
 *     parameters: 
 *       - in: path
 *         name: team_id 
 *         required: true
 *     security: 
 *       - bearerAuth: []
 *     tags: [League]
 *     description: Retrieve information about a specific team.
 *     responses:
 *       200:
 *         description: Successful response
 * 
 * /v1/livescore/fixtures:
 *   get:
 *     parameters: 
 *       - in: query
 *         name: team_id 
 *         required: true
 *       - in: query
 *         name: league_id
 *         required: true
 *     security: 
 *       - bearerAuth: []
 *     tags: [League]
 *     description: Retrieve information on league fixtures.
 *     responses:
 *       200:
 *         description: Successful response
 * 
 * /v1/livescore/league/standings/{league_id}:
 *   get:
 *     parameters: 
 *       - in: path
 *         name: league_id 
 *         required: true
 *     security: 
 *       - bearerAuth: []
 *     tags: [League]
 *     description: Retrieve information on league standings.
 *     responses:
 *       200:
 *         description: Successful response
 */
