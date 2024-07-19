// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
 
// Route segment config
export const runtime = "edge";
 
// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl;
  const desc = searchParams.get("desc");
 
  // Fetch the Outfit font from the specified URL
  /*const font = fetch(
    new URL("../../../../public/fonts/outfit-semibold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const fontData = await font;*/
  
    const r =  new ImageResponse(
      (
        <div
          style={{          
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: 'white',
            alignItems: "center",
          }}
        >
          <img style={{
            position: "relative",
            marginTop: '150px'
  
          }} src="https://abi.ninja/logo_inv.svg" width={400}></img>
          <h2
            style={{
              position: "relative",
              textAlign: "center",
              fontSize: 150,
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",            
            }}
          >
            ABI Ninja
          </h2>
          <p style={{
              position: "relative",
              marginBottom: '310px',            
              textAlign: "center",
              fontSize: 50,
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",            
            }}
            >
            {desc}
          </p>
  
  
        </div>
      ),
      // ImageResponse options
      {
        width: 1920,
        height: 1080
        /*fonts: [
          {
            name: "Outfit",
            data: fontData,
            style: "normal",
          },
        ],*/
      },
    );
    console.log(r);
    // Create an ImageResponse with dynamic content
    return r
  
  
}