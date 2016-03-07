package com.herolynx.elepantry.io.storage

import com.herolynx.elepantry.func.model.either.Either
import com.herolynx.elepantry.model.Resource
import com.herolynx.elepantry.model.ResourceType
import rx.Observable
import java.io.File

/**
 * Resource storage
 *
 * @author Michal Wronski
 */
interface Storage {

    fun getType(): ResourceType

    /**
     * Get files belonging to storage
     *
     * @return resource stream
     */
    fun get(): Observable<Resource>

    fun exists(resource: Resource): Either<Exception, Boolean>

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