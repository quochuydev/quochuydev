# ZITADEL Docs


## docs

Documentation for ZITADEL - Identity infrastructure, simplified for you.

- [ZITADEL Docs](/index.md): Documentation for ZITADEL - Identity infrastructure, simplified for you.

### apis


#### actions

- [Code examples](/apis/actions/code-examples.md): Actions are a powerful tool to extend ZITADEL and you might wonder what use cases actions can be used for.
- [Complement Token Flow](/apis/actions/complement-token.md): This flow is executed during the creation of tokens and token introspection.
- [Complement SAMLResponse](/apis/actions/customize-samlresponse.md): This flow is executed before the return of the SAML Response.
- [External Authentication Flow](/apis/actions/external-authentication.md): This flow is executed if the user logs in using an identity provider.
- [Internal Authentication Flow](/apis/actions/internal-authentication.md): This flow is executed if the user logs in using the login UI hosted by ZITADEL.
- [Actions](/apis/actions/introduction.md): This page describes the options you have when writing ZITADEL actions scripts.
- [Modules](/apis/actions/modules.md): ZITADEL provides the following modules.
- [Objects](/apis/actions/objects.md): External User

#### apis

ZITADEL provides multiple APIs to manage the system, instances and resources such as users, projects and more.

- [Core Resources](/apis/apis.md): ZITADEL provides multiple APIs to manage the system, instances and resources such as users, projects and more.

#### assets

AssetsService

- [zitadel/assets](/apis/assets.md): AssetsService

#### benchmarks

Benchmarks are crucial to understand if ZITADEL fulfills your expected workload and what resources it needs to do so.

- [Benchmarks](/apis/benchmarks.md): Benchmarks are crucial to understand if ZITADEL fulfills your expected workload and what resources it needs to do so.
- [machine jwt profile grant benchmark of zitadel v2.65.0](/apis/benchmarks/v2.65.0/machine_jwt_profile_grant.md): Tests are halted after this test run because of too many client read events on the database.
- [machine jwt profile grant benchmark of zitadel v2.66.0](/apis/benchmarks/v2.66.0/machine_jwt_profile_grant.md): The tests showed heavy database load by time by the first two database queries. These queries need to be analyzed further.
- [machine jwt profile grant benchmark of zitadel v2.70.0](/apis/benchmarks/v2.70.0/machine_jwt_profile_grant.md): The performance goals of this issue are reached. Next we will test linear scalability.
- [oidc session benchmark of Zitadel v2.70.0](/apis/benchmarks/v2.70.0/oidc_session.md): The test implementats Support for (OIDC) Standard in a Custom Login UI flow.
- [create session benchmark of zitadel v4](/apis/benchmarks/v4/add_session.md): Benchmark results of v4 release of Zitadel.
- [human password login benchmark of zitadel v4](/apis/benchmarks/v4/human_password_login.md): Benchmark results of v4 release of Zitadel.
- [introspection benchmark of zitadel v4](/apis/benchmarks/v4/introspect.md): Benchmark results of v4 release of Zitadel.
- [machine client credentials login benchmark of zitadel v4](/apis/benchmarks/v4/machine_client_credentials_login.md): Benchmark results of v4 release of Zitadel.
- [machine jwt profile grant benchmark of zitadel v4](/apis/benchmarks/v4/machine_jwt_profile_grant.md): Benchmark results of v4 release of Zitadel.
- [machine pat login benchmark of zitadel v4](/apis/benchmarks/v4/machine_pat_login.md): Benchmark results of v4 release of Zitadel.
- [manipulate user benchmark of zitadel v4](/apis/benchmarks/v4/manipulate_user.md): Benchmark results of v4 release of Zitadel.
- [oidc session benchmark of zitadel v4](/apis/benchmarks/v4/oidc_session.md): Benchmark results of v4 release of Zitadel.
- [otp session benchmark of zitadel v4](/apis/benchmarks/v4/otp_session.md): Benchmark results of v4 release of Zitadel.
- [session with password benchmark of zitadel v4](/apis/benchmarks/v4/password_session.md): Benchmark results of v4 release of Zitadel.
- [user info benchmark of zitadel v4](/apis/benchmarks/v4/user_info.md): Benchmark results of v4 release of Zitadel.

#### introduction

ZITADEL exposes all features via different gRPC and REST APIs and provides SDKs for popular languages and frameworks.

- [ZITADEL API Reference Overview](/apis/introduction.md): ZITADEL exposes all features via different gRPC and REST APIs and provides SDKs for popular languages and frameworks.

#### migration_v1_to_v2

This guide gives you an overview for migrating from our v1 API to the new and improved v2 API.

- [Migrate from v1 APIs to v2 APIs](/apis/migration_v1_to_v2.md): This guide gives you an overview for migrating from our v1 API to the new and improved v2 API.

#### observability

- [ZITADEL Ready and Health Endpoints](/apis/observability/health.md): ZITADEL exposes a Ready- and Healthy endpoint to allow external systems like load balancers, orchestration systems, uptime probes and others to check the status.
- [ZITADEL Metrics](/apis/observability/metrics.md): ZITADEL provides a metrics endpoint with the help of the opentelemetry-go package.

#### openidoauth

- [Authentication Methods in ZITADEL](/apis/openidoauth/authn-methods.md): Client Secret Basic
- [ZITADEL OIDC Authentication Request Playground](/apis/openidoauth/authrequest.md): The OIDC Playground is for testing OpenID Authentication Requests, giving you more insight how OpenID Connect works and how you can customize ZITADEL behavior with different parameters.
- [Claims in ZITADEL](/apis/openidoauth/claims.md): ZITADEL asserts claims on different places according to the corresponding specifications or project and clients settings.
- [OpenID Connect Endpoints in ZITADEL](/apis/openidoauth/endpoints.md): OpenID Connect 1.0 Discovery
- [Grant Types in ZITADEL](/apis/openidoauth/grant-types.md): For a list of supported or unsupported Grant Types please have a look at the table below.
- [Scopes in ZITADEL](/apis/openidoauth/scopes.md): ZITADEL supports the usage of scopes as way of requesting information from the IAM and also instruct ZITADEL to do certain operations.

#### resources

- [Action Service API (Beta)](/apis/resources/action_service_v2.md): This API is intended to manage custom executions and targets (previously known as actions) in a ZITADEL instance.

This service is in beta state. It can AND will continue breaking until a stable version is released.

The version 2 of actions provide much more options to customize ZITADELs behaviour than previous action versions.
Also, v2 actions are available instance-wide, whereas previous actions had to be managed for each organization individually
ZITADEL doesn't restrict the implementation languages, tooling and runtime for v2 action executions anymore.
Instead, it calls external endpoints which are implemented and maintained by action v2 users.

