package com.herolynx.pulpfile.io.storage.google.oauth

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.http.HttpTransport
import com.google.api.client.json.JsonFactory
import com.google.api.services.drive.Drive
import com.herolynx.pulpfile.func.model.Either
import com.herolynx.pulpfile.io.storage.google.drive.GoogleDrive

/**
 * Google authorization
 */
final class GoogleSession {

    private val jsonFactory: JsonFactory
    private val httpTransport: HttpTransport
    private val creds: Credential

    internal constructor(jsonFactory: JsonFactory, httpTransport: HttpTransport, creds: Credential) {
        this.jsonFactory = jsonFactory
        this.httpTransport = httpTransport
        this.creds = creds
    }

    /**
     * Create driver of google drive
     *
     * @param appName application name accessing drive
     * @return driver instance or exception
     */
    fun createGoogleDrive(appName: String): Either<Exception, GoogleDrive> {
        try {
            return Either.Right(GoogleDrive(
                    Drive.Builder(
                            httpTransport,
                            jsonFactory,
                            creds
                    )
                            .setApplicationName(appName)
                            .build()
            ))
        } catch(e: Exception) {
            return Either.Left(e);
        }
    }

}
