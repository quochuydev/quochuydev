# E-commerce Admin - Product Management System

```yaml
Style:
  - Theme: Modern
  - Typography: SansSerif
  - UIElements: Rounded

ColorScheme:
  - primary: "#2563eb"
  - secondary: "#7c3aed"
  - neutral: "#64748b"
  - accent: "#f59e0b"
  - background: "#f8fafc"
  - text: "#0f172a"

MainFeatures:
  - feature: productListing
    description: "Display all products in a searchable, filterable table with pagination"
    components: [dataTable, searchBar, filterDropdowns, pagination]
    dataBinding: "/api/products"
    actions: [view, edit, delete, duplicate]

  - feature: productCreation
    description: "Add new products with details, images, pricing, and inventory"
    components: [form, imageUploader, richTextEditor, multiSelect, numberInput]
    dataBinding: "/api/products/create"
    fields:
      [
        productName,
        description,
        category,
        price,
        compareAtPrice,
        sku,
        inventory,
        images,
        tags,
        status,
      ]

  - feature: productEditing
    description: "Modify existing product information with validation"
    components: [form, imageUploader, richTextEditor, deleteConfirmation]
    dataBinding: "/api/products/{id}/update"

  - feature: bulkActions
    description: "Perform actions on multiple products simultaneously"
    components: [checkboxes, actionDropdown, confirmationModal]
    actions: [bulkDelete, bulkStatusChange, bulkExport, bulkPriceUpdate]

  - feature: inventoryTracking
    description: "Monitor stock levels with low-stock alerts"
    components: [statusBadge, progressBar, alertNotification]
    dataBinding: "/api/inventory"

  - feature: categoryManagement
    description: "Organize products into hierarchical categories"
    components: [treeView, dragAndDrop, categoryModal]
    dataBinding: "/api/categories"

  - feature: analyticsOverview
    description: "Display key product performance metrics"
    components: [statCards, lineChart, barChart, dateRangePicker]
    metrics:
      [totalProducts, lowStockItems, revenueByProduct, topSellingProducts]
    dataBinding: "/api/analytics/products"

  - feature: imageGalleryManagement
    description: "Upload, reorder, and manage product images"
    components: [dragDropUploader, imageGrid, cropTool, deleteButton]
    dataBinding: "/api/products/{id}/images"

Navigation:
  - type: sidebar
  - structure:
      - home: Dashboard
      - products:
          label: Products
          children: [allProducts, addProduct, categories, inventory]
      - orders: Orders
      - customers: Customers
      - analytics: Analytics
      - settings:
          label: Settings
          children: [storeSettings, paymentSettings, shippingSettings, profile]

Interactions:
  - animations: subtle
  - humanInTheLoopInputs:
      - productApproval: "Review and approve new product listings before publishing"
      - priceChangeConfirmation: "Confirm bulk price updates before applying"
      - deleteConfirmation: "Confirm deletion of products to prevent accidental removal"
      - inventoryAdjustment: "Manual inventory count corrections with reason notes"
      - imageModeration: "Review and approve product images for quality standards"

Layout:
  - header:
      elements: [logo, searchGlobal, notificationBell, userAvatar]
  - sidebar:
      width: "280px"
      collapsible: true
  - mainContent:
      maxWidth: "1400px"
      padding: "24px"

DataTable:
  - columns:
      [
        checkbox,
        image,
        productName,
        sku,
        category,
        price,
        inventory,
        status,
        actions,
      ]
  - sortable: true
  - filterable: true
  - searchable: true
  - rowsPerPage: [25, 50, 100]
  - exportOptions: [csv, excel, pdf]

Forms:
  - validation: realTime
  - autoSave: true
  - unsavedChangesWarning: true
  - requiredFields: [productName, price, category]

Notifications:
  - types: [success, error, warning, info]
  - position: topRight
  - duration: 4000ms
  - dismissible: true

Accessibility:
  - compliance: WCAG2.1AA
  - features:
      - highContrastMode: true
      - screenReaderSupport: true
      - keyboardNavigation: true
      - focusIndicators: visible
      - ariaLabels: comprehensive
      - skipNavigation: true

ResponsiveBreakpoints:
  - mobile: "< 768px"
  - tablet: "768px - 1024px"
  - desktop: "> 1024px"

StateManagement:
  - loadingStates: [skeleton, spinner, progressBar]
  - emptyStates: [noProducts, noSearchResults, noCategory]
  - errorStates: [networkError, validationError, permissionDenied]

Security:
  - authentication: required
  - roleBasedAccess: [admin, manager, editor, viewer]
  - actionPermissions:
      - create: [admin, manager, editor]
      - edit: [admin, manager, editor]
      - delete: [admin, manager]
      - view: [admin, manager, editor, viewer]
```
