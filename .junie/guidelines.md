# JunieTest Project Guidelines

This document provides guidelines and instructions for developing and maintaining the JunieTest project, a movie selection application with TMDB API integration and a fun movie-night themed UI.

## Build/Configuration Instructions

### Prerequisites
- Java 21
- Maven 3.6+
- Node.js 18+ and npm (for frontend development)
- TMDB API Key (get one at https://www.themoviedb.org/settings/api)

### Backend Setup (Kotlin with Spring Boot)
1. Clone the repository
2. Configure your TMDB API key in `src/main/resources/application.properties`:
   ```properties
   tmdb.api.key=YOUR_TMDB_API_KEY
   ```
   **Note**: If you don't have a TMDB API key, the application will still work with a fallback mechanism that provides sample movies and genres for testing purposes.
3. Build the project using Maven:
   ```bash
   ./mvnw clean install
   ```
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The application will start on http://localhost:8080

### Frontend Setup (React with TypeScript)
The frontend is built with React and TypeScript and is embedded in the Spring Boot application as static resources. For development:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

   If you encounter permission errors during npm install, try one of these solutions:

   a. Use the `--force` flag to overwrite files:
   ```bash
   npm install --force
   ```

   b. Clear the npm cache and try again:
   ```bash
   npm cache clean --force
   npm install
   ```

   c. Fix npm cache permissions:
   ```bash
   sudo chown -R $(whoami) ~/.npm
   npm install
   ```

   d. Use a different package manager like Yarn:
   ```bash
   npm install -g yarn
   yarn
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend development server will start on http://localhost:3000

4. To build the frontend for production:
   ```bash
   npm run build
   ```
   The build output will be automatically copied to `src/main/resources/static`

## Testing Information

### Backend Testing

#### Running Tests
To run all tests:
```bash
./mvnw test
```

To run a specific test class:
```bash
./mvnw test -Dtest=MovieServiceTest
```

To run a specific test method:
```bash
./mvnw test -Dtest=MovieServiceTest#getMovieById
```

#### Adding New Tests

##### Service Tests
1. Create a test class in the `src/test/kotlin/org/example/junietest/service` directory
2. Use JUnit 5 annotations (`@Test`, `@DisplayName`, etc.)
3. Follow the Arrange-Act-Assert pattern

Example:
```kotlin
@Test
@DisplayName("Should return movie by ID")
fun getMovieById() {
    // Arrange (Given)
    val movieService = MovieService()

    // Act (When)
    val movie = movieService.getMovieById(1)

    // Assert (Then)
    assertNotNull(movie)
    assertEquals("The Shawshank Redemption", movie?.title)
}
```

##### Controller Tests
1. Create a test class in the `src/test/kotlin/org/example/junietest/controller` directory
2. Use `@WebMvcTest` to test only the web layer
3. Create a configuration class to provide mock dependencies
4. Use MockMvc to test endpoints

Example:
```kotlin
@Configuration
class TestConfig {
    @Bean
    fun movieService(): MovieService = mock(MovieService::class.java)
}

@WebMvcTest(MovieController::class)
@Import(TestConfig::class)
class MovieControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var movieService: MovieService

    @Test
    @DisplayName("Should return movie by ID")
    fun getMovieById() {
        // Given
        val movie = Movie(1, "Test Movie", 2021, 8.5, "Action")
        `when`(movieService.getMovieById(1)).thenReturn(movie)

        // When/Then
        mockMvc.perform(get("/api/movies/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.title").value("Test Movie"))
    }
}
```

### Frontend Testing
Frontend tests should be written using Jest and React Testing Library. To run frontend tests:
```bash
cd frontend
npm test
```

## Additional Development Information

### Code Style

#### Kotlin
- Follow the [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
- Use data classes for models
- Prefer immutability (val over var)
- Use extension functions where appropriate
- Use nullable types only when necessary

#### TypeScript/React
- Use functional components with hooks
- Use TypeScript interfaces for props and state
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use CSS-in-JS or styled-components for styling

### Project Structure

#### Backend
- `model`: Data classes representing domain entities
- `service`: Business logic including TMDB API integration
- `controller`: REST endpoints
- `config`: Application configuration for TMDB API

#### Frontend
- `components`: Reusable UI components (MovieWheel, FilterControls, MovieDetails)
- `types`: TypeScript type definitions for Movie and Genre
- `public`: Static assets and HTML entry point

### UI Theme
The application features a fun movie-night themed UI with the following elements:
- Movie-themed color scheme (dark background with red and gold accents)
- Film-related decorative elements (popcorn, movie clapper, film strips)
- Animated spinning wheel for random movie selection
- Cinematic card design for movie details
- Custom fonts and animations for a more engaging experience

### API Documentation
The application provides the following REST API endpoints:

#### Movie Endpoints
- `GET /api/movies`: Get all popular movies from TMDB
- `GET /api/movies/{id}`: Get a movie by ID
- `GET /api/movies/category/{category}`: Get movies by genre/category
- `GET /api/movies/director/{director}`: Get movies by director
- `GET /api/movies/random`: Get a random movie (with optional genre and director filters)
- `GET /api/movies/genres`: Get all available genres
- `GET /api/movies/search?query={query}`: Search for movies by title

These endpoints can be used to interact with the application programmatically. For example, to get a random movie filtered by genre and director:

```
GET /api/movies/random?genreId=28&director=Christopher%20Nolan
```

Full API documentation using OpenAPI/Swagger will be available at http://localhost:8080/swagger-ui.html once implemented.

### Debugging
- Use logging instead of print statements
- Configure log levels in `application.properties`
- For frontend, use browser developer tools and React DevTools

### Deployment
The application can be packaged as a JAR file and deployed to any environment that supports Java:
```bash
./mvnw package
java -jar target/JunieTest-0.0.1-SNAPSHOT.jar
```

For production deployments, consider:
- Setting appropriate Spring profiles
- Configuring a production database
- Setting up CI/CD pipelines
- Containerizing the application with Docker
