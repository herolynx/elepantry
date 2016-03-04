package com.herolynx.pulpfile.io.cloud

import com.herolynx.pulpfile.model.Resource
import org.funktionale.either.Either
import rx.Observable
import java.io.File

/**
 * Resource view
 *
 * @author Michal Wronski
 */
interface IOView {

    /**
     * Get files belonging to given view
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