package org.example.junietest.service

import org.example.junietest.model.Genre
import org.example.junietest.model.Movie
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

/**
 * Service for handling movie-related operations.
 */
@Service
class MovieService(private val tmdbApiService: TmdbApiService) {

    /**
     * Get all movies (popular movies from TMDB).
     *
     * @return List of all movies
     */
    fun getAllMovies(): List<Movie> = tmdbApiService.getPopularMovies().block() ?: emptyList()

    /**
     * Get a movie by its ID.
     *
     * @param id The ID of the movie to retrieve
     * @return The movie with the specified ID, or null if not found
     */
    fun getMovieById(id: Long): Movie? {
        val movies = getAllMovies()
        return movies.find { it.id == id }
    }

    /**
     * Get movies by category/genre.
     *
     * @param category The category/genre to filter by
     * @return List of movies in the specified category/genre
     */
    fun getMoviesByCategory(category: String): List<Movie> {
        val genres = tmdbApiService.getGenres().block() ?: emptyList()
        val genreId = genres.find { it.name.equals(category, ignoreCase = true) }?.id
        return if (genreId != null) {
            tmdbApiService.getMoviesByGenre(genreId).block() ?: emptyList()
        } else {
            emptyList()
        }
    }

    /**
     * Get movies by director.
     *
     * @param directorName The name of the director
     * @return List of movies by the specified director
     */
    fun getMoviesByDirector(directorName: String): List<Movie> =
        tmdbApiService.getMoviesByDirector(directorName).block() ?: emptyList()

    /**
     * Get a random movie.
     *
     * @param genreId Optional genre ID to filter by
     * @param directorName Optional director name to filter by
     * @return A random movie, or null if no movies are found
     */
    fun getRandomMovie(genreId: Long? = null, directorName: String? = null): Movie? =
        tmdbApiService.getRandomMovie(genreId, directorName).block()

    /**
     * Get all available genres.
     *
     * @return List of all genres
     */
    fun getAllGenres(): List<Genre> = tmdbApiService.getGenres().block() ?: emptyList()

    /**
     * Search for movies by title.
     *
     * @param query The search query
     * @return List of movies matching the search query
     */
    fun searchMovies(query: String): List<Movie> {
        val movies = getAllMovies()
        return movies.filter { it.title.contains(query, ignoreCase = true) }
    }
}
