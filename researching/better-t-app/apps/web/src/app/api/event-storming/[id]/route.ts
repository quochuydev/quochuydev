import { NextRequest, NextResponse } from "next/server";

const eventStormingData = {
  "example-1": {
    metadata: {
      title: "User Registration Event Storming",
      description: "Example event storming for user registration process",
      createdAt: "2025-01-24T00:00:00.000Z",
      version: "1.0.0",
    },
    nodes: [
      {
        id: "1",
        type: "eventStorming",
        position: { x: 250, y: 25 },
        data: {
          label: "User Registered",
          color: "#feae57",
          metadata: {
            description: "New user creates an account",
            properties: {
              priority: "high",
              frequency: "daily",
              source: "web-form",
            },
          },
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
            properties: {
              role: "customer",
              permissions: ["read", "write"],
            },
          },
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
            properties: {
              async: true,
              retries: 3,
            },
          },
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
    ],
  },
  "sub-flows-example": {
    metadata: {
      title: "Sub-Flows Example",
      description:
        "Example showing parallel sub-flows for data processing and analysis",
      createdAt: "2025-01-24T00:00:00.000Z",
      version: "1.0.0",
    },
    nodes: [
      {
        id: "1",
        type: "eventStorming",
        position: { x: 250, y: 25 },
        data: {
          label: "Input",
          color: "#feae57",
          metadata: {
            description: "Main input node",
            properties: {
              type: "input",
              priority: "high",
            },
          },
        },
      },
      {
        id: "2",
        type: "eventStorming",
        position: { x: 250, y: 100 },
        data: {
          label: "Main Process",
          color: "#a7c5fc",
          metadata: {
            description: "Central processing node",
            properties: {
              type: "process",
              async: true,
            },
          },
        },
      },
      {
        id: "3",
        type: "eventStorming",
        position: { x: 250, y: 350 },
        data: {
          label: "Output",
          color: "#b0deb3",
          metadata: {
            description: "Final output node",
            properties: {
              type: "output",
            },
          },
        },
      },
      {
        id: "subflow1",
        type: "group",
        position: { x: 20, y: 160 },
        style: {
          width: 200,
          height: 120,
          backgroundColor: "rgba(100, 200, 255, 0.1)",
          border: "2px solid #64b5f6",
          borderRadius: "8px",
        },
        data: {
          label: "Sub-Flow 1: Data Processing",
          color: "rgba(100, 200, 255, 0.1)",
          metadata: {
            description:
              "Data processing sub-flow with validation and transformation",
            properties: {
              flowType: "processing",
              parallel: false,
            },
          },
        },
      },
      {
        id: "sf1-1",
        type: "eventStorming",
        position: { x: 30, y: 40 },
        parentId: "subflow1",
        data: {
          label: "Validate",
          color: "#fee750",
          metadata: {
            description: "Validate input data",
            properties: {
              step: 1,
              required: true,
            },
          },
        },
      },
      {
        id: "sf1-2",
        type: "eventStorming",
        position: { x: 110, y: 40 },
        parentId: "subflow1",
        data: {
          label: "Transform",
          color: "#a7c5fc",
          metadata: {
            description: "Transform validated data",
            properties: {
              step: 2,
              async: true,
            },
          },
        },
      },
      {
        id: "subflow2",
        type: "group",
        position: { x: 280, y: 160 },
        style: {
          width: 200,
          height: 120,
          backgroundColor: "rgba(255, 150, 100, 0.1)",
          border: "2px solid #ff9664",
          borderRadius: "8px",
        },
        data: {
          label: "Sub-Flow 2: Analysis",
          color: "rgba(255, 150, 100, 0.1)",
          metadata: {
            description: "Analysis sub-flow with data analysis and reporting",
            properties: {
              flowType: "analysis",
              parallel: false,
            },
          },
        },
      },
      {
        id: "sf2-1",
        type: "eventStorming",
        position: { x: 30, y: 40 },
        parentId: "subflow2",
        data: {
          label: "Analyze",
          color: "#da99e6",
          metadata: {
            description: "Analyze processed data",
            properties: {
              step: 1,
              algorithm: "ml-model",
            },
          },
        },
      },
      {
        id: "sf2-2",
        type: "eventStorming",
        position: { x: 110, y: 40 },
        parentId: "subflow2",
        data: {
          label: "Report",
          color: "#fef5b2",
          metadata: {
            description: "Generate analysis report",
            properties: {
              step: 2,
              format: "pdf",
            },
          },
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e2-sf1", source: "2", target: "sf1-1" },
      { id: "e2-sf2", source: "2", target: "sf2-1" },
      { id: "e-sf1", source: "sf1-1", target: "sf1-2" },
      { id: "e-sf2", source: "sf2-1", target: "sf2-2" },
      { id: "e-sf1-out", source: "sf1-2", target: "3" },
      { id: "e-sf2-out", source: "sf2-2", target: "3" },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = eventStormingData[id as keyof typeof eventStormingData];

    if (!data) {
      return NextResponse.json(
        { error: `Event storming data with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching event storming data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();

    // In a real implementation, you would save this to a database
    // For now, we'll just return the data as confirmation
    return NextResponse.json({
      message: `Event storming data '${id}' saved successfully`,
      data: body,
    });
  } catch (error) {
    console.error("Error saving event storming data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
