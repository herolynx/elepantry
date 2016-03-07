package com.herolynx.elepantry.io.storage.google.oauth

import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory
import com.google.api.client.util.store.DataStoreFactory
import com.google.api.services.drive.DriveScopes
import com.herolynx.elepantry.func.collections.map
import com.herolynx.elepantry.func.collections.toList
import com.herolynx.elepantry.func.model.either.Either
import java.io.Reader

/**
 * Google authorization
 */
final class GoogleAuth {

    private val jsonFactory: JsonFactory
    private val httpTransport: HttpTransport

    internal constructor(jsonFactory: JsonFactory, httpTransport: HttpTransport) {
        this.jsonFactory = jsonFactory
        this.httpTransport = httpTransport
    }

    /**
     * Authorize user
     *
     * @param user user e-mail
     * @param clientSecrets password
     * @param driverScope access scope to google drive
     * @param dataStoreFactory store where credentials will be kept
     * @return user's session or exception
     */
    fun authorize(user: String, clientSecrets: Reader, driverScope: List<DriveScopes>, dataStoreFactory: DataStoreFactory):
            Either<Exception, GoogleSession> {
        try {
            val authCodeFlow: GoogleAuthorizationCodeFlow = GoogleAuthorizationCodeFlow
                    .Builder(
                            httpTransport,
                            jsonFactory,
                            GoogleClientSecrets.load(jsonFactory, clientSecrets),
                            driverScope.map { it.toString() }.toList()
                    )
                    .setDataStoreFactory(dataStoreFactory)
                    .setAccessType("offline")
                    .build()
            val creds = AuthorizationCodeInstalledApp(
                    authCodeFlow,
                    LocalServerReceiver()
            ).authorize(user)
            return Either.Right(GoogleSession(jsonFactory, httpTransport, creds))
        } catch(e: Exception) {
            return Either.Left(e);
        }
    }

}


