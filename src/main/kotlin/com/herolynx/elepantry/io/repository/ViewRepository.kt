package com.herolynx.elepantry.io.repository

import com.herolynx.elepantry.model.Resource
import com.herolynx.elepantry.model.TaggedView
import rx.Observable

/**
 * View repository
 *
 * @author Michal Wronski
 */
interface ViewRepository {

    fun get(view: TaggedView): Observable<Resource>

}