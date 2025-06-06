package org.example.junietest.model

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * Represents a movie in the application.
 *
 * @property id Unique identifier for the movie (TMDB id)
 * @property title The title of the movie
 * @property releaseDate The release date of the movie (YYYY-MM-DD)
 * @property voteAverage The average vote/rating of the movie (0-10)
 * @property genres List of genres the movie belongs to
 * @property posterPath Path to the movie poster image
 * @property overview Brief description of the movie
 * @property director Name of the movie director (if available)
 * @property streamingServices List of streaming services where the movie is available
 */
data class Movie(
    val id: Long,
    val title: String,
    @JsonProperty("release_date") val releaseDate: String? = null,
    @JsonProperty("vote_average") val voteAverage: Double = 0.0,
    val genres: List<Genre> = emptyList(),
    @JsonProperty("poster_path") val posterPath: String? = null,
    val overview: String? = null,
    val director: String? = null,
    val streamingServices: List<StreamingService> = emptyList()
) {
    /**
     * Returns the year of release extracted from the release date.
     */
    val year: Int
        get() = releaseDate?.substring(0, 4)?.toIntOrNull() ?: 0

    /**
     * Returns the primary genre of the movie, or "Unknown" if no genres are available.
     */
    val primaryGenre: String
        get() = genres.firstOrNull()?.name ?: "Unknown"
}

/**
 * Represents a movie genre.
 *
 * @property id Unique identifier for the genre
 * @property name The name of the genre
 */
data class Genre(
    val id: Long,
    val name: String
)

/**
 * Represents a streaming service where a movie is available.
 *
 * @property provider_id Unique identifier for the streaming service
 * @property provider_name The name of the streaming service
 * @property logo_path Path to the streaming service logo
 */
data class StreamingService(
    @JsonProperty("provider_id") val providerId: Long,
    @JsonProperty("provider_name") val providerName: String,
    @JsonProperty("logo_path") val logoPath: String? = null
)
