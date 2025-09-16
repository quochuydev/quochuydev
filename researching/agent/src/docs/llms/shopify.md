# Shopify Developer Platform

The Shopify developer platform enables developers to create and customize applications, themes, and integrations for Shopify's e-commerce ecosystem. It provides robust APIs, development tools, and extensive documentation to facilitate the building of tailored solutions for merchants.

Here are some examples of what developers can build with Shopify:

* Build apps that extend the functionality of Shopify stores. For example, apps for inventory management, analytics and reporting, or customer loyalty programs.
* Extend Shopify’s checkout with extensions that change its UI or business logic.
* Customize a store’s theme to match the merchant’s brand or change the layout.
* Build online storefronts that allow buyers to shop in a merchant’s store.
* Provide custom admin workflows for merchants that are not included in the Shopify core product. For example, subscription management, email marketing, and live customer support.
* Integrate external systems like ERPs, CRMs, accounting systems into Shopify to import/export data.

## Apps

Shopify Apps are third-party applications that can be integrated into Shopify stores to enhance functionality and improve the e-commerce experience. These apps cover a wide range of features, including inventory management, marketing tools, customer support, shipping solutions, and analytics, allowing merchants to customize their stores according to their specific needs.

Developers can create their own apps using Shopify's APIs and resources, and they can publish them on the Shopify App Store for merchants to discover and install. This ecosystem supports a vibrant community of developers and provides merchants with numerous options to optimize their online businesses.

Shopify apps can appear in and add functionality to nearly every area of the Shopify platform. A single app can add functionality to multiple areas of the platform.

### Configuration and shopify.app.toml

When you initialize an app using the CLI (shopify app init CLI command) you will receive a folder structure that contains a `shopify.app.toml` file at the root. This file helps you describe what capabilities you want your app to have and Shopify ensures that this app configuration is then instantiated on every shop where the app is installed.

You can use scopes to configure the scopes that your app requires, and webhook subscriptions to detail out what events your app should receive.

```
name = "Example App"
client_id = "a61950a2cbd5f32876b0b55587ec7a27"
application_url = "https://www.app.example.com/"
embedded = true
handle = "example-app"

[access_scopes]
scopes = "read_products, write_products"

[access.admin]
direct_api_mode = "online"

[auth]
redirect_urls = [
  "https://app.example.com/api/auth/callback",
  "https://app.example.com/api/auth/oauth/callback",
]

[webhooks]
api_version = "2024-01"

[[webhooks.subscriptions]]
topics = [ "app/uninstalled" ]
compliance_topics = [ "customers/redact", "customers/data_request", "shop/redact" ]
uri = "/webhooks"

[app_proxy]
url = "https://app.example.com/api/proxy"
subpath = "store-pickup"
prefix = "apps"

[pos]
embedded = false

[app_preferences]
url = "https://www.app.example.com/preferences"

[build]
automatically_update_urls_on_dev = false
include_config_on_deploy = true

```

If you are working with multiple environments (dev, staging, production) it is recommended that you have a different `shopify.app.toml` file for each environment.  The Shopify CLI makes this easy by allowing you to link multiple Shopify apps to your codebase, so that you can dedicate specific apps and their configuration for various development, staging, and production workflows.

You would create a new configuration using the command `shopify app config link` and then you can tell the CLI to use a specific configuration with the use command and so if you had a TOML configuration called `development` you would say `shopify app config use development` in the CLI.

