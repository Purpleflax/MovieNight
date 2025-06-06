package org.example.junietest.controller

import org.example.junietest.model.Genre
import org.example.junietest.model.Movie
import org.example.junietest.service.MovieService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * REST controller for movie-related endpoints.
 */
@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = ["*"])
class MovieController(private val movieService: MovieService) {

    /**
     * Get all movies.
     *
     * @return List of all movies
     */
    @GetMapping
    fun getAllMovies(): List<Movie> = movieService.getAllMovies()

    /**
     * Get a movie by its ID.
     *
     * @param id The ID of the movie to retrieve
     * @return The movie with the specified ID, or 404 if not found
     */
    @GetMapping("/{id}")
    fun getMovieById(@PathVariable id: Long): ResponseEntity<Movie> {
        val movie = movieService.getMovieById(id)
        return if (movie != null) {
            ResponseEntity.ok(movie)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    /**
     * Get movies by category/genre.
     *
     * @param category The category/genre to filter by
     * @return List of movies in the specified category/genre
     */
    @GetMapping("/category/{category}")
    fun getMoviesByCategory(@PathVariable category: String): List<Movie> =
        movieService.getMoviesByCategory(category)

    /**
     * Get movies by director.
     *
     * @param director The director name to filter by
     * @return List of movies by the specified director
     */
    @GetMapping("/director/{director}")
    fun getMoviesByDirector(@PathVariable director: String): List<Movie> =
        movieService.getMoviesByDirector(director)

    /**
     * Get a random movie.
     *
     * @param genreId Optional genre ID to filter by
     * @param director Optional director name to filter by
     * @return A random movie, or 404 if no movies are found
     */
    @GetMapping("/random")
    fun getRandomMovie(
        @RequestParam(required = false) genreId: Long?,
        @RequestParam(required = false) director: String?
    ): ResponseEntity<Movie> {
        val movie = movieService.getRandomMovie(genreId, director)
        return if (movie != null) {
            ResponseEntity.ok(movie)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    /**
     * Get all available genres.
     *
     * @return List of all genres
     */
    @GetMapping("/genres")
    fun getAllGenres(): List<Genre> = movieService.getAllGenres()

    /**
     * Search for movies by title.
     *
     * @param query The search query
     * @return List of movies matching the search query
     */
    @GetMapping("/search")
    fun searchMovies(@RequestParam query: String): List<Movie> =
        movieService.searchMovies(query)
}
