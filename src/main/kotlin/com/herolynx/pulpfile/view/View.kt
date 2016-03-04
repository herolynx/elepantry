package com.herolynx.pulpfile.view

import com.herolynx.pulpfile.model.Resource
import org.funktionale.either.Either
import rx.Observable
import java.io.File

/**
 * Resource view
 *
 * @author Michal Wronski
 */
interface View {

    /**
     * Get resources belonging to given view
     *
     * @return resource stream
     */
    fun get(): Observable<Resource>

}