package org.example.junietest.service

import com.fasterxml.jackson.annotation.JsonProperty
import org.example.junietest.config.TmdbConfig
import org.example.junietest.model.Genre
import org.example.junietest.model.Movie
import org.example.junietest.model.StreamingService
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.util.UriBuilder
import reactor.core.publisher.Mono
import java.util.concurrent.ThreadLocalRandom
import org.slf4j.LoggerFactory

/**
 * Service for interacting with the TMDB API.
 */
@Service
class TmdbApiService(
    private val webClient: WebClient,
    private val tmdbConfig: TmdbConfig
) {
    private val logger = LoggerFactory.getLogger(TmdbApiService::class.java)

    /**
     * Provides a list of fallback movies when the API key is not set.
     * This is a temporary solution until a valid API key is configured.
     */
    private fun getFallbackMovies(): List<Movie> {
        logger.warn("Using fallback movies because TMDB API key is not set")
        return listOf(
            Movie(
                id = 1,
                title = "The Shawshank Redemption",
                releaseDate = "1994-09-23",
                voteAverage = 9.3,
                genres = listOf(Genre(18, "Drama")),
                posterPath = "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                overview = "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
                director = "Frank Darabont"
            ),
            Movie(
                id = 2,
                title = "The Godfather",
                releaseDate = "1972-03-14",
                voteAverage = 9.2,
                genres = listOf(Genre(18, "Drama"), Genre(80, "Crime")),
                posterPath = "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                overview = "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
                director = "Francis Ford Coppola"
            ),
            Movie(
                id = 3,
                title = "The Dark Knight",
                releaseDate = "2008-07-16",
                voteAverage = 9.0,
                genres = listOf(Genre(28, "Action"), Genre(80, "Crime"), Genre(18, "Drama")),
                posterPath = "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                overview = "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
                director = "Christopher Nolan"
            ),
            Movie(
                id = 4,
                title = "Pulp Fiction",
                releaseDate = "1994-09-10",
                voteAverage = 8.9,
                genres = listOf(Genre(53, "Thriller"), Genre(80, "Crime")),
                posterPath = "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                overview = "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
                director = "Quentin Tarantino"
            ),
            Movie(
                id = 5,
                title = "Inception",
                releaseDate = "2010-07-15",
                voteAverage = 8.8,
                genres = listOf(Genre(28, "Action"), Genre(878, "Science Fiction"), Genre(12, "Adventure")),
                posterPath = "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                overview = "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
                director = "Christopher Nolan"
            ),
            Movie(
                id = 6,
                title = "The Matrix",
                releaseDate = "1999-03-30",
                voteAverage = 8.7,
                genres = listOf(Genre(28, "Action"), Genre(878, "Science Fiction")),
                posterPath = "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
                overview = "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
                director = "Lana Wachowski"
            ),
            Movie(
                id = 7,
                title = "Spirited Away",
                releaseDate = "2001-07-20",
                voteAverage = 8.7,
                genres = listOf(Genre(16, "Animation"), Genre(10751, "Family"), Genre(14, "Fantasy")),
                posterPath = "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
                overview = "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
                director = "Hayao Miyazaki"
            ),
            Movie(
                id = 8,
                title = "Parasite",
                releaseDate = "2019-05-30",
                voteAverage = 8.6,
                genres = listOf(Genre(35, "Comedy"), Genre(53, "Thriller"), Genre(18, "Drama")),
                posterPath = "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                overview = "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
                director = "Bong Joon-ho"
            ),
            Movie(
                id = 9,
                title = "Your Name",
                releaseDate = "2016-08-26",
                voteAverage = 8.6,
                genres = listOf(Genre(16, "Animation"), Genre(18, "Drama"), Genre(10749, "Romance")),
                posterPath = "/q719jXXEzOoYaps6babgKnONONX.jpg",
                overview = "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
                director = "Makoto Shinkai"
            ),
            Movie(
                id = 10,
                title = "Whiplash",
                releaseDate = "2014-10-10",
                voteAverage = 8.5,
                genres = listOf(Genre(18, "Drama"), Genre(10402, "Music")),
                posterPath = "/6uSPcdGNA2A6vJmCagXkvnutegs.jpg",
                overview = "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
                director = "Damien Chazelle"
            )
        )
    }

    /**
     * Provides a list of fallback genres when the API key is not set.
     * This is a temporary solution until a valid API key is configured.
     */
    private fun getFallbackGenres(): List<Genre> {
        logger.warn("Using fallback genres because TMDB API key is not set")
        return listOf(
            Genre(28, "Action"),
            Genre(12, "Adventure"),
            Genre(16, "Animation"),
            Genre(35, "Comedy"),
            Genre(80, "Crime"),
            Genre(99, "Documentary"),
            Genre(18, "Drama"),
            Genre(10751, "Family"),
            Genre(14, "Fantasy"),
            Genre(36, "History"),
            Genre(27, "Horror"),
            Genre(10402, "Music"),
            Genre(9648, "Mystery"),
            Genre(10749, "Romance"),
            Genre(878, "Science Fiction"),
            Genre(10770, "TV Movie"),
            Genre(53, "Thriller"),
            Genre(10752, "War"),
            Genre(37, "Western")
        )
    }
    /**
     * Fetches a list of popular movies.
     *
     * @param page The page number to fetch
     * @return A Mono emitting a list of movies
     */
    fun getPopularMovies(page: Int = 1): Mono<List<Movie>> {
        // If the API key is not set, return fallback movies
        if (tmdbConfig.getApiKey() == "YOUR_TMDB_API_KEY") {
            return Mono.just(getFallbackMovies())
        }

        return webClient.get()
            .uri { uriBuilder -> buildUri(uriBuilder, "/movie/popular", mapOf("page" to page.toString())) }
            .retrieve()
            .bodyToMono(MovieResponse::class.java)
            .map { it.results }
            .flatMap { movies -> enrichMoviesWithDetails(movies) }
    }

    /**
     * Fetches a list of movies by genre.
     *
     * @param genreId The genre ID to filter by
     * @param page The page number to fetch
     * @return A Mono emitting a list of movies in the specified genre
     */
    fun getMoviesByGenre(genreId: Long, page: Int = 1): Mono<List<Movie>> {
        // If the API key is not set, return a fallback list of movies for the genre
        if (tmdbConfig.getApiKey() == "YOUR_TMDB_API_KEY") {
            return Mono.just(getFallbackMoviesByGenre(genreId))
        }

        return webClient.get()
            .uri { uriBuilder -> 
                buildUri(uriBuilder, "/discover/movie", mapOf(
                    "with_genres" to genreId.toString(),
                    "page" to page.toString()
                ))
            }
            .retrieve()
            .bodyToMono(MovieResponse::class.java)
            .map { it.results }
            .flatMap { movies -> enrichMoviesWithDetails(movies) }
    }

    /**
     * Provides fallback movies for a specific genre when the API key is not set.
     * This is a temporary solution until a valid API key is configured.
     */
    private fun getFallbackMoviesByGenre(genreId: Long): List<Movie> {
        val allFallbackMovies = getFallbackMovies()
        return allFallbackMovies.filter { movie ->
            movie.genres.any { it.id == genreId }
        }
    }

    /**
     * Fetches a list of movies by director.
     *
     * @param directorName The name of the director
     * @param page The page number to fetch
     * @return A Mono emitting a list of movies by the specified director
     */
    fun getMoviesByDirector(directorName: String, page: Int = 1): Mono<List<Movie>> {
        // If the API key is not set, return fallback movies filtered by director
        if (tmdbConfig.getApiKey() == "YOUR_TMDB_API_KEY") {
            return Mono.just(getFallbackMoviesByDirector(directorName))
        }

        // First, search for the person (director)
        return webClient.get()
            .uri { uriBuilder -> 
                buildUri(uriBuilder, "/search/person", mapOf(
                    "query" to directorName,
                    "page" to "1"
                ))
            }
            .retrieve()
            .bodyToMono(PersonResponse::class.java)
            .map { it.results.firstOrNull()?.id }
            .flatMap { personId ->
                if (personId == null) {
                    return@flatMap Mono.just(emptyList<Movie>())
                }

                // Then, get movies where this person is a director
                webClient.get()
                    .uri { uriBuilder -> 
                        buildUri(uriBuilder, "/discover/movie", mapOf(
                            "with_crew" to personId.toString(),
                            "page" to page.toString()
                        ))
                    }
                    .retrieve()
                    .bodyToMono(MovieResponse::class.java)
                    .map { it.results }
                    .flatMap { movies -> enrichMoviesWithDetails(movies) }
            }
    }

    /**
     * Provides fallback movies for a specific director when the API key is not set.
     * This is a temporary solution until a valid API key is configured.
     */
    private fun getFallbackMoviesByDirector(directorName: String): List<Movie> {
        val allFallbackMovies = getFallbackMovies()
        return allFallbackMovies.filter { movie ->
            movie.director?.contains(directorName, ignoreCase = true) == true
        }
    }

    /**
     * Fetches a random movie.
     *
     * @param genreId Optional genre ID to filter by
     * @param directorName Optional director name to filter by
     * @return A Mono emitting a random movie, or empty if no movies are found
     */
    fun getRandomMovie(genreId: Long? = null, directorName: String? = null): Mono<Movie> {
        // The getMoviesByGenre, getMoviesByDirector, and getPopularMovies methods
        // already handle the fallback mechanism, so we don't need to check the API key here
        val moviesMono = when {
            genreId != null && directorName != null -> {
                // Get movies by both genre and director, then filter by genre
                getMoviesByDirector(directorName).map { movies ->
                    movies.filter { movie -> 
                        movie.genres.any { it.id == genreId }
                    }
                }
            }
            genreId != null -> getMoviesByGenre(genreId)
            directorName != null -> getMoviesByDirector(directorName)
            else -> getPopularMovies()
        }

        return moviesMono.flatMap { movies ->
            if (movies.isEmpty()) {
                return@flatMap Mono.empty<Movie>()
            }

            val randomIndex = ThreadLocalRandom.current().nextInt(movies.size)
            Mono.just(movies[randomIndex])
        }
    }

    /**
     * Fetches a list of all available genres.
     *
     * @return A Mono emitting a list of genres
     */
    fun getGenres(): Mono<List<Genre>> {
        // If the API key is not set, return fallback genres
        if (tmdbConfig.getApiKey() == "YOUR_TMDB_API_KEY") {
            return Mono.just(getFallbackGenres())
        }

        return webClient.get()
            .uri { uriBuilder -> buildUri(uriBuilder, "/genre/movie/list", emptyMap()) }
            .retrieve()
            .bodyToMono(GenreResponse::class.java)
            .map { it.genres }
    }

    /**
     * Fetches streaming providers for a movie.
     *
     * @param movieId The ID of the movie
     * @return A Mono emitting a list of streaming services
     */
    private fun getStreamingProviders(movieId: Long): Mono<List<StreamingService>> {
        // If the API key is not set, return an empty list
        if (tmdbConfig.getApiKey() == "YOUR_TMDB_API_KEY") {
            return Mono.just(emptyList())
        }

        return webClient.get()
            .uri { uriBuilder -> buildUri(uriBuilder, "/movie/$movieId/watch/providers", emptyMap()) }
            .retrieve()
            .bodyToMono(WatchProvidersResponse::class.java)
            .map { response ->
                // Get US providers if available, otherwise use the first country's providers
                val countryProviders = response.results["US"] ?: response.results.values.firstOrNull()

                // Combine all types of providers (flatrate, rent, buy)
                val allProviders = mutableListOf<Provider>()
                countryProviders?.flatrate?.let { allProviders.addAll(it) }
                countryProviders?.rent?.let { allProviders.addAll(it) }
                countryProviders?.buy?.let { allProviders.addAll(it) }

                // Convert to StreamingService objects and remove duplicates
                allProviders.distinctBy { it.providerId }
                    .map { provider ->
                        StreamingService(
                            providerId = provider.providerId,
                            providerName = provider.providerName,
                            logoPath = provider.logoPath
                        )
                    }
            }
            .onErrorReturn(emptyList())
    }

    /**
     * Enriches a list of movie DTOs with additional details like genres and director.
     *
     * @param movieDtos The list of movie DTOs to enrich
     * @return A Mono emitting the enriched list of movies
     */
    private fun enrichMoviesWithDetails(movieDtos: List<MovieDto>): Mono<List<Movie>> {
        if (movieDtos.isEmpty()) {
            return Mono.just(emptyList())
        }

        val genresMono = webClient.get()
            .uri { uriBuilder -> buildUri(uriBuilder, "/genre/movie/list", emptyMap()) }
            .retrieve()
            .bodyToMono(GenreResponse::class.java)
            .map { it.genres }

        return genresMono.flatMap { genres ->
            // Create a list of Monos, each emitting a Movie
            val movieMonos = movieDtos.map { movieDto ->
                // Fetch credits for each movie to get the director
                val creditsMono = webClient.get()
                    .uri { uriBuilder -> buildUri(uriBuilder, "/movie/${movieDto.id}/credits", emptyMap()) }
                    .retrieve()
                    .bodyToMono(CreditsResponse::class.java)

                // Fetch streaming providers for each movie
                val providersMono = getStreamingProviders(movieDto.id)

                // Combine credits and providers
                Mono.zip(creditsMono, providersMono).map { tuple ->
                    val credits = tuple.t1
                    val streamingServices = tuple.t2

                    val director = credits?.crew?.find { it.job.equals("Director", ignoreCase = true) }?.name

                    // Match genre IDs with genre names
                    val movieGenres = movieDto.genres.ifEmpty {
                        // If genres are not already populated, create them from genre IDs in the response
                        movieDto.genreIds.mapNotNull { genreId ->
                            genres.find { it.id == genreId }
                        }
                    }

                    // Convert DTO to domain model
                    Movie(
                        id = movieDto.id,
                        title = movieDto.title,
                        releaseDate = movieDto.releaseDate,
                        voteAverage = movieDto.voteAverage,
                        genres = movieGenres,
                        posterPath = movieDto.posterPath,
                        overview = movieDto.overview,
                        director = director,
                        streamingServices = streamingServices
                    )
                }
            }

            // Combine all the Monos into a single Mono<List<Movie>>
            Mono.zip(movieMonos) { moviesArray ->
                moviesArray.map { it as Movie }
            }
        }
    }

    /**
     * Builds a URI for the TMDB API with the API key and additional parameters.
     *
     * @param uriBuilder The URI builder
     * @param path The API endpoint path
     * @param params Additional query parameters
     * @return The built URI
     */
    private fun buildUri(uriBuilder: UriBuilder, path: String, params: Map<String, String>) = uriBuilder
        .path(path)
        .queryParam("api_key", tmdbConfig.getApiKey())
        .apply {
            params.forEach { (key, value) ->
                queryParam(key, value)
            }
        }
        .build()

    /**
     * Response wrapper for movie lists from TMDB API.
     */
    data class MovieResponse(
        val page: Int,
        val results: List<MovieDto>,
        @JsonProperty("total_results") val totalResults: Int,
        @JsonProperty("total_pages") val totalPages: Int
    )

    /**
     * DTO for movie data from TMDB API.
     */
    data class MovieDto(
        val id: Long,
        val title: String,
        @JsonProperty("release_date") val releaseDate: String? = null,
        @JsonProperty("vote_average") val voteAverage: Double = 0.0,
        @JsonProperty("genre_ids") val genreIds: List<Long> = emptyList(),
        @JsonProperty("poster_path") val posterPath: String? = null,
        val overview: String? = null,
        val genres: List<Genre> = emptyList(),
        val director: String? = null
    ) {
        /**
         * Converts this DTO to a Movie domain object.
         */
        fun toMovie(): Movie = Movie(
            id = id,
            title = title,
            releaseDate = releaseDate,
            voteAverage = voteAverage,
            genres = genres,
            posterPath = posterPath,
            overview = overview,
            director = director
        )
    }

    /**
     * Response wrapper for genre lists from TMDB API.
     */
    data class GenreResponse(
        val genres: List<Genre>
    )

    /**
     * Response wrapper for person search from TMDB API.
     */
    data class PersonResponse(
        val page: Int,
        val results: List<Person>,
        @JsonProperty("total_results") val totalResults: Int,
        @JsonProperty("total_pages") val totalPages: Int
    )

    /**
     * DTO for person data from TMDB API.
     */
    data class Person(
        val id: Long,
        val name: String
    )

    /**
     * Response wrapper for movie credits from TMDB API.
     */
    data class CreditsResponse(
        val id: Long,
        val cast: List<Cast>,
        val crew: List<Crew>
    )

    /**
     * Response wrapper for movie watch providers from TMDB API.
     */
    data class WatchProvidersResponse(
        val id: Long,
        val results: Map<String, CountryProviders>
    )

    /**
     * Providers for a specific country from TMDB API.
     */
    data class CountryProviders(
        val flatrate: List<Provider>? = null,
        val rent: List<Provider>? = null,
        val buy: List<Provider>? = null
    )

    /**
     * Provider details from TMDB API.
     */
    data class Provider(
        @JsonProperty("provider_id") val providerId: Long,
        @JsonProperty("provider_name") val providerName: String,
        @JsonProperty("logo_path") val logoPath: String? = null
    )

    /**
     * DTO for cast member data from TMDB API.
     */
    data class Cast(
        val id: Long,
        val name: String,
        val character: String
    )

    /**
     * DTO for crew member data from TMDB API.
     */
    data class Crew(
        val id: Long,
        val name: String,
        val job: String
    )
}