For more, see [App configuration](https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration) and [Manage app config files](https://shopify.dev/docs/apps/build/cli-for-apps/manage-app-config-files).

### Admin API

The [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql) lets you build apps and integrations that extend and enhance the Shopify admin. You can query and manage resources like products, customers, orders, inventory, fulfillment, and more. Because it’s GraphQL, it provides a more flexible, efficient, and controlled way to query and manipulate data than traditional REST APIs. For more on how to work with GraphQL, see [About GraphQL](https://shopify.dev/docs/apps/build/graphql).

The Admin GraphQL endpoint URL depends on your shop name and the API version:

```
https://{shop-name}.myshopify.com/admin/api/2025-01/graphql.json
```

#### Authentication

Authentication requires both access tokens and specific access scopes depending what resource you need to access.

- All GraphQL Admin API queries require a valid Shopify access token.
- Public and custom apps created in the Partner Dashboard generate tokens using OAuth, and custom apps made in the Shopify admin are authenticated in the Shopify admin.
- Include your token as a `X-Shopify-Access-Token` header on all API queries.
- Your app will need the correct [access scopes](https://shopify.dev/api/usage/access-scopes).

#### Example queries

Get shop information:

```
query { shop { id name email domain createdAt updatedAt } }
```

Get products:

```
query { products(first: 10) { edges { node { id title description variants(first: 5) { edges { node { id price sku } } } } } } }
```

Get orders:

```
query { orders(first: 10) { edges { node { id name totalPrice createdAt lineItems(first: 5) { edges { node { title quantity } } } } } } }
```

Get customers:

```
query { customers(first: 10) { edges { node { id firstName lastName email ordersCount } } } }
```

#### Example mutations

Create a product:

```
mutation { productCreate(input: { title: "New Product" bodyHtml: "Good Product" vendor: "Vendor Name" productType: "Type" tags: "tag1, tag2" variants: [{ price: "19.99" sku: "SKU123" }] }) { product { id title } userErrors { field message } } }
```

Update a product:

```
mutation { productUpdate(input: { id: "gid://shopify/Product/1234567890" title: "Updated Product Title" }) { product { id title } userErrors { field message } } }
```

Delete a product:

```
mutation { productDelete(id: "gid://shopify/Product/1234567890") { deletedProductId userErrors { field message } } }
```

#### Best practices

* **Paginate results**: Use first, last, after, and before for pagination in queries.
* **Error handling**: Always check for userErrors in mutations to handle any issues that may arise.
* **Rate limiting**: Be aware of rate limits (typically 2 requests per second) and implement retries or exponential backoff if necessary.
* **Use fragments**: For commonly used fields across multiple queries, consider defining fragments to keep your queries DRY.

### Shopify CLI

The [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) is a command-line interface tool that helps you generate and work with Shopify apps, themes and custom storefronts. You can also use it to automate many common development tasks. Using the CLI makes it faster and easier to build on Shopify.

The general syntax for CLI commands is:

```
shopify [topic] [command]
```

Here are some examples of common commands:

* Install the Shopify CLI: `npm install -g @shopify/cli@latest`
* Create a new app: `shopify app init`
* Serve your app locally: `shopify app dev`
* Deploy your app: `shopify app deploy`
* Retrieve your theme files from Shopify: `shopify theme pull`
* Upload your theme to preview it: `shopify theme dev`
* Generate an extension: `shopify app generate extension`

You can find all the commands in the Shopify dev docs:

* [App commands](https://shopify.dev/docs/api/shopify-cli/app)
* [Theme commands](https://shopify.dev/docs/api/shopify-cli/theme)
* [Hydrogen commands](https://shopify.dev/docs/api/shopify-cli/hydrogen)
* [General commands](https://shopify.dev/docs/api/shopify-cli/general-commands)

You can also use `shopify help` to get help within the CLI.

### Polaris

Shopify Polaris is the design system used by Shopify to create a consistent user interface across applications. We believe that the best apps provide merchants with a user experience that matches the appearance and behaviors of the Shopify admin UI. Using Polaris lets you achieve that consistency.

#### Why follow Polaris?

We base our design guidelines on some basic principles, so you can build apps that are predictable and easy to use. Here are four key reasons to follow the guidelines:

* **Built for Shopify**: Apps must meet all directives to qualify for the [Built for Shopify](https://shopify.dev/docs/apps/launch/built-for-shopify) program.
* **A better merchant experience**: Merchants expect a predictable user experience that works like the rest of the Shopify admin.
* **Adaptive:** Designing for mobile devices must be at the forefront of the app building process.
* **Accessible**: To provide a great experience for all Shopify merchants and their customers, apps must be built using accessibility best practices.

#### Install Polaris

```
npm install @shopify/polaris
```

#### Best practices

* **Use components**: Always use Polaris components for consistency and accessibility.
* **Follow accessibility guidelines**: [Ensure your app is accessible](https://shopify.dev/docs/apps/build/accessibility); Polaris components are designed with accessibility in mind.
* **Keep design consistent**: Stick to the guidelines provided in the Polaris documentation to maintain a cohesive user experience.
* **Use the latest version**: Regularly check for updates to Polaris to take advantage of new components and features.

#### Common Polaris Components

You can find all the Polaris components on [polaris.shopify.com](https://polaris.shopify.com/). Here are a few of the most common components along with their syntax.

##### Card

Cards are used in Polaris to group similar concepts and tasks together for merchants to scan, read, and get things done. It displays content in a familiar and recognizable style.

```
import {Card, Text} from '@shopify/polaris';
import React from 'react';

function CardDefault() {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  );

}
```

##### Page

Pages are used in Polaris to build the outer wrapper of a page, including the page title and associated actions.

```
import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

function PageExample() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge tone="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Duplicate action'),
        },
        {
          content: 'View on your store',
          onAction: () => alert('View on your store action'),
        },
      ]}
      actionGroups={[
        {
          title: 'Promote',
          actions: [
            {
              content: 'Share on Facebook',
              accessibilityLabel: 'Individual action label',
              onAction: () => alert('Share on Facebook action'),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}
```

##### Layout

The layout component is used in Polaris to create the main layout on a page. Layouts sections come in three main configurations. one-column, two-column, and annotated.

```
import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Online store dashboard" sectioned>
            <p>View a summary of your online store’s performance.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

##### Tabs

Tabs are used in Polaris to alternate among related views within the same context.

```
import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsDefaultExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </Tabs>
  );
}
```

##### Button

Buttons are used in Polaris primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”.

```
import {Button} from '@shopify/polaris';
import React from 'react';

function ButtonExample() {
  return <Button>Add product</Button>;
}
```

##### TextField

A text field are used in Polaris as input fields that merchants can type into. It has a range of options and supports several text formats including numbers.

```
import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldExample() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}
```

##### Checkbox

Checkboxes are most commonly used in Polaris to give merchants a way to make a range of selections (zero, one, or multiple).

```
import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}
```

##### Radio button

Radio buttons are used in Polaris to present each item in a list of options where merchants must make a single selection.

```
import {LegacyStack, RadioButton} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RadioButtonExample() {
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_: boolean, newValue: string) => setValue(newValue),
    [],
  );

  return (
    <LegacyStack vertical>
      <RadioButton
        label="Accounts are disabled"
        helpText="Customers will only be able to check out as guests."
        checked={value === 'disabled'}
        id="disabled"
        name="accounts"
        onChange={handleChange}
      />
      <RadioButton
        label="Accounts are optional"
        helpText="Customers will be able to check out with a customer account or as a guest."
        id="optional"
        name="accounts"
        checked={value === 'optional'}
        onChange={handleChange}
      />
    </LegacyStack>
  );
}
```

### Embedded apps and App bridge

The primary place where users engage with your app is its app home. This is the location where merchants are directed when they navigate to your app in Shopify.

The Shopify admin provides a surface for apps to render the UX for their app home. On the web, the surface is an iframe and in the Shopify mobile app, the surface is a WebView.

By combining Shopify App Bridge and Polaris, you can make your app display seamlessly in the Shopify admin. Polaris enables apps to match the visual appearance of the admin by using the same design components. App Bridge enables apps to communicate with the Shopify admin and create UI elements outside of the app's surface. Such elements include navigation menus, modals that cover the entire screen, and contextual save bars that prevent users from navigating away from the page when they have unsaved changes.

#### App Bridge

The App Bridge library provides APIs that enable Shopify apps to render UI in the Shopify app home surface.

Apps built with Shopify App Bridge are more performant, flexible, and seamlessly integrate with the Shopify admin. You can use Shopify App Bridge with Polaris to provide a consistent and intuitive user experience that matches the rest of the Shopify admin.

On the web, your app renders in an iframe and in the Shopify mobile app it renders in a WebView.

The latest version of App Bridge is built on top of web components and APIs to provide a flexible and familiar development environment. Your app can invoke these APIs using vanilla JavaScript functions.

App Bridge enables you to do the following from your app home:

* Render a navigation menu on the left of the Shopify admin

```
<ui-nav-menu>
  <a href="/" rel="home">Home</a>
  <a href="/templates">Templates</a>
  <a href="/settings">Settings</a>
</ui-nav-menu>
```

* Render a contextual save bar above the top bar of the Shopify admin

```
<ui-save-bar id="my-save-bar">
  <button variant="primary" id="save-button"></button>
  <button id="discard-button"></button>
</ui-save-bar>

<button onclick="document.getElementById('my-save-bar').show()">Show</button>

<script>
  document.getElementById('save-button').addEventListener('click', () => {
    console.log('Saving');
    document.getElementById('my-save-bar').hide();
  });

  document.getElementById('discard-button').addEventListener('click', () => {
    console.log('Discarding');
    document.getElementById('my-save-bar').hide();
  });
</script>
```

* Render a title bar with primary and secondary actions

```
<ui-title-bar title="Products">
  <button onclick="console.log('Secondary action')">Secondary action</button>
  <button variant="primary" onclick="console.log('Primary action')">
    Primary action
  </button>
</ui-title-bar>
```

### Checkout UI extensions

[Checkout UI Extensions](https://shopify.dev/docs/api/checkout-ui-extensions) allow developers to customize the checkout experience for Shopify stores. They allow merchants to add custom fields, promotional messages, and more.

#### Key concepts

* [**Extension targets**](https://shopify.dev/docs/api/checkout-ui-extensions/2025-01/extension-targets-overview): Extension targets provide locations where merchants can insert custom content.
  * **Static extension targets** are tied to core checkout features like contact information, shipping methods, and order summary line items.
  * **Block extension targets** can be displayed at any point in the checkout process and will always render regardless of which checkout features are available.
* **Configuration file**: The `shopify.extension.toml` contains the extension's configuration, which includes the extension name, extension targets, metafields, capabilities, and settings definition.
* [**Extension APIs**](https://shopify.dev/docs/api/checkout-ui-extensions/2025-01/apis): APIs enable checkout UI extensions to get information about the checkout or related objects and to perform actions
* [**UI components**](https://shopify.dev/docs/api/checkout-ui-extensions/2025-01/components): Checkout UI extensions declare their interface using supported UI components. Shopify renders the UI natively, so it's performant, accessible, and works in all of checkout's supported browsers.
* **Security**: Checkout UI extensions are a safe and secure way to customize the appearance and functionality of the checkout page without compromising the security of checkout or customer data.

#### Create a new extension

To create a new extension, use the Shopify CLI:

```
shopify app generate extension
```

#### Common components

##### View

View in checkout UI extensions is a generic container component. Its contents will always be their “natural” size, so this component can be useful in layout components.

```
import {
  reactExtension,
  View,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <View padding="base" border="base">
      View
    </View>
  );
}

```

##### InlineLayout

InlineLayout in checkout UI extensions is used to lay out content over multiple columns.

```
import {
  reactExtension,
  InlineLayout,
  View,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <InlineLayout columns={['20%', 'fill']}>
      <View border="base" padding="base">
        20%
      </View>
      <View border="base" padding="base">
        fill
      </View>
    </InlineLayout>
  );
}

```

##### Button

Buttons in checkout UI extensions are used for actions, such as “Add”, “Continue”, “Pay now”, or “Save”.

```
import {
  reactExtension,
  Button,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <Button
      onPress={() => {
        console.log('onPress event');
      }}
    >
      Pay now
    </Button>
  );
}

```

##### Link

Links in checkout UI extensions make text interactive so customers can perform an action, such as navigating to another location.

```
import {
  reactExtension,
  Link,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <Link to="https://www.shopify.ca/climate/sustainability-fund">
      Sustainability fund
    </Link>
  );
}

```

##### Modal

Modals in checkout UI extensions are a special type of overlay that shift focus towards a specific action/set of information before the main flow can proceed.

```
import {
  reactExtension,
  useApi,
  Button,
  Link,
  Modal,
  TextBlock,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const {ui} = useApi();

  return (
    <Link
      overlay={
        <Modal
          id="my-modal"
          padding
          title="Return policy"
        >
          <TextBlock>
            We have a 30-day return policy, which
            means you have 30 days after receiving
            your item to request a return.
          </TextBlock>
          <Button
            onPress={() =>
              ui.overlay.close('my-modal')
            }
          >
            Close
          </Button>
        </Modal>
      }
    >
      Return policy
    </Link>
  );
}

