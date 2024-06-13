import connection from "@/lib/db";
export async function POST(request) {
  const res = await request.json();
  
  const {id, reply} = res;
  const insertData = {comment: reply, reply: id}
  let query = connection.query(
    "INSERT INTO comments SET ?",
    insertData,
    function (error, results, fields) {
      if (error) throw error;
      // Neat!
    }
  );
  
  return Response.json({ res });
}