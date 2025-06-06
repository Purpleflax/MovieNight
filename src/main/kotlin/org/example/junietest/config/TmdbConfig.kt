package org.example.junietest.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.client.WebClient

/**
 * Configuration for TMDB API client.
 */
@Configuration
class TmdbConfig {

    @Value("\${tmdb.api.base-url}")
    private lateinit var baseUrl: String

    @Value("\${tmdb.api.key}")
    private lateinit var apiKey: String

    @Value("\${tmdb.api.image-base-url}")
    private lateinit var imageBaseUrl: String

    /**
     * Creates a WebClient bean for making HTTP requests to the TMDB API.
     */
    @Bean
    fun tmdbWebClient(): WebClient {
        return WebClient.builder()
            .baseUrl(baseUrl)
            .build()
    }

    /**
     * @return The TMDB API key.
     */
    fun getApiKey(): String = apiKey

    /**
     * @return The base URL for TMDB images.
     */
    fun getImageBaseUrl(): String = imageBaseUrl
}