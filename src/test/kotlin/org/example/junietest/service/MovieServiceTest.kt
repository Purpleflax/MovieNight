package org.example.junietest.service

import org.example.junietest.model.Genre
import org.example.junietest.model.Movie
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import reactor.core.publisher.Mono

/**
 * Tests for the MovieService class.
 */
@ExtendWith(MockitoExtension::class)
class MovieServiceTest {

    @Mock
    private lateinit var tmdbApiService: TmdbApiService

    private lateinit var movieService: MovieService

    private val testMovies = listOf(
        Movie(
            id = 1,
            title = "The Shawshank Redemption",
            releaseDate = "1994-09-23",
            voteAverage = 9.3,
            genres = listOf(Genre(18, "Drama")),
            posterPath = "/path/to/poster.jpg",
            overview = "Test overview",
            director = "Frank Darabont"
        ),
        Movie(
            id = 2,
            title = "The Godfather",
            releaseDate = "1972-03-14",
            voteAverage = 9.2,
            genres = listOf(Genre(18, "Drama"), Genre(80, "Crime")),
            posterPath = "/path/to/poster2.jpg",
            overview = "Test overview 2",
            director = "Francis Ford Coppola"
        )
    )

    @BeforeEach
    fun setUp() {
        movieService = MovieService(tmdbApiService)
    }

    @Test
    @DisplayName("Should return all movies")
    fun getAllMovies() {
        // Given
        `when`(tmdbApiService.getPopularMovies()).thenReturn(Mono.just(testMovies))

        // When
        val movies = movieService.getAllMovies()

        // Then
        assertEquals(2, movies.size)
        assertTrue(movies.any { it.title == "The Shawshank Redemption" })
        assertTrue(movies.any { it.title == "The Godfather" })
        verify(tmdbApiService, times(1)).getPopularMovies()
    }

    @Test
    @DisplayName("Should return movie by ID")
    fun getMovieById() {
        // Given
        `when`(tmdbApiService.getPopularMovies()).thenReturn(Mono.just(testMovies))

        // When
        val movie = movieService.getMovieById(1)

        // Then
        assertNotNull(movie)
        assertEquals("The Shawshank Redemption", movie?.title)
        assertEquals(1994, movie?.year)
        assertEquals(9.3, movie?.voteAverage)
        assertEquals("Drama", movie?.primaryGenre)
        verify(tmdbApiService, times(1)).getPopularMovies()
    }

    @Test
    @DisplayName("Should return null for non-existent movie ID")
    fun getMovieByIdNonExistent() {
        // Given
        `when`(tmdbApiService.getPopularMovies()).thenReturn(Mono.just(testMovies))

        // When
        val movie = movieService.getMovieById(999)

        // Then
        assertNull(movie)
        verify(tmdbApiService, times(1)).getPopularMovies()
    }

    @Test
    @DisplayName("Should return movies by category")
    fun getMoviesByCategory() {
        // Given
        val genres = listOf(Genre(18, "Drama"), Genre(28, "Action"))
        val dramaMovies = testMovies.filter { movie -> movie.genres.any { it.id == 18L } }

        `when`(tmdbApiService.getGenres()).thenReturn(Mono.just(genres))
        `when`(tmdbApiService.getMoviesByGenre(18)).thenReturn(Mono.just(dramaMovies))

        // When
        val movies = movieService.getMoviesByCategory("Drama")

        // Then
        assertEquals(2, movies.size)
        assertTrue(movies.all { movie -> movie.genres.any { it.name.equals("Drama", ignoreCase = true) } })
        verify(tmdbApiService, times(1)).getGenres()
        verify(tmdbApiService, times(1)).getMoviesByGenre(18)
    }

    @Test
    @DisplayName("Should return empty list for non-existent category")
    fun getMoviesByCategoryNonExistent() {
        // Given
        val genres = listOf(Genre(18, "Drama"), Genre(28, "Action"))

        `when`(tmdbApiService.getGenres()).thenReturn(Mono.just(genres))

        // When
        val movies = movieService.getMoviesByCategory("NonExistentCategory")

        // Then
        assertTrue(movies.isEmpty())
        verify(tmdbApiService, times(1)).getGenres()
        verify(tmdbApiService, never()).getMoviesByGenre(anyLong(), eq(1))
    }

    @Test
    @DisplayName("Should return movies by director")
    fun getMoviesByDirector() {
        // Given
        val director = "Christopher Nolan"
        val nolanMovies = listOf(
            Movie(
                id = 3,
                title = "Inception",
                releaseDate = "2010-07-16",
                voteAverage = 8.8,
                genres = listOf(Genre(878, "Science Fiction"), Genre(28, "Action")),
                posterPath = "/path/to/poster3.jpg",
                overview = "Test overview 3",
                director = director
            )
        )

        `when`(tmdbApiService.getMoviesByDirector(director)).thenReturn(Mono.just(nolanMovies))

        // When
        val movies = movieService.getMoviesByDirector(director)

        // Then
        assertEquals(1, movies.size)
        assertEquals("Inception", movies[0].title)
        assertEquals(director, movies[0].director)
        verify(tmdbApiService, times(1)).getMoviesByDirector(director)
    }

    @Test
    @DisplayName("Should return random movie")
    fun getRandomMovie() {
        // Given
        val randomMovie = testMovies[0]

        `when`(tmdbApiService.getRandomMovie(null, null)).thenReturn(Mono.just(randomMovie))

        // When
        val movie = movieService.getRandomMovie()

        // Then
        assertNotNull(movie)
        assertEquals("The Shawshank Redemption", movie?.title)
        verify(tmdbApiService, times(1)).getRandomMovie(null, null)
    }

    @Test
    @DisplayName("Should return all genres")
    fun getAllGenres() {
        // Given
        val genres = listOf(Genre(18, "Drama"), Genre(28, "Action"))

        `when`(tmdbApiService.getGenres()).thenReturn(Mono.just(genres))

        // When
        val result = movieService.getAllGenres()

        // Then
        assertEquals(2, result.size)
        assertTrue(result.any { it.name == "Drama" })
        assertTrue(result.any { it.name == "Action" })
        verify(tmdbApiService, times(1)).getGenres()
    }

    @Test
    @DisplayName("Should search movies by title")
    fun searchMovies() {
        // Given
        `when`(tmdbApiService.getPopularMovies()).thenReturn(Mono.just(testMovies))

        // When
        val movies = movieService.searchMovies("The")

        // Then
        assertEquals(2, movies.size)
        assertTrue(movies.all { it.title.contains("The", ignoreCase = true) })
        verify(tmdbApiService, times(1)).getPopularMovies()
    }

    @Test
    @DisplayName("Should return empty list for search with no matches")
    fun searchMoviesNoMatches() {
        // Given
        `when`(tmdbApiService.getPopularMovies()).thenReturn(Mono.just(testMovies))

        // When
        val movies = movieService.searchMovies("NonExistentTitle")

        // Then
        assertTrue(movies.isEmpty())
        verify(tmdbApiService, times(1)).getPopularMovies()
    }
}
