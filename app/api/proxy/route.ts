export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const encodedUrl = searchParams.get("url") || "";
    const url = decodeURIComponent(encodedUrl);

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-api-key": process.env.API_KEY as string,
      },
    });

    if (response.status === 429) {
      return new Response("Request limit exceeded. Please try again later.", {
        status: 429,
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status });
  }
}
