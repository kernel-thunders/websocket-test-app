import { NextResponse } from "next/server";

// ダミーデータ: 実際にはサーバーから取得するか、DB で管理する
const rooms = ["Room 1", "Room 2", "Room 3"];

export async function GET() {
    return NextResponse.json(rooms);
}