Please make sure to enable the `actions` feature flag on your instance to use this service and that you're running Zitadel V3.
- [Action Service](/apis/resources/action_service_v2/action-service.md): This API is intended to manage custom executions (previously known as actions) in a ZITADEL instance. This service is in beta state. It can AND will continue breaking until a stable version is released.
- [Create Target](/apis/resources/action_service_v2/action-service-create-target.md): Create a new target to your endpoint, which can be used in executions.
- [Delete Target](/apis/resources/action_service_v2/action-service-delete-target.md): Delete an existing target. This will remove it from any configured execution as well.
- [Get Target](/apis/resources/action_service_v2/action-service-get-target.md): Returns the target identified by the requested ID.
- [List Execution Functions](/apis/resources/action_service_v2/action-service-list-execution-functions.md): List all available functions which can be used as condition for executions.
- [List Execution Methods](/apis/resources/action_service_v2/action-service-list-execution-methods.md): List all available methods which can be used as condition for executions.
- [List Execution Services](/apis/resources/action_service_v2/action-service-list-execution-services.md): List all available services which can be used as condition for executions.
- [List Executions](/apis/resources/action_service_v2/action-service-list-executions.md): List all matching executions. By default all executions of the instance are returned that have at least one execution target.
- [List targets](/apis/resources/action_service_v2/action-service-list-targets.md): List all matching targets. By default all targets of the instance are returned.
- [Set Execution](/apis/resources/action_service_v2/action-service-set-execution.md): Sets an execution to call a target or include the targets of another execution.
- [Update Target](/apis/resources/action_service_v2/action-service-update-target.md): Update an existing target.
- [Admin API](/apis/resources/admin.md): This API is intended to configure and manage one ZITADEL instance itself.
- [Activate Email Provider](/apis/resources/admin/admin-service-activate-email-provider.md): Activate an Email provider.
- [Activates the 'LoginDefaultOrg' feature by setting the flag to 'true'
This is irreversible!
Once activated, the login UI will use the settings of the default org (and not from the instance) if not organization context is set](/apis/resources/admin/admin-service-activate-feature-login-default-org.md): Activates the 'LoginDefaultOrg' feature by setting the flag to 'true'
- [Activate Labeling/Branding Settings](/apis/resources/admin/admin-service-activate-label-policy.md): Activates the preview private labeling/branding configured on the instance level. It will be shown to the users afterward. It affects all organizations, that don't overwrite the settings. Defines what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Activate SMS Provider](/apis/resources/admin/admin-service-activate-sms-provider.md): Activate an SMS provider. After activating a provider, the users will be able to receive SMS notifications.
- [Activate SMTP Provider](/apis/resources/admin/admin-service-activate-smtp-config.md): Activate an SMTP provider.
- [Add Apple Identity Provider](/apis/resources/admin/admin-service-add-apple-provider.md): Add Apple Identity Provider
- [Add AzureAD Identity Provider](/apis/resources/admin/admin-service-add-azure-ad-provider.md): Add AzureAD Identity Provider
- [Set a Domain Settings for an Organization](/apis/resources/admin/admin-service-add-custom-domain-policy.md): Create the domain settings configured on a specific organization. It will overwrite the settings specified on the instance. Domain settings specify how ZITADEL should handle domains, in regards to usernames, emails and validation.
- [Add Custom Org IAM Policy](/apis/resources/admin/admin-service-add-custom-org-iam-policy.md): Use Get Domain Settings for Organization instead
- [Add HTTP Email provider](/apis/resources/admin/admin-service-add-email-provider-http.md): Add a new HTTP Email provider if nothing is set yet.
- [Add SMTP Email provider](/apis/resources/admin/admin-service-add-email-provider-smtp.md): Add a new SMTP Email provider if nothing is set yet.
- [Add Generic OAuth Identity Provider](/apis/resources/admin/admin-service-add-generic-o-auth-provider.md): Add Generic OAuth Identity Provider
- [Add Generic OIDC Identity Provider](/apis/resources/admin/admin-service-add-generic-oidc-provider.md): Add Generic OIDC Identity Provider
- [Add GitHub Enterprise Identity Provider](/apis/resources/admin/admin-service-add-git-hub-enterprise-server-provider.md): Add GitHub Enterprise Identity Provider
- [Add GitHub Identity Provider](/apis/resources/admin/admin-service-add-git-hub-provider.md): Add GitHub Identity Provider
- [Add GitLab Identity Provider](/apis/resources/admin/admin-service-add-git-lab-provider.md): Add GitLab Identity Provider
- [Add GitLab Selfhost Identity Provider](/apis/resources/admin/admin-service-add-git-lab-self-hosted-provider.md): Add GitLab Selfhost Identity Provider
- [Add Google Identity Provider](/apis/resources/admin/admin-service-add-google-provider.md): Add Google Identity Provider
- [Add IAM Member](/apis/resources/admin/admin-service-add-iam-member.md): Deprecated: use [CreateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-create-administrator.api.mdx) instead.
- [Add Linked Identity Provider](/apis/resources/admin/admin-service-add-idp-to-login-policy.md): Add/link a pre-configured identity provider to the login settings of the instance. This means that it will be shown to the users on the login page. It affects all organizations, without custom login settings.
- [Add an Instance Trusted Domain](/apis/resources/admin/admin-service-add-instance-trusted-domain.md): Deprecated: use [instance service v2 ListTrustedDomains](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-add-trusted-domain.api.mdx) instead.
- [Add JWT Identity Provider](/apis/resources/admin/admin-service-add-jwt-provider.md): Add JWT Identity Provider
- [Deprecated: Add JWT Identity Provider (IDP)](/apis/resources/admin/admin-service-add-jwtidp.md): Create a new identity provider configuration to enable your users to log in with social/enterprise login. JSON Web Token Identity Provider (JWT IDP) gives you the possibility to use an (existing) JWT as a federated identity. You have to provide an endpoint where ZITADEL can get the existing JWT token.
- [Add LDAP Identity Provider](/apis/resources/admin/admin-service-add-ldap-provider.md): Add LDAP Identity Provider
- [Add Multi-Factor (MFA)](/apis/resources/admin/admin-service-add-multi-factor-to-login-policy.md): Add a multi-factor (MFA) to the login settings of the instance. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multi-factor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [Add Notification Settings](/apis/resources/admin/admin-service-add-notification-policy.md): Add new notification settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Add OIDC Settings](/apis/resources/admin/admin-service-add-oidc-settings.md): Create new OIDC settings. The OIDC Settings define the lifetimes of the different tokens in OIDC. These settings are used for all organizations and clients.
- [Deprecated: Add OIDC Identity Provider (IDP)](/apis/resources/admin/admin-service-add-oidcidp.md): Create a new identity provider configuration to enable your users to log in with social/enterprise login. The provider has to be OIDC compliant.
- [Add SAML Identity Provider](/apis/resources/admin/admin-service-add-saml-provider.md): Add SAML Identity Provider
- [Add Second Factor (2FA)](/apis/resources/admin/admin-service-add-second-factor-to-login-policy.md): Add a new second factor (2FA) to the login settings of the instance. Users will have the possibility to authenticate with the configured factor afterward. It affects all organizations, without custom login settings. Authentication factors are used as an additional factor to add more security to your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called a second factor as it is used as an additional authentication after a password. In the UI we generalize this as multi-factor.
- [Add HTTP SMS Provider](/apis/resources/admin/admin-service-add-sms-provider-http.md): Configure a new SMS provider of the type HTTP. A provider has to be activated to be able to send notifications.
- [Add Twilio SMS Provider](/apis/resources/admin/admin-service-add-sms-provider-twilio.md): Configure a new SMS provider of the type Twilio. A provider has to be activated to be able to send notifications.
- [Deprecated: Add SMTP Configuration](/apis/resources/admin/admin-service-add-smtp-config.md): Add a new SMTP configuration if nothing is set yet.
- [Deactivate Email Provider](/apis/resources/admin/admin-service-deactivate-email-provider.md): Deactivate an Email provider. After deactivating the provider, the users will not be able to receive Email notifications from that provider anymore.
- [Deprecated: Deactivate Identity Provider (IDP)](/apis/resources/admin/admin-service-deactivate-idp.md): Sets the state of the provider to inactive. It can only be called for the provider with the state active. Users will not be able to log in with the given provider afterward. It might cause troubles if it is the only authentication method of the user.
- [Deactivate SMS Provider](/apis/resources/admin/admin-service-deactivate-sms-provider.md): Deactivate an SMS provider. After deactivating the provider, the users will not be able to receive SMS notifications from that provider anymore. If it was the last activated they will not get notifications at all
- [Deprecated: Deactivate SMTP Provider](/apis/resources/admin/admin-service-deactivate-smtp-config.md): Deactivate an SMTP provider. After deactivating the provider, the users will not be able to receive SMTP notifications from that provider anymore.
- [Delete Identity Provider](/apis/resources/admin/admin-service-delete-provider.md): Delete Identity Provider
- [Export Data](/apis/resources/admin/admin-service-export-data.md): Export data on an instance level to ZITADEL. It can be either directly exported in the response or you can point to a file on an S3 storage, where the data should be written.
- [Allowed Languages](/apis/resources/admin/admin-service-get-allowed-languages.md): If the languages are restricted, only those are returned. Else, all supported languages are returned.
- [Get Custom Domain Claimed Message Text](/apis/resources/admin/admin-service-get-custom-domain-claimed-message-text.md): Get the custom text of the domain claimed message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an organization claims a domain and a user of this domain exists in another organization.
- [Get Domain Settings for Organization](/apis/resources/admin/admin-service-get-custom-domain-policy.md): Get the domain settings configured on a specific organization. If the organization doesn't have a custom setting, the default will be returned. Domain settings specify how ZITADEL should handle domains, in regards to usernames, emails and validation.
- [Get Custom Init Message Text](/apis/resources/admin/admin-service-get-custom-init-message-text.md): Get the custom text of the initialize-user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user is created and has either no password or a non-verified email address.
- [Get Custom Invite User Message Text](/apis/resources/admin/admin-service-get-custom-invite-user-message-text.md): Get the custom text of the invite user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an invite code email is requested.
- [Get Custom Login Text](/apis/resources/admin/admin-service-get-custom-login-texts.md): Get the custom texts for the login and register UI of ZITADEL, which is overwritten on the instance as settings/database. The text will be shown to the users of all organizations, that do not have a custom text configured.
- [Get Org IAM Policy](/apis/resources/admin/admin-service-get-custom-org-iam-policy.md): Use GetDomain Settings for Organization instead
- [Get Custom Password Change Message Text](/apis/resources/admin/admin-service-get-custom-password-change-message-text.md): Get the custom text of the password-changed message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when the password of a user has been changed.
- [Get Custom Password Reset Message Text](/apis/resources/admin/admin-service-get-custom-password-reset-message-text.md): Get the custom text of the password reset message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user triggers the password forgot-request.
- [Get Custom Passwordless Registration Message Text](/apis/resources/admin/admin-service-get-custom-passwordless-registration-message-text.md): Get the custom text of the passwordless/passkey registration message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.
- [Get Custom Verify Email Message Text](/apis/resources/admin/admin-service-get-custom-verify-email-message-text.md): Get the custom text of the verify-email message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user adds a new non-verified email address.
- [Get Custom Verify SMS OTP Message Text](/apis/resources/admin/admin-service-get-custom-verify-email-otp-message-text.md): Get the custom text of the Email OTP message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Custom Verify Phone Message Text](/apis/resources/admin/admin-service-get-custom-verify-phone-message-text.md): Get the custom text of the verify-phone message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when a user adds a new non-verified phone number and a notification provider is configured.
- [Get Custom Verify SMS OTP Message Text](/apis/resources/admin/admin-service-get-custom-verify-smsotp-message-text.md): Get the custom text of the verify SMS OTP message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Default Domain Claimed Message Text](/apis/resources/admin/admin-service-get-default-domain-claimed-message-text.md): Get the default text of the domain claimed message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an organization claims a domain and a user of this domain exists in another organization.
- [Get Default Init Message Text](/apis/resources/admin/admin-service-get-default-init-message-text.md): Get the default text of the initialize-user message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user is created and has either no password or a non-verified email address.
- [Get Default Invite User Message Text](/apis/resources/admin/admin-service-get-default-invite-user-message-text.md): Get the default text of the invite user message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an invite code email is requested.
- [Get Default Languages](/apis/resources/admin/admin-service-get-default-language.md): Returns the language that is used as a fallback/default if the user has configured something that is not provided by ZITADEL.
- [Get Default Login Text](/apis/resources/admin/admin-service-get-default-login-texts.md): Get the default texts for the login and register UI of ZITADEL, which are stored as translation files in ZITADEL itself. The text will be shown to the users of all organizations, that do not have a custom text configured.
- [Get Default Organization](/apis/resources/admin/admin-service-get-default-org.md): Deprecated: use [organization service v2 ListOrganizations](apis/resources/org_service_v2/organization-service-list-organizations.api.mdx) instead.
- [Get Default Password Change Message Text](/apis/resources/admin/admin-service-get-default-password-change-message-text.md): Get the default text of the password-changed message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when the password of a user has been changed.
- [Get Default Password Reset Message Text](/apis/resources/admin/admin-service-get-default-password-reset-message-text.md): Get the default text of the password reset message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user triggers the password forgot-request.
- [Get Default Passwordless Registration Message Text](/apis/resources/admin/admin-service-get-default-passwordless-registration-message-text.md): Get the default text of the domain claimed message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.
- [Get Default Verify Email Message Text](/apis/resources/admin/admin-service-get-default-verify-email-message-text.md): Get the default text of the verify-email message/email that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user adds a new non-verified email address.
- [Get Default Verify SMS OTP Message Text](/apis/resources/admin/admin-service-get-default-verify-email-otp-message-text.md): Get the default text of the verify Email OTP message that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Default Verify Phone Message Text](/apis/resources/admin/admin-service-get-default-verify-phone-message-text.md): Get the default text of the verify-phone message that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when a user adds a new non-verified phone number and a notification provider is configured.
- [Get Default Verify SMS OTP Message Text](/apis/resources/admin/admin-service-get-default-verify-smsotp-message-text.md): Get the default text of the verify SMS OTP message that is stored as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Domain Settings](/apis/resources/admin/admin-service-get-domain-policy.md): Returns the domain settings configured as default on the instance. Domain settings specify how ZITADEL should handle domains, in regards to usernames, emails and validation..
- [Get active Email provider](/apis/resources/admin/admin-service-get-email-provider.md): Returns the active Email provider from the system. This is used to send E-Mails to the users.
- [Get Email provider by its id](/apis/resources/admin/admin-service-get-email-provider-by-id.md): Get a specific Email provider by its ID.
- [Get Notification Provider Filesystem](/apis/resources/admin/admin-service-get-file-system-notification-provider.md): Returns a filesystem notification provider if configured. This provider is only used for testing purposes. The notifications will be written to the filesystem.
- [Deprecated: Get Identity Provider (IDP) by ID](/apis/resources/admin/admin-service-get-idp-by-id.md): Returns an identity provider (social/enterprise login) by its ID e.g Google, AzureAD, etc.
- [Get Private Labeling/Branding Settings](/apis/resources/admin/admin-service-get-label-policy.md): Returns the currently active private labeling/branding configured on the instance level. The settings will trigger if the organization has not overwritten the settings or if no specific organization is called on the login UI. Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Get Password Lockout Settings](/apis/resources/admin/admin-service-get-lockout-policy.md): Returns the password lockout settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Get Notification Provider Log](/apis/resources/admin/admin-service-get-log-notification-provider.md): Returns a log notification provider if configured. This provider is only used for testing purposes. The notifications will be written to the logs.
- [Get Login Settings](/apis/resources/admin/admin-service-get-login-policy.md): Returns the login settings defined on the instance level. It will trigger for all organizations, that don't overwrite the settings. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Get My Instance](/apis/resources/admin/admin-service-get-my-instance.md): Deprecated: use [instance service v2 GetInstance](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-get-instance.api.mdx) instead.
- [Return Notification Settings](/apis/resources/admin/admin-service-get-notification-policy.md): Return the notification settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Get OIDC Settings](/apis/resources/admin/admin-service-get-oidc-settings.md): The OIDC Settings define the lifetimes of the different tokens in OIDC.
- [Get Organization By ID](/apis/resources/admin/admin-service-get-org-by-id.md): Deprecated: use [organization service v2 ListOrganizations](apis/resources/org_service_v2/organization-service-list-organizations.api.mdx) instead.
- [Get Org IAM Policy](/apis/resources/admin/admin-service-get-org-iam-policy.md): Use Get Domain Settings instead
- [Get Password Age Settings](/apis/resources/admin/admin-service-get-password-age-policy.md): Returns the password age settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Get Password Complexity Settings](/apis/resources/admin/admin-service-get-password-complexity-policy.md): Returns the password complexity settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify how a password should look (characters, length, etc.)
- [Get Preview Private Labeling/Branding Settings](/apis/resources/admin/admin-service-get-preview-label-policy.md): Returns the preview private labeling/branding configured on the instance level. The preview is used to show you how it will look like, and not activate it directly for your users. In the future, it should be possible to send a preview mail and have a look at the preview login. The settings will trigger if the organization has not overwritten the settings or if no specific organization is called on the login UI. Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Get Privacy Settings](/apis/resources/admin/admin-service-get-privacy-policy.md): Returns the privacy settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Get Identity Provider By ID](/apis/resources/admin/admin-service-get-provider-by-id.md): Get Identity Provider By ID
- [Get the current feature restrictions for the instance](/apis/resources/admin/admin-service-get-restrictions.md): Undefined values mean that the feature is not restricted. If restrictions were never set, the instances features are not restricted, all properties are undefined and the details object is empty.
- [Get Secret Generator](/apis/resources/admin/admin-service-get-secret-generator.md): Get a specific secret generator by its type (e.g PasswordResetCode). A generator defines how a secret should look when generating in ZITADEL.
- [Get Security Settings](/apis/resources/admin/admin-service-get-security-policy.md): Returns the security settings of the ZITADEL instance.
- [Get SMS Provider](/apis/resources/admin/admin-service-get-sms-provider.md): Get a specific SMS provider by its ID.
- [Deprecated: Get active SMTP Configuration](/apis/resources/admin/admin-service-get-smtp-config.md): Returns the active SMTP configuration from the system. This is used to send E-Mails to the users.
- [Deprecated: Get SMTP provider configuration by its id](/apis/resources/admin/admin-service-get-smtp-config-by-id.md): Get a specific SMTP provider configuration by its ID.
- [Supported Languages](/apis/resources/admin/admin-service-get-supported-languages.md): The supported/default languages of the system will be returned by the language abbreviation.
- [Healthz](/apis/resources/admin/admin-service-healthz.md): The health endpoint allows an external system to probe if ZITADEL system API is alive. Response as soon as ZITADLE is running.
- [Import Data](/apis/resources/admin/admin-service-import-data.md): Import data on an instance level to ZITADEL. It can be either directly in the request or you can point to a file on an S3 storage, from which the data should be loaded.
- [Is Organization Unique](/apis/resources/admin/admin-service-is-org-unique.md): Deprecated: use [organization service v2 ListOrganizations](apis/resources/org_service_v2/organization-service-list-organizations.api.mdx) instead.
- [List Aggregate Types](/apis/resources/admin/admin-service-list-aggregate-types.md): Returns a list of the possible aggregate types in ZITADEL. This is used to filter the aggregate types in the list events request.
- [List Email providers](/apis/resources/admin/admin-service-list-email-providers.md): Returns a list of Email providers.
- [Event types](/apis/resources/admin/admin-service-list-event-types.md): Returns a list of the possible event types in ZITADEL. This is used to filter the event types in the list events request.
- [Search Events](/apis/resources/admin/admin-service-list-events.md): Returns a list of the possible event types in ZITADEL. This is used to filter the event types in the list events request.
- [List Failed Events](/apis/resources/admin/admin-service-list-failed-events.md): Returns a list of events that could not be proceeded in the views/projections. Some events need several retries till they succeed. For example, if the SMTP-API wasn't able to send an email the first time.
- [List IAM Member Roles](/apis/resources/admin/admin-service-list-iam-member-roles.md): Members are users with permission to administrate ZITADEL on different levels. This request returns all roles possible for a ZITADEL member on the instance level.
- [List IAM Members](/apis/resources/admin/admin-service-list-iam-members.md): Deprecated: use [ListAdministrators](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.api.mdx) instead.
- [Deprecated: Search Identity Providers (IDP)](/apis/resources/admin/admin-service-list-id-ps.md): Returns a list of identity providers (social/enterprise login) configured on an instance level. e.g Google, AzureAD, etc.
- [List Instance Domains](/apis/resources/admin/admin-service-list-instance-domains.md): Deprecated: use [instance service v2 GetInstance](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-get-instance.api.mdx) instead.
- [List Instance Trusted Domains](/apis/resources/admin/admin-service-list-instance-trusted-domains.md): Deprecated: use [instance service v2 ListTrustedDomains](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-trusted-domains.api.mdx) instead.
- [List Linked Identity Providers](/apis/resources/admin/admin-service-list-login-policy-id-ps.md): Returns a list of identity providers that are linked in the login policy. This means, that they are configured for the instance and will be shown to the users. It affects all organizations, without custom login settings.
- [List Multi-factors (MFA)](/apis/resources/admin/admin-service-list-login-policy-multi-factors.md): Returns a list of multi-factors (MFA) configured on the login settings of the instance. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multifactor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [List Second Factors (2FA)](/apis/resources/admin/admin-service-list-login-policy-second-factors.md): Returns a list of second factors (2FA) configured on the login settings of the instance. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called the second factor as it is used after a password. In the UI we generalize it as multi-factor.
- [Search Milestones](/apis/resources/admin/admin-service-list-milestones.md): Returns a list of reached instance usage milestones.
- [Search Organizations](/apis/resources/admin/admin-service-list-orgs.md): Deprecated: use [organization service v2 ListOrganizations](apis/resources/org_service_v2/organization-service-list-organizations.api.mdx) instead.
- [List Identity Providers](/apis/resources/admin/admin-service-list-providers.md): Returns a list of identity providers (social/enterprise login) configured on an instance level. e.g Google, AzureAD, etc.
- [List Secret Generators](/apis/resources/admin/admin-service-list-secret-generators.md): Lists all the configured secret generators. The generators define how a secret should look when generated in ZITADEL. E.g Email verification code, phone verification code, etc.
- [List SMS Providers](/apis/resources/admin/admin-service-list-sms-providers.md): Returns a list of configured SMS providers.
- [Deprecated: List SMTP Configs](/apis/resources/admin/admin-service-list-smtp-configs.md): Returns a list of SMTP configurations.
- [List Views/Projections](/apis/resources/admin/admin-service-list-views.md): Returns all stored read models of ZITADEL. Views are used for search optimization and optimizing request latencies. They represent the delta of the event that happened on the objects
- [Migrate Generic OIDC Identity Provider](/apis/resources/admin/admin-service-migrate-generic-oidc-provider.md): Migrate Generic OIDC Identity Provider
- [Deprecated: Reactivate Identity Provider (IDP)](/apis/resources/admin/admin-service-reactivate-idp.md): Sets the state of the provider to active. It can only be called for providers with the state inactive. Users will not be able to log in again with the given provider.
- [Regenerate SAML Identity Provider Certificate](/apis/resources/admin/admin-service-regenerate-saml-provider-certificate.md): Regenerate SAML Identity Provider Certificate
- [Remove Email provider](/apis/resources/admin/admin-service-remove-email-provider.md): Remove the Email provider, be aware that the users will not get an E-Mail if no provider is set.
- [Remove Failed Events](/apis/resources/admin/admin-service-remove-failed-event.md): Removes the event from the failed evens view, but not from the change stream. This call is useful if the system was able to process the event after some retries. e.g. if the second try of sending an email was successful. the first try produced a failed event. You can find out if it worked on the `failure_count`
- [Remove IAM Member](/apis/resources/admin/admin-service-remove-iam-member.md): Deprecated: use [DeleteAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-delete-administrator.api.mdx) instead.
- [Deprecated: Remove Identity Provider (IDP)](/apis/resources/admin/admin-service-remove-idp.md): Removes the identity provider permanently. All links to the given IDP on users will be deleted as well. They will not be able to log in with the provider afterward. If it is their only authentication possibility it might cause problems.
- [Remove Linked Identity Provider](/apis/resources/admin/admin-service-remove-idp-from-login-policy.md): Remove an identity provider from the login settings of the instance. This means that it will not be shown to the users on the login page. It affects all organizations, without custom login settings.
- [Remove an Instance Trusted Domain](/apis/resources/admin/admin-service-remove-instance-trusted-domain.md): Deprecated: use [instance service v2 ListTrustedDomains](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-remove-trusted-domain.api.mdx) instead.
- [Remove Font](/apis/resources/admin/admin-service-remove-label-policy-font.md): Removes the font from the configured label policy/branding of the instance. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Icon Light](/apis/resources/admin/admin-service-remove-label-policy-icon.md): Removes the icon of the light theme from the configured label policy/branding of the instance. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Icon Dark](/apis/resources/admin/admin-service-remove-label-policy-icon-dark.md): Removes the icon of the dark theme from the configured label policy/branding of the instance. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Logo Light](/apis/resources/admin/admin-service-remove-label-policy-logo.md): Removes the logo of the light theme from the configured label policy/branding of the instance. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Logo Dark](/apis/resources/admin/admin-service-remove-label-policy-logo-dark.md): Removes the logo of the dark theme from the configured label policy/branding of the instance. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Multi-factor (MFA)](/apis/resources/admin/admin-service-remove-multi-factor-from-login-policy.md): Remove a multi-factor (MFA) from the login settings of the instance. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multi-factor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [Remove Organization](/apis/resources/admin/admin-service-remove-org.md): Deprecated: use [organization service v2 DeleteOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization.api.mdx) instead.
- [Remove Second Factor (2FA)](/apis/resources/admin/admin-service-remove-second-factor-from-login-policy.md): Remove a configured second factor (2FA) from the login settings of the instance. It affects all organizations, without custom login settings. Users will not be able to authenticate with the configured factor afterward. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called the second factor as it is used after a password. In the UI we generalize it as multi-factor.
- [Remove SMS Provider](/apis/resources/admin/admin-service-remove-sms-provider.md): Delete an SMS provider. If the provider was still active the users will not receive notifications from that provider anymore.
- [Deprecated: Remove SMTP Configuration](/apis/resources/admin/admin-service-remove-smtp-config.md): Remove the SMTP configuration, be aware that the users will not get an E-Mail if no SMTP is set.
- [Reset Custom Domain Claimed Message Text to Default](/apis/resources/admin/admin-service-reset-custom-domain-claimed-message-text-to-default.md): Removes the custom text of the domain claimed message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Domain Settings of Organization](/apis/resources/admin/admin-service-reset-custom-domain-policy-to-default.md): Resets the domain settings configured on a specific organization to the settings configured on the instance. Domain settings specify how ZITADEL should handle domains, in regards to usernames, emails and validation.
- [Reset Custom Init Message Text to Default](/apis/resources/admin/admin-service-reset-custom-init-message-text-to-default.md): Removes the custom text of the initialize-user message/email that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Invite User Message Text to Default](/apis/resources/admin/admin-service-reset-custom-invite-user-message-text-to-default.md): Removes the custom text of the invite user message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Login Text to Default](/apis/resources/admin/admin-service-reset-custom-login-text-to-default.md): Removes the custom texts for the login and register UI of ZITADEL, which is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be shown to the users of all organizations, that do not have a custom text configured.
- [Reset Domain Settings of Organization](/apis/resources/admin/admin-service-reset-custom-org-iam-policy-to-default.md): Use Reset Domain Settings of Organization instead
- [Reset Custom Password Changed Message Text to Default](/apis/resources/admin/admin-service-reset-custom-password-change-message-text-to-default.md): Removes the custom text of the password-changed message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Password Reset Message Text to Default](/apis/resources/admin/admin-service-reset-custom-password-reset-message-text-to-default.md): Removes the custom text of the password reset user message/email that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Passwordless Registration Message Text to Default](/apis/resources/admin/admin-service-reset-custom-passwordless-registration-message-text-to-default.md): Removes the custom text of the passwordless/passkey registration message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Verify Email Message Text to Default](/apis/resources/admin/admin-service-reset-custom-verify-email-message-text-to-default.md): Removes the custom text of the email verify message/email that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Verify SMS OTP Message Text to Default](/apis/resources/admin/admin-service-reset-custom-verify-email-otp-message-text-to-default.md): Removes the custom text of the Email OTP message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Verify Phone Message Text to Default](/apis/resources/admin/admin-service-reset-custom-verify-phone-message-text-to-default.md): Removes the custom text of the verify-phone message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Reset Custom Verify SMS OTP Message Text to Default](/apis/resources/admin/admin-service-reset-custom-verify-smsotp-message-text-to-default.md): Removes the custom text of the verify SMS OTP message that is overwritten on the instance and triggers the text from the translation files stored in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured.
- [Set Default Login Text](/apis/resources/admin/admin-service-set-custom-login-text.md): Set the custom texts for the login and register UI of ZITADEL, which is overwritten on the instance as settings/database. The text will be shown to the users of all organizations, that do not have a custom text configured.
- [Set Default Domain Claimed Message Text](/apis/resources/admin/admin-service-set-default-domain-claimed-message-text.md): Set the custom text of the domain claimed message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message/email is sent when an organization claims a domain and a user of this domain exists in another organization. The Following Variables can be used: {{.Domain}} {{.TempUsername}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Custom Init Message Text](/apis/resources/admin/admin-service-set-default-init-message-text.md): Set the custom text of the initialize-user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user is created and has either no password or a non-verified email address. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Invite User Message Text](/apis/resources/admin/admin-service-set-default-invite-user-message-text.md): Set the custom text of the invite user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an invite code email is requested. The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}} {{.ApplicationName}}
- [Set Default Languages](/apis/resources/admin/admin-service-set-default-language.md): Set the language that is used as a fallback/default if the user has configured something that is not provided by ZITADEL.
- [Set Default Organization](/apis/resources/admin/admin-service-set-default-org.md): Sets the default organization of the ZITADEL instance. If no specific organization is given on the register form, a user will be registered to the default organization.
- [Set Default Password Changed Message Text](/apis/resources/admin/admin-service-set-default-password-change-message-text.md): Set the custom text of the password-changed message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message/email is sent when the password of a user has been changed.  The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Custom Password Reset Message Text](/apis/resources/admin/admin-service-set-default-password-reset-message-text.md): Set the custom text of the password reset user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user triggers the password forgot-request. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Passwordless Registration Message Text](/apis/resources/admin/admin-service-set-default-passwordless-registration-message-text.md): Set the custom text of the passwordless/passkey registration message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message/email is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.  The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Verify Email Message Text](/apis/resources/admin/admin-service-set-default-verify-email-message-text.md): Set the custom text of the verify email user message/email that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The email is sent when a user adds a new nonverified email address. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Verify SMS OTP Reset Message Text](/apis/resources/admin/admin-service-set-default-verify-email-otp-message-text.md): Set the custom text of the Email OTP user message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Verify Phone Reset Message Text](/apis/resources/admin/admin-service-set-default-verify-phone-message-text.md): Set the custom text of the verify-phone user message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when a user adds a new non-verified phone number and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Verify SMS OTP Reset Message Text](/apis/resources/admin/admin-service-set-default-verify-smsotp-message-text.md): Set the custom text of the verify SMS OTP user message that is overwritten on the instance as settings/database. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an SMS One-time password should be verified and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Restrict the instances features](/apis/resources/admin/admin-service-set-restrictions.md): Undefined values don't change the current restriction. Zero values remove the current restriction.
- [Set Security Settings](/apis/resources/admin/admin-service-set-security-policy.md): Set the security settings of the ZITADEL instance.
- [Setup Organization](/apis/resources/admin/admin-service-set-up-org.md): Deprecated: use [organization service v2 CreateOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-create-organization.api.mdx) instead.
- [Test SMTP Email Provider](/apis/resources/admin/admin-service-test-email-provider-smtp.md): Test an SMTP Email provider. After testing the provider, the users will receive information about the test results.
- [Test SMTP Email Provider](/apis/resources/admin/admin-service-test-email-provider-smtp-by-id.md): Test an SMTP Email provider identified by its ID. After testing the provider, the users will receive information about the test results.
- [Deprecated: Test SMTP Provider](/apis/resources/admin/admin-service-test-smtp-config.md): Test an SMTP provider. After testing the provider, the users will receive information about the test results.
- [Deprecated: Test SMTP Provider](/apis/resources/admin/admin-service-test-smtp-config-by-id.md): Test an SMTP provider identified by its ID. After testing the provider, the users will receive information about the test results.
- [Update Apple Identity Provider](/apis/resources/admin/admin-service-update-apple-provider.md): Update Apple Identity Provider
- [Update AzureAD Identity Provider](/apis/resources/admin/admin-service-update-azure-ad-provider.md): Update AzureAD Identity Provider
- [Update Domain Settings for Organization](/apis/resources/admin/admin-service-update-custom-domain-policy.md): Update the domain settings configured on a specific organization. It will overwrite the settings specified on the instance. Domain settings specify how ZITADEL should handle domains, in regards to usernames, emails and validation.
- [Update Custom Org IAM Policy](/apis/resources/admin/admin-service-update-custom-org-iam-policy.md): Use Get Domain Settings for Organization instead
- [Update Domain Settings](/apis/resources/admin/admin-service-update-domain-policy.md): Update the domain settings configured as default on the instance. Domain settings specify how ZITADEL should handle domains, usernames, emails and validation. It affects all organizations that do not have overwritten settings.
- [Update HTTP Email provider](/apis/resources/admin/admin-service-update-email-provider-http.md): Update the HTTP Email provider, be aware that this will be activated as soon as it is saved. So the users will get notifications from the newly configured HTTP.
- [Update SMTP Email provider](/apis/resources/admin/admin-service-update-email-provider-smtp.md): Update the SMTP Email provider, be aware that this will be activated as soon as it is saved. So the users will get notifications from the newly configured SMTP.
- [Update SMTP Password](/apis/resources/admin/admin-service-update-email-provider-smtp-password.md): Update the SMTP password that is used for the host, be aware that this will be activated as soon as it is saved. So the users will get notifications from the newly configured SMTP.
- [Update Generic OAuth Identity Provider](/apis/resources/admin/admin-service-update-generic-o-auth-provider.md): Update Generic OAuth Identity Provider
- [Update Generic OIDC Identity Provider](/apis/resources/admin/admin-service-update-generic-oidc-provider.md): Update Generic OIDC Identity Provider
- [Update GitHub Enterprise Identity Provider](/apis/resources/admin/admin-service-update-git-hub-enterprise-server-provider.md): Update GitHub Enterprise Identity Provider
- [Update GitHub Identity Provider](/apis/resources/admin/admin-service-update-git-hub-provider.md): Update GitHub Identity Provider
- [Update GitLab Identity Provider](/apis/resources/admin/admin-service-update-git-lab-provider.md): Update GitLab Identity Provider
- [Update GitLab Selfhost Identity Provider](/apis/resources/admin/admin-service-update-git-lab-self-hosted-provider.md): Update GitLab Selfhost Identity Provider
- [Update Google Identity Provider](/apis/resources/admin/admin-service-update-google-provider.md): Update Google Identity Provider
- [Update IAM Member](/apis/resources/admin/admin-service-update-iam-member.md): Deprecated: use [UpdateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-update-administrator.api.mdx) instead.
- [Deprecated: Update Identity Provider (IDP)](/apis/resources/admin/admin-service-update-idp.md): Update an existing IDP. All fields are updated. If you do not send a value in a field, it will be empty afterward.
- [Deprecated: Update JWT Identity Provider (IDP)](/apis/resources/admin/admin-service-update-idpjwt-config.md): Update the JWT-specific configuration of an identity provider. All fields will be updated. If a field has no value it will be empty afterward.
- [Deprecated: Update OIDC Identity Provider (IDP)](/apis/resources/admin/admin-service-update-idpoidc-config.md): Update the OIDC-specific configuration of an identity provider. All fields will be updated. If a field has no value it will be empty afterward.
- [Update JWT Identity Provider](/apis/resources/admin/admin-service-update-jwt-provider.md): Update JWT Identity Provider
- [Update Labeling/Branding Settings](/apis/resources/admin/admin-service-update-label-policy.md): Update the preview private labeling/branding configured on the instance level. It affects all organizations, that don't overwrite the settings. The preview is used to show you how it will look like, make sure to activate it as soon as you are happy with the configuration. Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Update LDAP Identity Provider](/apis/resources/admin/admin-service-update-ldap-provider.md): Update LDAP Identity Provider
- [Update Password Lockout Settings](/apis/resources/admin/admin-service-update-lockout-policy.md): Update the password lockout settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Update Login Settings](/apis/resources/admin/admin-service-update-login-policy.md): Update the default login settings defined on the instance level. It will trigger for all organizations, that don't overwrite the settings. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Update Notification Settings](/apis/resources/admin/admin-service-update-notification-policy.md): Update the notification settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Add OIDC Settings](/apis/resources/admin/admin-service-update-oidc-settings.md): Update existing OIDC settings. The OIDC Settings define the lifetimes of the different tokens in OIDC. These settings are used for all organizations and clients.
- [Update Org IAM Policy](/apis/resources/admin/admin-service-update-org-iam-policy.md): Use Update Domain Settings instead
- [Update Password Age Settings](/apis/resources/admin/admin-service-update-password-age-policy.md): Updates the default password complexity settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Update Password Complexity Settings](/apis/resources/admin/admin-service-update-password-complexity-policy.md): Updates the default password complexity settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify how a password should look (characters, length, etc.)
- [Update Privacy Settings](/apis/resources/admin/admin-service-update-privacy-policy.md): Update the privacy settings configured on the instance. It affects all organizations, that do not have a custom setting configured. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings. Variable {{.Lang}} can be set to have different links based on the language.
- [Update SAML Identity Provider](/apis/resources/admin/admin-service-update-saml-provider.md): Update SAML Identity Provider
- [Update Secret Generator](/apis/resources/admin/admin-service-update-secret-generator.md): Change a specific secret generator configuration by its type (e.g PasswordResetCode). A generator defines how a secret should look when generating in ZITADEL.
- [Update HTTP SMS Provider](/apis/resources/admin/admin-service-update-sms-provider-http.md): Change the configuration of an SMS provider of the type HTTP. A provider has to be activated to be able to send notifications.
- [Update Twilio SMS Provider](/apis/resources/admin/admin-service-update-sms-provider-twilio.md): Change the configuration of an SMS provider of the type Twilio.  A provider has to be activated to be able to send notifications.
- [Update Twilio SMS Provider Token](/apis/resources/admin/admin-service-update-sms-provider-twilio-token.md): Change the token of the SMS provider of the type Twilio.
- [Deprecated: Update SMTP Configuration](/apis/resources/admin/admin-service-update-smtp-config.md): Update the SMTP configuration, be aware that this will be activated as soon as it is saved. So the users will get notifications from the newly configured SMTP.
- [Deprecated: Update SMTP Password](/apis/resources/admin/admin-service-update-smtp-config-password.md): Update the SMTP password that is used for the host, be aware that this will be activated as soon as it is saved. So the users will get notifications from the newly configured SMTP.
- [Administration API aka Admin](/apis/resources/admin/administration-api-aka-admin.md): This API is intended to configure and manage the IAM instance itself.
- [Application Service API (Beta)](/apis/resources/application_service_v2.md): This API lets you manage Zitadel applications (API, SAML, OIDC).

The API offers generic endpoints that work for all app types (API, SAML, OIDC), 
This API is in beta state. It can AND will continue breaking until a stable version is released.

