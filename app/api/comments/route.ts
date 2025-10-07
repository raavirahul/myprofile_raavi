// app/api/comments/route.ts
import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({}); // uses IAM role in Amplify
const ddb = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const TABLE = process.env.DDB_TABLE_NAME || "BlogComments";

type Comment = {
  id: string;
  slug: string;
  name: string;
  comment: string;
  createdAt: string; // ISO
};

// GET /api/comments?slug=post-slug
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

  const out = await ddb.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "#s = :slug",
      ExpressionAttributeNames: { "#s": "slug" },
      ExpressionAttributeValues: { ":slug": slug },
      ScanIndexForward: false, // newest first (createdAt desc)
      Limit: 100,
    })
  );

  return NextResponse.json({ ok: true, comments: (out.Items as Comment[]) ?? [] });
}

// POST { slug, name, comment }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = String(body?.slug || "");
    const name = String(body?.name || "");
    const comment = String(body?.comment || "");

    if (!slug || !name || !comment) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const createdAt = new Date().toISOString();
    const id = crypto.randomUUID();
    const item: Comment = { id, slug, name: name.slice(0, 80), comment: comment.slice(0, 2000), createdAt };

    await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));

    return NextResponse.json({ ok: true, comment: item });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
