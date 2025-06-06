package org.example.junietest.controller

import org.example.junietest.model.Genre
import org.example.junietest.model.Movie
import org.example.junietest.service.MovieService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

/**
 * Configuration class that provides mock beans for testing.
 */
@Configuration
class TestConfig {
    @Bean
    fun movieService(): MovieService = mock(MovieService::class.java)
}

/**
 * Tests for the MovieController class.
 */
@WebMvcTest(MovieController::class)
@Import(TestConfig::class)
class MovieControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var movieService: MovieService

    @BeforeEach
    fun setUp() {
        reset(movieService)
    }

    private val testMovies = listOf(
        Movie(
            id = 1,
            title = "Test Movie 1",
            releaseDate = "2021-01-01",
            voteAverage = 8.5,
            genres = listOf(Genre(28, "Action")),
            posterPath = "/path/to/poster1.jpg",
            overview = "Test overview 1",
            director = "Test Director 1"
        ),
        Movie(
            id = 2,
            title = "Test Movie 2",
            releaseDate = "2022-01-01",
            voteAverage = 7.5,
            genres = listOf(Genre(35, "Comedy")),
            posterPath = "/path/to/poster2.jpg",
            overview = "Test overview 2",
            director = "Test Director 2"
        )
    )

    @Test
    @DisplayName("Should return all movies")
    fun getAllMovies() {
        // Given
        `when`(movieService.getAllMovies()).thenReturn(testMovies)

        // When/Then
        mockMvc.perform(get("/api/movies")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].title").value("Test Movie 1"))
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].title").value("Test Movie 2"))

        verify(movieService, times(1)).getAllMovies()
    }

    @Test
    @DisplayName("Should return movie by ID")
    fun getMovieById() {
        // Given
        val movie = testMovies[0]
        `when`(movieService.getMovieById(1)).thenReturn(movie)

        // When/Then
        mockMvc.perform(get("/api/movies/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Movie 1"))
            .andExpect(jsonPath("$.release_date").value("2021-01-01"))
            .andExpect(jsonPath("$.vote_average").value(8.5))
            .andExpect(jsonPath("$.genres[0].name").value("Action"))

        verify(movieService, times(1)).getMovieById(1)
    }

    @Test
    @DisplayName("Should return 404 for non-existent movie ID")
    fun getMovieByIdNonExistent() {
        // Given
        `when`(movieService.getMovieById(999)).thenReturn(null)

        // When/Then
        mockMvc.perform(get("/api/movies/999")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound)

        verify(movieService, times(1)).getMovieById(999)
    }

    @Test
    @DisplayName("Should return movies by category")
    fun getMoviesByCategory() {
        // Given
        val actionMovies = listOf(testMovies[0])
        `when`(movieService.getMoviesByCategory("Action")).thenReturn(actionMovies)

        // When/Then
        mockMvc.perform(get("/api/movies/category/Action")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].genres[0].name").value("Action"))

        verify(movieService, times(1)).getMoviesByCategory("Action")
    }

    @Test
    @DisplayName("Should return movies by director")
    fun getMoviesByDirector() {
        // Given
        val director = "Test Director 1"
        val directorMovies = listOf(testMovies[0])
        `when`(movieService.getMoviesByDirector(director)).thenReturn(directorMovies)

        // When/Then
        mockMvc.perform(get("/api/movies/director/Test Director 1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].director").value(director))

        verify(movieService, times(1)).getMoviesByDirector(director)
    }

    @Test
    @DisplayName("Should return random movie")
    fun getRandomMovie() {
        // Given
        val randomMovie = testMovies[0]
        `when`(movieService.getRandomMovie(null, null)).thenReturn(randomMovie)

        // When/Then
        mockMvc.perform(get("/api/movies/random")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Movie 1"))

        verify(movieService, times(1)).getRandomMovie(null, null)
    }

    @Test
    @DisplayName("Should return random movie with genre filter")
    fun getRandomMovieWithGenreFilter() {
        // Given
        val randomMovie = testMovies[0]
        val genreId = 28L
        `when`(movieService.getRandomMovie(genreId, null)).thenReturn(randomMovie)

        // When/Then
        mockMvc.perform(get("/api/movies/random?genreId=28")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Movie 1"))

        verify(movieService, times(1)).getRandomMovie(genreId, null)
    }

    @Test
    @DisplayName("Should return random movie with director filter")
    fun getRandomMovieWithDirectorFilter() {
        // Given
        val randomMovie = testMovies[0]
        val director = "Test Director 1"
        `when`(movieService.getRandomMovie(null, director)).thenReturn(randomMovie)

        // When/Then
        mockMvc.perform(get("/api/movies/random?director=Test Director 1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Movie 1"))

        verify(movieService, times(1)).getRandomMovie(null, director)
    }

    @Test
    @DisplayName("Should return 404 when no random movie is found")
    fun getRandomMovieNotFound() {
        // Given
        `when`(movieService.getRandomMovie(null, null)).thenReturn(null)

        // When/Then
        mockMvc.perform(get("/api/movies/random")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound)

        verify(movieService, times(1)).getRandomMovie(null, null)
    }

    @Test
    @DisplayName("Should return all genres")
    fun getAllGenres() {
        // Given
        val genres = listOf(
            Genre(28, "Action"),
            Genre(35, "Comedy"),
            Genre(18, "Drama")
        )
        `when`(movieService.getAllGenres()).thenReturn(genres)

        // When/Then
        mockMvc.perform(get("/api/movies/genres")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(28))
            .andExpect(jsonPath("$[0].name").value("Action"))
            .andExpect(jsonPath("$[1].id").value(35))
            .andExpect(jsonPath("$[1].name").value("Comedy"))
            .andExpect(jsonPath("$[2].id").value(18))
            .andExpect(jsonPath("$[2].name").value("Drama"))

        verify(movieService, times(1)).getAllGenres()
    }

    @Test
    @DisplayName("Should search movies by title")
    fun searchMovies() {
        // Given
        val movies = listOf(testMovies[0], testMovies[1])
        `when`(movieService.searchMovies("Test")).thenReturn(movies)

        // When/Then
        mockMvc.perform(get("/api/movies/search?query=Test")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].title").value("Test Movie 1"))
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].title").value("Test Movie 2"))

        verify(movieService, times(1)).searchMovies("Test")
    }
}