- [zitadel.app.v2beta](/apis/resources/application_service_v2/zitadel-app-v-2-beta.md)
- [CreateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application.md): Create Application
- [CreateApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application-key.md): Create Application Key
- [DeactivateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-deactivate-application.md): Deactivate Application
- [DeleteApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-delete-application.md): Delete Application
- [DeleteApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-delete-application-key.md): Delete Application Key
- [GetApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-get-application.md): Get Application
- [GetApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-get-application-key.md): Get Application Key
- [ListApplicationKeys](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-list-application-keys.md): List Application Keys
- [ListApplications](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-list-applications.md): List Applications
- [ReactivateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-reactivate-application.md): Reactivate Application
- [RegenerateClientSecret](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-regenerate-client-secret.md): Regenerate Client Secret
- [UpdateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-update-application.md): Update Application
- [Auth API](/apis/resources/auth.md): The authentication API (aka Auth API) is used for all operations on the currently logged in user. The user id is taken from the sub claim in the token.
- [Add One-Time Password (OTP)](/apis/resources/auth/auth-service-add-my-auth-factor-otp.md): Add a new One-Time Password (OTP) factor to the authenticated user. OTP is an authenticator app like Google/Microsoft Authenticator, Authy, etc. Only one OTP per user is allowed. After adding a new OTP it has to be verified.
- [Add One-Time Password (OTP) Email](/apis/resources/auth/auth-service-add-my-auth-factor-otp-email.md): Add a new One-Time Password (OTP) Email factor to the authenticated user. OTP Email will enable the user to verify a OTP with the latest verified email. The email has to be verified to add the second factor.
- [Add One-Time Password (OTP) SMS](/apis/resources/auth/auth-service-add-my-auth-factor-otpsms.md): Add a new One-Time Password (OTP) SMS factor to the authenticated user. OTP SMS will enable the user to verify a OTP with the latest verified phone number. The phone number has to be verified to add the second factor.
- [Add Universal Second Factor (U2F)](/apis/resources/auth/auth-service-add-my-auth-factor-u-2-f.md): Add a new Universal Second Factor (U2F) to the authenticated user. U2F is a device-dependent authentication like FingerScan, FaceID, WindowHello, etc. The factor has to be verified after adding. Multiple factors can be added.
- [Add passkey](/apis/resources/auth/auth-service-add-my-passwordless.md): Add a new passkey authentication method to the authenticated user. Like FingerPrint, FaceID, WindowsHello, HardwareToken, etc. Multiple passkeys can be configured.
- [Add passkey link](/apis/resources/auth/auth-service-add-my-passwordless-link.md): Adds a new passkey authenticator link to the authenticated user and returns it in the response. This link enables the user to register a new device if current passkey devices are all platform authenticators. e.g. User has already registered Windows Hello and wants to register FaceID on the iPhone
- [Get My Email](/apis/resources/auth/auth-service-get-my-email.md): Returns the email address and the verified flag of the authenticated user.
- [Get Label Policy](/apis/resources/auth/auth-service-get-my-label-policy.md): Returns the label settings that should be used for the authenticated user. It is set either on an instance or organization level. This policy defines the branding, colors, fonts, images, etc.
- [Get Login Policy](/apis/resources/auth/auth-service-get-my-login-policy.md): Returns the login settings that should be used for the authenticated user. It is set either on an instance or organization level. This policy defines what possibilities the user has to authenticate and to use in the login, e.g social logins, MFA, passkey, etc.
- [Get My User Metadata By Key](/apis/resources/auth/auth-service-get-my-metadata.md): Returns a metadata value by a specific key of the authenticated user. Metadata is a key value list with additional information needed on the user.
- [Get Passwordcomplexity Policy](/apis/resources/auth/auth-service-get-my-password-complexity-policy.md): Returns the password complexity settings that should be used for the authenticated user. It is set either on an instance or organization level. This policy defines how the password should look.
- [Get My Phone](/apis/resources/auth/auth-service-get-my-phone.md): Returns the phone number of the authenticated user and if the state is verified or not.
- [Get Privacy Policy](/apis/resources/auth/auth-service-get-my-privacy-policy.md): Returns the privacy settings that should be used for the authenticated user. It is set either on an instance or organization level. This policy defines the TOS and terms of service links.
- [Get My Profile](/apis/resources/auth/auth-service-get-my-profile.md): Returns the profile information of the authenticated user, this includes given name, family name, etc.
- [Get my user](/apis/resources/auth/auth-service-get-my-user.md): Returns the full user object of the authenticated user including the profile, email, phone, etc
- [Supported Languages](/apis/resources/auth/auth-service-get-supported-languages.md): Use GetSupportedLanguages on the admin service instead.
- [Healthz](/apis/resources/auth/auth-service-healthz.md): The health endpoint allows an external system to probe if ZITADEL authentication API is alive
- [List Authentication Factors](/apis/resources/auth/auth-service-list-my-auth-factors.md): Returns a list of possible authentication factors, multi-factor (MFA), second factor (2FA)
- [List Social Logins](/apis/resources/auth/auth-service-list-my-linked-id-ps.md): Returns a list of all linked identity providers/social logins of the user. (e. Google, Microsoft, AzureAD, etc.)
- [List My ZITADEL Manager Roles](/apis/resources/auth/auth-service-list-my-memberships.md): Show all the management roles my user has in ZITADEL (ZITADEL Manager).
- [Get My User Metadata](/apis/resources/auth/auth-service-list-my-metadata.md): Returns a list of metadata of the authenticated user. Metadata is a key value list with additional information needed on the user.
- [List Passkey](/apis/resources/auth/auth-service-list-my-passwordless.md): Get the list of configured passkey authentication methods. Like FingerPrint, FaceID, WindowsHello, HardwareToken, etc.
- [List My Organizations](/apis/resources/auth/auth-service-list-my-project-orgs.md): Returns a list of the organizations where the authenticated user has any authorizations/user grants. The request is made in the context of the requested project. This request can be used in multi-tenancy applications to show the user a tenant switcher.
- [List My Project Roles](/apis/resources/auth/auth-service-list-my-project-permissions.md): Deprecated: [List authorizations](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-list-authorizations.api.mdx) and pass the user ID filter with your users ID and the project ID filter to search for your authorizations on a granted and an owned project.
- [Get Refresh Tokens](/apis/resources/auth/auth-service-list-my-refresh-tokens.md): Returns the list of refresh tokens of the authenticated user.
- [Get My User History](/apis/resources/auth/auth-service-list-my-user-changes.md): Returns a list of changes/events that have happened on the authenticated user. It's the history of the user. Make sure to send a limit.
- [List My Authorizations / User Grants](/apis/resources/auth/auth-service-list-my-user-grants.md): Deprecated: [List authorizations](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-list-authorizations.api.mdx) and pass the user ID filter with your users ID to search for your authorizations on granted and owned projects.
- [Get My User Sessions](/apis/resources/auth/auth-service-list-my-user-sessions.md): Returns a list of a user session for the user agent of the authenticated user. This can be used to switch accounts in the current application.
- [List My ZITADEL Permissions](/apis/resources/auth/auth-service-list-my-zitadel-permissions.md): Returns a list of permissions the authenticated user has in ZITADEL based on the manager roles the user has. (e.g: ORG_OWNER = org.read, org.write, ...).
- [Remove One-Time Password (OTP)](/apis/resources/auth/auth-service-remove-my-auth-factor-otp.md): Remove the configured One-Time Password (OTP) factor of the authenticated user. OTP is an authenticator app like Google/Microsoft Authenticator, Authy, etc. As only one OTP per user is allowed, the user will not have OTP as a second factor afterward.
- [Remove One-Time Password (OTP) Email](/apis/resources/auth/auth-service-remove-my-auth-factor-otp-email.md): Remove the configured One-Time Password (OTP) Email factor of the authenticated user. As only one OTP Email per user is allowed, the user will not have OTP Email as a second factor afterward.
- [Remove One-Time Password (OTP) SMS](/apis/resources/auth/auth-service-remove-my-auth-factor-otpsms.md): Remove the configured One-Time Password (OTP) SMS factor of the authenticated user. As only one OTP SMS per user is allowed, the user will not have OTP SMS as a second factor afterward.
- [Remove Universal Second Factor (U2F)](/apis/resources/auth/auth-service-remove-my-auth-factor-u-2-f.md): Remove a specific Universal Second Factor (U2F) from the authenticated user by sending the id.
- [Remove My Avatar](/apis/resources/auth/auth-service-remove-my-avatar.md): Remove the avatar of the authenticated user. If no avatar is set a shortcut of the name of the user will be presented.
- [Remove Social Login](/apis/resources/auth/auth-service-remove-my-linked-idp.md): Remove one of the linked social logins/identity providers of the authenticated user (e.g. Google, Microsoft, AzureAD, etc.). The user will not be able to log in with the given provider afterward. Make sure the user does have other possibilities to authenticate.
- [Remove passkey](/apis/resources/auth/auth-service-remove-my-passwordless.md): Remove a passkey configuration from the authenticated user. The user will not be able to log in with that configuration afterward. Make sure the user has other possibilities to log in.
- [Remove Phone Number](/apis/resources/auth/auth-service-remove-my-phone.md): The phone number of the authenticated user will be removed.
- [Delete my user](/apis/resources/auth/auth-service-remove-my-user.md): Deletes the currently authenticated user. All authentication tokens will be removed and the user will not be able to make any request.
- [Resend Email Verification](/apis/resources/auth/auth-service-resend-my-email-verification.md): A new email will be sent to the last set email address of the authenticated user, the last set email address will be used.
- [Resend Phone verification](/apis/resources/auth/auth-service-resend-my-phone-verification.md): Resends the verification notification to the last given phone number of the authenticated user. The notification provider has to be configured.
- [Revoke All Refresh Tokens](/apis/resources/auth/auth-service-revoke-all-my-refresh-tokens.md): Revokes all refresh tokens of the authenticated user.
- [Revoke Refresh Tokens](/apis/resources/auth/auth-service-revoke-my-refresh-token.md): Revokes a single refresh token of the authorized user by its (token) id.
- [Send passkey link](/apis/resources/auth/auth-service-send-my-passwordless-link.md): Adds a new passkey authenticator link to the authenticated user and sends it to the registered email address. This link enables the user to register a new device if current passkey devices are all platform authenticators. e.g. User has already registered Windows Hello and wants to register FaceID on the iPhone
- [Update My Email](/apis/resources/auth/auth-service-set-my-email.md): Change the email address of the authenticated user. A verification email will be sent to the given email address.
- [Set My Phone](/apis/resources/auth/auth-service-set-my-phone.md): Sets a new phone number to the authenticated user. If a notification provider is configured the user will receive an sms with a code to authenticate the number.
- [Change Password](/apis/resources/auth/auth-service-update-my-password.md): Changes the password of the authenticated user. Make sure the password follows the password complexity policy.
- [Update My Profile](/apis/resources/auth/auth-service-update-my-profile.md): Change the profile information of the authenticated user. This includes information like given name, family name, language, etc.
- [Change My Username](/apis/resources/auth/auth-service-update-my-user-name.md): Changes the username of the authenticated user. The user has to log in with the newly created username afterward.
- [Verify One-Time Password (OTP)](/apis/resources/auth/auth-service-verify-my-auth-factor-otp.md): Verify the last added One-Time Password (OTP) factor of the authenticated user. OTP is an authenticator app like Google/Microsoft Authenticator, Authy, etc. Only one OTP per user is allowed.
- [Add Universal Second Factor (U2F)](/apis/resources/auth/auth-service-verify-my-auth-factor-u-2-f.md): Verify the last added new Universal Second Factor (U2F) to the authenticated user.
- [Verify My Email](/apis/resources/auth/auth-service-verify-my-email.md): Verify the email address of the authenticated user with the code that has been sent. State of the email address is verified after.
- [Verify passkey](/apis/resources/auth/auth-service-verify-my-passwordless.md): Verifies the last added passkey configuration of the authenticated user.
- [Verify Phone](/apis/resources/auth/auth-service-verify-my-phone.md): Verify the phone number of the authenticated user, with the code that has been sent to the number. State of the phone number is verified after.
- [Authentication API aka Auth](/apis/resources/auth/authentication-api-aka-auth.md): The authentication API is used for all operations on the currently authenticated user.
- [Authorization Service API (Beta)](/apis/resources/authorization_service_v2.md): AuthorizationService provides methods to manage authorizations for users within your projects and applications.

For managing permissions and roles for ZITADEL internal resources, like organizations, projects,
users, etc., please use the InternalPermissionService.
This API is in beta state. It can AND will continue breaking until a stable version is released.

- [zitadel.authorization.v2beta](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta.md)
- [ActivateAuthorization](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-activate-authorization.md): Activate Authorization
- [CreateAuthorization](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-create-authorization.md): Create Authorization
- [DeactivateAuthorization](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-deactivate-authorization.md): Deactivate Authorization
- [DeleteAuthorization](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-delete-authorization.md): Delete Authorization
- [ListAuthorizations](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-list-authorizations.md): List Authorizations
- [UpdateAuthorization](/apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-update-authorization.md): Update Authorization
- [Feature Service API](/apis/resources/feature_service_v2.md): This API is intended to manage features for ZITADEL. Feature settings that are available on multiple "levels", such as instance and organization. The higher level instance acts as a default for the lower level. When a feature is set on multiple levels, the lower level takes precedence. Features can be experimental where ZITADEL will assume a sane default, such as disabled. When over time confidence in such a feature grows, ZITADEL can default to enabling the feature. As a final step we might choose to always enable a feature and remove the setting from this API, reserving the proto field number. Such removal is not considered a breaking change. Setting a removed field will effectively result in a no-op.

- [Feature Service](/apis/resources/feature_service_v2/feature-service.md): This API is intended to manage features for ZITADEL. Feature settings that are available on multiple 'levels', such as instance and organization. The higher level instance acts as a default for the lower level. When a feature is set on multiple levels, the lower level takes precedence. Features can be experimental where ZITADEL will assume a sane default, such as disabled. When over time confidence in such a feature grows, ZITADEL can default to enabling the feature. As a final step we might choose to always enable a feature and remove the setting from this API, reserving the proto field number. Such removal is not considered a breaking change. Setting a removed field will effectively result in a no-op.
- [Get Instance Features](/apis/resources/feature_service_v2/feature-service-get-instance-features.md): Returns all configured features for an instance. Unset fields mean the feature is the current system default.
- [Get Organization Features](/apis/resources/feature_service_v2/feature-service-get-organization-features.md): Returns all configured features for an organization. Unset fields mean the feature is the current instance default.
- [Get System Features](/apis/resources/feature_service_v2/feature-service-get-system-features.md): Returns all configured features for the system. Unset fields mean the feature is the current system default.
- [Get User Features](/apis/resources/feature_service_v2/feature-service-get-user-features.md): Returns all configured features for a user. Unset fields mean the feature is the current organization default.
- [Reset Instance Features](/apis/resources/feature_service_v2/feature-service-reset-instance-features.md): Deletes ALL configured features for an instance, reverting the behaviors to system defaults.
- [Reset Organization Features](/apis/resources/feature_service_v2/feature-service-reset-organization-features.md): Deletes ALL configured features for an organization, reverting the behaviors to instance defaults.
- [Reset System Features](/apis/resources/feature_service_v2/feature-service-reset-system-features.md): Deletes ALL configured features for the system, reverting the behaviors to system defaults.
- [Reset User Features](/apis/resources/feature_service_v2/feature-service-reset-user-features.md): Deletes ALL configured features for a user, reverting the behaviors to organization defaults.
- [Set Instance Features](/apis/resources/feature_service_v2/feature-service-set-instance-features.md): Configure and set features that apply to a complete instance. Only fields present in the request are set or unset.
- [Set Organization Features](/apis/resources/feature_service_v2/feature-service-set-organization-features.md): Configure and set features that apply to a complete instance. Only fields present in the request are set or unset.
- [Set System Features](/apis/resources/feature_service_v2/feature-service-set-system-features.md): Configure and set features that apply to the complete system. Only fields present in the request are set or unset.
- [Set User Features](/apis/resources/feature_service_v2/feature-service-set-user-features.md): Configure and set features that apply to an user. Only fields present in the request are set or unset.
- [Identity Provider Service API](/apis/resources/idp_service_v2.md): This API is intended to manage identity providers (IdPs) for ZITADEL.

- [Identity Provider Service](/apis/resources/idp_service_v2/identity-provider-service.md): This API is intended to manage identity providers (IdPs) in a ZITADEL instance.
- [Get identity provider (IdP) by ID](/apis/resources/idp_service_v2/identity-provider-service-get-idp-by-id.md): Returns an identity provider (social/enterprise login) by its ID, which can be of the type Google, AzureAD, etc.
- [Instance Service API (Beta)](/apis/resources/instance_service_v2.md): This API is intended to manage instances, custom domains and trusted domains in ZITADEL.

This service is in beta state. It can AND will continue breaking until a stable version is released.

This v2 of the API provides the same functionalities as the v1, but organised on a per resource basis.
The whole functionality related to domains (custom and trusted) has been moved under this instance API.
- [zitadel.instance.v2beta](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta.md)
- [AddCustomDomain](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-add-custom-domain.md): Add Custom Domain
- [AddTrustedDomain](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-add-trusted-domain.md): Add Trusted Domain
- [DeleteInstance](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-delete-instance.md): Delete Instance
- [GetInstance](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-get-instance.md): Get Instance
- [ListCustomDomains](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-custom-domains.md): List Custom Domains
- [ListInstances](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-instances.md): List Instances
- [ListTrustedDomains](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-trusted-domains.md): List Trusted Domains
- [RemoveCustomDomain](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-remove-custom-domain.md): Remove Custom Domain
- [RemoveTrustedDomain](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-remove-trusted-domain.md): Remove Trusted Domain
- [UpdateInstance](/apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-update-instance.md): Update Instance
- [Internal Permission Service API (Beta)](/apis/resources/internal_permission_service_v2.md): This API is intended to manage internal permissions in ZITADEL.

This API is in beta state. It can AND will continue breaking until a stable version is released.

