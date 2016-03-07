package com.herolynx.elepantry.io.repository

import com.herolynx.elepantry.func.model.either.Either

/**
 * Write-only access
 *
 * @author Michal Wronski
 */
interface WriteRepository<T> {

    fun create(entity: T): Either<Exception, T>

    fun update(entity: T): Either<Exception, Boolean>

    fun delete(id: String): Either<Exception, Boolean>

}