```

##### Banner

Banners in checkout UI extensions are used to communicate important messages to customers in a prominent way.

```
import {
  reactExtension,
  Banner,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <Banner
      status="critical"
      title="Your payment details couldn’t be verified. Check your card details and try again."
    />
  );
}
```

### Admin UI extensions

An [admin UI extension](https://shopify.dev/docs/api/admin-extensions) is a JavaScript-based module that can hook in to client-side behaviors on any of Shopify’s first-party UI surface areas. These extensions enable your app to embed workflows and UX on core admin pages while automatically matching the Shopify admin's look and feel.

Shopify provides different “variants” of UI extension APIs that are suitable for different developers:

* [@shopify/ui-extensions](https://github.com/Shopify/ui-extensions/blob/unstable/packages/ui-extensions) lets developers use a small, strongly-typed JavaScript API for creating UI extensions.
* [@shopify/ui-extensions-react](https://github.com/Shopify/ui-extensions/blob/unstable/packages/ui-extensions-react) lets developers create UI extensions using [React](https://reactjs.org/).

#### Types of admin extensions

* **Admin actions**: Admin action extensions enable you to create transactional workflows within existing pages of the Shopify admin. Merchants can launch these extensions from the More actions menus on resource pages or from an index table's bulk action menu when one or more resources are selected.
* **Admin blocks**: Admin block extensions enable your app to embed contextual information and inputs directly on resource pages in the Shopify admin. When a merchant has added them to their pages, these extensions display as cards inline with the other resource information. With admin block extensions, merchants can view and modify information from your app and other data on the page simultaneously. To facilitate complex interactions and transactional changes, you can launch admin actions directly from an admin block.
* **Admin print actions**: Admin print actions extensions are a special form of action extension designed to let your app print documents from key pages in the Shopify admin. Unlike a typical admin action extension, these extensions are found under the Print menu on orders and product pages.

#### Create a new admin extension

To create a new extension, use Shopify CLI:

```
shopify app generate extension
```

##### Deploy an admin extension

To deploy an admin extension, run this within your app's directory:

```
npm run deploy
```

#### Example: Build an admin action

In this example, we create an extension’s UI and render it.

First, we’ll create a `shopify.extension.toml` file that targets `admin.product-details.action.render`:

```
api_version = "2025-01"

[[extensions]]
# Change the merchant-facing name of the extension in locales/en.default.json
name = "t:name"
handle = "issue-tracker-action"
type = "ui_extension"
[[extensions.targeting]]
module = "./src/ActionExtension.jsx"
# The target used here must match the target used in the module file (./src/ActionExtension.jsx)
target = "admin.product-details.action.render"

```

Next, we set the title of the page in `/locales/en.default.json`:

```
{
  "name": "Create an issue"
}
```

Then, in `/src/ActionExtension.jsx` we’ll import the necessary components from Remote UI:

```
import {
  reactExtension,
  useApi,
  TextField,
  AdminAction,
  Button,
  TextArea,
  Box,
} from "@shopify/ui-extensions-react/admin";
```

Then we’ll build out the file with the target, logic, and UI rendering:

```
import { useCallback, useEffect, useState } from "react";
import {
  reactExtension,
  useApi,
  TextField,
  AdminAction,
  Button,
  TextArea,
  Box,
} from "@shopify/ui-extensions-react/admin";
import { getIssues, updateIssues } from "./utils";

function generateId (allIssues) {
  return !allIssues?.length ? 0 : allIssues[allIssues.length - 1].id + 1;
};

function validateForm ({title, description}) {
  return {
    isValid: Boolean(title) && Boolean(description),
    errors: {
      title: !title,
      description: !description,
    },
  };
};

