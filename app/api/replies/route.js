import connection from "@/lib/db";
export async function POST(request) {
  const res = await request.json();
  
  const {id} = res;
  console.log('id',id);
  function fetchReplies() {
    return new Promise((resolve, reject)=> {
        connection.query('SELECT comments2.id, comments2.comment, comments2.reply FROM comments AS comments1 JOIN comments AS comments2 ON comments1.id = comments2.reply WHERE comments1.id = ?', [id], function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });

    })
    
  }
  const results = await fetchReplies();
  console.log("replyResults", results);
  
  return Response.json({ results });
}