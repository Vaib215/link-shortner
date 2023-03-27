# Link Shortener

This is a api service that provides a link shortening functionality. It allows users to create a short code for a long URL and then redirect to the original URL by accessing the short code. The backend is built using Node.js, Express, and MongoDB.

## Installation

1. Clone the repository using `git clone https://github.com/yourusername/link-shortener-backend.git`
2. Install dependencies using `npm install`
3. Create a `.env` file and add the following variables:

    ```
    PORT=3000
    MONGODB_URI=<Your MongoDB connection URI>
    ```

    Replace `<Your MongoDB connection URI>` with your MongoDB connection string.
4. Run the server using `npm start`

## API Endpoints

- **GET /**

  Returns a simple message indicating that the server is running.

- **GET /short/:shortCode/:originalURL**

  Creates a short code for a long URL. `:shortCode` is the short code to be created and `:originalURL` is the long URL to be shortened. Returns a message indicating the short code has been created.

- **GET /:shortCode**

  Redirects to the original URL associated with a short code. `:shortCode` is the short code to be redirected to.

## Error Handling

If the short code provided in the `GET /:shortCode` endpoint does not exist, a 404 status code is returned with a message indicating that the short code was not found.

## Dependencies

- `express`: a web application framework for Node.js
- `mongoose`: an Object-Document Mapping library for MongoDB
- `dotenv`: a zero-dependency module that loads environment variables from a `.env` file
