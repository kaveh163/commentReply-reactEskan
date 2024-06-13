import connection from "@/lib/db";
export async function POST(request) {
  const res = await request.json();
  var query = connection.query(
    "INSERT INTO comments SET ?",
    res,
    function (error, results, fields) {
      if (error) throw error;
      // Neat!
    }
  );
  
  return Response.json({ res });
}
