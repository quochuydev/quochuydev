### 1. Upwork Proposal Form

- How do you want to be paid? **By milestone**
- If by milestone: List out milestones and amount for each milestone (10% Freelancer Service Fee)
  
  1. **Milestone 1:** Requirements Gathering and Solution Design - **$150**
  2. **Milestone 2:** Development of Product Generation Functionality - **$350**
  3. **Milestone 3:** Integration with Shopify for Product Uploads - **$200**
  4. **Milestone 4:** Testing and Deployment - **$100**

- Cover Letter:

```md
Dear Hiring Manager,

I am excited about the opportunity to develop an internal Shopify app to streamline the generation of new products for your business. Your need for an automated process to create product listings from your sofa textiles is well understood, and I believe I can deliver a solution that not only meets but exceeds your expectations.

## Problem Statement
You currently perform a manual workflow to generate product listings, which is time-consuming and inefficient. The objective is to create a Shopify app that automates the product generation process by populating necessary fields like product names, descriptions, size and color variants, and image links based on client requirements.

## Proposed Solution
I propose to develop a Shopify app that will:
1. Take user input for product details (name, description, dimensions, variants).
2. Automate image generation that combines a client's sofa image with your new textile.
3. Integrate seamlessly with Shopify to upload the generated products directly to your store.
4. Provide an easy-to-use interface where operators can manage the inputs and view the generated products before finalizing.

## Feature List
1. **User Input Form**: A simple form to collect details for the new product.
2. **Image Generation**: Backend functionality to create the composite images as specified (500px x 250px).
3. **Shopify Integration**: Direct integration with Shopify's Admin API to create product listings.
4. **Testing and Validation**: Ensure product data is correctly uploaded to Shopify without errors.

## Next Steps and Responsibilities
1. **Requirements Gathering**: Collaborate with your team to finalize all application details (Milestone 1).
2. **App Development**: Build the application functionalities as defined (Milestone 2).
3. **Integration**: Connect the app with the Shopify Admin API for product listings (Milestone 3).
4. **Testing and Deployment**: Conduct thorough testing and assist in deployment (Milestone 4).

I am dedicated to delivering a solution that enhances your efficiency in generating product listings on Shopify. I look forward to discussing this further and starting this exciting project.

Best Regards,
[Your Name]
```

---

### 2. Event Storming (Backend Input)

```yaml
Actors:
  - Name: Merchant
    Role: User who generates products
    Description: The person using the app to create new products.

Commands:
  - Name: CreateProduct
    TriggeredBy: Merchant
    Pre: none
    Next: ProductCreated

Events:
  - Name: ProductCreated
    Pre: CreateProduct
    Next: none

Policies:
  - Name: ProductCreationPolicy
    Notes: Only allow product creation with valid data
    Pre: ProductCreated
    Next: none

External systems:
  - Name: ShopifyAdminAPI
    Pre: CreateProduct
    Next: ProductCreated

Read models:
  - Name: ProductCreationForm
    BelongsTo: CreateProduct
```

### 3. Frontend Prompt Template (Frontend Input)

```yaml
Style:
  - Theme: Minimalist
  - Typography: Sans-serif
  - UI Elements: Rounded

Color Scheme:
  - Primary: #007bff
  - Secondary: #6c757d
  - Neutral: #f8f9fa
  - Accent: #28a745
  - Background: #ffffff
  - Text: #212529

Main Features:
  - Feature: Product Input Form
    Description: A form to capture product details such as name, description, images, and variants.
    Components: [TextInput, ImageUploader, DropdownSelector]
    DataBinding: API endpoint

Navigation:
  - Type: Sidebar
  - Structure: [Dashboard, Create Product, View Products]

Interactions:
  - Animations: Subtle
  - Human-in-the-Loop Inputs: Forms

Accessibility:
  - Compliance: WCAG 2.1 AA
  - Features: [High contrast mode, Screen reader support]
```