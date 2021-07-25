/**
 * All req/res works as JSON
 * 
 * @Request Sign In 
 * POST /api/auth/sign_in -> { "email": "", "password": "" }
 * @Response
 * {...response, token: ""}
 * 
 * @Request Sign Up
 * POST /api/auth/sign_up -> { "email": "", "firstName": "", "lastName: "", "password": "", "repassword": "", "clientId": "", "approved": false }
 * 
 * @Request Report (without auth)
 * POST /api/public/report -> 
 * { 
 * "new": "new/in_progress/done", 
 * "date": "", 
 * "licenseNumber": "", 
 * "color": "", 
 * "type": "sport/general", 
 * "ownerFullName": "",
 * "officer": "",
 * "createdAt": "",
 * "updateAt": "",
 * "clientId": ""
 * "description": "",
 * "resolution": "" // if "new" done
 * }
 * 
 * All without client id
 * @Request Create
 * POST /api/cases 
 * 
 * @Request Read All
 * GET /api/cases
 * 
 * @Request Read one
 * GET /api/cases/:id
 * 
 * @Request Update
 * PUT /api/cases/:id 
 * 
 * @Request Delete
 * DELETE /api/cases/:id 
 * 
 * 
 * @Request Create
 * POST /api/officers
 * 
 * @Request Update
 * PUT /api/officers/:id
 * 
 * @Request Delete
 * DELETE /api/officers/:id 
 * 
 * @Request Read all
 * GET /api/officers
 * 
 * @Request 
 * GET /api/officers/:id
 */