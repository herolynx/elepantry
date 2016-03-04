package com.herolynx.elepantry.view

import com.herolynx.elepantry.model.Resource
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