// The target used here must match the target used in the extension's .toml file at ./shopify.extension.toml
const TARGET = "admin.product-details.action.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  //connect with the extension's APIs
  const { close, data } = useApi(TARGET);
  const [issue, setIssue] = useState({ title: "", description: "" });
  const [allIssues, setAllIssues] = useState([]);
  const [formErrors, setFormErrors] = useState(null);
  const { title, description } = issue;

  useEffect(() => {
    getIssues(data.selected[0].id).then(issues => setAllIssues(issues || []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(async () => {
    const {isValid, errors} = validateForm(issue);
    setFormErrors(errors);

    if (isValid) {
      // Commit changes to the database
      await updateIssues(data.selected[0].id, [
        ...allIssues,
        {
          id: generateId(allIssues),
          completed: false,
          ...issue,
        }
      ]);
      // Close the modal using the 'close' API
      close();
    }
  }, [issue, data.selected, allIssues, close]);

  return (
    <AdminAction
      title="Create an issue"
      primaryAction={
        <Button onPress={onSubmit}>Create</Button>
      }
      secondaryAction={<Button onPress={close}>Cancel</Button>}
    >
      <TextField
        value={title}
        error={formErrors?.title ? "Please enter a title" : undefined}
        onChange={(val) => setIssue((prev) => ({ ...prev, title: val }))}
        label="Title"
        maxLength={50}
      />
      <Box paddingBlockStart="large">
        <TextArea
          value={description}
          error={
            formErrors?.description ? "Please enter a description" : undefined
          }
          onChange={(val) =>
            setIssue((prev) => ({ ...prev, description: val }))
          }
          label="Description"
          maxLength={300}
        />
      </Box>
    </AdminAction>
  );
}

```

### Customer account extensions

[Customer account UI extensions](https://shopify.dev/docs/api/customer-account-ui-extensions) let app developers build custom functionality that merchants can install at defined points on the Order index, Order status, and Profile pages in customer accounts.

Customers can navigate to their account from the online store, from order notification emails, or any custom entrypoint placed by the merchant. If the customer is not already logged in, clicking a link from an order notification email to view their order will bring them to the pre-authenticated Order status page. From there, if the customer tries to navigate to another page in their account, or tries to take an action, they’ll be prompted to log in. Once the customer logs in, they are fully authenticated and able to access all customer account pages.

Using customer account UI extensions, apps can extend the functionality of existing customer account pages, as well as, create new pages (full-page extensions).

#### Scaffold an extension

Use Shopify CLI to generate a new extension in the directory of your app:

```
npm init @shopify/app@latest
cd your-app
npm run shopify app generate extension
```

#### Configure extension targets

[Extension targets](https://shopify.dev/docs/api/customer-account-ui-extensions/2025-01/extension-targets-overview) provide locations for customer account UI extensions to appear. Extension UIs are rendered using remote UI, a fast and secure environment for custom (non-DOM) UIs.

```
import {
  reactExtension,
  Banner,
  useTranslate,
} from '@shopify/ui-extensions-react/customer-account';

reactExtension('customer-account.order-index.block.render', () => (
  <App />
));

function App() {
  const translate = useTranslate();
  return <Banner>{translate('welcomeMessage')}</Banner>;
}
```

#### Update your configuration file

When you create a customer account UI extension, the `shopify.extension.toml` file is automatically generated in your customer account UI extension directory. It contains the extension's configuration, which includes the extension name, extension targets, metafields, capabilities and settings definition.

```
api_version = "unstable"

[[extensions]]
name = "My customer account ui extension"
handle = "customer-account-ui"
type = "ui_extension"

[[extensions.targeting]]
target = "customer-account.order-status.block.render"
module = "./Extension.jsx"
```

#### Extension APIs

APIs enable customer account UI extensions to get information about the customer or related objects and to perform actions. For example, you can use APIs to retrieve previous orders of the customer so that you can offer related products as upsells. Extensions use JavaScript to read and write data and call external services, and natively render UIs built using Shopify's checkout and customer account components.

```
import {
  reactExtension,
  Banner,
  useTranslate,
} from '@shopify/ui-extensions-react/customer-account';

reactExtension(
  'customer-account.order-status.block.render',
  () => <App />,
);

function App() {
  const translate = useTranslate();
  return <Banner>{translate('welcomeMessage')}</Banner>;
}

```

#### UI components

Customer account UI extensions declare their interface using supported UI components. Shopify renders the UI natively so it's performant, accessible, and works in all of customer account supported browsers. Components are designed to be flexible, enabling you to layer and mix them to create highly-customized app extensions that feel seamless within the customer account experience. All components that will inherit a merchant's brand settings and the CSS cannot be altered or overridden.

To build customer account UI extensions, you can use checkout components, and customer account components.

```
import {
  reactExtension,
  BlockStack,
  InlineStack,
  Button,
  Image,
  Text,
} from '@shopify/ui-extensions-react/customer-account';

reactExtension(
  'customer-account.order-status.block.render',
  () => <App />,
);

function App() {
  return (
    <InlineStack>
      <Image source="/url/for/image" />
      <BlockStack>
        <Text size="large">Heading</Text>
        <Text size="small">Description</Text>
      </BlockStack>
      <Button
        onPress={() => {
          console.log('button was pressed');
        }}
      >
        Button
      </Button>
    </InlineStack>
  );
}
```

### Functions

[Shopify Functions](https://shopify.dev/docs/api/customer-account-ui-extensions/2025-01/extension-targets-overview) allow developers to customize the backend logic that powers parts of Shopify. They can be used to generate custom discounts, shipping, pickup points and more. Building Shopify Functions is similar to embedded programming - there is a focus on low latency execution and thus there are constraints on execution time.

#### How Functions work

Function extension targets inject code into the backend logic of Shopify. The key parts of a function are:

* **Function input**: The function input is a JSON object which is the result of a GraphQL input query you define. Input queries allow you to select the specific data you need for your function, such as cart line product data or metafields.
* **Function logic**: The function logic is written in any language that can compile a WebAssembly module which meets function requirements. Function templates and client libraries are available for Rust and JavaScript.
* **Function output**: The function output is a JSON document that describes the operations you'd like Shopify to carry out.

GraphQL schemas provided by Shopify specify the targets, available inputs, and expected outputs for a Functions API.

#### Example: Build a Product Discount function
In this example we build a Shopify Function that applies a 20% discount to the first item in the cart

First we create an input query to get the first item in the cart
```
query Input {
  cart {
    lines {
      id
    }
  }
}
```

Then we write a Function in Rust to apply the 20% discount to the cart item
```
use shopify_function::prelude::*;
use shopify_function::Result;
use crate::run::run::output::*;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<FunctionRunResult> {
    let mut discounts = vec![];
    let percentage = 20.0;

    // Check if there are any lines in the cart
    if let Some(first_line) = input.cart.lines.first() {
        discounts.push(Discount {
            value: Value::Percentage(Percentage {
                value: Decimal(percentage),
            }),
            targets: vec![Target::CartLine(CartLineTarget {
                id: first_line.id.clone(),
                quantity: None,
            })],
            message: Some(format!("{}% off first item", percentage)),
        });
    }

    Ok(FunctionRunResult {
        discounts,
        discount_application_strategy: DiscountApplicationStrategy::FIRST,
    })
}
```

#### Example: Build a Payment Customization Function
In this example we remove a payment method if the cart total exceeds a certain amount.

Define the input query to fetch the cart total and available payment methods:
```
query Input {
  cart {
    cost {
      totalAmount {
        amount
      }
    }
  }
  paymentMethods {
    id
    name
  }
}
```

This returns the following JSON output
```
{
  "cart": {
    "cost": {
      "totalAmount": {
        "amount": 200.0
      }
    }
  },
  "paymentMethods": [
    {
      "id": "gid://shopify/PaymentCustomizationPaymentMethod/1",
      "name": "Cash on Delivery"
    },
    {
      "id": "gid://shopify/PaymentCustomizationPaymentMethod/2",
      "name": "Credit Card"
    }
  ]
}
```

Then we write a Function in Rust to hide the Cash on Delivery payment method if the value is greater than $100
```
use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_changes = output::FunctionRunResult { operations: vec![] };

    // Get the cart total from the function input, and return early if it's below 100
    let cart_total: f64 = input.cart.cost.total_amount.amount.into();
    if cart_total < 100.0 {
        // You can use STDERR for debug logs in your function
        eprintln!("Cart total is not high enough, no need to hide the payment method.");
        return Ok(no_changes);
    }

    // Find the payment method to hide, and create a hide output operation from it
    // (this will be None if not found)
    let operations = input
        .payment_methods
        .iter()
        .find(|&method| method.name.contains(&"Cash on Delivery".to_string()))
        .map(|method| {
            vec![output::Operation::Hide(output::HideOperation {
                payment_method_id: method.id.to_string(),
            })]
        })
        .unwrap_or_default();

    // The shopify_function crate serializes your function result and writes it to STDOUT
    Ok(output::FunctionRunResult { operations })
}
```

#### Example: Build a Delivery Option Customization Function
In this example we add a "May be delayed due to weather conditions" message to the delivery options, if the delivery address is in North Carolina.

Define the input query to fetch the provinceCode and delivery options:
```
query Input {
  cart {
    deliveryGroups {
      deliveryAddress {
        provinceCode
      }
      deliveryOptions {
        handle
        title
      }
    }
  }
}
```

This returns the following JSON output
```
{
  "cart": {
    "deliveryGroups": [
      {
        "deliveryAddress": {
          "provinceCode": "NC"
        }
        "deliveryOptions": [
            {
              "handle": "shopify-Standard-21.90",
              "title": "Standard"
            },
            {
              "handle": "shopify-Express-31.90",
              "title": "Express"
            },
        ]
      }
    ]
  }
}
```

Then we write a Function in Rust to append the message if the delivery address is in North Carolina
```
use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    // The message we wish to add to the delivery option
    let message = "May be delayed due to weather conditions";

    let to_rename = input
        .cart
        .delivery_groups
        .iter()
        // Filter for delivery groups with a shipping address containing the affected state or province
        .filter(|group| {
            let state_province = group
                .delivery_address
                .as_ref()
                .and_then(|address| address.province_code.as_ref());
            match state_province {
                Some(code) => code == "NC",
                None => false,
            }
        })
        // Collect the delivery options from these groups
        .flat_map(|group| &group.delivery_options)
        // Construct a rename operation for each, adding the message to the option title
        .map(|option| output::RenameOperation {
            delivery_option_handle: option.handle.to_string(),
            title: match &option.title {
                Some(title) => format!("{} - {}", title, message),
                None => message.to_string(),
            },
        })
        // Wrap with an Operation
        .map(output::Operation::Rename)
        .collect();

    // The shopify_function crate serializes your function result and writes it to STDOUT
    Ok(output::FunctionRunResult {
        operations: to_rename,
    })
}
```

#### Available Function APIs

* **Delivery Customization API**: Rename, reorder, and sort the delivery options available to buyers during checkout.
  * **Use cases**: Hide delivery options for certain products or customers; reorder delivery options according to user preference; hide delivery options for PO Box addresses; add messaging to delivery option titles
  * **Extension target**: `purchase.delivery-customization.run`
* **Order Discount API**: Create a new type of discount that's applied to all merchandise in the cart.
  * **Use cases**: Money off the order subtotal; money off products on an order; tiered discount by spend.
  * **Extension target**: `purchase.order-discount.run`
* **Product Discount API**: Create a new type of discount that's applied to a particular product or product variant in the cart.
  * **Use cases**: Money off a product; money off a product variant; money off a cart line; buy a specific quantity of a product; buy a specific amount of a product, get a second amount at a discount.
  * **Extension target**: `purchase.product-discount.run`
* **Shipping Discount API**: Create a new type of discount that's applied to one or more shipping rates at checkout.
  * **Use cases**: Free shipping; a discount on shipping; a discount on specific shipping rates.
  * **Extension target**: `purchase.shipping-discount.run`
* **Payment Customization API**: Rename, reorder, and sort the payment methods available to buyers during checkout.
  * **Use cases**: Hide payment methods for carts with totals above or below a given value; reorder payment methods according to user preference; hide payment methods based on customer tag or country; hide and disable gift cards based on cart contents, country and more.
  * **Extension target**: `purchase.payment-customization.run`
* **Cart Transform API**: Expand cart line items and update the presentation of cart line items.
  * **Extension target**: `purchase.cart-transform.run`
* **Cart and Checkout Validation API**: Provide your own validation of a cart and checkout.
  * **Use cases**: Use tokengating or require a customer membership at checkout; verify the age or id of a customer when they proceed through checkout; provide b2b product minimums, maximums, and multiples; provide b2b location order minimums, maximums, or credit limits; specify quantity limits in a flash sale.
  * **Extension target**: `purchase.validation.run`
* **Fulfillment Constraints API**: Provide your own logic for how Shopify should fulfill and allocate an order.
  * **Use cases**: Ensure that n cart line items are fulfilled from the same location; ensure that n cart line items are fulfilled from any of the locations in a list.
  * **Extension target**: `purchase.fulfillment-constraint-rule.run`
* **Local Pickup Delivery Option Generator API**: Generate custom local pickup options available to buyers during checkout.
  * **Use cases**: Generate local pickup options based on custom rules:
  * **Extension target**: `purchase.local-pickup-delivery-option-generator.run`
* **Pickup Point Delivery Option Generator API**: Generate custom pickup point options available to buyers during checkout.
  * **Use cases**: Generate pickup points based on custom rules
  * **Extension target**: `purchase.pickup-point-delivery-option-generator.run`

### Webhooks

The default and recommended way to configure [webhooks](https://shopify.dev/docs/api/webhooks?reference=toml) is using `shopify.app.toml` configuration file. This will ensure that every shop on which your app is installed will provide your app with the same set of events.

You can use the following syntax for subscribing to webhooks where the URI is an endpoint that you provide. This could be an HTTP endpoint, Google Cloud PubSub endpoint, or an AWS Eventbridge endpoint.

```
[[webhooks.subscriptions]]
topics = ["orders/create"]
uri = "https://webhook.site/webhooks/o/app/orders-create"
```

If you wish to use the same URI for all webhooks just put multiple topics into the topics array. If you wish to have different endpoints depending on the topic then you should have multiple `[[webhooks.subscriptions]]` sections in your TOML. Here’s what multiple subscriptions each with a different endpoint would look like:

```
[[webhooks.subscriptions]]
topics = ["orders/create"]
uri = "https://webhook.site/webhooks/app/orders-create"

```

```
[[webhooks.subscriptions]]
topics = ["products/create"]
uri = "https://webhook.site/webhooks/p/app/orders-create"

```

You can use the GraphQL mutations for registering webhooks when you require different events per shop. For example, if you have features in your app that merchants must upgrade to enable then you might want to only receive events that are necessary when merchants upgrade. Here’s a GraphQL mutation to register a webhook on a single shop:

```
mutation WebhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
  webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
    webhookSubscription {
      id
      topic
      apiVersion {
        handle
      }
      format
      createdAt
    }
    userErrors {
      field
      message
    }
  }
}
```

And that GraphQL takes the following as variable inputs:

```
{
  "topic": "ORDERS_CREATE",
  "webhookSubscription": {
    "uri": "https://webhook.site/webhooks/app/orders-create",
    "format": "JSON"
  }
}
```

For that GraphQL to work your app must be authenticated and have a shop token that it can use to call that mutation on that specific shop.

### Custom data

Shopify comes with many built-in data models like products, customers, and orders. Yet often while building for the varied and diverse needs of merchants you'll need a way to customize the data in Shopify:

* Metafields to extend Shopify's resources with custom fields
* Metaobjects to create entirely new resources by making new custom objects

#### Metafields

[Metafields](https://shopify.dev/docs/apps/build/custom-data#what-are-metafields) are a flexible way to store additional details about existing Shopify resources, like products, orders, and many more. These custom fields can be almost anything, such as related products, release dates, internal approval status, or part numbers. Metafields power experiences across Shopify. In the Shopify admin, they enable features like customer segmentation, smart collections, and product taxonomy. For customers, they enhance the shopping experience through product recommendations, product swatches, and customized checkouts using Shopify Functions.

##### Unstructured metafields

Metafields serve as the foundation for extending Shopify's data model. At their core, metafields are key-value pairs that can be added to specific resources in Shopify:

* **Identifier**: Composed of both namespace (drives ownership) and key.
* **Value**: The raw value stored.
* **Type**: How value is interpreted.

The type on an unstructured metafield can vary on an instance-by-instance basis. To ensure consistency, you need a metafield definition.

**Example**
You work with a snowboard merchant who needs to store care instructions for each product. Starting simple, you add a custom.care\_guide metafield to a product by using the `productUpdate` mutation:

```
mutation {
  metafieldDefinitionCreate(definition: {
    name: "Care Guide",
    namespace: "custom",
    key: "care_guide",
    description: "How to care for the product.",
    type: "single_line_text_field",
    ownerType: PRODUCT,
    access: {
      storefront: PUBLIC_READ,
    },
  }) {
    createdDefinition {
      name
      namespace
      key
      type
      access
    }
  }
}
```

##### Structured metafields

Metafields covered by a metafield definition, or structured metafields, have consistent types amongst other optional configurations:

* Data validation
* Permissions
* Optional features
* Conditional usage

**Example**
In this example, you'll add a definition to your snowboard merchant to ensure all products have a `custom.care_guide metafield` with a type of `single_line_text_field` that is also accessible to storefronts:

```
mutation {
  metafieldDefinitionCreate(definition: {
    name: "Care Guide",
    namespace: "custom",
    key: "care_guide",
    description: "How to care for the product.",
    type: "single_line_text_field",
    ownerType: PRODUCT,
    access: {
      storefront: PUBLIC_READ,
    },
  }) {
    createdDefinition {
      name
      namespace
      key
      type
      access
    }
  }
}
```

#### Metaobjects

[Metaobjects](https://shopify.dev/docs/apps/build/custom-data#what-are-metaobjects) are a powerful way to create and reuse custom data structures beyond Shopify's standard resources. They exist independently and can be referenced by metafields to connect with standard resources like products, orders, and customers.

Key terms related to metaobjects:

* **Definition**: The structure outlining the fields and properties for your metaobjects.
* **Entry**: An instance of the associated definition.

Metaobject definitions, beyond defining the fields, also offer control over:

* Permissions, such as storefront visibility.
* Optional features, such as translatable fields.

**Example**
Suppose a merchant wants a `Feature` resource in Shopify. You can represent that with a new metaobject definition:

```
mutation {
  metaobjectDefinitionCreate(definition: {
    type: "$app:feature",
    access: {
      admin: MERCHANT_READ_WRITE,
      storefront: PUBLIC_READ,
    },
    capabilities: {
      translatable: { enabled: true },
    },
    displayNameKey: "title",
    fieldDefinitions: [
      { key: "title", name: "Highlight Title", type: "single_line_text_field", required: true },
      { key: "description", name: "Description", type: "multi_line_text_field", required: true },
      { key: "creative", name: "Creative", type: "file_reference" },
    ]
  }) {
    metaobjectDefinition {
      id
      type
      fieldDefinitions {
        key
        name
        type
      }
    }
  }
}
```

The merchant's products have a set of key features, so you'll also need to create a product metafield definition that references the `Feature` metaobject definition you just created:

```
mutation {
  metafieldDefinitionCreate(definition: {
    name: "Key features",
    key: "key_features",
    description: "Key features of the product.",
    type: "list.metaobject_reference",
    ownerType: PRODUCT,
    access: {
      storefront: PUBLIC_READ,
    },
    validation: {
      metaobjectDefinitionId: "gid://shopify/MetaobjectDefinition/1",
    },
  }) {
    createdDefinition {
      namespace
      key
      type
    }
  }
}
```

With those in place, you can create `Feature` entries and reference as many as you want in a product's `key_features` metafield. These entries can be reused across products, making it easy to manage and update.

### Authentication

[Authentication](https://shopify.dev/docs/apps/build/authentication-authorization) is the process of verifying the identity of the user or the app. To keep transactions on Shopify’s platform safe and secure, all apps connecting with Shopify APIs must authenticate when making API requests.

Authorization is the process of giving permissions to apps. When an app user installs a Shopify app they authorize the app, enabling the app to acquire an access token. For example, an app might be authorized to access orders and product data in a store.

#### Types of authentication and authorization methods

The authentication and authorization methods that your app needs to use depends on the tool that you used to create your app, and the components that your app uses.

##### Authentication

* Embedded apps need to authenticate their incoming requests with session tokens.
* Apps that are not embedded need to implement their own authentication method for incoming requests.

##### Authorization

Authorization encompasses the installation of an app and the means to acquire an access token.

To avoid unnecessary redirects and page flickers during the app installation process, you should configure your app's required access scopes using Shopify CLI. This allows Shopify to manage the installation process for you.

If you aren't able to use Shopify CLI to configure your app, then your app will install as part of the authorization code grant flow. This provides a degraded user experience.

The following table outlines the supported installation and token acquisition flows for various app configurations. Whenever possible, you should create embedded apps that use Shopify managed installation and token exchange.

| Type of app | Supported installation flows | Supported token acquisition flows |
| :---- | :---- | :---- |
| Embedded app | Shopify managed installation (recommended) Installation during authorization code grant | Token exchange (recommended) Authorization code grant |
| Non-embedded app | Shopify managed installation (recommended) Installation during authorization code grant | Authorization code grant |
| Admin-created custom app | Installed upon generation in the Shopify admin | Generate in the Shopify admin |

### Deploy

When you [deploy a Shopify app](https://shopify.dev/docs/apps/build/authentication-authorization), you're making your code available to merchants. This involves:

* Moving your code from your local development environment to a hosting service
* Connecting your hosted app to Shopify through the Partner Dashboard
* Managing app extensions and configurations separately through app versions

#### Hosting and deployment options

Common hosting providers for Shopify apps:

- [Deploy to Fly.io](http://Fly.io)
- [Deploy to Render](https://render.com/docs/deploy-shopify-app)
- Manual deployment

#### How to deploy manually

##### 1\. Create an app configuration file

Create or link your app to an `app.toml file`. Note down the `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, and `SCOPES` values.

