import { NextRequest, NextResponse } from "next/server";
import NamecheapClient from "@nexys/namecheap";

export async function GET(req: NextRequest) {
  const username = "xx";
  const apiKey = "xx";
  const clientIp = "xx";

  const c = new NamecheapClient({ username, apiKey, clientIp });

  // available methods
  //   c.getHosts();
  //   c.setHosts();
  //   c.deleteHosts();
  
  try {
    await c.addHosts({ SLD: "revesh", TLD: "com" }, [
        {
          HostName: "arc-medic",
          RecordType: "A",
          Address: "73.52.62.62",
          MXPref: "10",
          TTL: "1800",
        },
      ]);
  } catch (error) {
    console.error({error});
    
  return new NextResponse("error", { status: 503 });
    
  }

  return new NextResponse("success", { status: 201 });

}
