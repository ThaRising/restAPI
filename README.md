# Overview

The following section describes the resources and endpoints that make up the Esports-Haven API.  

**URL sample:**  
`api.esports-haven.com/{version}/URI`  

**URI sample:**  
`users/:id/username`  
Note that according to RESTful standards, URIs are written without trailing slashes.

## Versioning

>**Current Version:**  
v0 - Pre-Release Prototype

### Header Specifications

None defined yet.

# Endpoints

**Table of Contents:**  

&nbsp;i. [Access Levels](#access-levels)  
ii. [Resources](#resources)

## Access Levels

Summary of the access levels mentioned throughout this page.

### Public

Endpoints is available to all users, no login or token is required to accecss this route.  

### Private

Endpoint is only available to logged in users or clients with an appropriate token.  

### Admin

Access to this endpoint is reserved to site administrators.  

## Resources

A short overview of all available API routes, further documentation will be done as progress continues, this current site is WIP.  

Information about mentioned Access Levels can be found in the [section above](#access-levels).

### /auth/ Endpoint

Deprecated as the scheme is not RESTful.

### /users/ Endpoint

| @desc           | @route                | @access |
| :-------------- | :-------------------- | :------ |
| Get all users   | GET /api/v1/users     | Admin   |
| Get single user | GET /api/v1/users/:id | Private |
| Create user     | POST /api/v1/users    | Private |
| Update user     | PUT /api/v1/users/:id | Private |

### Team related Endpoints

| @desc           | @route                | @access |
| :-------------- | :-------------------- | :------ |
| Get all teams   | GET /api/v1/teams     | Private |
| Get single team | GET /api/v1/teams/:id | Private |
| Create team     | POST /api/v1/teams    | Private |
| Update team     | PUT /api/v1/users/:id | Private |