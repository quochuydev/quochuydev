"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Types for node metadata
interface NodeMetadata {
  validationNote?: string;
  dataObjectNote?: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
}

// Extended node type with metadata
interface EventStormingNode extends Node {
  data: Node['data'] & {
    label: string;
    color: string;
    metadata?: NodeMetadata;
  };
}

// Custom node component with metadata support
const EventStormingNode = ({ data, selected }: { data: any; selected: boolean }) => {
  const [showMetadata, setShowMetadata] = useState(false);

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 ${
        selected ? 'border-blue-500' : 'border-gray-200'
      } min-w-[150px] max-w-[250px]`}
      style={{
        backgroundColor: data.color,
        minWidth: '150px',
        maxWidth: '250px'
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div className="font-semibold text-sm">
        {data.label}
      </div>

      {data.metadata?.description && (
        <div className="text-xs mt-1 opacity-80">
          {data.metadata.description}
        </div>
      )}

      <button
        onClick={() => setShowMetadata(!showMetadata)}
        className="text-xs mt-2 text-blue-600 hover:text-blue-800 underline"
      >
        {showMetadata ? 'Hide' : 'Show'} Details
      </button>

      {showMetadata && data.metadata && (
        <div className="mt-2 p-2 bg-white bg-opacity-90 rounded text-xs">
          {data.metadata.validationNote && (
            <div className="mb-1">
              <strong>Validation:</strong> {data.metadata.validationNote}
            </div>
          )}
          {data.metadata.dataObjectNote && (
            <div className="mb-1">
              <strong>Data:</strong> {data.metadata.dataObjectNote}
            </div>
          )}
          {data.metadata.tags && data.metadata.tags.length > 0 && (
            <div className="mb-1">
              <strong>Tags:</strong> {data.metadata.tags.join(', ')}
            </div>
          )}
          {data.metadata.properties && Object.keys(data.metadata.properties).length > 0 && (
            <div>
              <strong>Properties:</strong>
              <ul className="ml-2 mt-1">
                {Object.entries(data.metadata.properties).map(([key, value]) => (
                  <li key={key}>• {key}: {String(value)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Event Storming element types with colors from docs.md
const eventStormingElements = [
  { type: 'actor', label: 'Actor', color: '#fee750' },
  { type: 'event', label: 'Event', color: '#feae57' },
  { type: 'command', label: 'Command', color: '#a7c5fc' },
  { type: 'policy', label: 'Policy', color: '#da99e6' },
  { type: 'reaction_policy', label: 'Reaction Policy', color: '#fef5b2' },
  { type: 'external_system', label: 'External System', color: '#ffb3c5' },
  { type: 'read_models', label: 'Read Models', color: '#b0deb3' },
];

const initialNodes: EventStormingNode[] = [
  {
    id: "1",
    type: "eventStorming",
    position: { x: 250, y: 25 },
    data: {
      label: "User Registered",
      color: "#feae57",
      metadata: {
        description: "New user creates an account",
        validationNote: "Email must be valid and unique",
        dataObjectNote: "User entity with email, name, password",
        tags: ["authentication", "user-management"],
        properties: {
          priority: "high",
          frequency: "daily",
          source: "web-form"
        }
      }
    },
  },
  {
    id: "2",
    type: "eventStorming",
    position: { x: 100, y: 125 },
    data: {
      label: "User",
      color: "#fee750",
      metadata: {
        description: "System actor who performs actions",
        validationNote: "Must be authenticated",
        dataObjectNote: "User aggregate with profile data",
        tags: ["actor", "entity"],
        properties: {
          role: "customer",
          permissions: ["read", "write"]
        }
      }
    },
  },
  {
    id: "3",
    type: "eventStorming",
    position: { x: 400, y: 125 },
    data: {
      label: "Register User",
      color: "#a7c5fc",
      metadata: {
        description: "Command to create a new user account",
        validationNote: "Required: email, password, name",
        dataObjectNote: "Creates User aggregate",
        tags: ["command", "user-management"],
        properties: {
          async: true,
          retries: 3
        }
      }
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

const nodeTypes = {
  eventStorming: EventStormingNode,
};

export default function ReactFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<EventStormingNode | null>(null);
  const [showProperties, setShowProperties] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: EventStormingNode) => {
    setSelectedNode(node);
    setShowProperties(true);
  }, []);

  const updateNodeMetadata = useCallback((nodeId: string, metadata: NodeMetadata) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                metadata: { ...node.data.metadata, ...metadata },
              },
            }
          : node
      )
    );
  }, [setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      // Calculate position manually for newer ReactFlow versions
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Try to use screenToFlowPosition if available (newer versions)
      // otherwise fall back to calculated position
      let finalPosition = position;
      if (reactFlowInstance.screenToFlowPosition) {
        try {
          finalPosition = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
        } catch (e) {
          // Fall back to manual calculation if screenToFlowPosition fails
          finalPosition = position;
        }
      }

      const elementData = eventStormingElements.find(el => el.type === type);
      const newNode: EventStormingNode = {
        id: `node_${Date.now()}`,
        type: "eventStorming",
        position: finalPosition,
        data: {
          label: elementData?.label || type,
          color: elementData?.color || "#ffffff",
          metadata: {
            description: `New ${elementData?.label || type} element`,
            validationNote: "",
            dataObjectNote: "",
            tags: [],
            properties: {}
          }
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, eventStormingElements]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      // Create a new node at the click position
      let position = {
        x: event.clientX,
        y: event.clientY,
      };

      // Try to use screenToFlowPosition if available (newer versions)
      // otherwise fall back to calculated position
      if (reactFlowInstance.screenToFlowPosition) {
        try {
          position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
        } catch (e) {
          // Fall back to manual calculation if screenToFlowPosition fails
          console.warn("screenToFlowPosition failed, using manual calculation");
        }
      }

      const newNode: EventStormingNode = {
        id: `node_${Date.now()}`,
        type: "eventStorming",
        position,
        data: {
          label: "Event",
          color: "#feae57",
          metadata: {
            description: "Event inserted on edge",
            validationNote: "",
            dataObjectNote: "",
            tags: ["event"],
            properties: {}
          }
        },
      };

      // Create new edges
      const newEdges: Edge[] = [
        {
          id: `edge_${edge.source}_${newNode.id}`,
          source: edge.source,
          target: newNode.id,
        },
        {
          id: `edge_${newNode.id}_${edge.target}`,
          source: newNode.id,
          target: edge.target,
        },
      ];

      // Update nodes and edges
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.filter((e) => e.id !== edge.id).concat(newEdges));
    },
    [reactFlowInstance, setNodes, setEdges]
  );

  const onInit = useCallback((rfi: any) => {
    setReactFlowInstance(rfi);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Properties Panel component
  const PropertiesPanel = () => {
    if (!showProperties || !selectedNode) return null;

    const [metadata, setMetadata] = useState<NodeMetadata>(
      selectedNode.data.metadata || {
        description: "",
        validationNote: "",
        dataObjectNote: "",
        tags: [],
        properties: {},
      }
    );

    const handleSave = () => {
      updateNodeMetadata(selectedNode.id, metadata);
      setShowProperties(false);
    };

    const handleAddProperty = () => {
      setMetadata({
        ...metadata,
        properties: {
          ...metadata.properties,
          "": "",
        },
      });
    };

    const handleUpdateProperty = (key: string, value: string) => {
      const newProperties = { ...metadata.properties };
      if (key === "") {
        // Adding new property
        const keys = Object.keys(newProperties).filter(k => k === "");
        newProperties[value] = "";
        delete newProperties[""];
      } else {
        newProperties[key] = value;
      }
      setMetadata({ ...metadata, properties: newProperties });
    };

    const handleRemoveProperty = (key: string) => {
      const newProperties = { ...metadata.properties };
      delete newProperties[key];
      setMetadata({ ...metadata, properties: newProperties });
    };

    return (
      <div className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-4 shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold">Node Properties</h3>
          <button
            onClick={() => setShowProperties(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Label</label>
            <input
              type="text"
              value={selectedNode.data.label}
              disabled
              className="w-full px-2 py-1 text-xs border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              value={metadata.description || ""}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
              className="w-full px-2 py-1 text-xs border rounded"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Validation Note</label>
            <textarea
              value={metadata.validationNote || ""}
              onChange={(e) => setMetadata({ ...metadata, validationNote: e.target.value })}
              className="w-full px-2 py-1 text-xs border rounded"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Data Object Note</label>
            <textarea
              value={metadata.dataObjectNote || ""}
              onChange={(e) => setMetadata({ ...metadata, dataObjectNote: e.target.value })}
              className="w-full px-2 py-1 text-xs border rounded"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={metadata.tags?.join(", ") || ""}
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean),
                })
              }
              className="w-full px-2 py-1 text-xs border rounded"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium">Properties</label>
              <button
                onClick={handleAddProperty}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Property
              </button>
            </div>
            <div className="space-y-1">
              {Object.entries(metadata.properties || {}).map(([key, value]) => (
                <div key={key} className="flex gap-1">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleUpdateProperty(key, e.target.value)}
                    placeholder="Key"
                    className="flex-1 px-1 py-0.5 text-xs border rounded"
                  />
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => handleUpdateProperty(key, e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-1 py-0.5 text-xs border rounded"
                  />
                  <button
                    onClick={() => handleRemoveProperty(key)}
                    className="text-xs px-1 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowProperties(false)}
              className="flex-1 text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[500px] relative">
      {/* Legend Panel */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-3 shadow-lg">
        <h3 className="text-sm font-semibold mb-2">Event Storming Elements</h3>
        <div className="space-y-1">
          {eventStormingElements.map((element) => (
            <div
              key={element.type}
              className="flex items-center gap-2 text-xs"
            >
              <div
                className="w-3 h-3 rounded border border-gray-400"
                style={{ backgroundColor: element.color }}
              />
              <span>{element.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Draggable Elements */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Drag to add:</h4>
          <div className="space-y-1">
            {eventStormingElements.map((element) => (
              <div
                key={element.type}
                className="flex items-center gap-2 cursor-move text-xs p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                draggable
                onDragStart={(event) => onDragStart(event, element.type)}
              >
                <div
                  className="w-3 h-3 rounded border border-gray-400 flex-shrink-0"
                  style={{ backgroundColor: element.color }}
                />
                <span>{element.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgeContextMenu={onEdgeContextMenu}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <PropertiesPanel />
    </div>
  );
}
