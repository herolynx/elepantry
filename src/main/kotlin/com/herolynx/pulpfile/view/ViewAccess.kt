package com.herolynx.pulpfile.view

import com.herolynx.pulpfile.model.Resource
import org.funktionale.either.Either
import rx.Observable
import java.io.File

/**
 *
 *
 * @author Michal Wronski
 */
interface ViewAccess {

    /**
     * Get files belonging to storage
     *
     * @return resource stream
     */
    fun get(): Observable<Resource>

    /**
     * Download given file resource
     *
     * @param id resource ID
     * @return found file, exception in case of issues
     */
    fun download(id: String): Either<Exception, File?>

    /**
     * Upload file
     */
    fun upload(f: File): Either<Exception, Boolean>

}