- [zitadel.internal_permission.v2beta](/apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta.md)
- [CreateAdministrator](/apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-create-administrator.md): CreateAdministrator grants a administrator role to a user for a specific resource.
- [DeleteAdministrator](/apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-delete-administrator.md): DeleteAdministrator revokes a administrator role from a user.
- [ListAdministrators](/apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.md): ListAdministrators returns all administrators and its roles matching the request and necessary permissions.
- [UpdateAdministrator](/apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-update-administrator.md): UpdateAdministrator updates the specific administrator role.
- [Management API](/apis/resources/mgmt.md): The management API is as the name states the interface where systems can mutate IAM objects like, organizations, projects, clients, users and so on if they have the necessary access rights. To identify the current organization you can send a header x-zitadel-orgid or if no header is set, the organization of the authenticated user is set.
- [Management API](/apis/resources/mgmt/management-api.md): The management API is as the name states the interface where systems can mutate IAM objects like organizations, projects, clients, users and so on if they have the necessary access rights.
- [Activate Labeling/Branding Settings](/apis/resources/mgmt/management-service-activate-custom-label-policy.md): Activates the preview private labeling/branding configured on the organization. It will be shown to the users afterward. The settings will trigger if the organization has been identified (organization scope, user). Defines what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Create Application (API)](/apis/resources/mgmt/management-service-add-api-app.md): Deprecated: Use [CreateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application.api.mdx) instead to create an API application
- [Create Application Key](/apis/resources/mgmt/management-service-add-app-key.md): Deprecated: Use [CreateApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application-key.api.mdx) instead to create an application key.
- [Add Apple Identity Provider](/apis/resources/mgmt/management-service-add-apple-provider.md): Add Apple Identity Provider
- [Add Azure AD Identity Provider](/apis/resources/mgmt/management-service-add-azure-ad-provider.md): Add Azure AD Identity Provider
- [Create Labeling/Branding Settings](/apis/resources/mgmt/management-service-add-custom-label-policy.md): Create the private labeling/branding configured on the organization. Make sure to activate it so it will be shown to the users. The settings will trigger if the organization has been identified (organization scope, user). Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Add Password Lockout Settings](/apis/resources/mgmt/management-service-add-custom-lockout-policy.md): Add new password lockout settings on the organization level. This will overwrite the settings set on the instance for this organization. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Create Custom Login Settings](/apis/resources/mgmt/management-service-add-custom-login-policy.md): Create login settings for the organization and therefore overwrite the default settings for this organization. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Add Notification Settings](/apis/resources/mgmt/management-service-add-custom-notification-policy.md): Create notification settings for the organization and therefore overwrite the default settings for this organization. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Add Password Age Settings](/apis/resources/mgmt/management-service-add-custom-password-age-policy.md): Create new password age settings for the organization. This will overwrite the settings of the instance for this organization. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Create Password Complexity Settings](/apis/resources/mgmt/management-service-add-custom-password-complexity-policy.md): Create new password complexity settings for the organization. This will overwrite the settings of the instance for this organization. The settings specify how a password should look (characters, length, etc.)
- [Add Privacy Settings](/apis/resources/mgmt/management-service-add-custom-privacy-policy.md): Add a custom privacy policy for the organization. The configuration of the instance will be overwritten. Variable {{.Lang}} can be set to have different links based on the language. Make sure to identify which settings should be triggered by sending the organization scope. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Add Generic OAuth Identity Provider](/apis/resources/mgmt/management-service-add-generic-o-auth-provider.md): Add Generic OAuth Identity Provider
- [Add Generic OIDC Identity Provider](/apis/resources/mgmt/management-service-add-generic-oidc-provider.md): Add Generic OIDC Identity Provider
- [Add GitHub Enterprise Identity Provider](/apis/resources/mgmt/management-service-add-git-hub-enterprise-server-provider.md): Add GitHub Enterprise Identity Provider
- [Add GitHub Identity Provider](/apis/resources/mgmt/management-service-add-git-hub-provider.md): Add GitHub Identity Provider
- [Add GitLab Identity Provider](/apis/resources/mgmt/management-service-add-git-lab-provider.md): Add GitLab Identity Provider
- [Add GitLab Selfhosted Identity Provider](/apis/resources/mgmt/management-service-add-git-lab-self-hosted-provider.md): Add GitLab Selfhosted Identity Provider
- [Add Google Identity Provider](/apis/resources/mgmt/management-service-add-google-provider.md): Add Google Identity Provider
- [Create User (Human)](/apis/resources/mgmt/management-service-add-human-user.md): Deprecated: use [user service v2 CreateUser](apis/resources/user_service_v2/user-service-create-user.api.mdx) instead.
- [Add Linked Identity Provider](/apis/resources/mgmt/management-service-add-idp-to-login-policy.md): Add/link a pre-configured identity provider to the login settings of the organization. This means that it will be shown to the users on the login page. They will be shown if the organization is identified (per scope or user).
- [Add JWT Identity Provider](/apis/resources/mgmt/management-service-add-jwt-provider.md): Add JWT Identity Provider
- [Add LDAP Identity Provider](/apis/resources/mgmt/management-service-add-ldap-provider.md): Add LDAP Identity Provider
- [Create Key for machine user](/apis/resources/mgmt/management-service-add-machine-key.md): Deprecated: use [user service v2 AddKey](apis/resources/user_service_v2/user-service-add-key.api.mdx) instead.
- [Create User (Machine)](/apis/resources/mgmt/management-service-add-machine-user.md): Deprecated: use [user service v2 CreateUser](apis/resources/user_service_v2/user-service-create-user.api.mdx) instead.
- [Add Multi-Factor (MFA)](/apis/resources/mgmt/management-service-add-multi-factor-to-login-policy.md): Add a multi-factor (MFA) to the login settings of the organization. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multi-factor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [Create Application (OIDC)](/apis/resources/mgmt/management-service-add-oidc-app.md): Deprecated: Use [CreateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application.api.mdx) instead to create an OIDC application.
- [Create Organization](/apis/resources/mgmt/management-service-add-org.md): Deprecated: use [organization service v2 CreateOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-create-organization.api.mdx) instead
- [Add Domain](/apis/resources/mgmt/management-service-add-org-domain.md): Deprecated: use [organization service v2 AddOrganizationDomain](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-add-organization-domain.api.mdx) instead.
- [Deprecated: Add JWT Identity Provider (IDP)](/apis/resources/mgmt/management-service-add-org-jwtidp.md): Create a new identity provider configuration on the organization to enable your users to log in with social/enterprise login. JSON Web Token Identity Provider (JWT IDP) gives you the possibility to use an (existing) JWT as a federated identity. You have to provide an endpoint where ZITADEL can get the existing JWT token.
- [Add Organization Member](/apis/resources/mgmt/management-service-add-org-member.md): Deprecated: use [CreateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-create-administrator.api.mdx) instead.
- [Deprecated: Add OIDC Identity Provider (IDP)](/apis/resources/mgmt/management-service-add-org-oidcidp.md): Create a new identity provider configuration on the organization to enable your users to log in with social/enterprise login. The provider has to be OIDC-compliant. This configuration can only be used by the organization itself.
- [Add Passwordless/Passkey Registration Link](/apis/resources/mgmt/management-service-add-passwordless-registration.md): Deprecated: use [user service v2 RegisterPasskey](apis/resources/user_service_v2/user-service-register-passkey.api.mdx) instead.
- [Create a Personal-Access-Token (PAT)](/apis/resources/mgmt/management-service-add-personal-access-token.md): Deprecated: use [user service v2 AddPersonalAccessToken](apis/resources/user_service_v2/user-service-add-personal-access-token.api.mdx) instead.
- [Create Project](/apis/resources/mgmt/management-service-add-project.md): Deprecated: use [project v2 service CreateProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-create-project.api.mdx) instead.
- [Add Project Grant](/apis/resources/mgmt/management-service-add-project-grant.md): Deprecated: use [CreateProjectGrant](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-create-project-grant.api.mdx) instead.
- [Add Project Grant Member](/apis/resources/mgmt/management-service-add-project-grant-member.md): Deprecated: use [CreateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-create-administrator.api.mdx) instead.
- [Add Project Member](/apis/resources/mgmt/management-service-add-project-member.md): Deprecated: use [CreateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-create-administrator.api.mdx) instead.
- [Add Project Role](/apis/resources/mgmt/management-service-add-project-role.md): Deprecated: use [project v2 service AddProjectRole](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-add-project-role.api.mdx) instead.
- [Create Application (SAML)](/apis/resources/mgmt/management-service-add-saml-app.md): Deprecated: Use [CreateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-create-application.api.mdx) instead to create a SAML application.
- [Add SAML Identity Provider](/apis/resources/mgmt/management-service-add-saml-provider.md): Add SAML Identity Provider
- [Add Second Factor (2FA)](/apis/resources/mgmt/management-service-add-second-factor-to-login-policy.md): Add a new second factor (2FA) to the login settings of the organization. Users will have the possibility to authenticate with the configured factor afterward. Authentication factors are used as an additional factor to add more security to your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called a second factor as it is used as an additional authentication after a password. In the UI we generalize this as multi-factor.
- [Add User Grant](/apis/resources/mgmt/management-service-add-user-grant.md): Deprecated: [Add an authorization](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-create-authorization.api.mdx) to grant a user access to an owned or granted project.
- [Bulk Add Project Role](/apis/resources/mgmt/management-service-bulk-add-project-roles.md): Deprecated: use [project v2 service AddProjectRole](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-add-project-role.api.mdx) instead.
- [Bulk Delete Metadata](/apis/resources/mgmt/management-service-bulk-remove-org-metadata.md): Deprecated: use [organization service v2 DeleteOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization-metadata.api.mdx) instead.
- [Bulk Remove User Grants](/apis/resources/mgmt/management-service-bulk-remove-user-grant.md): Deprecated: [Delete authorizations one after the other](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-delete-authorization.api.mdx) to remove access for multiple users on multiple owned or granted projects.
- [Delete User Metadata By Key](/apis/resources/mgmt/management-service-bulk-remove-user-metadata.md): Deprecated: use [DeleteUserMetadata](apis/resources/user_service_v2/user-service-delete-user-metadata.api.mdx) instead.
- [Bulk Set Organization Metadata](/apis/resources/mgmt/management-service-bulk-set-org-metadata.md): Deprecated: use [organization service v2 SetOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-set-organization-metadata.api.mdx) instead.
- [Bulk Set User Metadata](/apis/resources/mgmt/management-service-bulk-set-user-metadata.md): Deprecated: use [SetUserMetadata](apis/resources/user_service_v2/user-service-set-user-metadata.api.mdx) instead.
- [Clear Flow](/apis/resources/mgmt/management-service-clear-flow.md): Clear Flow
- [Create Action](/apis/resources/mgmt/management-service-create-action.md): Create a new ZITADEL action. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Deactivate Action](/apis/resources/mgmt/management-service-deactivate-action.md): Deactivate an existing action. The action will not be executed if configured in a flow. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Deactivate Application](/apis/resources/mgmt/management-service-deactivate-app.md): Deprecated: Use [DeactivateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-deactivate-application.api.mdx) instead to deactivate an app.
- [Deactivate Organization](/apis/resources/mgmt/management-service-deactivate-org.md): Deprecated: use [organization service v2 DeactivateOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-deactivate-organization.api.mdx) instead.
- [Deprecated: Deactivate Identity Provider (IDP)](/apis/resources/mgmt/management-service-deactivate-org-idp.md): Sets the state of the provider to inactive. It can only be called for the provider with the state active. Users will not be able to log in with the given provider afterward. It might cause troubles if it is the only authentication method of the user.
- [Deactivate Project](/apis/resources/mgmt/management-service-deactivate-project.md): Deprecated: use [project v2 service DeactivateProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-deactivate-project.api.mdx) instead.
- [Deactivate Project Grant](/apis/resources/mgmt/management-service-deactivate-project-grant.md): Deprecated: use [DeactivateProjectGrant](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-deactivate-project-grant.api.mdx) instead.
- [Deactivate User](/apis/resources/mgmt/management-service-deactivate-user.md): Deprecated: use [user service v2 DeactivateUser](apis/resources/user_service_v2/user-service-deactivate-user.api.mdx) instead.
- [Deactivate User Grant](/apis/resources/mgmt/management-service-deactivate-user-grant.md): Deprecated: [Deactivate an authorization](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-deactivate-authorization.api.mdx) to disable a user's access to an owned or granted project.
- [Delete Action](/apis/resources/mgmt/management-service-delete-action.md): Remove an existing action. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Delete Identity Provider](/apis/resources/mgmt/management-service-delete-provider.md): Delete Identity Provider
- [Create Secret for Machine User](/apis/resources/mgmt/management-service-generate-machine-secret.md): Deprecated: use [user service v2 AddSecret](apis/resources/user_service_v2/user-service-add-secret.api.mdx) instead.
- [Generate Domain Verification](/apis/resources/mgmt/management-service-generate-org-domain-validation.md): Deprecated: use [organization service v2 GenerateOrganizationDomainValidation](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-generate-organization-domain-validation.api.mdx) instead.
- [Get Action By ID](/apis/resources/mgmt/management-service-get-action.md): Returns an action by id. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Get Application By ID](/apis/resources/mgmt/management-service-get-app-by-id.md): Deprecated: Use [GetApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-get-application.api.mdx) instead to fetch an app
- [Get Application Key By ID](/apis/resources/mgmt/management-service-get-app-key.md): Deprecated: Use [GetApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-get-application-key.api.mdx) instead to get an application key.
- [Get Custom Domain Claimed Message Text](/apis/resources/mgmt/management-service-get-custom-domain-claimed-message-text.md): Get the custom text of the domain claimed message/email that is configured on the organization. The message is sent when an organization claims a domain and a user of this domain exists in another organization.
- [Get Custom Init Message Text](/apis/resources/mgmt/management-service-get-custom-init-message-text.md): Get the custom text of the initialize-user message/email that is set on the organization. The email is sent when a user is created and has either no password or a non-verified email address.
- [Get Custom Invite User Message Text](/apis/resources/mgmt/management-service-get-custom-invite-user-message-text.md): Get the custom text of the password-changed message/email that is configured on the organization. The message is sent when an invite code email is requested.
- [Get Custom Login Text](/apis/resources/mgmt/management-service-get-custom-login-texts.md): Get the custom texts for the login and register UI of ZITADEL, which are configured on the organization. The text from the organization will trigger as soon as the organization is identified (organization scope or user).
- [Get Custom Password Change Message Text](/apis/resources/mgmt/management-service-get-custom-password-change-message-text.md): Get the custom text of the password-changed message/email that is configured on the organization. The message is sent when the password of a user has been changed.
- [Get Custom Password Reset Message Text](/apis/resources/mgmt/management-service-get-custom-password-reset-message-text.md): Get the custom text of the password reset message/email that is set on the organization. The email is sent when a user triggers the password forgot-request.
- [Get Custom Passwordless Registration Message Text](/apis/resources/mgmt/management-service-get-custom-passwordless-registration-message-text.md): Get the custom text of the passwordless/passkey registration message/email that is configured on the organization. The message is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.
- [Get Custom Verify Email Message Text](/apis/resources/mgmt/management-service-get-custom-verify-email-message-text.md): Get the custom text of the verify-email message/email that is set on the organization. The email is sent when a user adds a new non-verified email address.
- [Get Custom Verify Email OTP Message Text](/apis/resources/mgmt/management-service-get-custom-verify-email-otp-message-text.md): Get the custom text of the verify Email OTP message that is set on the organization. The message is sent when an Email One-time password should be verified and a notification provider is configured.
- [Get Custom Verify Phone Message Text](/apis/resources/mgmt/management-service-get-custom-verify-phone-message-text.md): Get the custom text of the verify-phone message that is set on the organization. The message is sent when a user adds a new non-verified phone number and a notification provider is configured.
- [Get Custom Verify SMS OTP Message Text](/apis/resources/mgmt/management-service-get-custom-verify-smsotp-message-text.md): Get the custom text of the verify SMS OTP message that is set on the organization. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Default Domain Claimed Message Text](/apis/resources/mgmt/management-service-get-default-domain-claimed-message-text.md): Get the default text of the domain claimed message/email that is set on the instance or as translation files in ZITADEL itself. The text will be sent to the users of all organizations, that do not have a custom text configured. The message is sent when an organization claims a domain and a user of this domain exists in another organization.
- [Get Default Init Message Text](/apis/resources/mgmt/management-service-get-default-init-message-text.md): Get the default text of the initialize-user message/email that is set either on the instance or in the filesystem of ZITADEL. The email is sent when a user is created and has either no password or a non-verified email address.
- [Get Default Invite User Message Text](/apis/resources/mgmt/management-service-get-default-invite-user-message-text.md): Get the default text of the invite user message/email that is configured on the instance or as translation files in ZITADEL itself. The message is sent when an invite code email is requested.
- [Get Default Private Labeling/Branding Settings](/apis/resources/mgmt/management-service-get-default-label-policy.md): Returns the default private labeling/branding configured on the instance. Defines what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Get Default Password Lockout Settings](/apis/resources/mgmt/management-service-get-default-lockout-policy.md): Returns the default password lockout settings configured on the instance. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Get Default Login Settings](/apis/resources/mgmt/management-service-get-default-login-policy.md): Returns the default login settings defined on the instance level. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Get Default Login Text](/apis/resources/mgmt/management-service-get-default-login-texts.md): Get the default texts for the login and register UI of ZITADEL, which are configured on the instance or as translation files in ZITADEL itself. The text will be shown to the users of all organizations, that do not have a custom text configured. Or if the organization context is not given.
- [Get Default Notification Settings](/apis/resources/mgmt/management-service-get-default-notification-policy.md): Return the default notification settings configured on the instance. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Get Default Password Age Settings](/apis/resources/mgmt/management-service-get-default-password-age-policy.md): Returns the default password age settings configured on the instance. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Get Default Password Change Message Text](/apis/resources/mgmt/management-service-get-default-password-change-message-text.md): Get the default text of the password-changed message/email that is configured on the instance or as translation files in ZITADEL itself. The message is sent when the password of a user has been changed.
- [Get Default Password Complexity Settings](/apis/resources/mgmt/management-service-get-default-password-complexity-policy.md): Returns the default password complexity settings configured on the instance. The settings specify how a password should look (characters, length, etc.)
- [Get Default Password Reset Message Text](/apis/resources/mgmt/management-service-get-default-password-reset-message-text.md): Get the default text of the password reset message/email that is set on the instance or in the files of ZITADEL. The email is sent when a user triggers the password forgot-request.
- [Get Default Passwordless Registration Message Text](/apis/resources/mgmt/management-service-get-default-passwordless-registration-message-text.md): Get the default text of the domain claimed message/email that is configured on the instance or as translation files in ZITADEL. The message is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.
- [Get Default Privacy Settings](/apis/resources/mgmt/management-service-get-default-privacy-policy.md): Returns the default privacy settings configured on the instance. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Get Default Verify Email Message Text](/apis/resources/mgmt/management-service-get-default-verify-email-message-text.md): Get the default text of the verify-email message/email that is set on the instance or as translation files in ZITADEL itself. The email is sent when a user adds a new non-verified email address.
- [Get Default Verify Email OTP Message Text](/apis/resources/mgmt/management-service-get-default-verify-email-otp-message-text.md): Get the default text of the verify Email OTP message that is set on the instance or as translation files in ZITADEL itself. The message is sent when an Email One-time password should be verified and a notification provider is configured.
- [Get Default Verify Phone Message Text](/apis/resources/mgmt/management-service-get-default-verify-phone-message-text.md): Get the default text of the verify-phone message that is set on the instance or as translation files in ZITADEL itself. The message is sent when a user adds a new non-verified phone number and a notification provider is configured.
- [Get Default Verify SMS OTP Message Text](/apis/resources/mgmt/management-service-get-default-verify-smsotp-message-text.md): Get the default text of the verify SMS OTP message that is set on the instance or as translation files in ZITADEL itself. The message is sent when an SMS One-time password should be verified and a notification provider is configured.
- [Get Domain Policy](/apis/resources/mgmt/management-service-get-domain-policy.md): Returns the domain policy (this policy is managed by the IAM administrator)
- [Get Flow](/apis/resources/mgmt/management-service-get-flow.md): Returns a flow. Flows are the links between an action and a specific point during a user interaction with ZITADEL.
- [Get Granted Project By ID](/apis/resources/mgmt/management-service-get-granted-project-by-id.md): Deprecated: use [project v2 service ListProjectGrants](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.api.mdx) instead.
- [Get User Email (Human)](/apis/resources/mgmt/management-service-get-human-email.md): Deprecated: use [user service v2 GetUserByID](apis/resources/user_service_v2/user-service-get-user-by-id.api.mdx) instead.
- [Get User Phone (Human)](/apis/resources/mgmt/management-service-get-human-phone.md): Deprecated: use [user service v2 GetUserByID](apis/resources/user_service_v2/user-service-get-user-by-id.api.mdx) instead.
- [Get User Profile (Human)](/apis/resources/mgmt/management-service-get-human-profile.md): Deprecated: use [user service v2 GetUserByID](apis/resources/user_service_v2/user-service-get-user-by-id.api.mdx) instead.
- [Instance information](/apis/resources/mgmt/management-service-get-iam.md): Some needed settings made in ZITADEL like the global organization id or ZITADEL project ID
- [Get Private Labeling/Branding Settings](/apis/resources/mgmt/management-service-get-label-policy.md): Returns the currently active private labeling/branding configured on the organization. The settings will trigger if the organization has been identified (organization scope, user). Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Get Password Lockout Settings](/apis/resources/mgmt/management-service-get-lockout-policy.md): Returns the password lockout settings configured on the organization. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Get Login Settings](/apis/resources/mgmt/management-service-get-login-policy.md): Returns the login settings defined on the organization level. It will trigger as soon as the organization is identified (scope, user identification). The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Get Machine user Key By ID](/apis/resources/mgmt/management-service-get-machine-key-by-i-ds.md): Deprecated: use [user service v2 ListUsers](apis/resources/user_service_v2/user-service-list-users.api.mdx) instead.
- [Get My Organization](/apis/resources/mgmt/management-service-get-my-org.md): Returns the organization that is sent in the x-zitadel-orgid. If no header is set the organization of the authenticated user will be returned.
- [Get Notification Settings](/apis/resources/mgmt/management-service-get-notification-policy.md): Return the notification settings configured on the organization. It overwrites the default settings configured on the instance for this organization. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [ZITADEL documentation](/apis/resources/mgmt/management-service-get-oidc-information.md): This endpoint returns some general needed (OIDC) information about ZITADEL like the issuer or discovery endpoint.
- [Get Organization By Domain](/apis/resources/mgmt/management-service-get-org-by-domain-global.md): Deprecated: use [organization v2 service ListOrganizations](apis/resources/org_service_v2/organization-service-list-organizations.api.mdx) instead.
- [Get Org IAM Policy](/apis/resources/mgmt/management-service-get-org-iam-policy.md): Use Get Domain Settings instead
- [Deprecated: Get Identity Provider (IDP) by ID](/apis/resources/mgmt/management-service-get-org-idp-by-id.md): Returns an identity provider (social/enterprise login) by its ID e.g Google, AzureAD, etc that is configured on the organization.
- [Get Organization Metadata By Key](/apis/resources/mgmt/management-service-get-org-metadata.md): Deprecated: use [organization service v2 ListOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organization-metadata.api.mdx) instead.
- [Get Password Age Settings](/apis/resources/mgmt/management-service-get-password-age-policy.md): Returns the password age settings configured on the organization. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Get Password Complexity Settings](/apis/resources/mgmt/management-service-get-password-complexity-policy.md): Returns the password complexity settings configured on the organization. The settings specify how a password should look (characters, length, etc.)
- [Get Personal-Access-Token (PAT) by ID](/apis/resources/mgmt/management-service-get-personal-access-token-by-i-ds.md): Deprecated: use [user service v2 ListPersonalAccessTokens](apis/resources/user_service_v2/user-service-list-personal-access-tokens.api.mdx) instead.
- [Get Preview Private Labeling/Branding Settings](/apis/resources/mgmt/management-service-get-preview-label-policy.md): Returns the preview private labeling/branding configured on the organization. The preview is used to show you how it will look like, and not activate it directly for your users. In the future, it should be possible to send a preview mail and have a look at the preview login. The settings will trigger if the organization has been identified (organization scope, user). Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Get Privacy Settings](/apis/resources/mgmt/management-service-get-privacy-policy.md): Returns the privacy settings configured on the organization. To be able to trigger the correct policy make sure to identify which organization should be requested on the login/register (organization scope). The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Get Project By ID](/apis/resources/mgmt/management-service-get-project-by-id.md): Deprecated: use [project v2 service GetProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-get-project.api.mdx) instead.
- [Project Grant By ID](/apis/resources/mgmt/management-service-get-project-grant-by-id.md): Deprecated: use [ListProjectGrants](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.api.mdx) instead.
- [Get Identity Provider By ID](/apis/resources/mgmt/management-service-get-provider-by-id.md): Get Identity Provider By ID
- [Supported Languages](/apis/resources/mgmt/management-service-get-supported-languages.md): Use GetSupportedLanguages on the admin service instead.
- [User by ID](/apis/resources/mgmt/management-service-get-user-by-id.md): Deprecated: use [user service v2 ListUsers with InUserIDQuery](apis/resources/user_service_v2/user-service-list-users.api.mdx) instead.
- [Get User by login name (globally)](/apis/resources/mgmt/management-service-get-user-by-login-name-global.md): Deprecated: use [user service v2 ListUsers with LoginNameQuery](apis/resources/user_service_v2/user-service-list-users.api.mdx) instead.
- [Get User Grant By ID](/apis/resources/mgmt/management-service-get-user-grant-by-id.md): Deprecated: [List authorizations](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-list-authorizations.api.mdx) and filter by its ID.
- [Get User Metadata By Key](/apis/resources/mgmt/management-service-get-user-metadata.md): Deprecated: use [ListUserMetadata](apis/resources/user_service_v2/user-service-list-user-metadata.api.mdx) instead.
- [Healthz](/apis/resources/mgmt/management-service-healthz.md): The health endpoint allows an external system to probe if ZITADEL management API is alive
- [Create/Import User (Human)](/apis/resources/mgmt/management-service-import-human-user.md): Deprecated: use [user service v2 UpdateHumanUser](apis/resources/user_service_v2/user-service-update-human-user.api.mdx) instead.
- [Check for existing user](/apis/resources/mgmt/management-service-is-user-unique.md): Deprecated: use [user service v2 ListUsers](apis/resources/user_service_v2/user-service-list-users.api.mdx) instead, is unique if no user returned.
- [Search Actions](/apis/resources/mgmt/management-service-list-actions.md): Returns a list of actions matching the query. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Search Project Grants](/apis/resources/mgmt/management-service-list-all-project-grants.md): Deprecated: use [ListProjectGrants](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.api.mdx) instead.
- [Application History](/apis/resources/mgmt/management-service-list-app-changes.md): Returns a list of changes/events that have happened on the application. It's the history of the app. Make sure to send a limit.
- [List Application Keys](/apis/resources/mgmt/management-service-list-app-keys.md): Deprecated: Use [ListApplicationKeys](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-list-application-keys.api.mdx) instead to list application keys.
- [Search Applications](/apis/resources/mgmt/management-service-list-apps.md): Deprecated: Use [ListApplications](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-list-applications.api.mdx) instead to list applications
- [List Flow Trigger Types](/apis/resources/mgmt/management-service-list-flow-trigger-types.md): List Flow Trigger Types
- [Search Flow Types](/apis/resources/mgmt/management-service-list-flow-types.md): Search Flow Types
- [Search Granted Project Roles](/apis/resources/mgmt/management-service-list-granted-project-roles.md): Deprecated: use [project v2 service ListProjectGrants](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.api.mdx) instead.
- [Search Granted Project](/apis/resources/mgmt/management-service-list-granted-projects.md): Deprecated: use [project v2 service ListProjects](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-projects.api.mdx) instead.
- [Get User Authentication Factors (2FA/MFA)](/apis/resources/mgmt/management-service-list-human-auth-factors.md): Deprecated: use [user service v2 ListAuthenticationMethodTypes](apis/resources/user_service_v2/user-service-list-authentication-method-types.api.mdx) instead.
- [List Social Logins](/apis/resources/mgmt/management-service-list-human-linked-id-ps.md): Deprecated: use [user service v2 ListLinkedIDPs](apis/resources/user_service_v2/user-service-list-idp-links.api.mdx) instead.
- [Search Passwordless/Passkey authentication](/apis/resources/mgmt/management-service-list-human-passwordless.md): Deprecated: use [user service v2 ListPasskeys](apis/resources/user_service_v2/user-service-list-passkeys.api.mdx) instead.
- [List Linked Identity Providers](/apis/resources/mgmt/management-service-list-login-policy-id-ps.md): Returns a list of identity providers that are linked in the login policy. This means, that they are configured for the organization and will be shown to the users. They will be shown if the organization is identified (per scope or user).
- [List Multi-factors (MFA)](/apis/resources/mgmt/management-service-list-login-policy-multi-factors.md): Returns a list of multi-factors (MFA) configured on the login settings of the organization. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multifactor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [List Second Factors (2FA)](/apis/resources/mgmt/management-service-list-login-policy-second-factors.md): Returns a list of second factors (2FA) configured on the login settings of the organization. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called the second factor as it is used after a password. In the UI we generalize it as multi-factor.
- [List Machine Keys](/apis/resources/mgmt/management-service-list-machine-keys.md): Deprecated: use [user service v2 ListKeys](apis/resources/user_service_v2/user-service-list-keys.api.mdx) instead.
- [Get Organization History](/apis/resources/mgmt/management-service-list-org-changes.md): Returns a list of changes/events that have happened in the organization. It's the history of the organization. Make sure to send a limit.
- [Search Domains](/apis/resources/mgmt/management-service-list-org-domains.md): Deprecated: use [organization service v2 ListOrganizationDomains](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organization-domains.api.mdx) instead.
- [Deprecated: Search Identity Providers (IDPs)](/apis/resources/mgmt/management-service-list-org-id-ps.md): Returns a list of identity providers (social/enterprise login) configured on the organization. e.g Google, AzureAD, etc.
- [List Organization Member Roles](/apis/resources/mgmt/management-service-list-org-member-roles.md): Members are users with permission to administrate ZITADEL on different levels. This request returns all roles possible for a ZITADEL member on the organization level.
- [List Organization Members](/apis/resources/mgmt/management-service-list-org-members.md): Deprecated: use [ListAdministrators](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.api.mdx) instead.
- [Search Organization Metadata](/apis/resources/mgmt/management-service-list-org-metadata.md): Deprecated: use [organization service v2 ListOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organization-metadata.api.mdx) instead.
- [List Personal-Access-Tokens (PATs)](/apis/resources/mgmt/management-service-list-personal-access-tokens.md): Deprecated: use [user service v2 ListPersonalAccessTokens](apis/resources/user_service_v2/user-service-list-personal-access-tokens.api.mdx) instead.
- [Project History](/apis/resources/mgmt/management-service-list-project-changes.md): Returns a list of changes/events that have happened on the project. It's the history of the project. Make sure to send a limit.
- [Project Grant History](/apis/resources/mgmt/management-service-list-project-grant-changes.md): Returns a list of changes/events that have happened on the project grant. It's the history of the project. Make sure to send a limit.
- [List Project Grant Member Roles](/apis/resources/mgmt/management-service-list-project-grant-member-roles.md): Members are users with permission to administrate ZITADEL on different levels. This request returns all roles possible for a ZITADEL member on the project grant level.
- [List Project Grant Members](/apis/resources/mgmt/management-service-list-project-grant-members.md): Deprecated: use [ListAdministrators](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.api.mdx) instead.
- [Search Project Grants from Project](/apis/resources/mgmt/management-service-list-project-grants.md): Deprecated: use [ListProjectGrants](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.api.mdx) instead.
- [List Project Member Roles](/apis/resources/mgmt/management-service-list-project-member-roles.md): Members are users with permission to administrate ZITADEL on different levels. This request returns all roles possible for a ZITADEL member on the project level.
- [List Project Members](/apis/resources/mgmt/management-service-list-project-members.md): Deprecated: use [ListAdministrators](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.api.mdx) instead.
- [Search Project Roles](/apis/resources/mgmt/management-service-list-project-roles.md): Deprecated: use [project v2 service ListProjectRoles](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-roles.api.mdx) instead.
- [Search Project](/apis/resources/mgmt/management-service-list-projects.md): Deprecated: use [project v2 service ListProjects](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-projects.api.mdx) instead.
- [List Identity Providers](/apis/resources/mgmt/management-service-list-providers.md): List Identity Providers
- [Get User History](/apis/resources/mgmt/management-service-list-user-changes.md): Returns a list of changes/events that have happened on the user. It's the history of the user. Make sure to send a limit.
- [Search User Grants](/apis/resources/mgmt/management-service-list-user-grants.md): Deprecated: [List authorizations](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-list-authorizations.api.mdx) and pass the user ID filter to search for a users grants on owned or granted projects.
- [List ZITADEL Permissions](/apis/resources/mgmt/management-service-list-user-memberships.md): Deprecated: use [ListAdministrators](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-list-administrators.api.mdx) instead.
- [Search User Metadata](/apis/resources/mgmt/management-service-list-user-metadata.md): Deprecated: use [ListUserMetadata](apis/resources/user_service_v2/user-service-list-user-metadata.api.mdx) instead.
- [Search Users](/apis/resources/mgmt/management-service-list-users.md): Deprecated: use [user service v2 ListUsers](apis/resources/user_service_v2/user-service-list-users.api.mdx) instead.
- [Lock User](/apis/resources/mgmt/management-service-lock-user.md): Deprecated: use [user service v2 LockUser](apis/resources/user_service_v2/user-service-lock-user.api.mdx) instead.
- [Migrate Generic OIDC Identity Provider](/apis/resources/mgmt/management-service-migrate-generic-oidc-provider.md): Migrate Generic OIDC Identity Provider
- [Reactivate Action](/apis/resources/mgmt/management-service-reactivate-action.md): Reactivate an existing action that is deactivated. The action will be executed again if configured in a flow. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Reactivate Application](/apis/resources/mgmt/management-service-reactivate-app.md): Deprecated: Use [ReactivateApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-reactivate-application.api.mdx) instead to reactivate an app.
- [Reactivate Organization](/apis/resources/mgmt/management-service-reactivate-org.md): Deprecated: use [organization service v2 ActivateOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-activate-organization.api.mdx) instead.
- [Reactivate Identity Provider (IDP)](/apis/resources/mgmt/management-service-reactivate-org-idp.md): Deprecated: Sets the state of the provider to active. It can only be called for providers with the state inactive. Users will not be able to log in again with the given provider.
- [Reactivate Project](/apis/resources/mgmt/management-service-reactivate-project.md): Deprecated: use [project v2 service ActivateProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-activate-project.api.mdx) instead.
- [Reactivate Project Grant](/apis/resources/mgmt/management-service-reactivate-project-grant.md): Deprecated: use [ActivateProjectGrant](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-activate-project-grant.api.mdx) instead.
- [Deactivate User](/apis/resources/mgmt/management-service-reactivate-user.md): Deprecated: use [user service v2 ReactivateUser](apis/resources/user_service_v2/user-service-reactivate-user.api.mdx) instead.
- [Reactivate User Grant](/apis/resources/mgmt/management-service-reactivate-user-grant.md): Deprecated: [Activate an authorization](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-activate-authorization.api.mdx) to enable a user's access to an owned or granted project.
- [Generate New API Client Secret](/apis/resources/mgmt/management-service-regenerate-api-client-secret.md): Deprecated: Use [RegenerateClientSecret](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-regenerate-client-secret.api.mdx) instead to regenerate an API app client secret
- [Generate New OIDC Client Secret](/apis/resources/mgmt/management-service-regenerate-oidc-client-secret.md): Deprecated: Use [RegenerateClientSecret](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-regenerate-client-secret.api.mdx) instead to regenerate an OIDC app client secret.
- [Regenerate SAML Identity Provider Certificate](/apis/resources/mgmt/management-service-regenerate-saml-provider-certificate.md): Regenerate SAML Identity Provider Certificate
- [Remove Application](/apis/resources/mgmt/management-service-remove-app.md): Deprecated: Use [DeleteApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-delete-application.api.mdx) instead to delete an app.
- [Delete Application Key](/apis/resources/mgmt/management-service-remove-app-key.md): Deprecated: Use [DeleteApplicationKey](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-delete-application-key.api.mdx) instead to delete an application key.
- [Remove Font](/apis/resources/mgmt/management-service-remove-custom-label-policy-font.md): Removes the font from the configured label policy/branding of the organization. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Icon Light](/apis/resources/mgmt/management-service-remove-custom-label-policy-icon.md): Removes the icon of the light theme from the configured label policy/branding of the organization. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Icon Dark](/apis/resources/mgmt/management-service-remove-custom-label-policy-icon-dark.md): Removes the icon of the dark theme from the configured label policy/branding of the organization. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Logo Light](/apis/resources/mgmt/management-service-remove-custom-label-policy-logo.md): Removes the logo of the light theme from the configured label policy/branding of the organization. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Logo Dark](/apis/resources/mgmt/management-service-remove-custom-label-policy-logo-dark.md): Removes the logo of the dark theme from the configured label policy/branding of the organization. It will only be shown on the preview. Make sure to activate your changes afterward.
- [Remove Multi-Factor OTP](/apis/resources/mgmt/management-service-remove-human-auth-factor-otp.md): Deprecated: use [user service v2 RemoveTOTP](apis/resources/user_service_v2/user-service-remove-totp.api.mdx) instead.
- [Remove Multi-Factor OTP Email](/apis/resources/mgmt/management-service-remove-human-auth-factor-otp-email.md): Deprecated: use [user service v2 RemoveOTPEmail](apis/resources/user_service_v2/user-service-remove-otp-email.api.mdx) instead.
- [Remove Multi-Factor OTP SMS](/apis/resources/mgmt/management-service-remove-human-auth-factor-otpsms.md): Deprecated: use [user service v2 RemoveOTPSMS](apis/resources/user_service_v2/user-service-remove-otpsms.api.mdx) instead.
- [Remove Multi-Factor U2F](/apis/resources/mgmt/management-service-remove-human-auth-factor-u-2-f.md): Deprecated: use [user service v2 RemoveU2F](apis/resources/user_service_v2/user-service-remove-u-2-f.api.mdx) instead.
- [Delete User Avatar (Human)](/apis/resources/mgmt/management-service-remove-human-avatar.md): Removes the avatar that is currently set on the user.
- [Remove Social Login](/apis/resources/mgmt/management-service-remove-human-linked-idp.md): Deprecated: use [user service v2 RemoveIDPLink](apis/resources/user_service_v2/user-service-remove-idp-link.api.mdx) instead.
- [Delete Passwordless/Passkey](/apis/resources/mgmt/management-service-remove-human-passwordless.md): Deprecated: use [user service v2 RemovePasskey](apis/resources/user_service_v2/user-service-remove-passkey.api.mdx) instead.
- [Remove User Phone (Human)](/apis/resources/mgmt/management-service-remove-human-phone.md): Deprecated: use user service v2 [user service v2 SetPhone](apis/resources/user_service_v2/user-service-set-phone.api.mdx) instead.
- [Remove Linked Identity Provider](/apis/resources/mgmt/management-service-remove-idp-from-login-policy.md): Remove an identity provider from the login settings of the organization. This means that it will not be shown to the users on the login page.
- [Delete Key for machine user](/apis/resources/mgmt/management-service-remove-machine-key.md): Deprecated: use [user service v2 RemoveKey](apis/resources/user_service_v2/user-service-remove-key.api.mdx) instead.
- [Delete Secret of Machine User](/apis/resources/mgmt/management-service-remove-machine-secret.md): Deprecated: use [user service v2 RemoveSecret](apis/resources/user_service_v2/user-service-remove-secret.api.mdx) instead.
- [Remove Multi-factor (MFA)](/apis/resources/mgmt/management-service-remove-multi-factor-from-login-policy.md): Remove a multi-factor (MFA) from the login settings of the organization. It affects all organizations, without custom login settings. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc).  Per definition, it is called multi-factor factor or passwordless as it is used as first and second authentication and a password is not necessary. In the UI we generalize it as passwordless or passkey.
- [Delete Organization](/apis/resources/mgmt/management-service-remove-org.md): Deprecated: use [organization service v2 DeleteOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization.api.mdx) instead.
- [Remove Domain](/apis/resources/mgmt/management-service-remove-org-domain.md): Deprecated: use [organization service v2 DeleteOrganizationDomain](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization-domain.api.mdx) instead.
- [Remove Identity Provider (IDP)](/apis/resources/mgmt/management-service-remove-org-idp.md): Removes the identity provider permanently. All links to the given IDP on users will be deleted as well. They will not be able to log in with the provider afterward. If it is their only authentication possibility it might cause problems.
- [Remove Organization Member](/apis/resources/mgmt/management-service-remove-org-member.md): Deprecated: use [DeleteAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-delete-administrator.api.mdx) instead.
- [Delete Organization Metadata By Key](/apis/resources/mgmt/management-service-remove-org-metadata.md): Deprecated: use [organization service v2 DeleteOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization-metadata.api.mdx) instead.
- [Remove a Personal-Access-Token (PAT) by ID](/apis/resources/mgmt/management-service-remove-personal-access-token.md): Deprecated: use [user service v2 RemovePersonalAccessToken](apis/resources/user_service_v2/user-service-remove-personal-access-token.api.mdx) instead.
- [Remove Project](/apis/resources/mgmt/management-service-remove-project.md): Deprecated: use [project v2 service DeleteProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-delete-project.api.mdx) instead.
- [Remove Project Grant](/apis/resources/mgmt/management-service-remove-project-grant.md): Deprecated: use [DeleteProjectGrant](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-delete-project-grant.api.mdx) instead.
- [Remove Project Grant Member](/apis/resources/mgmt/management-service-remove-project-grant-member.md): Deprecated: use [DeleteAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-delete-administrator.api.mdx) instead.
- [Remove Project Member](/apis/resources/mgmt/management-service-remove-project-member.md): Deprecated: use [DeleteAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-delete-administrator.api.mdx) instead.
- [Remove Project Role](/apis/resources/mgmt/management-service-remove-project-role.md): Deprecated: use [project v2 service RemoveProjectRole](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-remove-project-role.api.mdx) instead.
- [Remove Second Factor (2FA)](/apis/resources/mgmt/management-service-remove-second-factor-from-login-policy.md): Remove a configured second factor (2FA) from the login settings of the organization. Users will not be able to authenticate with the configured factor afterward. Authentication factors are used as an additional layer of security for your users (e.g. Authentication App, FingerPrint, Windows Hello, etc). Per definition, it is called the second factor as it is used after a password. In the UI we generalize it as multi-factor.
- [Unlock User](/apis/resources/mgmt/management-service-remove-user.md): Deprecated: use [user service v2 DeleteUser](apis/resources/user_service_v2/user-service-delete-user.api.mdx) instead.
- [Remove User Grant](/apis/resources/mgmt/management-service-remove-user-grant.md): Deprecated: [Delete an authorization](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-delete-authorization.api.mdx) to remove a users access to an owned or granted project.
- [Delete User Metadata By Key](/apis/resources/mgmt/management-service-remove-user-metadata.md): Deprecated: use [DeleteUserMetadata](apis/resources/user_service_v2/user-service-delete-user-metadata.api.mdx) instead.
- [Resend User Email Verification](/apis/resources/mgmt/management-service-resend-human-email-verification.md): Deprecated: use [user service v2 ResendEmailCode](apis/resources/user_service_v2/user-service-resend-email-code.api.mdx) instead.
- [Resend User Initialization Email](/apis/resources/mgmt/management-service-resend-human-initialization.md): Deprecated: not used anymore in user state so will be removed.
- [Resend User Phone Verification](/apis/resources/mgmt/management-service-resend-human-phone-verification.md): Deprecated: use user service v2 [user service v2 ResendPhoneCode](apis/resources/user_service_v2/user-service-resend-phone-code.api.mdx) instead.
- [Reset Custom Domain Claimed Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-domain-claimed-message-text-to-default.md): Removes the custom text of the domain claimed message that is configured on the organization and triggers the text from the instance or translation files in ZITADEL.
- [Reset Custom Init Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-init-message-text-to-default.md): Removes the custom text of the initialize-user message/email that is overwritten on the organization and triggers the default text instead.
- [Reset Custom Invite User Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-invite-user-message-text-to-default.md): Removes the custom text of the invite user message from the organization and therefore the default texts from the instance or translation files will be triggered for the users.
- [Reset Custom Login Text to Default](/apis/resources/mgmt/management-service-reset-custom-login-text-to-default.md): Removes the custom texts for the login and register UI from the organization and therefore the configuration of the instance or the translation files in ZITADEL itself will trigger.
- [Reset Custom Password Changed Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-password-change-message-text-to-default.md): Removes the custom text of the password-changed message from the organization and therefore the default texts from the instance or translation files will be triggered for the users.
- [Reset Custom Password Reset Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-password-reset-message-text-to-default.md): Removes the custom text of the password reset user message/email and the default will trigger afterward.
- [Reset Custom Passwordless Registration Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-passwordless-registration-message-text-to-default.md): Removes the custom text of the passwordless/passkey registration from the organization and therefore the default configuration from the instance or translation files will be triggered for the users.
- [Reset Custom Verify Email Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-verify-email-message-text-to-default.md): Removes the custom text of the email verify message/email and therefore the default settings will trigger afterward.
- [Reset Custom Verify Email OTP Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-verify-email-otp-message-text-to-default.md): Removes the custom text of the verify Email OTP message from the organization and therefore the default texts will trigger for the users afterward.
- [Reset Custom Verify Phone Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-verify-phone-message-text-to-default.md): Removes the custom text of the verify-phone message from the organization and therefore the default texts will trigger for the users afterward.
- [Reset Custom Verify SMS OTP Message Text to Default](/apis/resources/mgmt/management-service-reset-custom-verify-smsotp-message-text-to-default.md): Removes the custom text of the verify SMS OTP message from the organization and therefore the default texts will trigger for the users afterward.
- [Reset Labeling/Branding Settings](/apis/resources/mgmt/management-service-reset-label-policy-to-default.md): Removes the label policy/branding of the organization and therefore the default settings from the instance will be shown to the users.
- [Reset Password Lockout Settings to Default](/apis/resources/mgmt/management-service-reset-lockout-policy-to-default.md): Remove the password lockout settings from the organization. The settings configured on the instance will trigger afterward for this organization. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Reset Custom Login Settings to Default](/apis/resources/mgmt/management-service-reset-login-policy-to-default.md): Remove the custom settings from the organization. The default settings of the instance will be triggered afterward. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Reset Notification Settings to Default](/apis/resources/mgmt/management-service-reset-notification-policy-to-default.md): The settings configured will be removed from the organization. Therefore the settings from the instance will trigger for the users of this organization afterward. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Reset Password Age Settings to Default](/apis/resources/mgmt/management-service-reset-password-age-policy-to-default.md): Remove the password age settings of the organization and therefore use the default settings on the instance.. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Reset Password Complexity Settings to Default](/apis/resources/mgmt/management-service-reset-password-complexity-policy-to-default.md): Remove the password complexity settings of the organization and therefore use the default settings on the instance. The settings specify how a password should look (characters, length, etc.)
- [Reset Privacy Settings to Default](/apis/resources/mgmt/management-service-reset-privacy-policy-to-default.md): The settings from the organization will be removed and therefore the default settings configured on the instance will be triggered. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Send Reset Password Notification](/apis/resources/mgmt/management-service-send-human-reset-password-notification.md): Deprecated: use [user service v2 PasswordReset](apis/resources/user_service_v2/user-service-password-reset.api.mdx) instead.
- [Send Passwordless/Passkey Registration Link](/apis/resources/mgmt/management-service-send-passwordless-registration.md): Deprecated: use [user service v2 RegisterPasskey](apis/resources/user_service_v2/user-service-register-passkey.api.mdx) instead.
- [Set Custom Domain Claimed Message Text](/apis/resources/mgmt/management-service-set-custom-domain-claimed-message-custom-text.md): Set the custom text of the domain claimed message/email for the organization. The message/email is sent when an organization claims a domain and a user of this domain exists in another organization. The Following Variables can be used: {{.Domain}} {{.TempUsername}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Init Message Text](/apis/resources/mgmt/management-service-set-custom-init-message-text.md): Set the custom text of the initialize-user message/email the default texts will be overwritten for the organization. The email is sent when a user is created and has either no password or a non-verified email address. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Invite User Message Text](/apis/resources/mgmt/management-service-set-custom-invite-user-message-custom-text.md): Set the custom text of the invite user message/email for the organization. The message is sent when an invite code email is requested. The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}} {{.ApplicationName}}
- [Set Default Login Text](/apis/resources/mgmt/management-service-set-custom-login-text.md): Set the custom texts for the login and register UI of ZITADEL for the organization.
- [Set Custom Password Changed Message Text](/apis/resources/mgmt/management-service-set-custom-password-change-message-custom-text.md): Set the custom text of the password-changed message/email for the organization. The message/email is sent when the password of a user has been changed.  The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Password Reset Message Text](/apis/resources/mgmt/management-service-set-custom-password-reset-message-text.md): Set the custom text of the password reset user message/email for the organization. The email is sent when a user triggers the password forgot-request. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Passwordless Registration Message Text](/apis/resources/mgmt/management-service-set-custom-passwordless-registration-message-custom-text.md): Set the custom text of the passwordless/passkey registration message/email for the organization. The message/email is sent when a user requests passwordless/passkey registration as email, to be able to configure on another device.  The Following Variables can be used: {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Default Verify Email Message Text](/apis/resources/mgmt/management-service-set-custom-verify-email-message-text.md): Set the custom text of the verify-email user message/email for the organization. The email is sent when a user adds a new nonverified email address. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Verify Email OTP Reset Message Text](/apis/resources/mgmt/management-service-set-custom-verify-email-otp-message-text.md): Set the custom text of the verify Email OTP message for the organization. The message is sent when an Email One-time password should be verified and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Verify Phone Reset Message Text](/apis/resources/mgmt/management-service-set-custom-verify-phone-message-text.md): Set the custom text of the verify-phone message for the organization. The message is sent when a user adds a new non-verified phone number and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Custom Verify SMS OTP Reset Message Text](/apis/resources/mgmt/management-service-set-custom-verify-smsotp-message-text.md): Set the custom text of the verify SMS OTP message for the organization. The message is sent when an SMS One-time password should be verified and a notification provider is configured. The Following Variables can be used: {{.Code}} {{.UserName}} {{.FirstName}} {{.LastName}} {{.NickName}} {{.DisplayName}} {{.LastEmail}} {{.VerifiedEmail}} {{.LastPhone}} {{.VerifiedPhone}} {{.PreferredLoginName}} {{.LoginNames}} {{.ChangeDate}} {{.CreationDate}}
- [Set Human Initial Password](/apis/resources/mgmt/management-service-set-human-initial-password.md): Deprecated: use [user service v2 SetPassword](apis/resources/user_service_v2/user-service-set-password.api.mdx) instead.
- [Set User Password](/apis/resources/mgmt/management-service-set-human-password.md): Deprecated: use [user service v2 SetPassword](apis/resources/user_service_v2/user-service-set-password.api.mdx) instead.
- [Set Organization Metadata](/apis/resources/mgmt/management-service-set-org-metadata.md): Deprecated: use [organization service v2 SetOrganizationMetadata](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-set-organization-metadata.api.mdx) instead.
- [Set Primary Domain](/apis/resources/mgmt/management-service-set-primary-org-domain.md): Set a domain as primary. It has to be verified to be able to be set as primary. The primary domain will be shown as suffix on the usernames as preferred loginname on this organization.
- [Set Trigger Actions](/apis/resources/mgmt/management-service-set-trigger-actions.md): Set Trigger Actions
- [Set User Metadata](/apis/resources/mgmt/management-service-set-user-metadata.md): Deprecated: use [SetUserMetadata](apis/resources/user_service_v2/user-service-set-user-metadata.api.mdx) instead.
- [Unlock User](/apis/resources/mgmt/management-service-unlock-user.md): Deprecated: use [user service v2 UnlockUser](apis/resources/user_service_v2/user-service-unlock-user.api.mdx) instead.
- [Update Action](/apis/resources/mgmt/management-service-update-action.md): Update an existing ZITADEL action. Actions are custom code written in javascript, that can be run at a specified point/flow/trigger in ZITADEL.
- [Update API Application Config](/apis/resources/mgmt/management-service-update-api-app-config.md): Deprecated: Use [PatchApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-update-application.api.mdx) instead to update the config of an API app.
- [Update Application](/apis/resources/mgmt/management-service-update-app.md): Deprecated: Use [PatchApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-update-application.api.mdx) instead to update the generic params of an app.
- [Update Apple Identity Provider](/apis/resources/mgmt/management-service-update-apple-provider.md): Update Apple Identity Provider
- [Update Azure AD Identity Provider](/apis/resources/mgmt/management-service-update-azure-ad-provider.md): Update Azure AD Identity Provider
- [Update Labeling/Branding Settings](/apis/resources/mgmt/management-service-update-custom-label-policy.md): Update the preview private labeling/branding configured on the organization. The settings will trigger if the organization has been identified (organization scope, user). The preview is used to show you how it will look like, make sure to activate it as soon as you are happy with the configuration. Define what colors, fonts, and logo should be used for the Login/Register UI, E-Mails and Console.
- [Update Password Lockout Settings](/apis/resources/mgmt/management-service-update-custom-lockout-policy.md): Update the password lockout settings configured on the organization. The settings specify when a user should be locked (e.g how many password attempts). The user has to be unlocked by an administrator afterward.
- [Update Custom Login Settings](/apis/resources/mgmt/management-service-update-custom-login-policy.md): Change the login settings for the organization, that overwrites the default settings for this organization. The login policy defines what kind of authentication possibilities the user should have. Generally speaking the behavior of the login and register UI.
- [Update Notification Settings](/apis/resources/mgmt/management-service-update-custom-notification-policy.md): Update notification settings configured for the organization. The settings specify if notifications should be sent to the users on specific triggers (e.g password changed).
- [Update Password Age Settings](/apis/resources/mgmt/management-service-update-custom-password-age-policy.md): Update the password age settings of the organization. The settings specify the expiry of password, after which a user is forced to change it on the next login.
- [Update Password Complexity Settings](/apis/resources/mgmt/management-service-update-custom-password-complexity-policy.md): Update the password complexity settings of the organization. The settings specify how a password should look (characters, length, etc.)
- [Update Privacy Settings](/apis/resources/mgmt/management-service-update-custom-privacy-policy.md): Update the custom privacy policy for the organization. Variable {{.Lang}} can be set to have different links based on the language. Make sure to identify which settings should be triggered by sending the organization scope. The settings specify the terms and services, privacy policy, etc. A registering user has to accept the configured settings.
- [Update Generic OAuth Identity Provider](/apis/resources/mgmt/management-service-update-generic-o-auth-provider.md): Update Generic OAuth Identity Provider
- [Update Generic OIDC Identity Provider](/apis/resources/mgmt/management-service-update-generic-oidc-provider.md): Update Generic OIDC Identity Provider
- [Update GitHub Enterprise Identity Provider](/apis/resources/mgmt/management-service-update-git-hub-enterprise-server-provider.md): Update GitHub Enterprise Identity Provider
- [Update GitHub Identity Provider](/apis/resources/mgmt/management-service-update-git-hub-provider.md): Update GitHub Identity Provider
- [Update GitLab Identity Provider](/apis/resources/mgmt/management-service-update-git-lab-provider.md): Update GitLab Identity Provider
- [Update GitLab Selfhosted Identity Provider](/apis/resources/mgmt/management-service-update-git-lab-self-hosted-provider.md): Update GitLab Selfhosted Identity Provider
- [Update Google Identity Provider](/apis/resources/mgmt/management-service-update-google-provider.md): Update Google Identity Provider
- [Update User Email (Human)](/apis/resources/mgmt/management-service-update-human-email.md): Deprecated: use [user service v2 SetEmail](apis/resources/user_service_v2/user-service-set-email.api.mdx) instead.
- [Update User Phone (Human)](/apis/resources/mgmt/management-service-update-human-phone.md): Deprecated: use [user service v2 UpdateUser](apis/resources/user_service_v2/user-service-update-user.api.mdx) instead.
- [Update User Profile (Human)](/apis/resources/mgmt/management-service-update-human-profile.md): Deprecated: use [user service v2 UpdateHumanUser](apis/resources/user_service_v2/user-service-update-human-user.api.mdx) instead.
- [Update JWT Identity Provider](/apis/resources/mgmt/management-service-update-jwt-provider.md): Update JWT Identity Provider
- [Update LDAP Identity Provider](/apis/resources/mgmt/management-service-update-ldap-provider.md): Update LDAP Identity Provider
- [Update Machine User](/apis/resources/mgmt/management-service-update-machine.md): Deprecated: use [user service v2 UpdateUser](apis/resources/user_service_v2/user-service-update-user.api.mdx) instead.
- [Update OIDC Application Config](/apis/resources/mgmt/management-service-update-oidc-app-config.md): Deprecated: Use [PatchApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-update-application.api.mdx) instead to update the config of an OIDC app.
- [Update Organization](/apis/resources/mgmt/management-service-update-org.md): Deprecated: use [organization service v2 UpdateOrganization](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-update-organization.api.mdx) instead.
- [Deprecated: Update Identity Provider (IDP)](/apis/resources/mgmt/management-service-update-org-idp.md): Update an existing IDP. All fields are updated. If you do not send a value in a field, it will be empty afterward.
- [Deprecated: Update JWT Identity Provider (IDP)](/apis/resources/mgmt/management-service-update-org-idpjwt-config.md): Update the JWT-specific configuration of an identity provider. All fields will be updated. If a field has no value it will be empty afterward.
- [Deprecated: Update OIDC Identity Provider (IDP)](/apis/resources/mgmt/management-service-update-org-idpoidc-config.md): Update the OIDC-specific configuration of an identity provider. All fields will be updated. If a field has no value it will be empty afterward.
- [Update Organization Member](/apis/resources/mgmt/management-service-update-org-member.md): Deprecated: use [UpdateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-update-administrator.api.mdx) instead.
- [Update Project](/apis/resources/mgmt/management-service-update-project.md): Deprecated: use [project v2 service UpdateProject](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project.api.mdx) instead.
- [Change Project Grant](/apis/resources/mgmt/management-service-update-project-grant.md): Deprecated: use [UpdateProjectGrant](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project-grant.api.mdx) instead.
- [Update Project Grant Member](/apis/resources/mgmt/management-service-update-project-grant-member.md): Deprecated: use [UpdateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-update-administrator.api.mdx) instead.
- [Update Project Member](/apis/resources/mgmt/management-service-update-project-member.md): Deprecated: use [UpdateAdministrator](apis/resources/internal_permission_service_v2/zitadel-internal-permission-v-2-beta-internal-permission-service-update-administrator.api.mdx) instead.
- [Change Project Role](/apis/resources/mgmt/management-service-update-project-role.md): Deprecated: use [project v2 service UpdateProjectRole](apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project-role.api.mdx) instead.
- [Update SAML Application Config](/apis/resources/mgmt/management-service-update-saml-app-config.md): Deprecated: Use [PatchApplication](/apis/resources/application_service_v2/zitadel-app-v-2-beta-app-service-update-application.api.mdx) instead to update the config of a SAML app.
- [Update SAML Identity Provider](/apis/resources/mgmt/management-service-update-saml-provider.md): Update SAML Identity Provider
- [Update User Grant](/apis/resources/mgmt/management-service-update-user-grant.md): Deprecated: [Update an authorization](apis/resources/authorization_service_v2/zitadel-authorization-v-2-beta-authorization-service-update-authorization.api.mdx) to update a user's roles on an owned or granted project.
- [Change user name](/apis/resources/mgmt/management-service-update-user-name.md): Deprecated: use [user service v2 UpdateUser](apis/resources/user_service_v2/user-service-update-user.api.mdx) instead.
- [Verify Domain](/apis/resources/mgmt/management-service-validate-org-domain.md): Deprecated: use [organization service v2 VerifyOrganizationDomain](apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-verify-organization-domain.api.mdx) instead.
- [OIDC Service API](/apis/resources/oidc_service_v2.md): Get OIDC Auth Request details and create callback URLs.

