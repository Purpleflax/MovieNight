package org.example.junietest.service

import org.example.junietest.config.TmdbConfig
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.lenient
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersUriSpec
import org.springframework.web.reactive.function.client.WebClient.ResponseSpec
import reactor.core.publisher.Mono
import org.mockito.ArgumentMatchers.any

@ExtendWith(MockitoExtension::class)
class TmdbApiServiceTest {

    @Mock
    private lateinit var webClient: WebClient

    @Mock
    private lateinit var tmdbConfig: TmdbConfig

    @Mock
    private lateinit var requestHeadersUriSpec: RequestHeadersUriSpec<*>

    @Mock
    private lateinit var responseSpec: ResponseSpec

    private lateinit var tmdbApiService: TmdbApiService

    @BeforeEach
    fun setUp() {
        // Use a real API key for tests, not the placeholder
        lenient().`when`(tmdbConfig.getApiKey()).thenReturn("test-api-key")
        lenient().`when`(tmdbConfig.getImageBaseUrl()).thenReturn("https://image.tmdb.org/t/p/w500")

        // Mock WebClient chain
        lenient().`when`(webClient.get()).thenReturn(requestHeadersUriSpec)
        lenient().`when`(requestHeadersUriSpec.uri(any<java.util.function.Function<org.springframework.web.util.UriBuilder, java.net.URI>>())).thenReturn(requestHeadersUriSpec)
        lenient().`when`(requestHeadersUriSpec.retrieve()).thenReturn(responseSpec)

        tmdbApiService = TmdbApiService(webClient, tmdbConfig)
    }

    @Test
    @DisplayName("Should return fallback movies when API key is not set")
    fun getFallbackMoviesWhenApiKeyIsNotSet() {
        // Given
        lenient().`when`(tmdbConfig.getApiKey()).thenReturn("YOUR_TMDB_API_KEY")

        // When
        val result = tmdbApiService.getPopularMovies().block() ?: emptyList()

        // Then
        assert(result.isNotEmpty())
        assert(result.size >= 10) // We have at least 10 fallback movies
    }

    @Test
    @DisplayName("Should return fallback genres when API key is not set")
    fun getFallbackGenresWhenApiKeyIsNotSet() {
        // Given
        lenient().`when`(tmdbConfig.getApiKey()).thenReturn("YOUR_TMDB_API_KEY")

        // When
        val result = tmdbApiService.getGenres().block() ?: emptyList()

        // Then
        assert(result.isNotEmpty())
        assert(result.size >= 15) // We have at least 15 fallback genres
    }

    @Test
    @DisplayName("Should filter fallback movies by genre when API key is not set")
    fun getMoviesByGenreReturnsFilteredFallbackMovies() {
        // Given
        lenient().`when`(tmdbConfig.getApiKey()).thenReturn("YOUR_TMDB_API_KEY")

        // When - Get Action movies (genre ID 28)
        val result = tmdbApiService.getMoviesByGenre(28).block() ?: emptyList()

        // Then
        assert(result.isNotEmpty())
        assert(result.all { movie -> movie.genres.any { it.id == 28L } })
    }

    @Test
    @DisplayName("Should return empty list when API returns null")
    fun getPopularMoviesReturnsEmptyListWhenApiReturnsNull() {
        // Given
        `when`(responseSpec.bodyToMono(TmdbApiService.MovieResponse::class.java))
            .thenReturn(Mono.empty())

        // When
        val result = tmdbApiService.getPopularMovies().block() ?: emptyList()

        // Then
        assert(result.isEmpty())
    }

    @Test
    @DisplayName("Should return empty list when genre ID is not found")
    fun getMoviesByGenreReturnsEmptyListWhenApiReturnsNull() {
        // Given
        `when`(responseSpec.bodyToMono(TmdbApiService.MovieResponse::class.java))
            .thenReturn(Mono.empty())

        // When
        val result = tmdbApiService.getMoviesByGenre(123).block() ?: emptyList()

        // Then
        assert(result.isEmpty())
    }

    @Test
    @DisplayName("Should return empty list when director is not found")
    fun getMoviesByDirectorReturnsEmptyListWhenApiReturnsNull() {
        // Given
        `when`(responseSpec.bodyToMono(TmdbApiService.PersonResponse::class.java))
            .thenReturn(Mono.empty())

        // When
        val result = tmdbApiService.getMoviesByDirector("Unknown Director").block() ?: emptyList()

        // Then
        assert(result.isEmpty())
    }

    @Test
    @DisplayName("Should return null when no random movie is found")
    fun getRandomMovieReturnsNullWhenNoMoviesFound() {
        // Given
        `when`(responseSpec.bodyToMono(TmdbApiService.MovieResponse::class.java))
            .thenReturn(Mono.empty())

        // When
        val result = tmdbApiService.getRandomMovie().block()

        // Then
        assert(result == null)
    }

    @Test
    @DisplayName("Should return empty list when no genres are found")
    fun getGenresReturnsEmptyListWhenApiReturnsNull() {
        // Given
        `when`(responseSpec.bodyToMono(TmdbApiService.GenreResponse::class.java))
            .thenReturn(Mono.empty())

        // When
        val result = tmdbApiService.getGenres().block() ?: emptyList()

        // Then
        assert(result.isEmpty())
    }
}