```
shopify app config link
shopify app env show
```

##### 2\. Build your app

The Shopify Remix app template comes set up with Vite, which can build the bundles you'll need to host your app. If your provider doesn't support Docker, then you'll need to build the app yourself.

```
npm ci
npm run build
```

##### 3\. Set up your database

Now you'll decide which database you'll use, and where to host it. There are several cloud platforms that provide specialized database containers. You can use whichever storage strategy you're most comfortable working with.

##### 4\. Set up environment variables

Apps created using Shopify CLI use environment variables for configuration. To deploy your app, you'll need to set these values manually in your hosting provider. You'll need to set the variables that you obtained previously, along with some other values, in your production environment. The following environment variables need to be provided: `SHOPIFY_APP_URL`, `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SCOPES,PORT.`

##### 5\. Deploy your app

Before running the app on your hosting provider, you'll need to update your Shopify settings by deploying your TOML file using Shopify CLI.

## Storefront customization

Storefronts on Shopify give you the power to sell the way you want. Use the tools you already know to reach your customers wherever they are.

You can customize your Shopify storefront using different approaches:

1. Using Themes and Theme App Extensions
2. Building Custom Storefronts with Hydrogen and Oxygen, powered by the Storefront API

### Liquid

Shopify themes are a package of template files, building blocks, and supporting assets. Themes shape the online store experience for merchants and their customers. You can build fast, flexible themes at scale using Liquid, Shopify's theme templating language, along with HTML, CSS, JavaScript, and JSON.

