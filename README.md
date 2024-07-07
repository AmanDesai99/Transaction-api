Explanation, 

We define a schema for the Transactions collection using Mongoose.
We create an API endpoint /transactions that takes three query parameters: page, perPage, and search.
If the search parameter is provided, we create a MongoDB query that searches for the search text in the product.title, product.description, and product.price fields using the $regex operator with case-insensitive matching.
We use the skip and limit methods to implement pagination. We skip the first (page - 1) * perPage documents and limit the result to perPage documents.
We also count the total number of documents that match the query using countDocuments.
We return the list of transactions along with pagination metadata, including the current page, per page, total pages, and total count.

Example usage,

To retrieve all transactions without search or pagination: GET /transactions
To retrieve transactions with search: GET /transactions?search=keyword
To retrieve transactions with pagination: GET /transactions?page=2&perPage=20
To retrieve transactions with search and pagination: GET /transactions?search=keyword&page=2&perPage=20

Note,
This implementation assumes that the product field is an object with title, description, and price properties. You may need to adjust the schema and query accordingly based on your actual data structure.
