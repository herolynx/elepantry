package com.herolynx.pulpfile.view

import com.herolynx.pulpfile.model.Resource
import rx.Observable

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