#### Liquid basics

[Liquid](https://shopify.dev/docs/api/liquid) is used to dynamically output **objects** and their properties. You can further modify that output by creating logic with **tags**, or directly altering it with a **filter**. Objects and object properties are output using one of six basic data types. Liquid also includes basic logical and **comparison operators** for use with tags.

#### Objects

Liquid [objects](https://shopify.dev/docs/api/liquid) represent variables that you can use to build your theme. Object types include, but aren't limited to:

- Store resources, such as a collection or product and its properties
- Standard content that is used to power Shopify themes, such as `content_for_header`
- Functional elements that can be used to build interactivity, such as `paginate` and `search`

Objects might represent a single data point, or contain multiple properties. Some products might represent a related object, such as a product in a collection. Some objects can be accessed globally, and some are available only in certain contexts. Refer to the specific object reference to find its access scope.

Objects, along with their properties, are wrapped in curly brace delimiters `{{ }}`.

You can find a [list of all objects](https://shopify.dev/docs/api/liquid/objects) in the Liquid reference docs.

##### Example object

The `product` object contains a property called `title` that can be used to output the title of a product:

Code:

```
{{ product.title }}
```

Data:

```
{
  "product": {
    "title": "Health potion"
  }
}
```

Output:

```
Health potion
```

#### Tags

Liquid [tags](https://shopify.dev/docs/api/liquid/tags) are used to define logic that tells templates what to do. There are four types of tags:

* [**Conditional tags**](https://shopify.dev/docs/api/liquid/tags/conditional-tags): Define conditions that determine whether blocks of Liquid code get executed.
* [**Iteration tags**](https://shopify.dev/docs/api/liquid/tags/iteration-tags): Repeatedly run blocks of code.
* [**Theme tags**](https://shopify.dev/docs/api/liquid/tags/theme-tags): Assign or render content that’s part of your theme.
* [**Variable tags**](https://shopify.dev/docs/api/liquid/tags/variable-tags): Enable you to create new liquid variables.

Tags are wrapped with curly brace percentage delimiters `{% %}`. The text within the delimiters doesn't produce visible output when rendered.

You can find a [list of all tags](https://shopify.dev/docs/api/liquid/tags) in the Liquid reference docs.

##### Tag operators

Liquid supports basic logical and comparison operators for use with conditional tags.

| Operator | Function |
| :---- | :---- |
| \== | equals |
| \!= | does not equal |
| \> | greater than |
| \< | less than |
| \<= | less than or equal to |
| or | Condition A or Condition B |
| and | Condition A and Condition B |
| contains | Checks for strings in strings or arrays |

##### Example tag logic

In the example below, the `if` tag defines the condition to be met. If `product.available` returns `true`, then the number of available units is displayed. Otherwise, the “sold-out” message is shown.

Code:

```
{% if product.available %}
  Available units: 42
{% else %}
  Sorry, this product is sold out.
{% endif %}
```

Data:

```
{
  "product": {
    "available": true
  }
}
```

Output:

```
Available units: 42
```

#### [Filters](https://shopify.dev/docs/api/liquid/filters)

Liquid filters are used to modify the output of variables and objects. To apply filters to an output, add the filter and any filter parameters within the output's curly brace delimiters `{{ }}`, preceded by a pipe character `|`. So the syntax is: `{{ input | filter }}`. Multiple filters can be used on one output. They're parsed from left to right.

You can find a [list of all filters](https://shopify.dev/docs/api/liquid/filters) in the Liquid reference docs.

##### Example filter

In the example below, product is the object, title is its property, and upcase is the filter being applied.

Code:

```
{% # product.title -> Health potion %}

{{ product.title | upcase }}
```

Data:

```
{
  "product": {
    "title": "Health potion"
  }
}
```

Output:

```
HEALTH POTION
```

### Theme App extensions

[Theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions) allow merchants to easily add dynamic elements to their themes without having to interact with Liquid templates or code. For example, dynamic elements can include product reviews, prices, ratings, or interactive 3D models of products. Theme app extensions can integrate with Online Store 2.0 themes, such as the default Dawn theme, which is Shopify's Online Store 2.0 reference theme.

#### Benefits

* Theme app extensions automatically expose your app in the theme editor. You can leverage the editor’s visual editing capabilities without needing to replicate them in your app.
* You can deploy your app at the same time to all online stores that use it. You also have access to versioning, and asset hosting on the Shopify CDN.
* A single set of integration logic and instructions works for all themes.
* Merchants won't need to manually edit their theme code.

#### Resources

Theme app extensions contain the following resources:

* **Blocks**: Liquid files that act as the entry point for what you want to inject in a theme. The following block types are supported:
  * App blocks
  * App embed blocks
* **Assets**: CSS, JavaScript, and other static app content that gets injected into themes.
* **Snippets**: Reusable Liquid snippets that can be used across multiple blocks.

#### Designing the best merchant experience

Apps built in the theme app extension framework don't edit theme code, which decreases the risk of introducing breaking changes to the theme, makes it easier to iterate on the content of the integration, and provides for a better merchant experience. Merchants can use the theme editor to configure exposed settings and add app blocks in theme sections for precise positioning in a page's layout.

#### Create a new extension

Run the following command:

```
shopify app generate extension
```

#### Configure a theme app extension

When you create a theme app extension, Shopify adds the following `theme-app-extension` directory and subdirectories to your app:

**Newly generated extension**:

```
└── extensions
  └── my-theme-app-extension
      ├── assets
      ├── blocks
      ├── snippets
      ├── locales
      ├── package.json
      └── shopify.extension.toml
```

**Populated extension:**

```
└── extensions
  └── my-theme-app-extension
      ├── assets
      │   ├── image.jpg
      │   ├── icon.svg
      │   ├── app-block.js
      │   ├── app-block.css
      │   ├── app-embed-block.js
      │   └── app-embed-block.css
      ├── blocks
      │   ├── app-block.liquid
      │   └── app-embed-block.liquid
      ├── snippets
      │   ├── app-block-snippet.liquid
      │   └── app-embed-block-snippet.liquid
      ├── locales
      |   ├── en.default.json
      |   ├── en.default.schema.json
      |   ├── fr.json
      |   └── fr.schema.json
      ├── package.json
      └── shopify.extension.toml
```

#### App blocks for themes

Apps that inject inline content on a page extend themes using app blocks. Merchants can add app blocks to a compatible theme section, or as wrapped app blocks that are added at the section level. Create an app block by setting the target in the schema to section.

By default, themes don't include app blocks after an app is installed. Merchants need to add the app blocks to the theme from the Apps section of the theme editor.

Use app blocks for the following types of apps:

* Apps that you want to automatically point to dynamic sources, such as product reviews apps and star ratings apps.
* Apps that merchants might want to reposition on a page.
* Apps that should span the full width of a page.

**Example**

```
<span style="color: {{ block.settings.color }}">
App blocks let you build powerful integrations with online store themes.
</span>

{% render "app_snippet" %}
{% schema %}
  {
    "name": "Hello World",
    "target": "section",
    "enabled_on": {
      "templates": ["index"]
    },
    "stylesheet": "app.css",
    "javascript": "app.js",
    "settings": [
        { "label": "Color", "id": "color", "type": "color", "default": "#000000" }
    ]
  }
{% endschema %}
```

#### App embed blocks

Apps that don't have a UI component, or that add floating or overlaid elements, extend themes using app embed blocks. Shopify renders and injects app embed blocks before HTML `</head>` and `</body>` closing tags. Create an app embed block by setting the `target` in the schema to either `compliance_head`, `head`, or `body`. App embed blocks with `compliance_head` will be included first and should be used only when necessary, for example in cookie consent banners.

By default, app embed blocks are deactivated after an app is installed. Merchants need to activate app embed blocks in the theme editor, from **Theme Settings \> App** embeds. However, your app can provide merchants with a deep link, post installation, to activate an app embed block automatically.

Use app embed blocks for the following types of apps:

* Apps that provide a floating or overlaid component to a page, such as chat bubble apps and product image badge apps.
* Apps that add SEO meta tags, analytics, or tracking pixels.

**Example**

```
<div style="position: fixed; bottom: 0; right: 0">
    {{ "kitten.jpg" | asset_url | img_tag }}
</div>
{% schema %}
  {
    "name": "App Embed",
    "target": "body",
    "settings": []
  }
{% endschema %}

```

#### Condition app blocks

You can control the visibility of an app block or app embed block based on a custom condition. For example, you might want to limit content based on plan tier, or geographic location.

The condition can be included in the block's schema with the `available_if` attribute, and the state of the condition is stored in an app-data metafield. The metafield can be accessed through the Liquid `app` object.

**Example**

```
{% schema %}
 {
   "name": "Conditional App block",
   "target": "section",
   "stylesheet": "app.css",
   "javascript": "app.js",
   "available_if": "{{ app.metafields.conditional.block1 }}",
   "settings": [
      {
        "label": "Colour",
        "id": "colour",
        "type": "color",
        "default": "#000000"
      }
   ]
 }
{% endschema %}
```

### Headless and custom storefronts

#### Storefront GraphQL API

The [Storefront API](https://shopify.dev/docs/api/storefront) is the foundational layer of custom storefronts. It provides you the commerce primitives to build custom, scalable, and performant shopping experiences.

##### How it works

The Storefront API provides access to Shopify's primitives and capabilities such as displaying products and collections, adding items to the cart, calculating contextual pricing, and more. You can use the Storefront API to build unique commerce experiences on any platform, including the web, native apps, games, and social media, using the frontend tools of your choice.

Because the Storefront API uses the Shopify backend, you can focus on building a unique and customized shopping experience with strong brand representation. You can create custom pages, themes, and order management experiences that are fully integrated with a storefront.

##### Authentication and authorization

There are two methods of authentication for the Storefront API:

* **Public authentication**: The public token is used for client side queries and mutations. As every buyer has a different IP, the token scales to support large amounts of traffic.
* **Private access**: The private token provides authenticated access to the Storefront API and is used for server-side queries and mutations.

##### Endpoints and queries

The Storefront API is available only in GraphQL. All Storefront API queries are made on a single GraphQL endpoint, which only accepts POST requests:

```
https://{store_name}.myshopify.com/api/2025-01/graphql.json
```

The Storefront API is versioned, with new releases four times a year. To keep your app stable, make sure that you specify a supported version in the URL.

##### Example query

```
# Get the ID and title of the three most recently added products
curl -X POST \
  https://{store_name}.myshopify.com/api/2024-10/graphql.json \
  -H 'Content-Type: application/json' \
  -H 'X-Shopify-Storefront-Access-Token: {storefront_access_token}' \
  -d '{
    "query": "{
      products(first: 3) {
        edges {
          node {
            id
            title
          }
        }
      }
    }"
  }'
```

#### Hydrogen apps

Hydrogen and Oxygen make up Shopify's recommended stack for headless commerce. The different parts of the system work together to make it faster and easier to build and deploy headless Shopify stores.

[Hydrogen](https://shopify.dev/docs/api/hydrogen) is a set of components, utilities, and design patterns that make it easier to work with Shopify APIs. Hydrogen projects are Remix apps that are preconfigured with Shopify-specific features and functionality. Hydrogen handles API client credentials, provides off-the-shelf components that are pre-wired for Shopify API data, and includes CLI tooling for local development, testing, and deployment.

##### Project structure

Hydrogen projects are structured like typical Remix apps and you can configure them to your preferences. The following is the default quickstart project structure:

```
📂 hydrogen-quickstart/
├── 📁 app/
│   ├── 📁 assets/
│   ├── 📁 components/
│   ├── 📁 graphql/
│   ├── 📁 lib/
│   ├── 📁 routes/
│   ├── 📁 styles/
│   ├── entry.client.jsx
│   ├── entry.server.jsx
│   └── root.jsx
├── 📁 public/
├── CHANGELOG.md
├── README.md
├── customer-accountapi.generated.d.ts
├── env.d.ts
├── jsconfig.json
├── package.json
├── postcss.config.js
├── server.js
├── storefrontapi.generated.d.ts
└── vite.config.js
```

##### Packages and dependencies

Hydrogen bundles a set of dependencies that work together to enable end-to-end development and deployment:

| Package | Description |
| :---- | :---- |
| `@shopify/hydrogen` | Main Hydrogen package. Contains Remix-specific components and utilities for interacting with Shopify APIs. Extends the framework-agnostic `@shopify/hydrogen-react` package. |
| `@shopify/hydrogen-cli` | CLI tool for working with Hydrogen projects |
| `@shopify/mini-oxygen` | Local development server based on Oxygen |
| `@shopify/remix-oxygen` | Remix adapter that enables Hydrogen to be served on Oxygen |

##### Hydrogen channel

The Hydrogen sales channel app needs to be installed on your Shopify store to enable the following features:

* A Hydrogen sales channel where you can publish product inventory.
* Oxygen hosting, to deploy your Hydrogen projects.
* Managing storefronts and deployment environments, including environment variable management.
* Access to deployment logs.

#### Deploy to Oxygen

A deployment is an immutable snapshot of your Hydrogen app, running on [Oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started). Every deployment has its own unique preview URL so that you can view, test, or approve changes before merging them and deploying to production. You can also deploy to specific environments.

##### Continuous deployment

Developers typically prefer automated systems that deploy their app whenever they update its code base. These types of workflows are broadly known as continuous integration or continuous delivery/deployment (CI/CD) systems. Hydrogen and Oxygen support CI/CD with GitHub out of the box. You can also create your own CI/CD workflows using the Hydrogen CLI.

##### Manual deployment

You can create a new deployment from your local development environment with the Hydrogen CLI deploy command. The Hydrogen CLI builds, uploads, and deploys your app, then returns the deployment's unique URL.

```
npx shopify hydrogen deploy
```

Consult the Hydrogen CLI reference for the complete list of options for the `deploy` command.

##### Shareable links

Deployments are private by default, which means that you need to be logged in to your store to view them. You can create shareable links that allow anyone to view deployments, even if they’re not logged in.

##### Deployment rollbacks

By default, environment URLs point to the environment’s most recent deployment. If the most recent update contains a bug or other error, you can temporarily roll back to a previous deployment while you work on a fix. Rolling back doesn't redeploy or delete any deployments; it simply changes which deployment the environment URL points to.

Oxygen deployments are immutable, which means that their environment variables could be outdated. Always verify that a previous deployment works as expected before rolling back to it.

##### Redeployments

Redeploying an Oxygen environment creates a new deployment that re-uses the original deployment's immutable code, but injects the current set of environment variables. Redeployments are available for production and custom environments, but not the preview environment. When you edit an environment variable in the Shopify admin, you'll be prompted with the option to redeploy the relevant environments, but you can redeploy at any time.

##### Deployment immutability

Every deployment in Oxygen is immutable: each deployment is a snapshot of your Hydrogen project's codebase at a specific point in time. Typically, that snapshot is an individual Git commit. Deployments retain all the environment variables that they had when they were first deployed. If you update your environment variables, then older deployments won't use the updated values until you redeploy.

### POS UI extensions

[POS UI Extensions](https://shopify.dev/docs/api/pos-ui-extensions) allow developers to create custom experiences within Shopify's Point of Sale (POS) app. They enable merchants to extend POS functionality with custom screens, actions, and integrations directly within the POS interface, creating seamless workflows for in-store operations.

#### Key concepts

* [**Extension targets**](https://shopify.dev/docs/api/pos-ui-extensions/targets): Extension targets define specific locations within the POS app where custom content can be rendered.
  * **Smart Grid targets** (`pos.home.tile.render`, `pos.home.modal.render`) appear on the POS home screen for quick access to app functionality.
  * **Product detail targets** (`pos.product-details.action.render`, `pos.product-details.block.render`) extend product pages with custom actions and information.
  * **Customer detail targets** (`pos.customer-details.action.render`, `pos.customer-details.block.render`) add functionality to customer profiles.
  * **Order detail targets** (`pos.order-details.action.render`, `pos.order-details.block.render`) customize order screens with custom actions and information blocks.
  * **Post-purchase targets** (`pos.purchase.post.action.render`, `pos.purchase.post.block.render`) customize the post-purchase experience.
  * **Event targets** (`pos.transaction-complete.event.observe`, `pos.cart-update.event.observe`) listen to POS events for reactive functionality.
* **Configuration file**: The `shopify.extension.toml` is the extension level configuration that includes the extension's name, the targets it extends, API Version, and description.
* [**Extension APIs**](https://shopify.dev/docs/api/pos-ui-extensions/apis): APIs enable POS UI extensions to interact with cart data, navigate between screens, access device capabilities, and manage customer information.
* [**UI components**](https://shopify.dev/docs/api/pos-ui-extensions/components): POS UI extensions use specialized components optimized for touch interfaces and POS workflows. Components are rendered natively for optimal performance.
* **Navigation patterns**: Extensions use Navigator and Screen components to create multi-screen experiences with proper navigation flow.

#### Create a new extension

To create a new POS UI extension, use the Shopify CLI:

```
shopify app generate extension --name="your-extension-name" --template="pos_ui" --flavor="typescript-react"
```

#### Block extensions

Block extensions render content directly within POS screens, appearing as integrated sections rather than separate modals or actions. They provide contextual information and functionality that enhances the merchant's workflow without disrupting their current task.

##### Product details block

Display additional product information, inventory details, or related data within the product details screen.

Here's an example of a block that shows real-time inventory information inline with the product details:

```
import React from 'react';
import {
  reactExtension,
  Stack,
  Text,
  Badge,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.product-details.block.render', () => (
  <Stack direction="block" gap="200">
    <Text variant="sectionHeader">Inventory Information</Text>
    <Stack direction="inline" gap="100">
      <Text variant="body">Warehouse: </Text>
      <Badge status="info">In Stock</Badge>
    </Stack>
    <Text variant="captionRegular" color="TextSubdued">
      Last restocked: 2 days ago
    </Text>
  </Stack>
));
```

##### Customer details block

Show customer loyalty information, purchase history, or account status within the customer details screen.

Here's an example that displays a customer's loyalty program status and allows them to apply points directly from the customer details screen:

```
import React from 'react';
import {
  reactExtension,
  Stack,
  Text,
  Badge,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.customer-details.block.render', () => {
  const api = useApi();

  return (
    <Stack direction="block" gap="200">
      <Text variant="sectionHeader">Loyalty Program</Text>
      <Stack direction="inline" gap="100">
        <Text variant="body">Status: </Text>
        <Badge status="success">Gold Member</Badge>
      </Stack>
      <Text variant="body">Points Available: 2,450</Text>
      <Button
        title="Apply Points"
        type="basic"
        onPress={() => api.toast.show('Points applied to cart')}
      />
    </Stack>
  );
});
```

##### Order details block

Add custom order information, shipping details, or fulfillment tracking within order screens.

This example shows how to display shipping and tracking information within an order's details:

```
import React from 'react';
import {
  reactExtension,
  Stack,
  Text,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.order-details.block.render', () => (
  <Stack direction="block" gap="200">
    <Text variant="sectionHeader">Shipping Information</Text>
    <Stack direction="block" gap="100">
      <Text variant="body">Tracking: #1Z999AA1234567890</Text>
      <Text variant="body">Carrier: UPS Ground</Text>
      <Text variant="captionRegular" color="TextSubdued">
        Estimated delivery: Tomorrow
      </Text>
    </Stack>
  </Stack>
));
```


##### Post-purchase block

Display additional options or information after a transaction is completed.

Here's an example that offers additional services to customers after they complete their purchase:

```
import React from 'react';
import {
  reactExtension,
  Stack,
  Text,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.purchase.post.block.render', () => {
  const api = useApi();

  return (
    <Stack direction="block" gap="200">
      <Text variant="sectionHeader">Additional Services</Text>
      <Stack direction="block" gap="100">
        <Button
          title="Schedule Delivery"
          type="basic"
          onPress={() => api.action.presentModal()}
        />
        <Button
          title="Add Protection Plan"
          type="basic"
          onPress={() => console.log('Protection plan selected')}
        />
      </Stack>
    </Stack>
  );
});
```

#### Common components

##### Box

Box components provide a container for grouping content with padding, margins, and sizing control. They're useful for creating consistent layouts and visual boundaries.

This example demonstrates using a Box component to create a padded container for customer notes:

```
import React from 'react';
import {
  reactExtension,
  Box,
  Text,
  Button,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.customer-details.block.render', () => (
  <Box
    paddingInlineStart="200"
    paddingInlineEnd="200"
    paddingBlockStart="100"
    paddingBlockEnd="100"
  >
    <Text variant="sectionHeader">Customer Notes</Text>
    <Text variant="body">Premium customer - offer special discounts</Text>
    <Button title="Add Note" type="basic" />
  </Box>
));
```

##### Button

Buttons in POS UI extensions enable merchants to initiate actions like adding items, processing transactions, or opening modals.

Here's a simple button example that renders on the home screen tile:

```
import React from 'react';
import {
  reactExtension,
  Button,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.home.tile.render', () => (
  <Button
    title="Add to Cart"
    type="primary"
    onPress={() => console.log('Button pressed')}
  />
));
```

##### List

List components display scrollable data in rows, perfect for product listings, customer information, or transaction histories. This is the recommended component for displaying long lists of data as it is optimized for better memory management.

This example shows how to create a product list with multiple items, each displaying label, subtitle, and price information:

```
import React from 'react';
import {
  reactExtension,
  List,
  Navigator,
  Screen,
} from '@shopify/ui-extensions-react/point-of-sale';

const listData = [
  {
    id: 'item1',
    leftSide: {
      label: 'Coffee Mug',
      subtitle: [{content: 'Kitchen & Dining'}, {content: 'In Stock'}],
    },
    rightSide: {
      label: '$12.99',
      showChevron: true,
    },
    onPress: () => console.log('Coffee Mug selected'),
  },
  {
    id: 'item2',
    leftSide: {
      label: 'T-Shirt',
      subtitle: [{content: 'Apparel'}, {content: 'Limited Stock'}],
    },
    rightSide: {
      label: '$24.99',
      showChevron: true,
    },
  },
];

export default reactExtension('pos.home.modal.render', () => (
  <Navigator>
    <Screen name="ProductList" title="Products">
      <List title="Available Items" data={listData} />
    </Screen>
  </Navigator>
));
```

##### Navigator

Navigator components manage navigation between multiple screens within an extension, enabling complex multi-step workflows.

Here's an example of a multi-screen navigation flow with Home and Details screens:

```
import React from 'react';
import {
  reactExtension,
  Navigator,
  Screen,
  Button,
  Text,
  useApi,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.home.modal.render', () => {
  const api = useApi();

  return (
    <Navigator>
      <Screen name="Home" title="Main Menu">
        <Text variant="body">Welcome to the app</Text>
        <Button
          title="View Details"
          onPress={() => api.navigation.navigate('Details')}
        />
      </Screen>
      <Screen name="Details" title="Details">
        <Text variant="body">Detailed information here</Text>
        <Button
          title="Go Back"
          onPress={() => api.navigation.goBack()}
        />
      </Screen>
    </Navigator>
  );
});
```

##### Stack

Stack components provide flexible layout options for organizing UI elements horizontally or vertically with consistent spacing. We do not recommend Stacks for displaying extremely long lists of data, instead please use the List component.

This example demonstrates nested stacks to create a layout with buttons arranged horizontally within a vertical stack:

```
import React from 'react';
import {
  reactExtension,
  Stack,
  Button,
  Text,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.customer-details.block.render', () => (
  <Stack direction="block" gap="200">
    <Text variant="sectionHeader">Customer Actions</Text>
    <Stack direction="inline" gap="100">
      <Button title="Edit" type="basic" />
      <Button title="Delete" type="critical" />
    </Stack>
  </Stack>
));
```

##### Text

Text components in POS UI extensions support various styling options for displaying information with appropriate hierarchy and emphasis.

Here's an example showing different text variants and how to create visual hierarchy:

```
import React from 'react';
import {
  reactExtension,
  Text,
  Stack,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.product-details.block.render', () => (
  <Stack direction="block" gap="100">
    <Text variant="headingLarge">Product Information</Text>
    <Text variant="body">Additional product details</Text>
    <Text variant="captionRegular" color="TextSubdued">
      Last updated: Today
    </Text>
  </Stack>
));
```

#### Common APIs

##### Cart API

The Cart API enables extensions to interact with the POS cart, managing items, discounts, and customer information.

This example shows how to use the Cart API to add items to the cart and display the current cart item count:

```
import React from 'react';
import {
  reactExtension,
  Button,
  useApi,
  useCartSubscription,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.product-details.action.render', () => {
  const api = useApi();
  const cart = useCartSubscription();

  return (
    <Button
      title={`Add to Cart (${cart.lineItems.length} items)`}
      onPress={async () => {
        await api.cart.addLineItem(12345, 1);
        api.toast.show('Item added to cart');
      }}
    />
  );
});
```

##### Navigation API

The Navigation API provides programmatic navigation control between screens within an extension.

Here's an example of using the Navigation API to navigate to a different screen with parameters:

```
import React from 'react';
import {
  reactExtension,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.order-details.action.render', () => {
  const api = useApi();

  return (
    <Button
      title="View Order History"
      onPress={() => api.navigation.navigate('OrderHistory', {
        customerId: '123'
      })}
    />
  );
});
```

##### Toast API

The Toast API displays temporary notification messages to provide feedback for user actions.

This example demonstrates using the Toast API to show a success message when an action is completed:

```
import React from 'react';
import {
  reactExtension,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/point-of-sale';

export default reactExtension('pos.purchase.post.action.render', () => {
  const api = useApi();

  return (
    <Button
      title="Send Receipt"
      onPress={() => api.toast.show('Receipt sent successfully!')}
    />
  );
});
```
