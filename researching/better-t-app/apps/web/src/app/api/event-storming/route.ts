import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const templates = [
      {
        id: "example-1",
        title: "User Registration Event Storming",
        description: "Example event storming for user registration process",
        nodes: 3,
        edges: 2,
      },
      {
        id: "sub-flows-example",
        title: "Sub-Flows Example",
        description: "Example showing parallel sub-flows for data processing and analysis",
        nodes: 9,
        edges: 8,
      },
    ];

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching event storming templates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}