import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const investment = await prisma.investment.create({
      data: {
        name: body.name,
        ticker: body.ticker,
        type: body.type,
        quantity: body.quantity,
        averagePrice: body.averagePrice,
      },
    });

    return NextResponse.json(
      investment,
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar investimento" },
      { status: 500 }
    );
  }
}