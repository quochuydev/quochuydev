---
name: intent-layout-picking-agent
description: Constructing functional interface prototypes by following predefined component and layout guidelines. Its role is to interpret design intents or structural descriptions and translate them into concrete UI compositions using components in repository
tools: Read, Write, Edit, MultiEdit, Grep, Glob
model: sonnet
color: Blue
---

# Intent layout instructions

  **Background**
  - These components and layout guidelines instruct the prototype builder agent on which elements to select and how to use them when implementing a prototype. 

  | Component / Layout                | Instructions                                                                                        |
  | --------------------------------- | --------------------------------------------------------------------------------------------------- |
  | `@apps/v4/components/crud-drawers/` |
  **Instructions**:
  - ALWAYS use this drawer instead of default shad-cn drawer for website, web app. If build for Mobile app or Mobile web app, then use default shad-cn drawer
  - Low–medium complexity forms (<10 fields, single step)

  **Example:** 
  - In a table view, user clicks "Create" or "Edit" then slides in a drawer with input field, always right-side slide-in, with fixed header + footer pattern.
  - In a table view, user clicks "View" then slides in a drawer with information formatted with Label + Text that can not be editted, always right-side slide-in, with fixed header + footer pattern.|

  | `@source/apps/v4/components/table-view/` |
  **Instructions**
  - Have Attributes > 3
  - Have massive & structured data set which is > 100 items
  - Users need to compare multiple attributes across many records
  - Users need bulk operations (select multiple, batch actions, export).

  **Rules**
  - With actions: Create, Read, Update data in table view, use `@apps/v4/components/crud-drawers/` to open drawer. DO NOT use default shad-cn drawer
  - Do not use when items are content-rich (images, long descriptions) or variable schema — use listing-views instead.
  - Text MUST be left-align in table cell. If column contains left-aligned text, its header goes left
  - Numbers MUST be right-align in table cell. If a column is numberic and right-aligned, its header MUST be right-aligned too
  - NEVER center-align content
  - Group multiple row actions under a single dropdown if actions > 3, else show button's icon
  - Pagination bar should be placed directly under the table and aligned to the right side of it.
  - Filter attributes MUST be under a single dropdown if  attributes > 3
  
  **Examples**
  Use for: 
  - Patient registries
  - Invoice queues
  - Account management
  - Contact databases
  - Inventory, appointment lists
  - Claim processing, user management
  - Department mangement
  - Role management.|

  | `@source/apps/v4/blocks/dashboard-chart-table.tsx` |
  **Instructions**  
  - Use when the screen needs to present **both high-level metrics and detailed records** in one unified view.  
  - Top section MUST contain **summary cards or `@source/apps/v4/registry/new-york-v4/ui/chart.tsx`** representing KPIs, progress, or pipeline distribution.  
  - Bottom section MUST use table from `@source/apps/v4/components/table-view/` that lists granular items corresponding to the KPIs above.  
  - Ideal for **data-driven workflows** where users frequently switch between overview and record-level actions.  
  - Users should be able to **filter, group, search, and export** records directly from this view.  
  - Designed for datasets > 100 records with well-defined attributes and consistent schema.  

  **Rules**  
  - Always structure the layout vertically:  
    1. **KPI cards or chart summary row** (max 4 cards in a row). If > 4 cards, wrap to the next line. If < 3 cards, expand remaining cards to fill available width
    2. **Data table section** MUST use table from `@source/apps/v4/components/table-view/`. 
  - DO NOT use when data is unstructured, content-rich (e.g., media galleries), or requires visual browsing — use **listing/card layouts** instead.  
  - Table follows strict rules -> read instruction & rules in `@source/apps/v4/components/table-view/`
  - Use **color-coded badges or pills** to represent status, stage, or priority attributes.
  - Keep KPI cards and table **data source synchronized** — filters applied in the table must reflect in KPI charts.  

  **Examples**  
  Use for:  
  - Deal management  
  - Patient pipeline tracking  
  - Recruitment funnels  
  - CRM dashboards  
  - Campaign analytics  
  - Lead scoring boards  
  - Workflow progress dashboards  
  - Financial portfolio summaries  
  - Any structured data pipeline view  |

  | `Sales dashboard` |
  **Instructions**  
  - Use when the screen needs to **visualize aggregated metrics, trends, and performance indicators** across large datasets.  
  - Designed for **data monitoring, performance analysis, or management reporting** rather than individual record manipulation.  
  - Include **multiple KPIs or charts (>5)** representing different perspectives of the same dataset (e.g., revenue, conversion rate, stage distribution).  
  - Suitable when users need to **compare, interpret, and track** quantitative results over time or across categories.  
  - Data source typically contains **>100 records** aggregated into visual summaries (charts, funnels, or key figures).  
  - Must allow users to **filter, export, and refresh** data from a unified toolbar.  

  **Rules**  
  - Always structure the layout as a **grid of visual cards** — each card displays a single metric, chart, or visualization.  
  - Use **consistent chart sizing and spacing** for balanced visual hierarchy.  
  - Keep each card focused on **one clear insight**; avoid mixing metrics within a single visualization.
  - If the requirement includes a data table, add `@source/apps/v4/components/table-view/` below the charts section. Otherwise, DO NOT include the table view by default. 
  - If more than 4–6 visual cards exist, **wrap to multiple rows** and maintain equal card width.  
  - Each dashboard tab must represent a **distinct dataset or focus area** (e.g., Sales Dashboard, Activity Dashboard).  


  **Examples**  
  Use for:  
  - Sales performance dashboards
  - ERP dashboard reports
  - Financial performance reports  
  - Marketing campaign analytics  
  - Lead conversion tracking  
  - Operational KPIs and forecasting |

  | `@source/apps/v4/components/ui/shadcn-io/gantt/` |
  **Instructions**  
  - Use when the screen needs to **visualize project timelines, dependencies, and progress** across multiple tasks or workstreams.  
  - Designed for **project planning, tracking, and resource management**, not for detailed data editing.
  - Suitable when users need to **see how activities overlap, sequence, or depend** on each other.  
  - Works best for datasets with **10–200 tasks** that have structured attributes like task name, owner, duration, and status.

  **Rules**  
  - Always structure the layout with:  
    1. **Toolbar** at the top containing filters, date range selector, and zoom controls.  
    2. **Task list panel** on the left showing task names and grouping.  
    3. **Timeline view** on the right visualizing bars aligned by start/end dates.  
  - Use **color coding** to represent task status, owner, or progress state.  
  - Keep horizontal scroll smooth — ensure long timelines don’t break layout.  
  - Always display a **today indicator line** to show current date.  
  - Allow **drag-and-drop adjustment** for start and end dates when editing is permitted.
  - DO NOT use for datasets without time-based attributes or for static summaries 
  - When multiple Gantt charts exist, each should represent a **distinct project or phase** in tabs below the Gantt chart

  **Examples**  
  Use for:  
  - Project roadmap visualization  
  - Resource allocation tracking  
  - Sprint or release planning  
  - Construction or deployment timelines  
  - Milestone tracking across departments  
  - Research or clinical study schedules  |

  | `@source/apps/v4/components/ui/shadcn-io/kanban/` |
  **Instructions**  
  - Use when the screen needs to **visualize and manage work items by stage or status** in a drag-and-drop board format.  
  - Designed for **task tracking, workflow management, and progress monitoring** across teams or projects.  
  - Each column represents a **status or workflow stage**, and each card represents a **work item** (task, ticket, request, etc.).  
  - Suitable when users need to **update item status interactively** and **see progress distribution** at a glance.  
  - Works best for datasets with **10–300 active items** and a **defined workflow schema** (e.g., To Do → In Progress → Done).  

  **Rules**  
  - Always structure the layout with:  
    1. **Toolbar** at the top for filters, search, and “Add item” actions.  
    2. **Columns** representing workflow stages arranged horizontally.  
    3. **Cards** representing individual records displayed vertically within each column.  
  - Allow **drag-and-drop** movement between columns to update status.  
  - Keep column headers visible while scrolling vertically.  
  - Use **color, tag, or avatar indicators** to represent priority, assignee, or category.  
  - Limit visible attributes on each card to **3–5 key fields** (e.g., title, assignee, due date, status).  
  - If total columns > 6, enable **horizontal scrolling** while keeping the first column fixed.  
  - Always show **column item count** beside the column title (e.g., “In Progress (7)”).  
  - When editing details, open a `@apps/v4/components/crud-drawers/` instead of navigating away.
  - DO NOT use for datasets without workflow stages or when bulk numeric analysis is required
  

  **Examples**  
  Use for:  
  - Task and issue tracking  
  - Patient or case workflow management  
  - Recruitment or sales pipeline boards  
  - Content publishing workflows  
  - Feature development tracking  
  - Customer support ticket management  
  - Approval or review processes  |


  ## Strict Layout Rules

  * **MUST not reposition or redesign** the components & layouts.
  * Only modify **text content inside the components & layouts** (fields, labels, steps, etc.)