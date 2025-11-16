import{u as a,j as e}from"./index-B9P8brZW.js";function o(n){const t={code:"code",pre:"pre",...a(),...n.components};return e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-sh",children:`export MIRO_ACCESS_TOKEN=""
export MIRO_BOARD_ID=""

curl 'https://api.miro.com/v2/boards' -H 'Content-Type: application/json' -H "Authorization: Bearer \${MIRO_ACCESS_TOKEN}" | jq

curl --location "https://api.miro.com/v2/boards/\${MIRO_BOARD_ID}/items/bulk" \\
-H 'Content-Type: application/json' \\
-H "Authorization: Bearer \${MIRO_ACCESS_TOKEN}" \\
--data '[
    {
      "type": "sticky_note",
      "data": { "content": "SearchEvents", "shape": "square" },
      "style": { "fillColor": "light_blue", "textAlign": "center" },
      "position": { "x": 0, "y": 0 }
    },
    {
      "type": "sticky_note",
      "data": { "content": "EventListed", "shape": "square" },
      "style": { "fillColor": "orange", "textAlign": "center" },
      "position": { "x": 300, "y": 0 }
    },
    {
      "type": "sticky_note",
      "data": { "content": "Payment must be authorized", "shape": "square" },
      "style": { "fillColor": "violet", "textAlign": "center" },
      "position": { "x": 600, "y": 0 }
    },
    {
      "type": "sticky_note",
      "data": { "content": "Paypal", "shape": "square" },
      "style": { "fillColor": "red", "textAlign": "center" },
      "position": { "x": 900, "y": 0 }
    },
    {
      "type": "sticky_note",
      "data": { "content": "PaymentSucceeded", "shape": "square" },
      "style": { "fillColor": "light_green", "textAlign": "center" },
      "position": { "x": 1200, "y": 0 }
    }
  ]'
`})})}function s(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{s as default};