- [OIDC Service](/apis/resources/oidc_service_v2/oidc-service.md): Get OIDC Auth Request details and create callback URLs.
- [Authorize or deny device authorization](/apis/resources/oidc_service_v2/oidc-service-authorize-or-deny-device-authorization.md): Authorize or deny the device authorization request based on the provided device authorization id.
- [Finalize an Auth Request and get the callback URL.](/apis/resources/oidc_service_v2/oidc-service-create-callback.md): Finalize an Auth Request and get the callback URL for success or failure. The user must be redirected to the URL in order to inform the application about the success or failure. On success, the URL contains details for the application to obtain the tokens. This method can only be called once for an Auth request.
- [Get OIDC Auth Request details](/apis/resources/oidc_service_v2/oidc-service-get-auth-request.md): Get OIDC Auth Request details by ID, obtained from the redirect URL. Returns details that are parsed from the application's Auth Request.
- [Get device authorization request](/apis/resources/oidc_service_v2/oidc-service-get-device-authorization-request.md): Get the device authorization based on the provided 'user code'.
- [Organization Service](/apis/resources/org_service_v2/organization-service.md): This API is intended to manage organizations in a ZITADEL instance.
- [Create an Organization](/apis/resources/org_service_v2/organization-service-add-organization.md): Create a new organization with an administrative user. If no specific roles are sent for the users, they will be granted the role ORG_OWNER.
- [Search Organizations](/apis/resources/org_service_v2/organization-service-list-organizations.md): Search for Organizations. By default, we will return all organization of the instance. Make sure to include a limit and sorting for pagination..
- [zitadel.org.v2beta](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta.md)
- [ActivateOrganization](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-activate-organization.md): Activate Organization
- [AddOrganizationDomain](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-add-organization-domain.md): Add Organization Domain
- [CreateOrganization](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-create-organization.md): Create Organization
- [DeactivateOrganization](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-deactivate-organization.md): Deactivate Organization
- [DeleteOrganization](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization.md): Delete Organization
- [DeleteOrganizationDomain](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization-domain.md): Delete Organization Domain
- [DeleteOrganizationMetadata](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-delete-organization-metadata.md): Delete Organization Metadata
- [GenerateOrganizationDomainValidation](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-generate-organization-domain-validation.md): Generate Organization Domain Validation
- [ListOrganizationDomains](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organization-domains.md): List Organization Domains
- [ListOrganizationMetadata](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organization-metadata.md): List Organization Metadata
- [ListOrganizations](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-list-organizations.md): List Organizations
- [SetOrganizationMetadata](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-set-organization-metadata.md): Set Organization Metadata
- [UpdateOrganization](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-update-organization.md): Update Organization
- [VerifyOrganizationDomain](/apis/resources/org_service_v2beta/zitadel-org-v-2-beta-organization-service-verify-organization-domain.md): Verify Organization Domain
- [Organization Service API](/apis/resources/org_service/v2.md): This API is intended to manage organizations for ZITADEL. 

