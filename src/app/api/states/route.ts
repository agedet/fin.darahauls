// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const country = searchParams.get("country");

//   const data = {
//     Nigeria: ["Lagos", "Abuja", "Kano"],
//     USA: ["California", "Texas", "New York"],
//     Canada: ["Ontario", "Quebec", "Alberta"],
//   };

//   return Response.json(data[country as keyof typeof data] || []);
// }
