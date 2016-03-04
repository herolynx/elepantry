package com.herolynx.pulpfile.io.repository

import com.herolynx.pulpfile.model.Resource
import com.herolynx.pulpfile.model.TaggedView
import rx.Observable

/**
 * View repository
 *
 * @author Michal Wronski
 */
interface ViewRepository {

    fun get(view: TaggedView): Observable<Resource>

}