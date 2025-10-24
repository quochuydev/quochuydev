"use client";
import React, { useCallback, useState, useEffect } from "react";
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
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import "@xyflow/react/dist/style.css";
import * as yaml from "js-yaml";

interface NodeMetadata {
  description?: string;
  properties?: Record<string, any>;
}

interface EventStormingNode extends Node {
  data: Node["data"] & {
    label: string;
    color: string;
    metadata?: NodeMetadata;
  };
}

interface EventStormingData {
  metadata: {
    title: string;
    description: string;
    createdAt: string;
    version: string;
  };
  nodes: any[];
  edges: any[];
}

// Event Storming element types with colors from docs.md
const eventStormingElements = [
  { type: "actor", label: "Actor", color: "#fee750" },
  { type: "event", label: "Event", color: "#feae57" },
  { type: "command", label: "Command", color: "#a7c5fc" },
  { type: "policy", label: "Policy", color: "#da99e6" },
  { type: "reaction_policy", label: "Reaction Policy", color: "#fef5b2" },
  { type: "external_system", label: "External System", color: "#ffb3c5" },
  { type: "read_models", label: "Read Models", color: "#b0deb3" },
];

// Sub-flow types with different colors
const subFlowElements = [
  {
    type: "subflow-processing",
    label: "Processing Sub-Flow",
    color: "rgba(100, 200, 255, 0.1)",
    borderColor: "#64b5f6",
  },
  {
    type: "subflow-analysis",
    label: "Analysis Sub-Flow",
    color: "rgba(255, 150, 100, 0.1)",
    borderColor: "#ff9664",
  },
  {
    type: "subflow-validation",
    label: "Validation Sub-Flow",
    color: "rgba(150, 255, 150, 0.1)",
    borderColor: "#4ade80",
  },
  {
    type: "subflow-integration",
    label: "Integration Sub-Flow",
    color: "rgba(255, 200, 150, 0.1)",
    borderColor: "#fb923c",
  },
];

// Default empty state
const defaultNodes: EventStormingNode[] = [];
const defaultEdges: Edge[] = [];

function ReactFlowCanvasContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<EventStormingNode | null>(
    null
  );
  const [showProperties, setShowProperties] = useState(false);
  const [currentTemplate, setCurrentTemplate] =
    useState<string>("sub-flows-example");
  const [isLoading, setIsLoading] = useState(true);
  const [availableTemplates, setAvailableTemplates] = useState<any[]>([]);

  // Fetch available templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/event-storming");
        const data = await response.json();
        setAvailableTemplates(data.templates || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  // Fetch event storming data
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/event-storming/${currentTemplate}`);
        if (response.ok) {
          const data: EventStormingData = await response.json();
          setNodes(data.nodes || []);
          setEdges(data.edges || []);
        } else {
          console.error("Failed to fetch event storming data");
          setNodes(defaultNodes);
          setEdges(defaultEdges);
        }
      } catch (error) {
        console.error("Error fetching event storming data:", error);
        setNodes(defaultNodes);
        setEdges(defaultEdges);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentTemplate) {
      fetchEventData();
    }
  }, [currentTemplate, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: EventStormingNode) => {
      setSelectedNode(node);
      setShowProperties(true);
    },
    []
  );

  const updateNodeMetadata = useCallback(
    (nodeId: string, metadata: NodeMetadata) => {
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
    },
    [setNodes]
  );

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

      // Check if it's a sub-flow type
      const subFlowData = subFlowElements.find((el) => el.type === type);
      if (subFlowData) {
        // Create a resizable group node
        const newSubFlow = {
          id: `subflow_${Date.now()}`,
          type: "group",
          position: finalPosition,
          style: {
            width: 250,
            height: 180,
            backgroundColor: subFlowData.color,
            border: `2px solid ${subFlowData.borderColor}`,
            borderRadius: "8px",
          },
          data: {
            label: subFlowData.label,
            color: subFlowData.color,
            metadata: {
              description: `New ${subFlowData.label} container`,
              properties: {
                flowType: subFlowData.type.replace("subflow-", ""),
                resizable: true,
              },
            },
          },
        };

        setNodes((nds) => nds.concat(newSubFlow));
        return;
      }

      const elementData = eventStormingElements.find((el) => el.type === type);
      const newNode: EventStormingNode = {
        id: `node_${Date.now()}`,
        type: "eventStorming",
        position: finalPosition,
        data: {
          label: elementData?.label || type,
          color: elementData?.color || "#ffffff",
          metadata: {
            description: `New ${elementData?.label || type} element`,
            properties: {},
          },
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, eventStormingElements, subFlowElements]
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
            properties: {},
          },
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

  // Export functions
  const exportToJSON = useCallback(() => {
    const exportData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
        parentId: node.parentId,
        style: node.style,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      })),
      metadata: {
        title: "Event Storming Canvas",
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
      },
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `event-storming-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const exportToYAML = useCallback(() => {
    const exportData = {
      metadata: {
        title: "Event Storming Canvas",
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
      },
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          label: node.data.label,
          color: node.data.color,
          description: node.data.metadata?.description,
          properties: node.data.metadata?.properties,
        },
        parentId: node.parentId,
        style: node.style,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      })),
    };

    try {
      const yamlString = yaml.dump(exportData, {
        indent: 2,
        lineWidth: 120,
        noRefs: true,
        sortKeys: false,
      });

      const blob = new Blob([yamlString], { type: "application/x-yaml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `event-storming-${
        new Date().toISOString().split("T")[0]
      }.yaml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to YAML:", error);
    }
  }, [nodes, edges]);

  // Properties Panel component
  const PropertiesPanel = () => {
    if (!showProperties || !selectedNode) return null;

    const [metadata, setMetadata] = useState<NodeMetadata>(
      selectedNode.data.metadata || {
        description: "",
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
        const keys = Object.keys(newProperties).filter((k) => k === "");
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
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              value={metadata.description || ""}
              onChange={(e) =>
                setMetadata({ ...metadata, description: e.target.value })
              }
              className="w-full px-2 py-1 text-xs border rounded"
              rows={2}
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

  const EventStormingNode = ({
    data,
    selected,
  }: {
    data: any;
    selected: boolean;
  }) => {
    const [showMetadata, setShowMetadata] = useState(false);

    return (
      <div
        className={`px-4 py-2 shadow-md rounded-md border-2 ${
          selected ? "border-blue-500" : "border-gray-200"
        } min-w-[150px] max-w-[250px]`}
        style={{
          backgroundColor: data.color,
          minWidth: "150px",
          maxWidth: "250px",
        }}
      >
        <Handle type="target" position={Position.Top} />

        <div className="font-semibold text-sm">{data.label}</div>

        {data.metadata?.description && (
          <div className="text-xs mt-1 opacity-80">
            {data.metadata.description}
          </div>
        )}

        {showMetadata && data.metadata && (
          <div className="mt-2 p-2 bg-white bg-opacity-90 rounded text-xs">
            {data.metadata.properties &&
              Object.keys(data.metadata.properties).length > 0 && (
                <div>
                  <strong>Properties:</strong>
                  <ul className="ml-2 mt-1">
                    {Object.entries(data.metadata.properties).map(
                      ([key, value]) => (
                        <li key={key}>
                          • {key}: {String(value)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        )}

        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };

  const ResizableGroupNode = ({
    data,
    selected,
    id,
  }: {
    data: any;
    selected: boolean;
    id: string;
  }) => {
    const [showMetadata, setShowMetadata] = useState(false);

    return (
      <div
        className={`shadow-lg rounded-lg border-2 ${
          selected ? "border-blue-500" : "border-gray-300"
        }`}
        style={{
          backgroundColor: data.color,
          width: "100%",
          height: "100%",
          minWidth: "200px",
          minHeight: "150px",
        }}
      >
        <NodeResizer
          nodeId={id}
          isVisible={selected}
          handleClassName="resizer"
          handleStyle={{
            width: "12px",
            height: "12px",
            backgroundColor: "#3b82f6",
            border: "2px solid white",
          }}
        />

        <div className="p-3">
          <div className="font-semibold text-sm mb-2">{data.label}</div>

          {data.metadata?.description && (
            <div className="text-xs opacity-80">
              {data.metadata.description}
            </div>
          )}

          {showMetadata && data.metadata && (
            <div className="mt-2 p-2 bg-white bg-opacity-90 rounded text-xs">
              {data.metadata.properties &&
                Object.keys(data.metadata.properties).length > 0 && (
                  <div>
                    <strong>Properties:</strong>
                    <ul className="ml-2 mt-1">
                      {Object.entries(data.metadata.properties).map(
                        ([key, value]) => (
                          <li key={key}>
                            • {key}: {String(value)}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[500px] relative">
      {/* Template Selector */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Template:</h4>
          <select
            value={currentTemplate}
            onChange={(e) => setCurrentTemplate(e.target.value)}
            disabled={isLoading}
            className="w-full text-xs px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            {availableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
          {isLoading && (
            <div className="text-xs text-gray-500 mt-1">Loading...</div>
          )}
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

        {/* Sub-Flows */}
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Sub-Flows:</h4>
          <div className="space-y-1">
            {subFlowElements.map((element) => (
              <div
                key={element.type}
                className="flex items-center gap-2 cursor-move text-xs p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                draggable
                onDragStart={(event) => onDragStart(event, element.type)}
              >
                <div
                  className="w-3 h-3 rounded border-2 flex-shrink-0"
                  style={{
                    backgroundColor: element.color,
                    borderColor: element.borderColor,
                  }}
                />
                <span>{element.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Controls */}
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Export:</h4>
          <div className="space-y-1">
            <button
              onClick={exportToJSON}
              className="w-full text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Export to JSON
            </button>
            <button
              onClick={exportToYAML}
              className="w-full text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Export to YAML
            </button>
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
        nodeTypes={{
          eventStorming: EventStormingNode,
          group: ResizableGroupNode,
        }}
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

export default function ReactFlowCanvas() {
  return (
    <ReactFlowProvider>
      <ReactFlowCanvasContent />
    </ReactFlowProvider>
  );
}
