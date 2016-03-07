package com.herolynx.elepantry.io.storage.google.oauth

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.http.HttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.herolynx.elepantry.func.model.either.Either

/**
 * Factory initializes OAuth and starts auth process
 */
object GoogleAuthFactory {

    fun create(): Either<Exception, GoogleAuth> {
        try {
            val jsonFactory = JacksonFactory.getDefaultInstance()
            val httpTransport: HttpTransport = GoogleNetHttpTransport.newTrustedTransport()
            return Either.Right(GoogleAuth(jsonFactory, httpTransport))
        } catch(e: Exception) {
            return Either.Left(e)
        }
    }

}