- [Organization Service Beta API](/apis/resources/org_service/v2beta.md): This beta API is intended to manage organizations for ZITADEL. Expect breaking changes to occur. Please use the v2 version for a stable API. 

- [Project Service API (Beta)](/apis/resources/project_service_v2.md): This API is intended to manage projects and subresources for ZITADEL. 

This service is in beta state. It can AND will continue breaking until a stable version is released.
- [zitadel.project.v2beta](/apis/resources/project_service_v2/zitadel-project-v-2-beta.md)
- [ActivateProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-activate-project.md): Activate Project
- [ActivateProjectGrant](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-activate-project-grant.md): Activate Project Grant
- [AddProjectRole](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-add-project-role.md): Add Project Role
- [CreateProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-create-project.md): Create Project
- [CreateProjectGrant](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-create-project-grant.md): Create Project Grant
- [DeactivateProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-deactivate-project.md): Deactivate Project
- [DeactivateProjectGrant](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-deactivate-project-grant.md): Deactivate Project Grant
- [DeleteProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-delete-project.md): Delete Project
- [DeleteProjectGrant](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-delete-project-grant.md): Delete Project Grant
- [GetProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-get-project.md): Get Project
- [ListProjectGrants](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-grants.md): List Project Grants
- [ListProjectRoles](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-project-roles.md): List Project Roles
- [ListProjects](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-list-projects.md): List Projects
- [RemoveProjectRole](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-remove-project-role.md): Remove Project Role
- [UpdateProject](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project.md): Update Project
- [UpdateProjectGrant](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project-grant.md): Update Project Grant
- [UpdateProjectRole](/apis/resources/project_service_v2/zitadel-project-v-2-beta-project-service-update-project-role.md): Update Project Role
- [SAML Service API](/apis/resources/saml_service_v2.md): Get SAML Request details and create responses.

- [SAML Service](/apis/resources/saml_service_v2/saml-service.md): Get SAML Auth Request details and create callback URLs.
- [Finalize a SAML Request and get the response.](/apis/resources/saml_service_v2/saml-service-create-response.md): Finalize a SAML Request and get the response definition for success or failure. The response must be handled as per the SAML definition to inform the application about the success or failure. On success, the response contains details for the application to obtain the SAMLResponse. This method can only be called once for an SAML request.
- [Get SAML Request details](/apis/resources/saml_service_v2/saml-service-get-saml-request.md): Get SAML Request details by ID. Returns details that are parsed from the application's SAML Request.
- [Session Service API](/apis/resources/session_service_v2.md): This API is intended to manage sessions in a ZITADEL instance.

- [Session Service](/apis/resources/session_service_v2/session-service.md): This API is intended to manage sessions in a ZITADEL instance. Follow the guides on how to [build your own Login UI](/docs/guides/integrate/login-ui) and learn how to use the Session API.
- [Create a new session](/apis/resources/session_service_v2/session-service-create-session.md): Create a new session. A token will be returned, which is required for further updates of the session.
- [Terminate an existing session](/apis/resources/session_service_v2/session-service-delete-session.md): Terminate your own session or if granted any other session.
- [Get a session](/apis/resources/session_service_v2/session-service-get-session.md): Get a session and all its information like the time of the user or password verification
- [Search sessions](/apis/resources/session_service_v2/session-service-list-sessions.md): Search for sessions
- [Update an existing session](/apis/resources/session_service_v2/session-service-set-session.md): Update an existing session with new information.
- [Settings](/apis/resources/settings_service_v2.md): This API is intended to manage settings in a ZITADEL instance.

- [Settings Service](/apis/resources/settings_service_v2/settings-service.md): This API is intended to manage settings in a ZITADEL instance.
- [Get the current active identity providers](/apis/resources/settings_service_v2/settings-service-get-active-identity-providers.md): Return the current active identity providers for the requested context
- [Get the current active branding settings](/apis/resources/settings_service_v2/settings-service-get-branding-settings.md): Return the current active branding settings for the requested context
- [Get the domain settings](/apis/resources/settings_service_v2/settings-service-get-domain-settings.md): Return the domain settings for the requested context
- [Get basic information over the instance](/apis/resources/settings_service_v2/settings-service-get-general-settings.md): Return the basic information of the instance for the requested context
- [Get Hosted Login Translation](/apis/resources/settings_service_v2/settings-service-get-hosted-login-translation.md): Returns the translations in the requested locale for the hosted login.
- [Get the legal and support settings](/apis/resources/settings_service_v2/settings-service-get-legal-and-support-settings.md): Return the legal settings for the requested context
- [Get the lockout settings](/apis/resources/settings_service_v2/settings-service-get-lockout-settings.md): Return the lockout settings for the requested context, which define when a user will be locked
- [Get the login settings](/apis/resources/settings_service_v2/settings-service-get-login-settings.md): Return the settings for the requested context
- [Get the password complexity settings](/apis/resources/settings_service_v2/settings-service-get-password-complexity-settings.md): Return the password complexity settings for the requested context
- [Get the password expiry settings](/apis/resources/settings_service_v2/settings-service-get-password-expiry-settings.md): Return the password expiry settings for the requested context
- [Get Security Settings](/apis/resources/settings_service_v2/settings-service-get-security-settings.md): Returns the security settings of the ZITADEL instance.
- [Set Hosted Login Translation](/apis/resources/settings_service_v2/settings-service-set-hosted-login-translation.md): Sets the input translations at the specified level (instance or organization) for the input language.
- [Set Security Settings](/apis/resources/settings_service_v2/settings-service-set-security-settings.md): Set the security settings of the ZITADEL instance.
- [System API](/apis/resources/system.md): This API is intended to manage the different ZITADEL instances within the system.

