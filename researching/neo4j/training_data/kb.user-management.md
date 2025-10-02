# Domain Knowledge: User Management Flow

## 1. Core Identity

```yaml
domain_id: user-management-flow-v1
domain_name: User Management Flow
domain_type: business_process
version: 1.0
last_updated: 2025-10-01
owner: platformTeam
status: active
```

**Definition**: The user management flow defines how users are created, updated, authenticated, assigned roles, and deactivated in a system.

**Tags**: `#user` `#identity` `#accessControl` `#workflow`

---

## 2. Concepts & Entities

### Entity: user

```yaml
entity_id: usr-001
entity_type: person
description: A person registered in the system with login credentials.
attributes:
  - attribute_name: userId
    data_type: string
    required: true
    description: unique identifier for the user
  - attribute_name: username
    data_type: string
    required: true
    description: name used to log in
  - attribute_name: email
    data_type: string
    required: true
    description: email address of the user
  - attribute_name: isActive
    data_type: boolean
    required: true
    description: whether the user account is active
```

**Relationships**:

- `HAS_ROLE` → role (authorization)
- `AUTHENTICATED_BY` → authentication (security)
- `OWNED_BY` → organization (membership)

**Synonyms**: account, identity

---

### Entity: role

```yaml
entity_id: role-001
entity_type: data
description: A defined set of permissions that controls what a user can do.
attributes:
  - attribute_name: roleId
    data_type: string
    required: true
    description: unique identifier for the role
  - attribute_name: roleName
    data_type: string
    required: true
    description: name of the role (admin, manager, user)
  - attribute_name: permissions
    data_type: array
    required: true
    description: list of allowed actions
```

**Relationships**:

- `ASSIGNED_TO` → user (authorization)
- `CONTAINS` → permission (composition)

**Synonyms**: accessLevel, userGroup

---

### Entity: permission

```yaml
entity_id: perm-001
entity_type: data
description: A specific action that a user or role can perform.
attributes:
  - attribute_name: permissionId
    data_type: string
    required: true
    description: unique identifier for permission
  - attribute_name: action
    data_type: string
    required: true
    description: system action allowed (createUser, deleteUser, viewReport)
```

**Relationships**:

- `PART_OF` → role (composition)

**Synonyms**: privilege, accessRight

---

### Entity: authentication

```yaml
entity_id: auth-001
entity_type: process
description: The process that verifies the identity of a user.
attributes:
  - attribute_name: method
    data_type: string
    required: true
    description: type of authentication (password, oauth, sso, mfa)
  - attribute_name: lastLogin
    data_type: date
    required: false
    description: last time the user logged in
```

**Relationships**:

- `VALIDATES` → user (verification)
- `DEPENDS_ON` → identityProvider (integration)

**Synonyms**: login, signIn

---

### Entity: identityProvider

```yaml
entity_id: idp-001
entity_type: system
description: External or internal service that provides authentication.
attributes:
  - attribute_name: providerId
    data_type: string
    required: true
    description: unique identifier of identity provider
  - attribute_name: providerType
    data_type: string
    required: true
    description: type of provider (internal, google, azureAd, okta)
```

**Relationships**:

- `AUTHENTICATES` → authentication (process)

**Synonyms**: idp, authService

---

### Entity: organization

```yaml
entity_id: org-001
entity_type: data
description: A group or tenant that owns and manages users.
attributes:
  - attribute_name: orgId
    data_type: string
    required: true
    description: unique identifier for organization
  - attribute_name: orgName
    data_type: string
    required: true
    description: official name of the organization
```

**Relationships**:

- `CONTAINS` → user (membership)

**Synonyms**: tenant, company

---

## 18. Graph DB Schema

```cypher
// Node types
(:Domain {id: "user-management-flow-v1", name: "User Management Flow", type: "business_process", description: "Workflow for managing users, roles, authentication and access"})
(:Entity {id, name, type, attributes})

// Relationship types
(Domain)-[:CONTAINS]->(Entity)
(Entity)-[:RELATED_TO {type: "authorization"}]->(:Entity {name: "role"})
(Entity)-[:RELATED_TO {type: "composition"}]->(:Entity {name: "permission"})
(Entity)-[:RELATED_TO {type: "verification"}]->(:Entity {name: "authentication"})
(Entity)-[:RELATED_TO {type: "integration"}]->(:Entity {name: "identityProvider"})
(Entity)-[:RELATED_TO {type: "membership"}]->(:Entity {name: "organization"})
```
