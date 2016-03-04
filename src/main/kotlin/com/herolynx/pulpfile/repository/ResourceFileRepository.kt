package com.herolynx.pulpfile.repository

import org.funktionale.either.Either
import java.io.File

/**
 * Repository that gives access to physical files
 *
 * @author Michal Wronski
 */
interface ResourceFileRepository {

    fun download(id: String): Either<Exception, File?>

    fun upload(f: File): Either<Exception, Boolean>

}