Checkout the guide how to access the ZITADEL System API.
- [System API](/apis/resources/system/system-api.md): This API is intended to configure and manage the different tenants whithin ZITADEL.
- [Adds a domain to an instance](/apis/resources/system/system-service-add-domain.md): Deprecated: Use [AddCustomDomain](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-add-custom-domain.api.mdx) instead to add a custom domain to the instance in context
- [Deprecated: Use CreateInstance instead
Creates a new instance with all needed setup data
This might take some time](/apis/resources/system/system-service-add-instance.md): Deprecated: Use CreateInstance instead
- [Creates a new quota
Returns an error if the quota already exists for the specified unit
Deprecated: use SetQuota instead](/apis/resources/system/system-service-add-quota.md): Creates a new quota
- [Sets many instance level limits](/apis/resources/system/system-service-bulk-set-limits.md): Sets many instance level limits
- [Truncates the delta of the change stream
be carefull with this function because ZITADEL has to
recompute the deltas after they got cleared.
Search requests will return wrong results until all deltas are recomputed](/apis/resources/system/system-service-clear-view.md): Truncates the delta of the change stream
- [Creates a new instance with all needed setup data
This might take some time](/apis/resources/system/system-service-create-instance.md): Creates a new instance with all needed setup data
- [Checks if a domain exists](/apis/resources/system/system-service-exists-domain.md): Deprecated: Use [ListCustomDomains](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-custom-domains.api.mdx) instead to check existence of an instance
- [Returns the detail of an instance](/apis/resources/system/system-service-get-instance.md): Deprecated: Use [GetInstance](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-get-instance.api.mdx) instead to get the details of the instance in context
- [Indicates if ZITADEL is running.
It respondes as soon as ZITADEL started](/apis/resources/system/system-service-healthz.md): Indicates if ZITADEL is running.
- [List Domains](/apis/resources/system/system-service-list-domains.md): Deprecated: use [instance service v2 ListCustomDomains](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-custom-domains.api.mdx) instead.
- [Returns event descriptions which cannot be processed.
It's possible that some events need some retries.
For example if the SMTP-API wasn't able to send an email at the first time](/apis/resources/system/system-service-list-failed-events.md): Returns event descriptions which cannot be processed.
- [Returns all instance members matching the request
all queries need to match (ANDed)
Deprecated: Use the Admin APIs ListIAMMembers instead](/apis/resources/system/system-service-list-iam-members.md): Returns all instance members matching the request
- [Returns a list of ZITADEL instances](/apis/resources/system/system-service-list-instances.md): Deprecated: Use [ListInstances](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-list-instances.api.mdx) instead to list instances
- [Returns all stored read models of ZITADEL
views are used for search optimisation and optimise request latencies
they represent the delta of the event happend on the objects](/apis/resources/system/system-service-list-views.md): Returns all stored read models of ZITADEL
- [Removes the domain of an instance](/apis/resources/system/system-service-remove-domain.md): Deprecated: Use [RemoveDomain](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-remove-custom-domain.api.mdx) instead to remove a custom domain from the instance in context
- [Deletes the event from failed events view.
the event is not removed from the change stream
This call is usefull if the system was able to process the event later.
e.g. if the second try of sending an email was successful. the first try produced a
failed event. You can find out if it worked on the `failure_count`](/apis/resources/system/system-service-remove-failed-event.md): Deletes the event from failed events view.
- [Removes an instance
This might take some time](/apis/resources/system/system-service-remove-instance.md): Deprecated: Use [DeleteInstance](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-delete-instance.api.mdx) instead to delete an instance
- [Removes a quota](/apis/resources/system/system-service-remove-quota.md): Removes a quota
- [Resets instance level limits](/apis/resources/system/system-service-reset-limits.md): Resets instance level limits
- [Set a feature flag on an instance](/apis/resources/system/system-service-set-instance-feature.md): Set a feature flag on an instance
- [Sets instance level limits](/apis/resources/system/system-service-set-limits.md): Sets instance level limits
- [Sets the primary domain of an instance](/apis/resources/system/system-service-set-primary-domain.md): Sets the primary domain of an instance
- [Sets quota configuration properties
Creates a new quota if it doesn't exist for the specified unit](/apis/resources/system/system-service-set-quota.md): Sets quota configuration properties
- [Updates name of an existing instance](/apis/resources/system/system-service-update-instance.md): Deprecated: Use [UpdateInstance](apis/resources/instance_service_v2/zitadel-instance-v-2-beta-instance-service-update-instance.api.mdx) instead to update the name of the instance in context
- [User](/apis/resources/user_service_v2.md): This API is intended to manage users in a ZITADEL instance.

- [User Service](/apis/resources/user_service_v2/user-service.md): This API is intended to manage users in a ZITADEL instance.
- [Create a new human user](/apis/resources/user_service_v2/user-service-add-human-user.md): Deprecated: Use [CreateUser](apis/resources/user_service_v2/user-service-create-user.api.mdx) to create a new user of type human instead.
- [Add link to an identity provider to an user](/apis/resources/user_service_v2/user-service-add-idp-link.md): Add link to an identity provider to an user..
- [Add a Key](/apis/resources/user_service_v2/user-service-add-key.md): Add a keys that can be used to securely authenticate at the Zitadel APIs using JWT profile authentication using short-lived tokens.
- [Add OTP Email for a user](/apis/resources/user_service_v2/user-service-add-otp-email.md): Add a new One-Time Password (OTP) Email factor to the authenticated user. OTP Email will enable the user to verify a OTP with the latest verified email. The email has to be verified to add the second factor..
- [Add OTP SMS for a user](/apis/resources/user_service_v2/user-service-add-otpsms.md): Add a new One-Time Password (OTP) SMS factor to the authenticated user. OTP SMS will enable the user to verify a OTP with the latest verified phone number. The phone number has to be verified to add the second factor..
- [Add a Personal Access Token](/apis/resources/user_service_v2/user-service-add-personal-access-token.md): Personal access tokens (PAT) are the easiest way to authenticate to the Zitadel APIs.
- [Add a Users Secret](/apis/resources/user_service_v2/user-service-add-secret.md): Generates a client secret for the user.
- [Create an invite code for a user](/apis/resources/user_service_v2/user-service-create-invite-code.md): Create an invite code for a user to initialize their first authentication method (password, passkeys, IdP) depending on the organization's available methods.
- [Create a passkey registration link for a user](/apis/resources/user_service_v2/user-service-create-passkey-registration-link.md): Create a passkey registration link which includes a code and either return it or send it to the user..
- [Create a User](/apis/resources/user_service_v2/user-service-create-user.md): Create a new human or machine user in the specified organization.
- [Deactivate user](/apis/resources/user_service_v2/user-service-deactivate-user.md): The state of the user will be changed to 'deactivated'. The user will not be able to log in anymore. The endpoint returns an error if the user is already in the state 'deactivated'. Use deactivate user when the user should not be able to use the account anymore, but you still need access to the user data..
- [Delete user](/apis/resources/user_service_v2/user-service-delete-user.md): The state of the user will be changed to 'deleted'. The user will not be able to log in anymore. Endpoints requesting this user will return an error 'User not found..
- [Delete User Metadata](/apis/resources/user_service_v2/user-service-delete-user-metadata.md): Delete metadata objects from an user with a specific key.
- [User by ID](/apis/resources/user_service_v2/user-service-get-user-by-id.md): Returns the full user object (human or machine) including the profile, email, etc..
- [MFA Init Skipped](/apis/resources/user_service_v2/user-service-human-mfa-init-skipped.md): Update the last time the user has skipped MFA initialization. The server timestamp is used.
- [UserService_ListAuthenticationFactors](/apis/resources/user_service_v2/user-service-list-authentication-factors.md): UserService_ListAuthenticationFactors
- [List all possible authentication methods of a user](/apis/resources/user_service_v2/user-service-list-authentication-method-types.md): List all possible authentication methods of a user like password, passwordless, (T)OTP and more..
- [List links to an identity provider of an user](/apis/resources/user_service_v2/user-service-list-idp-links.md): List links to an identity provider of an user.
- [Search Keys](/apis/resources/user_service_v2/user-service-list-keys.md): List all matching keys. By default all keys of the instance on which the caller has permission to read the owning users are returned.
- [List passkeys of an user](/apis/resources/user_service_v2/user-service-list-passkeys.md): List passkeys of an user
- [Search Personal Access Tokens](/apis/resources/user_service_v2/user-service-list-personal-access-tokens.md): List all personal access tokens. By default all personal access tokens of the instance on which the caller has permission to read the owning users are returned.
- [List User Metadata](/apis/resources/user_service_v2/user-service-list-user-metadata.md): List metadata of an user filtered by query.
- [Search Users](/apis/resources/user_service_v2/user-service-list-users.md): Search for users. By default, we will return all users of your instance that you have permission to read. Make sure to include a limit and sorting for pagination.
- [Lock user](/apis/resources/user_service_v2/user-service-lock-user.md): The state of the user will be changed to 'locked'. The user will not be able to log in anymore. The endpoint returns an error if the user is already in the state 'locked'. Use this endpoint if the user should not be able to log in temporarily because of an event that happened (wrong password, etc.)..
- [Request a code to reset a password](/apis/resources/user_service_v2/user-service-password-reset.md): Request a code to reset a password..
- [Reactivate user](/apis/resources/user_service_v2/user-service-reactivate-user.md): Reactivate a user with the state 'deactivated'. The user will be able to log in again afterward. The endpoint returns an error if the user is not in the state 'deactivated'..
- [Start the registration of passkey for a user](/apis/resources/user_service_v2/user-service-register-passkey.md): Start the registration of a passkey for a user, as a response the public key credential creation options are returned, which are used to verify the passkey..
- [Start the registration of a TOTP generator for a user](/apis/resources/user_service_v2/user-service-register-totp.md): Start the registration of a TOTP generator for a user, as a response a secret returned, which is used to initialize a TOTP app or device..
- [Start the registration of a u2f token for a user](/apis/resources/user_service_v2/user-service-register-u-2-f.md): Start the registration of a u2f token for a user, as a response the public key credential creation options are returned, which are used to verify the u2f token..
- [Remove link of an identity provider to an user](/apis/resources/user_service_v2/user-service-remove-idp-link.md): Remove link of an identity provider to an user.
- [Remove a Key](/apis/resources/user_service_v2/user-service-remove-key.md): Remove a machine users key by the given key ID and an optionally given user ID.
- [Remove One-Time Password (OTP) Email from a user](/apis/resources/user_service_v2/user-service-remove-otp-email.md): Remove the configured One-Time Password (OTP) Email factor of a user. As only one OTP Email per user is allowed, the user will not have OTP Email as a second factor afterward.
- [Remove One-Time Password (OTP) SMS from a user](/apis/resources/user_service_v2/user-service-remove-otpsms.md): Remove the configured One-Time Password (OTP) SMS factor of a user. As only one OTP SMS per user is allowed, the user will not have OTP SMS as a second factor afterward.
- [Remove passkey from a user](/apis/resources/user_service_v2/user-service-remove-passkey.md): Remove passkey from a user.
- [Remove a Personal Access Token](/apis/resources/user_service_v2/user-service-remove-personal-access-token.md): Removes a machine users personal access token by the given token ID and an optionally given user ID.
- [Delete the user phone](/apis/resources/user_service_v2/user-service-remove-phone.md): Deprecated: [Update the users phone field](apis/resources/user_service_v2/user-service-update-user.api.mdx) to remove the phone number.
- [Remove a Users Secret](/apis/resources/user_service_v2/user-service-remove-secret.md): Remove the current client ID and client secret from a machine user.
- [Remove TOTP generator from a user](/apis/resources/user_service_v2/user-service-remove-totp.md): Remove the configured TOTP generator of a user. As only one TOTP generator per user is allowed, the user will not have TOTP as a second factor afterward.
- [Remove u2f token from a user](/apis/resources/user_service_v2/user-service-remove-u-2-f.md): Remove u2f token from a user
- [Resend code to verify user email](/apis/resources/user_service_v2/user-service-resend-email-code.md): Resend code to verify user email
- [Resend an invite code for a user](/apis/resources/user_service_v2/user-service-resend-invite-code.md): Deprecated: Use [CreateInviteCode](apis/resources/user_service_v2/user-service-create-invite-code.api.mdx) instead.
- [Resend code to verify user phone number](/apis/resources/user_service_v2/user-service-resend-phone-code.md): Resend code to verify user phone number.
- [Retrieve the information returned by the identity provider](/apis/resources/user_service_v2/user-service-retrieve-identity-provider-intent.md): Retrieve the information returned by the identity provider for registration or updating an existing user with new information..
- [Send code to verify user email](/apis/resources/user_service_v2/user-service-send-email-code.md): Send code to verify user email
- [Change the user email](/apis/resources/user_service_v2/user-service-set-email.md): Deprecated: [Update the users email field](apis/resources/user_service_v2/user-service-update-user.api.mdx).
- [Change password](/apis/resources/user_service_v2/user-service-set-password.md): Deprecated: [Update the users password](apis/resources/user_service_v2/user-service-update-user.api.mdx) instead.
- [Set the user phone](/apis/resources/user_service_v2/user-service-set-phone.md): Deprecated: [Update the users phone field](apis/resources/user_service_v2/user-service-update-user.api.mdx).
- [Set User Metadata](/apis/resources/user_service_v2/user-service-set-user-metadata.md): Sets a list of key value pairs. Existing metadata entries with matching keys are overwritten. Existing metadata entries without matching keys are untouched. To remove metadata entries, use [DeleteUserMetadata](apis/resources/user_service_v2/user-service-delete-user-metadata.api.mdx). For HTTP requests, make sure the bytes array value is base64 encoded.
- [Start flow with an identity provider](/apis/resources/user_service_v2/user-service-start-identity-provider-intent.md): Start a flow with an identity provider, for external login, registration or linking..
- [Unlock user](/apis/resources/user_service_v2/user-service-unlock-user.md): The state of the user will be changed to 'active'. The user will be able to log in again. The endpoint returns an error if the user is not in the state 'locked'.
- [Update Human User](/apis/resources/user_service_v2/user-service-update-human-user.md): Deprecated: Use [UpdateUser](apis/resources/user_service_v2/user-service-update-user.api.mdx) to update a user of type human instead.
- [Update a User](/apis/resources/user_service_v2/user-service-update-user.md): Partially update an existing user.
- [Verify the email](/apis/resources/user_service_v2/user-service-verify-email.md): Verify the email with the generated code.
- [Verify an invite code for a user](/apis/resources/user_service_v2/user-service-verify-invite-code.md): Verify the invite code of a user previously issued. This will set their email to a verified state and
- [Verify a passkey for a user](/apis/resources/user_service_v2/user-service-verify-passkey-registration.md): Verify the passkey registration with the public key credential..
- [Verify the phone number](/apis/resources/user_service_v2/user-service-verify-phone.md): Verify the phone number with the generated code.
- [Verify a TOTP generator for a user](/apis/resources/user_service_v2/user-service-verify-totp-registration.md): Verify the TOTP registration with a generated code..
- [Verify a u2f token for a user](/apis/resources/user_service_v2/user-service-verify-u-2-f-registration.md): Verify the u2f token registration with the public key credential..
- [Web Key Service API](/apis/resources/webkey_service_v2.md): This API is intended to manage web keys for a ZITADEL instance, used to sign and validate OIDC tokens.

The public key endpoint (outside of this service) is used to retrieve the public keys of the active and inactive keys.

- [zitadel.webkey.v2](/apis/resources/webkey_service_v2/zitadel-webkey-v-2.md)
- [ActivateWebKey](/apis/resources/webkey_service_v2/zitadel-webkey-v-2-web-key-service-activate-web-key.md): Activate Web Key
- [CreateWebKey](/apis/resources/webkey_service_v2/zitadel-webkey-v-2-web-key-service-create-web-key.md): Create Web Key
- [DeleteWebKey](/apis/resources/webkey_service_v2/zitadel-webkey-v-2-web-key-service-delete-web-key.md): Delete Web Key
- [ListWebKeys](/apis/resources/webkey_service_v2/zitadel-webkey-v-2-web-key-service-list-web-keys.md): List Web Keys

#### saml

- [SAML Endpoints in ZITADEL](/apis/saml/endpoints.md): SAML 2.0 metadata

#### scim2

The Zitadel SCIM v2 service provider interface enables seamless integration of identity and

- [SCIM v2.0 (Preview)](/apis/scim2.md): The Zitadel SCIM v2 service provider interface enables seamless integration of identity and

#### services

APIs V1 organize access by context (authenticated user, organisation, instance, system), unlike resource-specific V2 APIs.

- [APIs V1 (GA)](/apis/services.md): APIs V1 organize access by context (authenticated user, organisation, instance, system), unlike resource-specific V2 APIs.

#### statuscodes

| GRPC Number    | GRPC Code                 | HTTP Status Code | HTTP Status Text             |Description                                                                                                                           |

- [GRPC Status Codes in ZITADEL](/apis/statuscodes.md): | GRPC Number    | GRPC Code                 | HTTP Status Code | HTTP Status Text             |Description                                                                                                                           |

#### v2

APIs V2 organize access by resources (users, settings, etc.), unlike context-specific V1 APIs.

- [APIs V2 (Generally Available)](/apis/v2.md): APIs V2 organize access by resources (users, settings, etc.), unlike context-specific V1 APIs.

### category


#### apis

- [ActionService](/category/apis/resources/action_service_v2/action-service.md)
- [AdminService](/category/apis/resources/admin/admin-service.md)
- [Authentication Methods](/category/apis/resources/admin/authentication-methods.md)
- [Branding](/category/apis/resources/admin/branding.md)
- [Domain Settings](/category/apis/resources/admin/domain-settings.md)
- [Email Provider](/category/apis/resources/admin/email-provider.md)
- [Events](/category/apis/resources/admin/events.md)
- [Failed Events](/category/apis/resources/admin/failed-events.md)
- [Feature Restrictions](/category/apis/resources/admin/feature-restrictions.md)
- [General](/category/apis/resources/admin/general.md)
- [Identity Providers](/category/apis/resources/admin/identity-providers.md)
- [Import/Export](/category/apis/resources/admin/import-export.md)
- [Instance](/category/apis/resources/admin/instance.md)
- [Login Settings](/category/apis/resources/admin/login-settings.md)
- [Login Texts](/category/apis/resources/admin/login-texts.md)
- [Members](/category/apis/resources/admin/members.md)
- [Message Texts](/category/apis/resources/admin/message-texts.md)
- [Milestones](/category/apis/resources/admin/milestones.md)
- [Notification Providers](/category/apis/resources/admin/notification-providers.md)
- [Notification Settings](/category/apis/resources/admin/notification-settings.md)
- [Organizations](/category/apis/resources/admin/organizations.md)
- [Password Settings](/category/apis/resources/admin/password-settings.md)
- [Privacy Settings](/category/apis/resources/admin/privacy-settings.md)
- [Restrictions](/category/apis/resources/admin/restrictions.md)
- [Secrets](/category/apis/resources/admin/secrets.md)
- [Settings](/category/apis/resources/admin/settings.md): This API is intended to manage settings in a ZITADEL instance.

- [SMS Provider](/category/apis/resources/admin/sms-provider.md)
- [SMTP Configs](/category/apis/resources/admin/smtp-configs.md)
- [Views/Projections](/category/apis/resources/admin/views-projections.md)
- [ZITADEL Administrators](/category/apis/resources/admin/zitadel-administrators.md)
- [AppService](/category/apis/resources/application_service_v2/app-service.md)
- [General](/category/apis/resources/auth/general.md)
- [Policies](/category/apis/resources/auth/policies.md)
- [User](/category/apis/resources/auth/user.md): This API is intended to manage users in a ZITADEL instance.

- [User Authentication Factor](/category/apis/resources/auth/user-authentication-factor.md)
- [User Authorizations/Grants](/category/apis/resources/auth/user-authorizations-grants.md)
- [User Email](/category/apis/resources/auth/user-email.md)
- [User Memberships](/category/apis/resources/auth/user-memberships.md)
- [User Metadata](/category/apis/resources/auth/user-metadata.md)
- [User Password](/category/apis/resources/auth/user-password.md)
- [User Phone](/category/apis/resources/auth/user-phone.md)
- [User Profile](/category/apis/resources/auth/user-profile.md)
- [User Social Login](/category/apis/resources/auth/user-social-login.md)
- [User Tokens](/category/apis/resources/auth/user-tokens.md)
- [Users](/category/apis/resources/auth/users.md)
- [AuthorizationService](/category/apis/resources/authorization_service_v2/authorization-service.md)
- [FeatureService](/category/apis/resources/feature_service_v2/feature-service.md)
- [IdentityProviderService](/category/apis/resources/idp_service_v2/identity-provider-service.md)
- [InstanceService](/category/apis/resources/instance_service_v2/instance-service.md)
- [InternalPermissionService](/category/apis/resources/internal_permission_service_v2/internal-permission-service.md)
- [Actions](/category/apis/resources/mgmt/actions.md)
- [Applications](/category/apis/resources/mgmt/applications.md)
- [Authentication Methods](/category/apis/resources/mgmt/authentication-methods.md)
- [Branding](/category/apis/resources/mgmt/branding.md)
- [Domain Settings](/category/apis/resources/mgmt/domain-settings.md)
- [General](/category/apis/resources/mgmt/general.md)
- [Global](/category/apis/resources/mgmt/global.md)
- [Identity Providers](/category/apis/resources/mgmt/identity-providers.md)
- [Login Settings](/category/apis/resources/mgmt/login-settings.md)
- [Login Texts](/category/apis/resources/mgmt/login-texts.md)
- [Members](/category/apis/resources/mgmt/members.md)
- [Message Texts](/category/apis/resources/mgmt/message-texts.md)
- [Notification Settings](/category/apis/resources/mgmt/notification-settings.md)
- [Organization Metadata](/category/apis/resources/mgmt/organization-metadata.md)
- [Organizations](/category/apis/resources/mgmt/organizations.md)
- [Password Settings](/category/apis/resources/mgmt/password-settings.md)
- [Privacy Settings](/category/apis/resources/mgmt/privacy-settings.md)
- [Project Grants](/category/apis/resources/mgmt/project-grants.md)
- [Project Roles](/category/apis/resources/mgmt/project-roles.md)
- [Projects](/category/apis/resources/mgmt/projects.md)
- [Settings](/category/apis/resources/mgmt/settings.md): This API is intended to manage settings in a ZITADEL instance.

- [User Grants](/category/apis/resources/mgmt/user-grants.md)
- [User Human](/category/apis/resources/mgmt/user-human.md)
- [User Machine](/category/apis/resources/mgmt/user-machine.md)
- [User Metadata](/category/apis/resources/mgmt/user-metadata.md)
- [Users](/category/apis/resources/mgmt/users.md)
- [ZITADEL Administrators](/category/apis/resources/mgmt/zitadel-administrators.md)
- [OIDCService](/category/apis/resources/oidc_service_v2/oidc-service.md)
- [OrganizationService](/category/apis/resources/org_service_v2/organization-service.md)
- [OrganizationService](/category/apis/resources/org_service_v2beta/organization-service.md)
- [ProjectService](/category/apis/resources/project_service_v2/project-service.md)
- [SAMLService](/category/apis/resources/saml_service_v2/saml-service.md)
- [SessionService](/category/apis/resources/session_service_v2/session-service.md)
- [Settings](/category/apis/resources/settings_service_v2/settings.md): This API is intended to manage settings in a ZITADEL instance.

- [SettingsService](/category/apis/resources/settings_service_v2/settings-service.md)
- [failed events](/category/apis/resources/system/failed-events.md)
- [General](/category/apis/resources/system/general.md)
- [Limits](/category/apis/resources/system/limits.md)
- [Quotas](/category/apis/resources/system/quotas.md)
- [SystemService](/category/apis/resources/system/system-service.md)
- [Usage Control](/category/apis/resources/system/usage-control.md)
- [views](/category/apis/resources/system/views.md)
- [UserService](/category/apis/resources/user_service_v2/user-service.md)
- [WebKeyService](/category/apis/resources/webkey_service_v2/web-key-service.md)

### concepts

This part of our documentation contains ZITADEL specific or general concepts required to understand the system or our guides.

- [Concepts and Features](/concepts.md): This part of our documentation contains ZITADEL specific or general concepts required to understand the system or our guides.

#### architecture

- [How ZITADEL Processes and Stores Secrets](/concepts/architecture/secrets.md): In this chapter you can find information of how ZITADEL processes and stores secrets and credentials in a secure fashion.
- [Zitadel's Software Architecture](/concepts/architecture/software.md): Zitadel is built with two essential patterns. Event Sourcing (ES) and Command and Query Responsibility Segregation (CQRS).
- [Zitadel's Deployment Architecture](/concepts/architecture/solution.md): High Availability

#### eventstore

- [ZITADEL Database Structure](/concepts/eventstore/implementation.md): This documentation gives you an insight into the structure of the ZITADEL database.
- [ZITADEL Event Store](/concepts/eventstore/overview.md): ZITADEL is built on the Event Sourcing pattern, where changes are stored as events in an Event Store.

#### features

- [Account linking](/concepts/features/account-linking.md): ZITADEL supports linking of user accounts from different external identity providers such as social logins or enterprise IdPs.
- [ZITADEL Actions](/concepts/features/actions.md): By using ZITADEL actions, you can manipulate ZITADELs behavior on specific Events.
- [ZITADEL Actions v2](/concepts/features/actions_v2.md): By using ZITADEL actions V2, you can manipulate ZITADELs behavior on specific API calls, events or functions.
- [ZITADEL's In-built Audit Trail](/concepts/features/audit-trail.md): ZITADEL provides you with an built-in audit trail to track all changes and events over an unlimited period of time.
- [ZITADEL Console: Resource management and customization](/concepts/features/console.md): The ZITADEL console is a web-based interface designed to facilitate the management and administration of ZITADEL resources and configurations.
- [Custom domain](/concepts/features/custom-domain.md): A ZITADEL custom domain refers to the ability for organizations to personalize the authentication experience by using their own domain name rather than the default ZITADEL domain.
- [External user grant](/concepts/features/external-user-grant.md): ZITADEL's external user grant is a feature that allows you to grant access to projects within your organization to users from other organizations.
- [Identity Brokering](/concepts/features/identity-brokering.md): Link social logins and external identity providers with your identity management platform allowing users to login with their preferred identity provider.
- [Passkeys in ZITADEL: Passwordless phishing-resistant authentication](/concepts/features/passkeys.md): ZITADEL's passkeys feature enables passwordless authentication, offering a smoother and more secure login experience for your users. This document explains the essential details for developers.
- [Self Service in ZITADEL](/concepts/features/selfservice.md): ZITADEL allows users to perform many tasks themselves.

#### knowledge

- [Opaque Tokens in Zitadel: Enhancing Application Security](/concepts/knowledge/opaque-tokens.md): In the context of application security, robust authentication mechanisms are essential for safeguarding sensitive data and ensuring user trust.

#### principles

ZITADEL engineering and design principles

- [Principles](/concepts/principles.md): ZITADEL engineering and design principles

#### structure

- [Configure applications for your frontend and backend services and clients](/concepts/structure/applications.md): Applications are the entry point to your project.
- [Granted Project](/concepts/structure/granted_projects.md): Organization Grant
- [ZITADEL Instances](/concepts/structure/instance.md): Instance Structure
- [ZITADEL Managers](/concepts/structure/managers.md): Notes:
- [ZITADEL Organizations](/concepts/structure/organizations.md): More about how to configure your organization read our organization guide.
- [ZITADEL Settings and Policies](/concepts/structure/policies.md): Settings and policies are configurations of all the different parts of the instance or an organization. For all parts we have a suitable default in the instance.
- [Organize applications, services, and roles with projects](/concepts/structure/projects.md): To learn how to set up a project read this console guide here.
- [ZITADEL Users](/concepts/structure/users.md): Types of users

### examples


#### identity-proxy

- [OAuth 2.0 Proxy](/examples/identity-proxy/oauth2-proxy.md): OAuth2-proxy is a project which allows services to delegate the authentication flow to a IDP, for example ZITADEL

#### login

- [ZITADEL with Angular](/examples/login/angular.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Angular application.
- [ZITADEL with Flutter](/examples/login/flutter.md): This guide demonstrates how you integrate ZITADEL into a Flutter app. It refers to our example on GitHub
- [ZITADEL with Go](/examples/login/go.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Go web application.
- [ZITADEL with Java Spring Boot](/examples/login/java-spring.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Spring Boot web application.
- [ZITADEL with Next.js](/examples/login/nextjs.md): This is our Zitadel Next.js template. It shows how to authenticate as a user and retrieve user information from the OIDC endpoint.
- [ZITADEL with Next.js - A B2B Scenario](/examples/login/nextjs-b2b.md): This is our ZITADEL Next.js B2B template. It shows how to authenticate as a user with multiple organizations. The application shows your users roles on the selected organizations, other projects your organization is allowed to use and other users having a grant to use the application.
- [ZITADEL with Django Python](/examples/login/python-django.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Django Python application.
- [ZITADEL with React](/examples/login/react.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your React application.
- [ZITADEL with Symfony PHP](/examples/login/symfony.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Symfony PHP application.
- [ZITADEL with Vue](/examples/login/vue.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Vue application.

#### secure-api

- [ZITADEL with Go](/examples/secure-api/go.md): This integration guide shows you how to integrate ZITADEL into your Go API. It demonstrates how to secure your API using
- [ZITADEL with Java Spring Boot](/examples/secure-api/java-spring.md): This integration guide shows you how to integrate ZITADEL into your Java Spring Boot API. It demonstrates how to secure your API using
- [ZITADEL with Node.js (NestJS)](/examples/secure-api/nodejs-nestjs.md): This documentation section guides you through the process of integrating ZITADEL into your Node.js backend using the NestJS framework. The provided example demonstrates authentication using an OIDC (OAuth2) token introspection strategy with a ZITADEL service account for machine-to-machine communication.
- [ZITADEL with Pylon](/examples/secure-api/pylon.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Pylon service.
- [ZITADEL with Django Python](/examples/secure-api/python-django.md): This integration guide demonstrates the recommended way to incorporate ZITADEL into your Django Python application.
- [ZITADEL with Python](/examples/secure-api/python-flask.md): This example shows you how to secure a Python3 Flask API with both authentication and authorization using ZITADEL.

### guides


#### integrate

Integrate your users and application with ZITADEL. In this section you will find resource on how to authenticate your users, configure external identity providers, access the ZITADEL APIs to manage resources, and integrate with third party services and tools.

- [Integrate](/guides/integrate.md): Integrate your users and application with ZITADEL. In this section you will find resource on how to authenticate your users, configure external identity providers, access the ZITADEL APIs to manage resources, and integrate with third party services and tools.
- [Use Actions to integrate ZITADEL with your Favorite Services](/guides/integrate/actions.md): With the guides in this section you will learn how to use action to integrate Zitadel with your services.
- [Migrate from Actions v1 to v2](/guides/integrate/actions/migrate-from-v1.md): In this guide, you will have all necessary information to migrate from Actions v1 to Actions v2 with all currently available Flow Types.
- [Test Actions Event](/guides/integrate/actions/testing-event.md): This guide shows you how to leverage the ZITADEL actions feature to react to events in your ZITADEL instance.
- [Test Actions Function](/guides/integrate/actions/testing-function.md): This guide shows you how to leverage the ZITADEL actions feature to enhance different functions in your ZITADEL instance.
- [Test Actions Function Manipulation](/guides/integrate/actions/testing-function-manipulation.md): This guide shows you how to leverage the ZITADEL actions feature to enhance different functions in your ZITADEL instance.
- [Test Actions Request](/guides/integrate/actions/testing-request.md): This guide shows you how to leverage the ZITADEL actions feature to react to API requests in your ZITADEL instance.
- [Test Actions Request Manipulation](/guides/integrate/actions/testing-request-manipulation.md): This guide shows you how to leverage the ZITADEL actions feature to manipulate API requests in your ZITADEL instance.
- [Test Actions Request Signature Check](/guides/integrate/actions/testing-request-signature.md): This guide shows you how to leverage the ZITADEL actions feature to react to API requests in your ZITADEL instance.
- [Test Actions Response](/guides/integrate/actions/testing-response.md): This guide shows you how to leverage the ZITADEL actions feature to react to API responses in your ZITADEL instance.
- [Test Actions Response Manipulation](/guides/integrate/actions/testing-response-manipulation.md): This guide shows you how to leverage the ZITADEL actions feature to manipulate API responses in your ZITADEL instance.
- [Using Actions](/guides/integrate/actions/usage.md): The Action API provides a flexible mechanism for customizing and extending the functionality of ZITADEL. By allowing you to define targets and executions, you can implement custom workflows triggered on an API requests and responses, events or specific functions.
- [Embed Authenticated MongoDB Charts Using ZITADEL](/guides/integrate/authenticated-mongodb-charts.md): This integration guide shows how you can embed authenticated MongoDB Charts in your web application using ZITADEL as authentication provider.
- [OIDC Back-Channel Logout](/guides/integrate/back-channel-logout.md): The Back-Channel Logout implements OpenID Connect Back-Channel Logout 1.0
- [Streaming audit logs to external systems (SIEM/SOC)](/guides/integrate/external-audit-log.md): This document details integrating ZITADEL with external systems for streaming events and audit logs.
- [Profile Pre-filling from External IdP](/guides/integrate/identity-providers/additional-information.md): Automatically pre-fill user data
- [Configure Apple as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/apple.md): Open the Apple Identity Provider Template
- [Configure Entra ID as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/azure-ad-oidc.md): Open the Microsoft Identity Provider Template
- [Configure Entra ID as a SAML Service Provider in ZITADEL](/guides/integrate/identity-providers/azure-ad-saml.md): Entra ID SAML Configuration
- [Configure GitHub as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/github.md): Open the GitHub Identity Provider Template
- [Configure GitLab as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/gitlab.md): Open the GitLab Identity Provider Template
- [Configure Google as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/google.md): Open the Google Identity Provider Template
- [Let Users Login with Preferred Identity Provider](/guides/integrate/identity-providers/introduction.md): External Identity Providers and SSO authentication
- [JWT IdP](/guides/integrate/identity-providers/jwt_idp.md): Configure a JWT as an Identity Provider in ZITADEL
- [Configure Keycloak as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/keycloak.md): Open the Generic OIDC Provider Template
- [Configure LDAP as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/ldap.md): How it works
- [Configure LinkedIn as an OAuth Identity Provider in ZITADEL](/guides/integrate/identity-providers/linkedin-oauth.md): LinkedIn Configuration
- [Migrate from Generic Provider to specific Identity Provider](/guides/integrate/identity-providers/migrate.md): Migrate Generic OIDC Provider
- [Configure MockSAML as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/mocksaml.md): MockSAML is not intended for any production environment, only for test purposes
- [Configure OKTA as an OIDC Identity Provider in ZITADEL](/guides/integrate/identity-providers/okta-oidc.md): Open the Generic OIDC Provider Template
- [Configure OKTA as a SAML Identity Provider in ZITADEL](/guides/integrate/identity-providers/okta-saml.md): ZITADEL Configuration
- [Configure Local OpenLDAP as an Identity Provider in ZITADEL](/guides/integrate/identity-providers/openldap.md): This guide shows you how you can configure an LDAP server locally.
- [Login users with ZITADEL](/guides/integrate/login.md): Sign-in users and application with ZITADEL. In this section you will find resources on how to authenticate your users by using the hosted login via OpenID Connect and SAML. Follow our dedicated guides to build your custom login user interface, if you want to customize the login behavior further.
- [Build your own Login UI](/guides/integrate/login-ui.md): In the following guides you will learn how to create your own login UI with our APIs. The different scenarios like username/password, external identity provider, etc. will be shown.
- [Support for the Device Authorization Grant in a Custom Login UI](/guides/integrate/login-ui/device-auth.md): In case one of your applications requires the OAuth2 Device Authorization Grant this guide will show you how to implement
- [Handle External Logins in a Custom Login UI](/guides/integrate/login-ui/external-login.md): Flow
- [Logging Out via a Custom Login UI](/guides/integrate/login-ui/logout.md)
- [Multi-Factor Authentication (MFA) in a Custom Login UI](/guides/integrate/login-ui/mfa.md): Multi-factor authentication (MFA) is a multi-step account authentication which requires to user to enter more than only the password.
- [Support for the OpenID Connect(OIDC) Standard in a Custom Login UI](/guides/integrate/login-ui/oidc-standard.md): To build your own login ui for your own application it is not necessary to have the OIDC standard included or any additional work that has to be done.
- [Using Passkeys in a Custom Login UI](/guides/integrate/login-ui/passkey.md): Passkeys are a replacement for passwords that provide faster, easier, and more secure sign-ins to websites and apps even across multiple devices.
- [Password Reset/Change in a Custom Login UI](/guides/integrate/login-ui/password-reset.md): When a user is on the password screen and has forgotten the password you will probably want them to be able to reset it by themselves.
- [Support for the SAML Standard in a Custom Login UI](/guides/integrate/login-ui/saml-standard.md): To build your own login ui for your own application it is not necessary to have the SAML standard included or any additional work that has to be done.
- [Select Account in a Custom Login UI](/guides/integrate/login-ui/select-account.md)
- [How to Handle Session Validation](/guides/integrate/login-ui/session-validation.md): Sessions represent the state of a user session in ZITADEL. They can be aggregated and updated over time to reflect
- [Typescript Repository](/guides/integrate/login-ui/typescript-repo.md): To replace our current golang built login UI and showcase the use of our new resource, session and OIDC APIs, we've created the Typescript Repository.
- [Register and Login User with Password in a Custom Login UI](/guides/integrate/login-ui/username-password.md): Flow
- [Login users into your application with a hosted login UI](/guides/integrate/login/hosted-login.md): ZITADEL provides a hosted single-sign-on page to securely sign-in users to your applications.
- [Log users into your application with different authentication options](/guides/integrate/login/login-users.md): ZITADEL is a comprehensive identity and access management platform designed to streamline user authentication, authorization, and management processes for your application. It offers a range of features, including single sign-on (SSO), multi-factor authentication (MFA), and centralized user management.
- [Authenticate users with OpenID Connect (OIDC)](/guides/integrate/login/oidc.md): This guide explains how to utilize ZITADEL for user authentication within your applications using OpenID Connect (OIDC). Here, we offer comprehensive guidance on seamlessly integrating ZITADEL's authentication features, ensuring both security and user experience excellence. Throughout this documentation, we'll cover the setup process for ZITADEL authentication, including the recommended OIDC flows tailored to different application types. Additionally, we'll provide clear instructions on securely signing out or logging out users from your application, ensuring data security and user privacy. With our guidance, you'll be equipped to leverage ZITADEL's authentication capabilities effectively, enhancing your application's security posture while delivering a seamless login experience for your users.
- [Integrating Your Application with ZITADEL using RFC 8628 OAuth 2.0 Device Authorization Flow](/guides/integrate/login/oidc/device-authorization.md): ZITADEL implements device authorization as per RFC 8628. This document demonstrates its use.
- [Authenticate users with OpenID Connect](/guides/integrate/login/oidc/login-users.md): Overview
- [Log Out Users from an Application with ZITADEL](/guides/integrate/login/oidc/logout.md): This guide shows you the different concepts and use cases of the logout process and how to use it in ZITADEL.
- [Recommended authorization flows with OpenID Connect (OIDC) and OAuth 2.x](/guides/integrate/login/oidc/oauth-recommended-flows.md): Introduction
- [OpenID Connect and Oauth2 web keys](/guides/integrate/login/oidc/webkeys.md): Web Keys in ZITADEL are used to sign and verify JSON Web Tokens (JWT).
- [Authenticate users with SAML](/guides/integrate/login/saml.md): SAML stands for Security Assertion Markup Language. It is a standard commonly used for identity federation and single sign-on (SSO). It is one of the original and most popular standards for SSO. Although it is prone to certain security flaws and exploits if not implemented correctly, it remains relevant and widely used.
- [Onboard Customers and Users](/guides/integrate/onboarding.md): When building your own application, one of the first questions you have to face, is 'How do my customers onboard to my application?'
These guides will explain the built-in solution for onboarding new tenants, customers, and users and how you can handle more advanced onboarding use cases. 
- [Onboard B2B customers using organizations](/guides/integrate/onboarding/b2b.md): In this guide we will explain how you can create and set up new organizations in ZITADEL to help you with your onboarding flows.
- [Onboard Users](/guides/integrate/onboarding/end-users.md): End Users have three different possibilities on how to login with ZITADEL.
- [Retrieve User Roles in ZITADEL](/guides/integrate/retrieve-user-roles.md): This guide explains all the possible ways of retrieving user roles across different organizations and projects using ZITADEL's APIs.
- [SCIM Provisioning from Okta](/guides/integrate/scim-okta-guide.md): This guide provides step-by-step instructions to configure SCIM provisioning from Okta into ZITADEL.
- [Authenticate service users and client applications](/guides/integrate/service-users/authenticate-service-users.md): This guide explains ZITADEL service users and their role in facilitating secure machine-to-machine communication within your applications.
- [Configure client credential authentication for service users](/guides/integrate/service-users/client-credentials.md): This guide demonstrates how developers can leverage Client Credential authentication to secure communication between service users and client applications within ZITADEL.
- [Configure personal access token authentication for service users](/guides/integrate/service-users/personal-access-token.md): A Personal Access Token (PAT) is a ready to use token which can be used as Authorization header.
- [Configure private key JWT authentication for service users](/guides/integrate/service-users/private-key-jwt.md): This guide demonstrates how developers can leverage private key JWT authentication to secure communication between service users and client applications within ZITADEL.
- [Integrate ZITADEL with your Favorite Services](/guides/integrate/services.md): With the guides in this section you will learn how to integrate ZITADEL with your services.
- [Log in with ZITADEL on Atlassian through SAML 2.0](/guides/integrate/services/atlassian-saml.md): This guide shows how to enable login with ZITADEL on Atlassian.
- [Log in with ZITADEL on Auth0 through OIDC](/guides/integrate/services/auth0-oidc.md): This guide shows how to enable login with ZITADEL on Auth0.
- [Log in with ZITADEL on Auth0 through SAML 2.0](/guides/integrate/services/auth0-saml.md): This guide shows how to enable login with ZITADEL on Auth0.
- [Log in with ZITADEL on AWS through SAML 2.0](/guides/integrate/services/aws-saml.md): This guide shows how to enable login with ZITADEL on AWS SSO.
- [Configure ZITADEL as an OIDC Identity Provider on Cloudflare Zero Trust](/guides/integrate/services/cloudflare-oidc.md): This guide shows how to configure ZITADEL as OpenID Connect identity provider for Cloudflare Zero Trust.
- [Log in with ZITADEL on Gitlab through SAML 2.0](/guides/integrate/services/gitlab-saml.md): This guide shows how to enable login with ZITADEL on Gitlab.
- [Log in with ZITADEL on Gitlab OmniAuth Provider](/guides/integrate/services/gitlab-self-hosted.md): This guide shows how to enable login with ZITADEL on self-hosted Gitlab instances.
- [Log in with ZITADEL on Google Cloud with Workforce Identity Federation (OIDC)](/guides/integrate/services/google-cloud.md): This guide shows how to login users and assign roles with Workforce Identity Federation to Google Cloud.
- [Google Workspace SSO with ZITADEL](/guides/integrate/services/google-workspace.md): This guide shows how to enable login with ZITADEL on Google Workspace.
- [Log in with ZITADEL on Ping Identity through SAML 2.0](/guides/integrate/services/pingidentity-saml.md): This guide shows how to enable login with ZITADEL on Ping Identity.
- [Impersonation and delegation using Token Exchange](/guides/integrate/token-exchange.md): The Token Exchange grant implements RFC 8693, OAuth 2.0 Token Exchange and can be used to exchange tokens to a different scope, audience or subject. Changing the subject of an authenticated token is called impersonation or delegation. This guide will explain how token exchange is implemented inside ZITADEL and gives some usage examples.
- [Token introspection](/guides/integrate/token-introspection.md): Token introspection is the process of checking whether an access token is valid and can be used to access protected resources.
- [Basic Authentication in ZITADEL](/guides/integrate/token-introspection/basic-auth.md): This is a guide on how to secure your API using Basic Authentication.
- [JSON Web Token Profile in ZITADEL](/guides/integrate/token-introspection/private-key-jwt.md): This is a guide on how to secure your API using JSON Web Token (JWT) profile (recommended).
- [Integrate ZITADEL with your Tools](/guides/integrate/tools.md): With the guides in this section you will learn how to integrate ZITADEL with your favorite tools.
- [Apache 2.0](/guides/integrate/tools/apache2.md): This integration guide shows you the basic OpenID Connect integration with ZITADEL and an Apache 2.0 server.
- [Access ZITADEL APIs](/guides/integrate/zitadel-apis/access-zitadel-apis.md): This guide explains what ZITADEL APIs are and how to access ZITADEL APIs using a service user to manage all types of resources and settings.
- [Access ZITADEL System API](/guides/integrate/zitadel-apis/access-zitadel-system-api.md): This guide focuses on the ZITADEL System API. To access the other APIs (Admin, Auth, Management), please checkout this guide.
- [Get Events from ZITADEL](/guides/integrate/zitadel-apis/event-api.md): ZITADEL leverages the power of eventsourcing, meaning every action and change within the system generates a corresponding event that is stored in the database.
- [Integrate ZITADEL APIs into a .NET Application](/guides/integrate/zitadel-apis/example-zitadel-api-with-dot-net.md): This integration guide shows you how to integrate ZITADEL into your .NET application.
- [Integrate ZITADEL APIs into a Go Application](/guides/integrate/zitadel-apis/example-zitadel-api-with-go.md): This integration guide shows you how to integrate ZITADEL into your Go application.

#### manage

- [Billing](/guides/manage/cloud/billing.md): Billing
- [ZITADEL Instances](/guides/manage/cloud/instances.md): The ZITADEL Customer Portal is used to manage all your different ZITADEL instances.
- [Overview](/guides/manage/cloud/overview.md): Our customer portal is used to manage all your ZITADEL instances. You can also manage your subscriptions, billing, newsletters and support requests.
- [Settings](/guides/manage/cloud/settings.md): In the settings you can change your team name, notification settings and delete your team.
- [Getting Started with ZITADEL](/guides/manage/cloud/start.md): If you are new to ZITADEL your first action is to create your first ZITADEL instance and an account to access the ZITADEL Customer Portal.
- [ZITADEL Support](/guides/manage/cloud/support.md): We describe our support services and information required in more detail in our legal section. Beware that not all features may be supported by your subscription and consult the support states.
- [Customer Portal Administrators](/guides/manage/cloud/users.md): Manage all your administrators who are allowed to access the Customer Portal.
- [ZITADEL Actions](/guides/manage/console/actions.md): An Identity and Management system is a very interactive place. ZITADEL has built in functionality to react to its events. This functionality is called Actions and can be accessed from your organizations top navigation.
- [ZITADEL Applications](/guides/manage/console/applications.md): What is an application?
- [ZITADEL Default Settings](/guides/manage/console/default-settings.md): Default settings work as default or fallback settings for your organizational settings. Most of the time you only have to set default settings for the cases where you don't need specific behavior in the organizations themselves or you only have one organization.
- [ZITADEL Managers](/guides/manage/console/managers.md): To configure managers in ZITADEL go to the resource where you like to add it (e.g Instance, Organization, Project, GrantedProject).
- [ZITADEL Organizations](/guides/manage/console/organizations.md): What is an organization?
- [ZITADEL Console](/guides/manage/console/overview.md): What is console?
- [ZITADEL Projects](/guides/manage/console/projects.md): What is a project?
- [ZITADEL Roles and Authorizations](/guides/manage/console/roles.md): If you would build out the POS use case example you would probably need an application for administration.
- [ZITADEL Users](/guides/manage/console/users.md): ZITADEL differs two different types of users:
- [Behavior Customization](/guides/manage/customize/behavior.md): In this guide, you will create a ZITADEL action.
- [Brand Customization](/guides/manage/customize/branding.md): ZITADEL offers various customization options for your projects brand design. The branding can be configured on two different levels.
- [SMS, SMTP and HTTP Provider for Notifications](/guides/manage/customize/notification-providers.md): ZITADEL can send messages to users via different notification providers, such as SMS, SMTP, or Webhook (HTTP Provider).
- [Feature Restrictions](/guides/manage/customize/restrictions.md): New self-hosted and ZITADEL Cloud instances are unrestricted by default.
- [Customized Texts](/guides/manage/customize/texts.md): You are able to customize the texts used from ZITADEL. This is possibly on the instance or organization level.
- [User Metadata](/guides/manage/customize/user-metadata.md): This guide shows you how to request metadata from a user.
- [User Schema](/guides/manage/customize/user-schema.md): ZITADEL allows you to define schemas for users, based on the JSON Schema Standard.
- [ZITADEL Terraform Provider](/guides/manage/terraform-provider.md): The ZITADEL Terraform Provider is a tool that allows you to manage ZITADEL resources through Terraform.
- [Register and Create User](/guides/manage/user/reg-create-user.md): The ZITADEL API has different possibilities to create users.
- [SCIM v2.0 (Preview)](/guides/manage/user/scim2.md): The Zitadel SCIM v2 service provider interface enables seamless integration of identity and

#### migrate

- [Migrate to ZITADEL](/guides/migrate/introduction.md): This section of guides shows you how to migrate from your current auth system to ZITADEL.
- [Migrate from Auth0 to ZITADEL (Including Password Hashes)](/guides/migrate/sources/auth0.md): 1. Introduction
- [Migrate from Keycloak](/guides/migrate/sources/keycloak.md): 1. Introduction
- [Migrate from ZITADEL](/guides/migrate/sources/zitadel.md): This guide explains how to migrate from ZITADEL, this includes
- [Migrate Users](/guides/migrate/users.md): Migrating users from an existing system, while minimizing impact on said users, can be a challenging task.

#### overview

Most applications require user identity for access control, secure data storage in the cloud, and to provide a consistent, personalized experience across all of a user's devices.

- [ZITADEL Documentation](/guides/overview.md): Most applications require user identity for access control, secure data storage in the cloud, and to provide a consistent, personalized experience across all of a user's devices.

#### solution-scenarios

- [Authentication and authorization in multi-tenancy B2B scenarios](/guides/solution-scenarios/b2b.md): Business to Business
- [ZITADEL for B2C Scenarios](/guides/solution-scenarios/b2c.md): Business to Consumer
- [Configure ZITADEL for your Scenario](/guides/solution-scenarios/configurations.md): Each customer does have different needs and use-cases. In ZITADEL you are able to configure your settings depending on your needs.
- [Domain Discovery in ZITADEL](/guides/solution-scenarios/domain-discovery.md): This guide should explain how domain discovery works and how to configure it in ZITADEL.
- [Frontend and Back-end API Communication in ZITADEL](/guides/solution-scenarios/frontend-calling-backend-API.md): This guide contains a use case and ZITADEL integration.
- [Solution Scenarios](/guides/solution-scenarios/introduction.md): Customers of an SaaS Identity and access management system usually have all distinct use cases and requirements. This guide attempts to explain real-world implementations and break them down into solution scenarios which aim to help you getting started with ZITADEL.
- [Prevent users from accessing ZITADEL console](/guides/solution-scenarios/restrict-console.md): ZITADEL includes a console that allows Managers to configure all resources. All uses, including end-users, by default, view and manage their profile information.
- [Set up a SaaS Product with Authentication and Authorization using ZITADEL](/guides/solution-scenarios/saas.md): This is an example architecture for a typical SaaS product.

#### start

- [The ZITADEL Quick Start Guide](/guides/start/quickstart.md): In this quick start guide, we will be learning some fundamentals on how to set up ZITADEL for user management and application security. Thereafter, we will secure a React-based Single Page Application (SPA) using ZITADEL.

### legal

This section contains important agreements, policies and appendices relevant for users of our websites and services. All documents will be provided in English language.

- [Legal Agreements](/legal.md): This section contains important agreements, policies and appendices relevant for users of our websites and services. All documents will be provided in English language.

#### annex-support-services

Last updated on November 15, 2023

- [Annex for ZITADEL Enterprise and Support Services](/legal/annex-support-services.md): Last updated on November 15, 2023

#### data-processing-agreement

Last updated on May 8, 2025

- [Data Processing Agreement](/legal/data-processing-agreement.md): Last updated on May 8, 2025

#### policies

Policies and guidelines in addition to our terms of services.

- [Policies](/legal/policies.md): Policies and guidelines in addition to our terms of services.
- [Acceptable Use Policy](/legal/policies/acceptable-use-policy.md): Last updated on November 15, 2023
- [ZITADEL Account Lockout Policy](/legal/policies/account-lockout-policy.md): Last updated on June 25, 2025
- [Use of brands and trademarks](/legal/policies/brand-trademark-policy.md): Last updated on November 15, 2023
- [Feature Development Policy](/legal/policies/feature-development-policy.md): Last updated on September 25, 2023
- [Privacy Policy](/legal/policies/privacy-policy.md): Last updated on 20 March, 2025
- [Rate Limit Policy](/legal/policies/rate-limit-policy.md): Last updated on February 24, 2025
- [Vulnerability Disclosure Policy](/legal/policies/vulnerability-disclosure-policy.md): Last updated on March 16, 2023

#### service-description

Description of services and service levels for ZITADEL Cloud and Enterprise subscriptions.

- [Service description](/legal/service-description.md): Description of services and service levels for ZITADEL Cloud and Enterprise subscriptions.
- [Service description for ZITADEL Cloud and ZITADEL Enterprise](/legal/service-description/cloud-service-description.md): Last updated on April 5, 2024
- [Service level description for ZITADEL Cloud](/legal/service-description/service-level-description.md): Last updated on November 15, 2023
- [Support service description for ZITADEL](/legal/service-description/support-services.md): Last updated on November 15, 2023

#### subprocessors

Last updated on December 5, 2025.

- [Third party sub-processors for ZITADEL](/legal/subprocessors.md): Last updated on December 5, 2025.

#### terms-of-service

Last updated on November 15, 2023

- [Terms of Service Agreement](/legal/terms-of-service.md): Last updated on November 15, 2023

### product


#### release-cycle

We release a new major version of our software every three months. This predictable schedule allows us to introduce significant features and enhancements in a structured way.

- [Release Cycle](/product/release-cycle.md): We release a new major version of our software every three months. This predictable schedule allows us to introduce significant features and enhancements in a structured way.

#### roadmap

Timeline and Overview

- [Zitadel Release Versions and Roadmap](/product/roadmap.md): Timeline and Overview

### sdk-examples


#### angular

Angular is a popular JavaScript framework for building single-page applications (SPAs) that is known for its two-way data binding, dependency injection, and modular architecture.

- [Angular](/sdk-examples/angular.md): Angular is a popular JavaScript framework for building single-page applications (SPAs) that is known for its two-way data binding, dependency injection, and modular architecture.

#### client-libraries

- [Java Client](/sdk-examples/client-libraries/java.md): This guide covers the official Zitadel Management API Client for the JVM (Java 11+), which allows you to programmatically manage resources in your Zitadel instance.
- [Node.js Client](/sdk-examples/client-libraries/node.md): This guide covers the official Zitadel Management API Client for Node.js (20+), which allows you to programmatically manage resources in your Zitadel instance.
- [PHP Client](/sdk-examples/client-libraries/php.md): This guide covers the official Zitadel Management API Client for PHP, which allows you to programmatically manage resources in your Zitadel instance.
- [Python Client](/sdk-examples/client-libraries/python.md): This guide covers the official Zitadel Management API Client for Python (3.9+), which allows you to programmatically manage resources in your Zitadel instance.
- [Ruby Client](/sdk-examples/client-libraries/ruby.md): This guide covers the official Zitadel Management API Client for Ruby (3.1+), which allows you to programmatically manage resources in your Zitadel instance.

#### flutter

Flutter is a cross-platform mobile app development framework that allows developers to build native iOS and Android apps using a single codebase.

- [Flutter](/sdk-examples/flutter.md): Flutter is a cross-platform mobile app development framework that allows developers to build native iOS and Android apps using a single codebase.

#### go

Go is an open-source, compiled programming language that is known for its simplicity, efficiency, and concurrency capabilities.

- [Go](/sdk-examples/go.md): Go is an open-source, compiled programming language that is known for its simplicity, efficiency, and concurrency capabilities.

#### introduction

You can integrate ZITADEL quickly into your application and be up and running within minutes.

- [Examples and SDKs for ZITADEL](/sdk-examples/introduction.md): You can integrate ZITADEL quickly into your application and be up and running within minutes.

#### java

Java is a general-purpose programming language designed for object-oriented programming.

- [Java Spring Boot](/sdk-examples/java.md): Java is a general-purpose programming language designed for object-oriented programming.

#### nestjs

NestJS is a comprehensive and well-maintained TypeScript-based framework for building large-scale, scalable, and maintainable Node.js applications.

- [NestJS](/sdk-examples/nestjs.md): NestJS is a comprehensive and well-maintained TypeScript-based framework for building large-scale, scalable, and maintainable Node.js applications.

#### nextjs

Next.js is a React-based framework that provides a powerful and flexible set of tools for building high-performance, SEO-friendly web applications.

- [Next.js](/sdk-examples/nextjs.md): Next.js is a React-based framework that provides a powerful and flexible set of tools for building high-performance, SEO-friendly web applications.

#### python-django

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.

- [Python Django](/sdk-examples/python-django.md): Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.

#### python-flask

Flask is a lightweight and easy-to-use microframework for Python web development.

- [Python Flask](/sdk-examples/python-flask.md): Flask is a lightweight and easy-to-use microframework for Python web development.

#### react

React

- [React](/sdk-examples/react.md): React

#### symfony

Symfony is a high-performance PHP framework that provides a solid foundation for building scalable and maintainable web applications.

- [Symfony PHP Framework](/sdk-examples/symfony.md): Symfony is a high-performance PHP framework that provides a solid foundation for building scalable and maintainable web applications.

#### vue

Vue.js is a JavaScript framework for building user interfaces that is simple, flexible, and versatile.

- [Vue.js](/sdk-examples/vue.md): Vue.js is a JavaScript framework for building user interfaces that is simple, flexible, and versatile.

### self-hosting


#### deploy

- [Set up Zitadel with Docker Compose](/self-hosting/deploy/compose.md): This guide is the entrypoint for running the Zitadel platform locally for the first time.
- [Developing ZITADEL with Dev Containers](/self-hosting/deploy/devcontainer.md): Dev containers provide a convenient way to set up a development environment for ZITADEL with all the necessary dependencies pre-configured. This allows you to start contributing or working on ZITADEL locally with minimal setup.
- [Set up ZITADEL on Kubernetes](/self-hosting/deploy/kubernetes.md): For getting started with an easily testable insecure setup with Postgres, follow the Insecure Postgres Example.
- [Install Zitadel on Linux](/self-hosting/deploy/linux.md): Be aware! This guide does not work for the newly updated version of Zitadel 4! Learn more
- [Install ZITADEL on MacOS](/self-hosting/deploy/macos.md): Install PostgreSQL
- [Deploy ZITADEL](/self-hosting/deploy/overview.md): Choose your platform and run ZITADEL with the most minimal configuration possible.
- [Troubleshoot ZITADEL](/self-hosting/deploy/troubleshooting.md): Instance not found

#### manage

- [Caches](/self-hosting/manage/cache.md): ZITADEL supports the use of a caches to speed up the lookup of frequently needed objects. As opposed to HTTP caches which might reside between ZITADEL and end-user applications, the cache build into ZITADEL uses active invalidation when an object gets updated. Another difference is that HTTP caches only cache the result of a complete request and the built-in cache stores objects needed for the internal business logic. For example, each request made to ZITADEL needs to retrieve and set instance information in middleware.
- [Mirror data from cockroach to postgres](/self-hosting/manage/cli/mirror.md): The mirror command allows you to do database to database migrations. This functionality is useful to copy data from one database to another.
- [ZITADEL Command Line Interface](/self-hosting/manage/cli/overview.md): This documentation serves as your guide to interacting with Zitadel through the command line interface (CLI). The Zitadel CLI empowers you to manage various aspects of your Zitadel system efficiently from your terminal.
- [Configuration Options in ZITADEL](/self-hosting/manage/configure.md): This guide assumes you are familiar with running ZITADEL using the least amount of configuration possible.
- [External ZITADEL Access](/self-hosting/manage/custom-domain.md): Why do I get an "Instance not found" error?
- [Database Configuration](/self-hosting/manage/database.md): <Tabs
- [HTTP/2 Support in ZITADEL](/self-hosting/manage/http2.md): ZITADEL follows a strict API first approach and makes heavy use of the modern API framework called gRPC.
- [Connect your Self-Hosted Login UI to Zitadel](/self-hosting/manage/login-client.md): To enable your self-hosted Login UI to connect to the Zitadel API, it needs a token for a user with the IAMLOGINCLIENT role.
- [ZITADEL Production Setup](/self-hosting/manage/production.md): As soon as you successfully deployed ZITADEL as a proof of concept using one of our deployment guides,
- [ZITADEL Production Checklist](/self-hosting/manage/productionchecklist.md): To apply best practices to your production setup we created a step by step checklist you may wish to follow.
- [Configure Zitadel with Caddy](/self-hosting/manage/reverseproxy/caddy.md): You can either setup your environment for TLS mode external or TLS mode enabled.
- [Configure Zitadel with Cloudflare](/self-hosting/manage/reverseproxy/cloudflare.md): Settings
- [Configure Zitadel with Cloudflare Tunnel](/self-hosting/manage/reverseproxy/cloudflare_tunnel.md): The Cloudflare tunnel client currently has an issue which disallows it to force HTTP/2 usage towards the origin.
- [Configure Zitadel with Apache httpd](/self-hosting/manage/reverseproxy/httpd.md): You can either setup your environment for TLS mode disabled, TLS mode external or TLS mode enabled.
- [Configure Zitadel with NGINX](/self-hosting/manage/reverseproxy/nginx.md): You can either setup your environment for TLS mode disabled, TLS mode external or TLS mode enabled.
- [Reverse Proxy Configuration](/self-hosting/manage/reverseproxy/reverse_proxy.md): Check out one of the following guides to configure your favorite reverse proxy:
- [Configure Zitadel with Traefik](/self-hosting/manage/reverseproxy/traefik.md): You can either setup your environment for TLS mode disabled, TLS mode external or TLS mode enabled.
- [Front Zitadel Cloud with a CDN, WAF or Reverse Proxy](/self-hosting/manage/reverseproxy/zitadel_cloud.md): Fronting Zitadel Cloud
- [Service Ping](/self-hosting/manage/service_ping.md): Service Ping is a feature that periodically sends anonymized analytics and usage data from your ZITADEL system to a central endpoint.
- [TLS Modes](/self-hosting/manage/tls_modes.md): To run ZITADEL on any kind of infrastructure, you can configure on how to handle TLS connections.
- [Update and Scale ZITADEL](/self-hosting/manage/updating_scaling.md): TL;DR
- [Usage Control](/self-hosting/manage/usage_control.md): If you have a self-hosted ZITADEL environment, you can limit the usage of your instances.

### support


#### advisory

- [Technical Advisory 10000](/support/advisory/a10000.md): Date and Version
- [Technical Advisory 10001](/support/advisory/a10001.md): Date and Version
- [Technical Advisory 10002](/support/advisory/a10002.md): Date and Version
- [Technical Advisory 10003](/support/advisory/a10003.md): Date and Version
- [Technical Advisory 10004](/support/advisory/a10004.md): Date and Version
- [Technical Advisory 10005](/support/advisory/a10005.md): Date and Version
- [Technical Advisory 10006](/support/advisory/a10006.md): Date and Version
- [Technical Advisory 10007](/support/advisory/a10007.md): Date and Version
- [Technical Advisory 10008](/support/advisory/a10008.md): Date and Version
- [Technical Advisory 10009](/support/advisory/a10009.md): Date and Version
- [Technical Advisory 10010](/support/advisory/a10010.md): Date and Version
- [Technical Advisory 10011](/support/advisory/a10011.md): Date and Version
- [Technical Advisory 10012](/support/advisory/a10012.md): Date and Version
- [Technical Advisory 10013](/support/advisory/a10013.md): Date
- [Technical Advisory 10014](/support/advisory/a10014.md): Date
- [Technical Advisory 10015](/support/advisory/a10015.md): Date
- [Technical Advisory 10016](/support/advisory/a10016.md): Date

#### software-release-cycles-support

Support states

- [ZITADEL Support States and Software Release Cycle](/support/software-release-cycles-support.md): Support states

#### technical_advisory

Technical advisories are notices that report major issues with ZITADEL Self-Hosted or the ZITADEL Cloud platform that could potentially impact security or stability in production environments.

- [ZITADEL Technical Advisories](/support/technical_advisory.md): Technical advisories are notices that report major issues with ZITADEL Self-Hosted or the ZITADEL Cloud platform that could potentially impact security or stability in production environments.

#### troubleshooting

You will find some possible error messages here, what the problem is and what some possible solutions can be.

- [Troubleshoot ZITADEL](/support/troubleshooting.md): You will find some possible error messages here, what the problem is and what some possible solutions can be.
