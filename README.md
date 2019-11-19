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

### /login Endpoint

Serves as temporary authentication endpoint.

| Methods                    | Description          | Access  |
| :------------------------- | :------------------- | :------ |
| `POST` /api/v0/login       | Login User via Email | Public  |

### /users/ Endpoint

Provides CRUD functionality for users.

| Methods                    | Description       | Access  |
| :------------------------- | :---------------- | :------ |
| `GET` /api/v0/users/:id    | Get User by Id    | Public  |
| `POST` /api/v0/users       | Create User       | Public  |
| `PUT` /api/v0/users/:id    | Update User by Id | Private |
| `DELETE` /api/v0/users/:id | Delete User by Id | Private |
