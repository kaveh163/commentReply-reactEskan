import connection from "@/lib/db";
export async function GET(request) {
    function fetchComments() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM comments WHERE reply IS NULL`,  function (error, results, fields) {
      
                if(error) reject(error);
                resolve(results);
                
            });

        });
    }
    const results = await fetchComments();
   

    return Response.json(results);
    
}